let usuarios = require('../models/usuarios')

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
    if(req.body.email != undefined && req.body.contrasenia != undefined){
        const usuarioEmail = usuarios.find(elemento => elemento.email === req.body.email)
        const usuarioContrasenia = usuarios.find(elemento => elemento.contrasenia === req.body.contrasenia)
        indexUsuarioEmail = usuarios.indexOf(usuarioEmail)
        indexUsuarioContrasenia = usuarios.indexOf(usuarioContrasenia)


        if(!usuarioEmail){
            res.status(400).json({"mensaje":"No hay ninguna cuenta con ese email"})
            return
        } else{
            if(indexUsuarioEmail != indexUsuarioContrasenia){
                res.status(400).json({"mensaje":"La contraseña no coincide con el usuario"})
                return
            }
        } 
        req.emailUsuario = usuarioEmail
        next()
    }
    
}

module.exports = {
    validar_datos_usuarios, 
    validar_datos_login,
    validar_datos_registro

}