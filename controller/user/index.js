const UserModel = require("../../model/User");
const log = require("../../utils/log");

/**
 * Return User Info without password
 * @param {String} userId
 * @return {Object} user
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

/**
 * Return number of users
 * @return {Number} numberUsers
 */
async function countUsers() {
  try {
    const count = await UserModel.count();
    return count;
  } catch (e) {
    throw new Error('Failed to get user count');
  }
}

exports.getUserInfo = getUserInfo;
exports.countUsers = countUsers;
