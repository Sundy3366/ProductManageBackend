const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "商品名称不能少"],
        unique: true
    },
    price: {
        type: String,
        require: [true, "商品价格不能少"]
    },
    stock: {
        type: Number,
        min: [0, "库存不能小于0"],
        default: 0
    },
    category: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        require: [true, "商品分类不能少"]
    },
    description: String,
    isOnSale: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('product', schema);