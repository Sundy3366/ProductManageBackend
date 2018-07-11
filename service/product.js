const Product = require('../model/product');

/**
 * 添加商品
 * @param product
 * @returns {Promise<void>}
 */
async function addProduct(product) {
    product.created = Date.now();
    await Product.create(product);
}

/**
 * 删除商品
 * @param id
 * @returns {Promise<void>}
 */
async function deleteById(id) {
    let res = await Product.deleteOne({_id: id});
    if (!res || res.n === 0) {
        throw Error("商品删除失败");
    }
}

/**
 * 更新商品
 * @param id
 * @param product
 * @returns {Promise<void>}
 */
async function updateProduct(id, product) {
    let res = await Product.updateOne({_id: id}, product);
    if (!res || res.n === 0) {
        throw Error("商品更新失败");
    }
}

/**
 * 查询商品
 * @param id
 * @returns {Promise<*>}
 */
async function findById(id) {
    let res = await Product.findOne({_id: id});
    return res;
}

module.exports = {
    addProduct,
    deleteById,
    updateProduct,
    findById
};