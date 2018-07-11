const Order = require('../model/order');
const productService = require('../service/product');
const Big = require('big.js')

/**
 * 添加订单
 * @param order
 * @returns {Promise<void>}
 */
async function addOrder(order) {
    //1.根据商品的id查询商品
    let product = await productService.findById(order.productId);
    if (!product) {
        throw Error("商品不存在");
    }
    //判断库存是否足够
    if (product.stock < order.count) {
        throw Error("商品库存不够");
    }

    order.productName = product.name;
    order.productPrice = product.price;
    order.total = Big(order.productPrice).times(order.count);
    order.created = Date.now();
    await order.create(order);

    //2.减去库存
    let update = {
        stock: product.stock - order.count
    };
    await productService.updateProduct(order.productId, update);
}

/**
 * 查询订单
 * @param id
 * @returns {Promise<*>}
 */
async function getOrderById(id) {
    let order = await Order.findOne({_id: id});
    return order;
}

/**
 * 更新订单
 * @param id
 * @param order
 * @returns {Promise<void>}
 */
function update(id, order) {
    let res = Order.updateOne({_id: id}, order)
    if (!res || res.n === 0) {
        throw Error("订单更新失败");
    }
}

/**
 * 取消订单
 * @param id
 * @returns {Promise<void>}
 */
async function setOrderCancel(id) {
    let order = await getOrderById(id);
    order.status = 2;
    order.cancelTime = Date.now();
    await update(id, order);
}

/**
 * 支付订单
 * @param id
 * @returns {Promise<void>}
 */
async function setOrderSuccess(id) {
    let order = await getOrderById(id);
    order.status = 1;
    order.payTime = Date.now();
    await update(id, order);
}

module.exports = {
    addOrder, setOrderCancel, setOrderSuccess, getOrderById
};