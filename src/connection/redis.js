const {config} = require('../config')
const redis = require('redis')

exports.client = redis.createClient({
    host: config.redisConfig.host,
    port: config.redisConfig.port
})
