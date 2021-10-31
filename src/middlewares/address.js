const { token } = require("../functions/token")

function validate_data_address (req, res, next) {
    const { address } = req.body
    if(address != undefined){
        next()
    } else {
        res.status(400).json({msg: "Tiene que ingresar una direccion"})
    }
}

function validate_id_user (req, res, next){
    const idUser = req.params.idUser
    let stringToken = req.headers.authorization
    const decoded = token(stringToken)
    if(decoded.id == idUser){
        next()
    } else {
        res.status(400).json({msg: "No puede puede modificar otro usuario que no sea el suyo"})
    }
}

module.exports = { 
    validate_data_address,
    validate_id_user
}