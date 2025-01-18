const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createRestaurantController,
  getAllRestaurantsController,
  deleteRestaurantController,
} = require('../controller/restaurantController');

const router = express.Router();

// CREATE RESTAURANT
router.post('/create', authMiddleware, createRestaurantController);

//Get All Restaurants

router.get('/getAll', getAllRestaurantsController);
router.get('/getAll/:id', getAllRestaurantsController);

//Delete Restaurant
router.delete('/delete/:id', authMiddleware, deleteRestaurantController);
module.exports = router;
