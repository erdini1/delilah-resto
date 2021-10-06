let usuarios = require('../models/usuarios')
const jwt = require('jsonwebtoken')
const {config} = require('../config')

function validar_datos_usuarios(req, res, next){
    const usuario = req.body
    usuario.rol = "usuario"
    usuario.id = usuarios[usuarios.length - 1].id + 1
    let keysUsuarios = Object.keys(usuarios[0])
    let keysBody = Object.keys(req.body)
    keysUsuarios.sort()
    keysBody.sort()
    let iguales = 0
    for(let i = 0; i<keysUsuarios.length; i++){
        if(keysUsuarios[i] == keysBody[i]){
            iguales++;
        }
    }
    if(iguales === keysUsuarios.length){
        next()
    } else{
        res.status(400).json({"mensaje":"Para poder registrarse necesita: usuario, nombre y apellido, email, telefono, direccion de envio, contraseña y la confirmacion de la contraseña"})
    }
    req.id = usuario.id
}

function validar_datos_registro(req, res, next){
    const usuarioNuevo = usuarios.find(elemento => elemento.email === req.body.email)
    if(!usuarioNuevo){
        if(req.body.contrasenia === req.body.confContrasenia){
            next()
        } else {
            res.status(400).json({"mensaje":"Las contraseñas no coinciden"})
            return
        }
    } else{
        res.status(400).json({"mensaje":"El email ya esta en uso"})
    } 
}

function validar_datos_login(req, res, next){
    if(req.body.usuario_email != undefined && req.body.contrasenia != undefined) {

        const usuarioUsuario = usuarios.find(elemento => elemento.usuario === req.body.usuario_email || elemento.email === req.body.usuario_email)
        const usuarioContrasenia = usuarios.find(elemento => elemento.contrasenia === req.body.contrasenia)
        indexUsuariousuario = usuarios.indexOf(usuarioUsuario)
        indexUsuarioContrasenia = usuarios.indexOf(usuarioContrasenia)

        if(!usuarioUsuario ){
            res.status(400).json({"mensaje":"No hay ninguna cuenta con esos datos"})
            return
        } else{
            if(indexUsuariousuario != indexUsuarioContrasenia){
                res.status(400).json({"mensaje":"La contraseña no coincide con el usuario"})
                return
            }
        } 
        /* const stringtoken = jwt.sign({usuario: usuarioUsuario}, config.server.signature)
        req.token = stringtoken             //TERMIANR DE VER ESTO, ES DECIR PASARLO A LA RUTA, NO TIENE QUE ESTAR EN EL MIDDLE EL JWT */
        next()
    } else{
        res.status(400).json({"mensaje": "No puede dejar ningun campo vacio"})
    }
}

module.exports = {
    validar_datos_usuarios, 
    validar_datos_login,
    validar_datos_registro

}