const Product = require('../model/product');

/**
 * 添加商品
 * @param product
 * @returns {Promise<void>}
 */
async function addProduct(product) {
    return await Product.create(product);
}

/**
 * 删除商品
 * @param id
 * @returns {Promise<void>}
 */
async function deleteById(id) {
    await isIdExist(id);
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
    await isIdExist(id);
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
    await isIdExist(id);
    let res = await Product.findOne({_id: id});
    return res;
}

/**
 * 分页查询
 * @param page
 * @returns {Promise<void>}
 */
async function getProductsByPage(page = 1) {
    let pageCount = require('../config').PageCount;
    return await Product.find().skip((page - 1) * pageCount).limit(pageCount).sort("created").select("-__v");
}

/**
 * 判断id是否存在
 * @param id
 * @returns {Promise<void>}
 */
async function isIdExist(id) {
    let p = await Product.findOne({_id: id});
    if (!p || p.n === 0) {
        throw Error(`id为${id}的商品不存在`);
    }
}

module.exports = {
    addProduct,
    deleteById,
    updateProduct,
    findById,
    getProductsByPage
};