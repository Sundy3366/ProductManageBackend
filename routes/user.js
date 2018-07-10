const router = require('express').Router();
const userService = require('../service/user');

/**
 * 获取用户信息
 */
router.get('/:username', async (req, res) => {
    let userInfo = await userService.getUserInfo(req.params.username);
    res.success(userInfo);
});

/**
 * 注册
 */
router.post('/register', async (req, res) => {
    await userService.register(req.body);
    res.success();
});

/**
 * 登录
 */
router.post('/login', async (req, res) => {
    let token = await userService.login(req.body);
    res.success({token});
});

/**
 * 删除用户
 */
router.delete('/:username', async (req, res) => {
    await userService.deleteByUsername(req.params.username);
    res.success();
});

module.exports = router;