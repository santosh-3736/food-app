const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const {
  createCategoryController,
  getAllCategoriesController,
  deleteCategoryController,
  updateCategoryController,
} = require('../controller/categoryController');

const router = express.Router();

//CREATE CATEGORY
router.post('/create', authMiddleware, createCategoryController);

//GET CATEGORIES
router.get('/getAllCats', getAllCategoriesController);
router.get('/getAllCats/:id', getAllCategoriesController);

//Delete CATEGORIES
router.delete('/delete/:id', authMiddleware, deleteCategoryController);

//UPDATE CATEGORY
router.put('/update/:id', authMiddleware, updateCategoryController);
module.exports = router;
