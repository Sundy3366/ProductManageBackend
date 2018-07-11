const Category = require('../model/category');

/**
 * 增加商品分类
 * @param category
 * @returns {Promise<void>}
 */
async function addCategory(category) {
    category.created = Date.now();
    await Category.create(category);
}

/**
 * 删除分类
 * @param id
 * @returns {Promise<void>}
 */
async function delteById(id) {
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
    let res = await Category.updateOne({_id: id}, category);
    if (!res || res.n === 0) {
        throw Error("更新分类失败")
    }
}

/**
 * 查询分类
 * @param id
 * @returns {Promise<*>}
 */
async function findById(id) {
    return await Category.findOne({_id: id});
}

module.exports = {
  addCategory,delteById,updateCategory,findById
};