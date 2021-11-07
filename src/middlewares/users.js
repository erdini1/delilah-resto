const { token } = require('../functions/token')
const { checkEmail, checkIdUser } = require('../repositories/users')

async function validate_data_register(req, res, next){
    const { username, firstName, lastName, email, phone, address, password, passwordConf } = req.body
    if(username != undefined && firstName != undefined && lastName != undefined && email != undefined && phone != undefined && address != undefined && password != undefined && passwordConf != undefined){
        const user = await checkEmail(email)
        if(!user){
            if(password === passwordConf){
                next()
            } else{
                res.status(400).json({msg: "Las contraseñas no coinciden"})
            }
        } else{
            res.status(422).json({msg: "El email ya se encuentra en uso"})
        }
    }else{
        res.status(400).json({msg: "Tiene que ingresar todos los datos para poder registrarse"})
    }
} 

async function validate_data_login(req, res, next){
    const { email, password } = req.body
    if(email != undefined && password != undefined) {
        next()
    } else{
        res.status(400).json({msg: "No puede dejar ningun campo vacio"})
    }
}

async function verify_disabled(req, res, next){
    // const idUser = req.params.idUser
    let stringToken = req.headers.authorization
    const decoded = token(stringToken)
    try{
        const findUser = await checkIdUser(decoded.id)
        if(findUser.disabled === false){
            next()
        } else{
            res.status(403).json({"mensaje":"Su usuario se encuentra deshabilitado"})
        }
    } catch(error){
        res.status(400).json({msg: error})
    }
    
}




module.exports = {
    validate_data_register,
    validate_data_login,
    verify_disabled
}