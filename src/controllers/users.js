const users = require('../models/users')

exports.register = (req, res) => {
    const newUser = req.body
    users.push(newUser)
    res.status(201).json({"mensaje":`Usuario Creado con exito, su id es ${newUser.id}`})
}

exports.login = (req, res) => {
    // const token = req.token
    res.status(200).json({                  //TERMINAR DE VER ESTO DE JWT
        msg: "Ingreso correctamente"/* ,
        token */
    })
}