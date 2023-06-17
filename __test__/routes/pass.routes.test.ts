import request from "supertest"
import app from "../../src/app"
import mongoose from 'mongoose'
import {generateToken} from '../../src/utils/jwt.utils'
import {PassDto} from '../../src/dtos/pass'
import {importData} from '../../src/models/initData'
import {UserDto} from '../../src/dtos/user'

const newPass = {
    level: 3
}

describe("Pass routes", () => {

    let pass: PassDto[] = []
    let users: UserDto[] = []
    let token = ''

    beforeAll(async () => {
        await importData()

        token = generateToken('', 'John', 'Doe')

        users = (await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)).body.data


        pass = (await request(app)
            .get('/pass')
            .set('Authorization', `Bearer ${token}`)).body.data

        // setup();
    }, 5000)

    afterAll(async () => {
        await mongoose.connection.close()
    })


    describe('POST', () => {
        it('create pass', async () => {
            const res = await request(app)
                .post('/pass')
                .set('Authorization', `Bearer ${token}`)
                .send(newPass)

            expect(res.status).toEqual(201)
            expect(res.body.data).toEqual(expect.objectContaining(newPass))

            pass.push(res.body.data)

        })

        it('set pass created to user', async () => {
            const res = await request(app)
                .patch(`/users/${users[0]._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    pass_id: pass[pass.length - 1]._id
                })

            expect(res.status).toEqual(200)
        })

        it('Check if pass set to user', async () => {
            // check if pass is in user
            const res = await request(app)
                .get(`/users/${users[0]._id}`)
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(200)
            expect(res.body.data.pass_id).toEqual(expect.objectContaining({_id: pass[pass.length - 1]._id}))

        })

         it('Access to pass with the right user connected', async () => {
            const res = await request(app)
                .get(`/pass/${pass[pass.length - 1]._id}`)
                .set('Authorization', `Bearer ${generateToken(users[0]._id, users[0].firstName , users[0].lastName)}`)

            expect(res.status).toEqual(200)
        })

        it('Access to pass with the wrong user connected', async () => {
            const res = await request(app)
                .get(`/pass/${pass[pass.length - 1]._id}`)
                .set('Authorization', `Bearer ${generateToken('', 'Michel', 'text')}`)

            expect(res.status).toEqual(403)

        });

        it('Access to pass with the wrong pass id ', async () => {
            const res = await request(app)
                .get(`/pass/${users[0]._id}`)
                .set('Authorization', `Bearer ${generateToken(users[0]._id, users[0].firstName , users[0].lastName)}`)

            expect(res.status).toEqual(403)

        });

    })


    describe('GET', () => {
        it('returns 403 if authentication failed (missing header)', async () => {
            const res = await request(app).get('/pass')

            expect(res.status).toBe(403)
        })

        it('returns pass', async () => {
            const res = await request(app)
                .get('/pass')
                .set('Authorization', `Bearer ${generateToken('', 'John', 'Doe')}`)
            expect(res.body.data.length).toBeGreaterThan(0)
        })

    })

    describe('PATCH', () => {
        it('patch pass by id', async () => {
            const res = await request(app)
                .patch(`/pass/${pass[pass.length - 1]._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    level: 4
                })

            expect(res.status).toEqual(200)

            expect(res.body.data).toEqual(expect.objectContaining({
                level: 4
            }))

            pass[pass.length - 1]= res.body.data
        })

    })

    describe('DELETE', () => {
        it('delete pass by id', async () => {
            const res = await request(app)
                .delete(`/pass/${pass[pass.length - 1]._id}`)
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(200)
            expect(res.body.data).toEqual(expect.objectContaining(pass[pass.length - 1]))
        }, 5000)

    })

})