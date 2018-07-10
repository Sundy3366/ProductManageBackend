let User = require('../model/user');
let crypto = require('lxj-crypto');
let config = require("../config");

/**
 * 登录
 * @param user
 * @returns {Promise<void>}
 */
async function login(user) {
    //对用户名进行加密
    user.password = crypto.sha256Hmac(user.password, user.username);
    //根据用户名和密码查询用户
    let res = await User.findOne({
        username: user.username,
        password: user.password
    });
    //如果不存在该用户，说明用户名或密码错误
    if (!res) {
        throw Error("用户名或密码错误")
    }
    //如果存在就返回一个token
    let tokenData = {
        username: user.username,
        expire: Date.now() + config.TokenExpire
    };
    let token = crypto.aesEncrypt(JSON.stringify(tokenData), config.TokenKey);
    return token;
}

/**
 * 注册
 * @param user
 * @returns {Promise<void>}
 */
async function register(user) {
    //判断用户名是否存在
    let res = await User.findOne({username: user.username});
    if (res) {
        throw Error(`用户${user.username}已存在`);
    }
    //密码加密
    user.password = crypto.sha256Hmac(user.password, user.username);
    //设置默认角色，默认是商家用户
    user.role = 0;
    user.created = Date.now();
    await User.create(user);
}

/**
 * 根据用户名获取用户信息
 * @param user
 * @returns {Promise<*>}
 */
async function getUserInfo(username) {
    let res = await User.findOne({username: username});
    if (!res || res.n === 0) {
        throw Error(`用户名${username}不存在`);
    }
    return res;
}

/**
 * 根据用户名删除用户
 * @param username
 * @returns {Promise<void>}
 */
async function deleteByUsername(username) {
    await isUserExists(username);
    let res = await User.deleteOne({username: username});
    if (res < 1) {
        throw Error("删除失败");
    }
}

async function deeteById(id) {

}

/**
 * 验证用户名是否存在
 * @param username
 * @returns {Promise<void>}
 */
async function isUserExists(username) {
    let res = await User.findOne({username: username});
    if (!res || res.n === 0) {
        throw Error("用户名不存在");
    }
}

/**
 * 根据id验证用户是否存在
 * @param id
 * @returns {Promise<void>}
 */
async function isUserExists(id) {
    let res = await User.findOne({_id: id});
    if (!res || res.n === 0) {
        throw Error("id不存在");
    }
}

module.exports = {
    register, deleteByUsername, getUserInfo, login
};