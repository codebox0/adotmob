import request from "supertest";

import app from "../../src/app";
import mongoose from 'mongoose'
import {generateToken} from '../../src/utils/jwt.utils'
import {PlaceDto} from '../../src/dtos/place'
import {importData} from '../../src/models/initData'


const phoneNumberRegex = /^\d{10}$/;

const newPlace = {
    address: '1234 Main St',
    phoneNumber: '1234567890',
    require_age_level: 18,
    require_pass_level: 1,
}

describe("Place routes", () => {

    let places: PlaceDto[] = []
    let token = ''

    beforeAll(async () => {
        await importData();

        token = generateToken('', 'John', 'Doe');
        places = (await request(app)
            .get('/places')
            .set('Authorization', `Bearer ${token}`)).body.data;

        // setup();
    }, 5000)

    afterAll(async () => {
        await mongoose.connection.close();
    })


    describe('GET', () => {
        it('returns 403 if authentication failed (missing header)', async () => {
            const res = await request(app).get('/places');

            expect(res.status).toBe(403);
        });

        it('returns places', async () => {
            const res = await request(app)
                .get('/places')
                .set('Authorization', `Bearer ${generateToken('', 'John', 'Doe')}`);
            expect(res.body.data).toBeInstanceOf(Array);
        });

        it('get place by id', async () => {
            const res = await request(app)
                .get(`/places/${places[0]._id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(200);

            expect(res.body.data).toEqual(expect.objectContaining(places[0]));
        })

    });

    describe('POST', () => {
        it('create place', async () => {
            const res = await request(app)
                .post('/places')
                .set('Authorization', `Bearer ${token}`)
                .send(newPlace);

            expect(res.status).toEqual(201);
            expect(res.body.data).toEqual(expect.objectContaining(newPlace));

            places.push(res.body.data);

        });

    });

    describe('PATCH', () => {
        it('patch place by id', async () => {
            const res = await request(app)
                .patch(`/places/${places[places.length - 1]._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    address: '16523 Main St',
                    phoneNumber: '1234576543',
                    require_age_level: 21,
                    require_pass_level: 2,
                });

            expect(res.status).toEqual(200);

            expect(res.body.data).toEqual(expect.objectContaining({
                address: '16523 Main St',
                phoneNumber: '1234576543',
                require_age_level: 21,
                require_pass_level: 2,
            }));
        })

    });

    describe('DELETE', () => {
        it('delete place by id', async () => {
            const res = await request(app)
                .delete(`/places/${places[places.length - 1]._id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(200);
            expect(res.body.data).toEqual(expect.objectContaining({
                ...places[places.length - 1],
                address: '16523 Main St',
                phoneNumber: '1234576543',
                require_age_level: 21,
                require_pass_level: 2,
            }));
        })

    });

});