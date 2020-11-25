const { func } = require("joi");
const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const getRedis = promisify(client.get).bind(client);
const delRedis = promisify(client.del).bind(client);


/**
 * 
 * @param {String} userId 
 * @param {String} sid 
 */
async function checkConnect(userId, sid) {
    const oldSid = await getRedis(userId);
    if(oldSid){
        // Set New Session Id, return the old one
        client.setex(userId, 86400, sid);
        return {exist: true, sid: oldSid};
    }else{
        // Set the New Session Id
        client.setex(userId, 86400, sid);
        return {exist: false};
    }
}

async function deleteSid(userId){
    await delRedis(userId);
}

exports.checkConnect = checkConnect;
exports.deleteSid = deleteSid;