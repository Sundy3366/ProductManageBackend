let crypto = require('lxj-crypto');
let config = require('../config');
let userService = require('../service/user');

//用来判断当前的用户是否是合法认证的用户
//从header中取token，如果没有，则直接拒绝
//如果有则对token进行解密，如果解密失败，则拒绝

/**
 * 判断url是否是排除检查的url
 * @param url
 */
function isExcludeUrl(url) {
    //需要排除token检查的url集合的正则
    let excludeUrls = [
        /.*\/user\/login/,
        /.*\/user\/register/
    ];

    //遍历数组，看当前的url是否存在其中
    let isExclude = false;
    excludeUrls.forEach(item => {
        if (item.test(url)) {
            isExclude = true;
        }
    });
}

module.exports = async (req, res, next) => {
    //判断当前的url是否需要token验证，登录和注册不需要token验证，因为这两种操作就是为了生成token的
    if (!isExcludeUrl(req.url)) {
        //1.从header中取出token
        let token = req.get('token');
        if (!token) {
            throw Error("缺少token");
        }

        let tokenData;
        //2.对token进行解密并转化为js对象，检查是否是伪造的token
        try {
            tokenData = JSON.parse(crypto.aesDecrypt(token, config.TokenKey));
        } catch (e) {
            throw Error("token无效");
        }

        //3.判断token是否过期
        if (tokenData.expire < Date.now()) {
            throw Error("token已过期，请重新登录");
        }

        //tokenData中存放的数据包括username和expire时间
        //从中取出username作为查询用户信息的条件
        let username = tokenData.username;
        let userInfo = await userService.getUserInfo(username);
        //给req对象安装一个userInfo变量，目的是为了给后面的中间件使用
        req.user = userInfo;
    }

    next();
};