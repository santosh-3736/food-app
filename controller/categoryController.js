//CREATE CATEGORY

const categoryModel = require('../models/categoryModel');

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
      return res.status(500).send({ success: false, message: 'Please provide title for category' });
    }
    const category = await categoryModel.create({ title, imageUrl });
    return res.status(201).send({ success: true, message: 'Category Created SUccessfully!', category });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error occured in Category create API',
    });
  }
};

const getAllCategoriesController = async (req, res) => {
  try {
    const { id } = req.params;
    let allCategories;
    if (!id) {
      allCategories = await categoryModel.find({});
    } else {
      //   allCategories = await categoryModel.findById(id);
      allCategories = await categoryModel.find({ _id: id });
    }
    if (!allCategories) {
      return res.status(404).send({ success: false, message: 'No Category Found' });
    }
    return res
      .status(200)
      .send({ success: true, length: allCategories.length, message: 'Fetched all categories', allCategories });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'Some ERROR occured in get cat API' });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send({ success: false, message: 'No category found' });
    }
    return res.status(200).send({ success: true, message: 'category deleted' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Some ERROR occured in delete cat API' });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;
    const category = await categoryModel.findByIdAndUpdate(id);
    if (!category) {
      return res.status(404).send({ success: false, message: 'No category found' });
    }
    category.imageUrl = imageUrl;
    category.save();
    return res.status(200).send({ success: true, message: 'category updated' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Some ERROR occured in update cat API' });
  }
};
module.exports = {
  createCategoryController,
  getAllCategoriesController,
  deleteCategoryController,
  updateCategoryController,
};
