const { createUser, checkEmail, updateUser, updateUserDisabled } = require('../repositories/users')
const JWT = require('jsonwebtoken')
const { config } = require('../config')
const sha256 = require('js-sha256')


exports.register = async (req, res) => {
    const body = req.body
    const passwordHash = sha256(body.password)
    const newUser = await createUser(body, passwordHash)
    res.status(201).json({"mensaje":`Usuario Creado con exito, su id es ${newUser.id}`})
}

exports.login = async (req, res) => {
    const {email, password} = req.body
    const passwordHash = sha256(password)
    const user = await checkEmail(email)
    if(user){
        const token = JWT.sign({user}, config.server.signature)
        if(user.password === passwordHash){
            res.status(200).json({
                msg: `Ingreso correctamente` , token: token
            })
        } else{
            res.status(400).json({msg: "La contraseña no coincide con el email"})
        }
    } else{
        res.status(400).json({msg: "El email no pertenece a ninguna cuenta"})
    }
}

exports.modifyUser = async (req, res) => {
    const idUser = parseInt(req.params.idUser)
    const body = req.body.admin
    await updateUser(idUser, body)
    res.status(200).json({msg: "Usuario modificado a admin"})
} 

exports.userDisabled = async (req, res) => {
    const idUser = parseInt(req.params.idUser)
    const disabled = req.body.disabled
    await updateUserDisabled(idUser, disabled)
    res.status(200).json({msg: `Ususario modificado`})
}
