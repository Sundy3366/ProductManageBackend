const orderService = require('../service/order');
const router = require('express').Router();

/**
 * 查询订单
 */
router.get("/:id", async (req, res) => {
    let order = await orderService.getOrderById(req.params.id);
    res.success(order);
});

/**
 * 添加订单
 */
router.post('/', async (req, res) => {
    await orderService.addOrder(req.body);
    res.success();
});

module.exports = router;