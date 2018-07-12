const Category = require('../model/category');
const config = require('../config');

/**
 * 增加商品分类
 * @param category
 * @returns {Promise<void>}
 */
async function addCategory(category) {
    await Category.create(category);
}

/**
 * 删除分类
 * @param id
 * @returns {Promise<void>}
 */
async function deleteById(id) {
    await isIdExist(id);
    let res = await Category.deleteOne({_id: id});
    if (!res || res.n === 0) {
        throw Error("分类删除失败");
    }
}

/**
 * 更新分类
 * @param id
 * @param category
 * @returns {Promise<void>}
 */
async function updateCategory(id, category) {
    //判断id是否存在
    await isIdExist(id);
    let res = await Category.updateOne({_id: id}, category);
    if (!res || res.n === 0) {
        throw Error("更新分类失败");
    }
}

/**
 * 查询分类
 * @param id
 * @returns {Promise<*>}
 */
async function findById(id) {
    await isIdExist(id);
    return await Category.findOne({_id: id});
}

/**
 * 分页查询
 * @param page
 * @returns {Promise<void>}
 */
async function getCategoryByPage(page = 1) {
    let PageCount = config.PageCount;
    return await Category.find().skip(PageCount * (page - 1)).limit(PageCount).sort("created").select("-__v");
}

/**
 * 判断id是否存在
 * @param id
 * @returns {Promise<void>}
 */
async function isIdExist(id) {
    let one = await Category.findOne({_id: id});
    if (!one) {
        throw Error(`id为${id}的分类不存在`)
    }
}


module.exports = {
    addCategory, deleteById, updateCategory, findById, getCategoryByPage
};