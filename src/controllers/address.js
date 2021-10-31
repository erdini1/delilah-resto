const { getAllAddressesUser, createAddress } = require("../repositories/address")

exports.getAddressUser = async (req, res) => {
    const idUser = req.params.idUser
    const address = await getAllAddressesUser(idUser)
    res.status(200).json({Direcciones: address})
}

exports.newAddress = async (req, res) => {
    const idUser = req.params.idUser
    const body = req.body
    await createAddress(body.address, idUser)
    res.status(201).json({msg: "Direccion agregada con exito"})
}