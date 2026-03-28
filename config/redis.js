const redis = require('redis')

const redisClient = redis.createClient({
    username: 'default',
    password: 'aC0oq2WeU9oBRFjpXHd9GNCxr0MLjzWh',
    socket: {
        host: 'redis-18716.crce217.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 18716
    }
});

module.exports = redisClient; 