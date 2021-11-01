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

exports.checkIdAddress = async (id) => {
    return await Address.findOne({
        where: {
            id: id
        }
    })
}

exports.userAddress = async (user_id) => {
    return await Address.findOne({
        where: {
            user_id: user_id
        }
    })
}

// exports.checkUserAddress = async (user_id, address_id) => {
//     return await Address.findOne({
//         where: {
//             user_id: user_id,
//             address_id: address_id
//         }
//     })
// }
