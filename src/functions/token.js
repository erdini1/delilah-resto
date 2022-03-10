const { config } = require('../config')
const jwt = require('jsonwebtoken')

exports.token = (string) => {
    let stringToken = string
    const token = stringToken.split(" ")[1]
    const decoded = jwt.verify(token, config.server.signature)
    return decoded.user
}