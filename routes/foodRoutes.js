const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createFoodController,
  getAllFoodsController,
  deleteFoodController,
  updateFoodController,
  createOrderController,
  orderStatusController,
  cancelOrderController,
} = require('../controller/foodController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const clientMiddleware = require('../middlewares/clientMiddleware');

const router = express.Router();

//CREATE FOOD
router.post('/create', authMiddleware, createFoodController);

//GET ALL FOODS
router.get('/getAll', getAllFoodsController);
router.get('/getAll/:id', getAllFoodsController);

//DELETE FOODS
router.delete('/delete/:id', authMiddleware, deleteFoodController);

//UPDATE FOODS
router.put('/update/:id', authMiddleware, updateFoodController);

//ORDERS
//plcae order
router.post('/placeOrder', authMiddleware, createOrderController);

//ORDER STATUS
router.post('/orderStatus/:id', authMiddleware, adminMiddleware, orderStatusController);

router.delete('/cancelOrder/:id', authMiddleware, clientMiddleware, cancelOrderController);
module.exports = router;
