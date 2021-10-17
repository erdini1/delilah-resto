const users = require('../models/users')
const { createUser, checkEmail } = require('../repositories/users')

exports.register = async (req, res) => {
    const body = req.body
    const newUser = await createUser(body)
    
    /* const newUser = req.body
    users.push(newUser) */

    res.status(201).json({"mensaje":`Usuario Creado con exito, su id es ${newUser.id}`})
}

exports.login = async (req, res) => {
    // const token = req.token
    const {email, password} = req.body
    const user = await checkEmail(email)
    if(user){
        if(user.password === password){
            res.status(200).json({                  //TERMINAR DE VER ESTO DE JWT
                msg: `Ingreso correctamente su id es: ${user.id}`/* ,
                token */
            })
        } else{
            res.status(400).json({msg: "La contraseña no coincide con el email"})
        }
    } else{
        res.status(400).json({msg: "El email no pertenece a ninguna cuenta"})
    }

}