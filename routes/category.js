const categoryService = require('../service/category');
const router = require('express').Router();

/**
 * 添加分类
 */
router.post('/', async (req, res) => {
    await categoryService.addCategory(req.body);
    res.success();
});

/**
 * 删除分类
 */
router.delete('/:id', async (req, res) => {
    await categoryService.delteById(req.params.id);
    res.success();
});

/**
 * 修改分类
 */
router.put('/:id', async (req, res) => {
    await categoryService.updateCategory({_id: req.params.id}, req.body);
    res.success();
});

/**
 * 查询分类
 */
router.get('/:id', async (req, res) => {
    let category = await categoryService.findById({_id: req.params.id});
    res.success(category);
});

module.exports = router;