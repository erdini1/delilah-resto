const { Address } = require('../modelsdb/address')
const { User, Op } = require('../modelsdb/users')
const { createAddress } = require('./address')

exports.createUser = async (user) => {
    const newUser = await User.create({ 
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: user.password,
        passwordConf: user.passwordConf
    })

    await createAddress(user.address, newUser.id)
    
    return newUser
}

exports.checkEmail = async (email) => {
    return await User.findOne({
        where: {
            email: email
        }
    })
}

exports.checkIdUser = async (id) => {
    return await User.findByPk(id)
}

exports.updateUser = async (idUser, admin) => {
    return await User.update({
        admin: admin
    }, {
        where: {
            id: idUser
        }
    })
}