let users = require('../models/users')
const jwt = require('jsonwebtoken')
const {config} = require('../config')

function validate_data_user(req, res, next){
    const user = req.body
    user.rol = "usuario"
    user.id = users[users.length - 1].id + 1
    let keysUsers = Object.keys(users[0])
    let keysBody = Object.keys(req.body)
    keysUsers.sort()
    keysBody.sort()
    let equals = 0
    for(let i = 0; i<keysUsers.length; i++){
        if(keysUsers[i] == keysBody[i]){
            equals++;
        }
    }
    if(equals === keysUsers.length){
        next()
    } else{
        res.status(400).json({"mensaje":"Para poder registrarse necesita: usuario, nombre y apellido, email, telefono, direccion de envio, contraseña y la confirmacion de la contraseña"})
    }
    req.id = user.id
}

function validate_data_register(req, res, next){
    const newUser = users.find(element => element.email === req.body.email)
    if(!newUser){
        if(req.body.password === req.body.passwordConf){
            next()
        } else {
            res.status(400).json({"mensaje":"Las contraseñas no coinciden"})
            return
        }
    } else{
        res.status(400).json({"mensaje":"El email ya esta en uso"})
    } 
} ///////

function validate_data_login(req, res, next){
    if(req.body.user_email != undefined && req.body.password != undefined) {

        const userFind = users.find(element => element.user === req.body.user_email || element.email === req.body.user_email)
        const passwordFind = users.find(element => element.password === req.body.password)
        indexUserFind = users.indexOf(userFind)
        indexPasswordFind = users.indexOf(passwordFind)         //IMPORTANTE MODIFICAR LA BUQUEDA DE LA CONTRASEÑA

        if(!userFind ){
            res.status(400).json({"mensaje":"No hay ninguna cuenta con esos datos"})
            return
        } else{
            if(indexUserFind != indexPasswordFind){
                res.status(400).json({"mensaje":"La contraseña no coincide con el usuario"})
                return
            }
        } 
        /* const stringtoken = jwt.sign({usuario: userFind}, config.server.signature)
        req.token = stringtoken             //TERMIANR DE VER ESTO, ES DECIR PASARLO A LA RUTA, NO TIENE QUE ESTAR EN EL MIDDLE EL JWT */
        next()
    } else{
        res.status(400).json({"mensaje": "No puede dejar ningun campo vacio"})
    }
}

module.exports = {
    validate_data_user,
    validate_data_register,
    validate_data_login
}