import request from "supertest";

import app from "../../src/app";
import mongoose from 'mongoose'
import {generateToken} from '../../src/utils/jwt.utils'
import {UserDto} from '../../src/dtos/user'
import {importData} from '../../src/models/initData'
import {PlaceDto} from '../../src/dtos/place'
import {PassDto} from '../../src/dtos/pass'


const phoneNumberRegex = /^\d{10}$/;

const newUser = {
    firstName: 'Yang',
    lastName: 'Peng',
    age: 30,
    phoneNumber: '1234567890',
    address: '1234 Main St'
}

describe("User routes", () => {

    let users: UserDto[] = []
    let places: PlaceDto[] = []
    let pass: PassDto
    let token = ''

    beforeAll(async () => {
        await importData();

        token = generateToken('', 'John', 'Doe');
        users = (await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)).body.data;

        places = (await request(app)
            .get(`/places`)
            .set('Authorization', `Bearer ${token}`)).body.data;

        pass = (await request(app)
            .post('/pass')
            .set('Authorization', `Bearer ${token}`)
            .send({level: 3})).body.data


        // setup();
    }, 5000)

    afterAll(async () => {
        await mongoose.connection.close();
    })


    describe('POST', () => {
        it('create user', async () => {
            const res = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send(newUser);

            expect(res.status).toEqual(201);
            expect(res.body.data).toEqual(expect.objectContaining(newUser));

            users.push(res.body.data);

        });

    });


    describe('GET', () => {
        it('returns 403 if authentication failed (missing header)', async () => {
            const res = await request(app).get('/users');

            expect(res.status).toBe(403);
        });

        it('returns users', async () => {
            const res = await request(app)
                .get('/users')
                .set('Authorization', `Bearer ${generateToken('', 'John', 'Doe')}`);
            expect(res.body.data.length).toBeGreaterThan(0);
        });

        it('get user by id', async () => {
            const res = await request(app)
                .get(`/users/${users[0]._id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(200);

            expect(res.body.data).toEqual(expect.objectContaining(users[0]));
        })

        it('set a pass for an user', async () => {
            const res2 = await request(app)
                .patch(`/users/${users[0]._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    pass_id: pass._id
                })
            expect(res2.status).toEqual(200)

        })

        it('get place all available place for an user', async () => {
            const res = await request(app)
                .get(`/users/${users[0]._id}/placeList`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(200);

            expect(res.body.data).toEqual(expect.arrayContaining([]));
            expect(res.body.data.length).toBeGreaterThan(0);
        });

        it('User can access to his place', async () => {
            const res = await request(app)
                .post(`/users/canAccessPlace`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userId: users[0]._id,
                    placeId: places[0]._id
                });

            expect(res.status).toEqual(200);

            expect(res.body).toEqual(expect.objectContaining({accessible: true}));
        });



    });


    describe('PATCH', () => {
        it('patch user by id', async () => {
            const res = await request(app)
                .patch(`/users/${users[users.length - 1]._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    firstName: 'Johnny'
                });

            expect(res.status).toEqual(200);

            expect(res.body.data).toEqual(expect.objectContaining({
                firstName: 'Johnny'
            }));
        })

    });

    describe('DELETE', () => {
        it('delete user by id', async () => {
            const res = await request(app)
                .delete(`/users/${users[users.length - 1]._id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(200);
            expect(res.body.data).toEqual(expect.objectContaining({
                ...users[users.length - 1],
                firstName: 'Johnny',
            }));
        })

    });
});