const { Address } = require("../modelsdb/address");

exports.createAddress = async (address, user_id) => {
    return await Address.create({
        address: address,
        user_id: user_id
    })
}

exports.getAllAddressesUser = async (user_id) => {
    return await Address.findAll({
        where: {
            user_id: user_id
        }
    })
}