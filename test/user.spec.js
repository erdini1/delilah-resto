const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const app = require('../index')
const { deleteUser } = require('../src/functions/deleteUserTest')


let emailUser 
describe('#index.js', function () {
    describe('Registro "/users"', function(){
        it('Deberia devolver el status code "201" si el usuario se crea con exito', function(done){
            const user = {
                username: "test",
                firstName: "test",
                lastName: "test",
                email: "test@test.com",
                phone: 1234567,
                address: "direccion de prueba",
                password: "test",
                passwordConf: "test",
            }
            emailUser = user.email
            request(app)
                .post('/users/')
                .send(user)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(201)
                    done()
                })
        })

        it('Deberia devolver el status code "422" si el email ya se encuentra registrado', function(done){
            const user = {
                username: "userRandom",
                firstName: "userRandom",
                lastName: "userRandom",
                email: "test@test.com",
                phone: 1234567,
                address: "direccion de userRandom",
                password: "userRandom",
                passwordConf: "userRandom",
            }
            request(app)
                .post('/users/')
                .send(user)
                .end(function(err, res){
                    expect(res.statusCode).to.equal(422)
                    done()
                })
        })
        
        it('Deberia devolver el status code "400" si no se ingresa algun dato', function(done){
            const user = {
                firstName: "userRandom",
                lastName: "userRandom",
                email: "userRandom@userRandom.com",
                phone: 1234567,
                address: "direccion de userRandom",
                password: "userRandom",
                passwordConf: "userRandom",
            }
            request(app)
                .post('/users/')
                .send(user)
                .end(function(err, res){
                    expect(res.statusCode).to.equal(400)
                    done()
                })
        })
        after(function (){
            deleteUser(emailUser)
        })

    })
})