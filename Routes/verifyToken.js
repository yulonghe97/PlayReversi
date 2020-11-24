const jwt = require("jsonwebtoken");
const redis = require("redis");
const RedisClient  = redis.createClient();
// check if the user has a token
// when a user log in, it has a token stored in the header
// can be used in private access to verify user
function auth(req, res, next) {
  // if it has a token
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({message: "AccessDenied", validToken: false});
  }
  RedisClient.get(token,(err,data)=>{
    if (err) throw err;
    if(data==null){
      return res.status(401).send({message: "Already logged out, must sign in again", validToken: false});
    }
  })
  /*
  RedisClient.get(token, function(err, reply) {
    if (!reply){
      return res.status(401).send({message: "Already logged out, must sign in again", validToken: false});
    }
  });
*/

  //verify that token
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({message: "AccessDenied", validToken: false});
  }
}

module.exports = auth;
