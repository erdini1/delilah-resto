const { User, Op } = require('../modelsdb/users')

exports.createUser = async (user) => {
    return await User.create({ 
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        password: user.password,
        passwordConf: user.passwordConf
    })
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