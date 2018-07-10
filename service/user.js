let User = require('../model/user');
let crypto = require('lxj-crypto');
let config = require("../config");

//登录
async function login(user) {
    user.password = crypto.sha256Hmac(user.password, user.username);
    let res = await User.findOne({
        username: user.username,
        password: user.password
    })
    if (!res) {
        throw Error("用户名或密码错误")
    }

    let tokenData = {
        username: user.username,
        expire: Date.now() + config.TokenExpire
    };
    let token = crypto.aesEncrypt(JSON.stringify(tokenData), config.TokenKey);
    return token;
}

//注册
async function register(user) {
    let res = User.findOne({username: user.username});
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

//获取用户信息
async function getUserInfo(user) {
    let res = await User.findOne({username: user.username});
    if (!res || res.n === 0) {
        throw Error("用户名不存在");
    }
    return res;
}

//删除用户
async function deleteByUsername(username) {
    await isUserExists(username);
    let res = await User.deleteOne({username: username});
    if (res < 1) {
        throw Error("删除失败");
    }
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

module.exports = {
    register, deleteByUsername, getUserInfo, login
}