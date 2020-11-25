const UserModel = require("../../model/User");
const log = require("../../utils/log");

/**
 * Return User Info without password
 * @param userId
 */
async function getUserInfo(userId) {
  try {
    const user = await UserModel.findById(userId).lean();
    delete user.password;
    return user;
  } catch (e) {
    log(e.message, "error");
  }
}

exports.getUserInfo = getUserInfo;
