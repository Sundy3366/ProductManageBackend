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
    let o = await orderService.addOrder(req.body);
    res.success(o);
});

module.exports = router;