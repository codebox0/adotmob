import request from "supertest"

import app from "../../src/app"
import mongoose from 'mongoose'
import {importData} from '../../src/models/initData'

describe("Pass routes", () => {

    beforeAll(async () => {
        await importData()

    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    describe('POST', () => {
        it('get token', async () => {
            const res = await request(app)
                .post('/token')
                .send({firstName: 'John', lastName: 'Doe'})

            expect(res.status).toEqual(200)
            expect(res.body.token).toEqual(expect.any(String))

        })

    })

    describe('POST', () => {
        it('get token', async () => {
            const res = await request(app)
                .post('/token')
                .send({firstName: 'John', lastName: 'Doe'})

            expect(res.status).toEqual(200)
            expect(res.body.token).toEqual(expect.any(String))

        })
    })

    describe('GET', () => {
        it('init data', async () => {
            const res = await request(app)
                .get('/initDatabase')

            expect(res.status).toEqual(200)
            expect(res.body.message).toEqual(expect.any(String))

        })
    })


})