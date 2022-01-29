const request = require('supertest');
const app = require('../server');

describe('create user', () => {
    it('should return 201 when create user', async () => {
        const res = await request(app).post('/user').send({
            username: "testeJest",
            email: "jest@email.com",
            password: "123"
        })
        expect(res.statusCode).toEqual(201)
    })

    it('should return 400 when username is not present in request body', async () => {
        const res = await request(app).post('/user').send({
            email: "jest@email.com",
            password: "123"
        })
        expect(res.statusCode).toEqual(400)
    })

    it('should return 400 when email is invalid', async () => {
        const res = await request(app).post('/user').send({
            email: "jestemail.com",
            username: "testeJest",
            password: "123"
        })
        expect(res.statusCode).toEqual(400)
    })

    it('should return 400 when password is lower than 3 characters', async () => {
        const res = await request(app).post('/user').send({
            email: "jest@email.com",
            username: "testeJest",
            password: "1"
        })
        expect(res.statusCode).toEqual(400)
    })
})

describe('auth user', () => {
    it('should return 200 when user found', async () => {
        const res = await request(app).get('/user/auth/jest@email.com/123')
        expect(res.statusCode).toEqual(200)
    })

    it('should return auth property when user is authenticated', async () => {
        const res = await request(app).get('/user/auth/jest@email.com/123')
        expect(res.body).toHaveProperty('auth')
    })

    it('should return 404 when user not found', async () => {
        const res = await request(app).get('/user/auth/jest@email.com/123456')
        expect(res.statusCode).toEqual(404)
    })
})

describe('create provider', () => {
    it('should return 201 when create provider', async () => {
        const res = await request(app).post('/provider').send({
            name: "jestProvider",
            logo: "jestLogo",
            uf: "SP",
            kwhPrice: 100.0,
            kwhMinLimit: 100,
            totalClients: 10,
            averageRating: 1
        })
        expect(res.statusCode).toEqual(201)
    })

    it('should return 400 when name is not present in the request body', async () => {
        const res = await request(app).post('/provider').send({
            logo: "jestLogo",
            uf: "SP",
            kwhPrice: 100.0,
            kwhMinLimit: 100,
            totalClients: 10,
            averageRating: 1
        })
        expect(res.statusCode).toEqual(400)
    })

    it('should return 400 when logo is not present in the request body', async () => {
        const res = await request(app).post('/provider').send({
            name: "jestProvider",
            uf: "SP",
            kwhPrice: 100.0,
            kwhMinLimit: 100,
            totalClients: 10,
            averageRating: 1
        })
        expect(res.statusCode).toEqual(400)
    })

    it('should return 400 when uf is greater than 2 characters ', async () => {
        const res = await request(app).post('/provider').send({
            name: "jestProvider",
            logo: "jestLogo",
            uf: "São Paulo",
            kwhPrice: 100.0,
            kwhMinLimit: 100,
            totalClients: 10,
            averageRating: 1
        })
        expect(res.statusCode).toEqual(400)
    })

    it('should return 400 when kwhPrice is not a double value', async () => {
        const res = await request(app).post('/provider').send({
            name: "jestProvider",
            logo: "jestLogo",
            uf: "SP",
            kwhPrice: "cem",
            kwhMinLimit: 100,
            totalClients: 10,
            averageRating: 1
        })
        expect(res.statusCode).toEqual(400)
    })

    it('should return 400 when kwhMinLimit is not a int value', async () => {
        const res = await request(app).post('/provider').send({
            name: "jestProvider",
            logo: "jestLogo",
            uf: "SP",
            kwhPrice: 100.0,
            kwhMinLimit: "cem",
            totalClients: 10,
            averageRating: 1
        })
        expect(res.statusCode).toEqual(400)
    })

    it('should return 400 when totalClients is not a int value', async () => {
        const res = await request(app).post('/provider').send({
            name: "jestProvider",
            logo: "jestLogo",
            uf: "SP",
            kwhPrice: 100.0,
            kwhMinLimit: 100,
            totalClients: "dez",
            averageRating: 1
        })
        expect(res.statusCode).toEqual(400)
    })

    it('should return 400 when average is not a double value', async () => {
        const res = await request(app).post('/provider').send({
            name: "jestProvider",
            logo: "jestLogo",
            uf: "SP",
            kwhPrice: 100.0,
            kwhMinLimit: 100,
            totalClients: 10,
            averageRating: []
        })
        expect(res.statusCode).toEqual(400)
    })
})

describe('get all providers', () => {
    it('should return 401 when request does not contains an auth token', async () => {
        const res = await request(app).get('/provider')
        expect(res.statusCode).toEqual(401)
    })
})

describe('get an unique provider', () => {
    it('should return 401 when request does not contains an auth token', async () => {
        const res = await request(app).get('/provider/100')
        expect(res.statusCode).toEqual(401)
    })
})



