const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "商品id不能缺少"]
    },
    productName: {
        type: String,
        require: [true, "商品名称不能缺少"]
    },
    productPrice: {
        type: String,
        required: [true, "商品价格不能缺少"]
    },
    count: {
        type: Number,
        min: [1, "商品数量不能小于1"],
        require: [true, "商品数量不能为空"]
    },
    total: {
        type: String,
        required: [true, "商品总价不能为空"]
    },
    status: {
        type: Number,
        default: 0//订单状态 0 未付款 1 付款成功 2 取消订单
    },
    payTime: Date,
    cancelTime: Date,
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('order', schema);