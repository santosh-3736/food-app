const foodModal = require('../models/foodModal');
const { orderModel } = require('../models/orderModal');

//create food
const createFoodController = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(500).send({ success: false, message: 'title,description and price is required' });
    }
    const food = await foodModal.create({ title, description, price });
    return res.status(200).send({ success: true, message: 'Food Created Successfully!', food });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Some Error in Food Create API' });
  }
};

//get all foods
const getAllFoodsController = async (req, res) => {
  try {
    let foods;
    if (req.params.id) {
      foods = await foodModal.findById(req.params.id);
    } else {
      foods = await foodModal.find();
    }
    return res.status(200).send({ success: true, message: 'Foods Fetched', foods });
  } catch (error) {
    console.log(error);
    return res.status(200).send({ success: false, message: 'Some error in get All food API' });
  }
};

//Delete Food
const deleteFoodController = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).send({ success: false, message: 'Invalid Food ID' });
    }
    await foodModal.findByIdAndDelete(req.params.id);
    return res.status(204).send({ success: true, message: 'Food Deleted Successfully!' });
  } catch (error) {
    console.log(error);
    return res.status(200).send({ success: false, message: 'Some error in delete food API' });
  }
};

// Update Food
const updateFoodController = async (req, res) => {
  try {
    const { price } = req.body;
    const foodUpdate = await foodModal.findByIdAndUpdate(req.params.id);
    if (!foodUpdate) {
      return res.status(404).send({ success: false, message: 'Invalid Food ID' });
    }
    if (price) {
      foodUpdate.price = price;
    }
    foodUpdate.save();
    return res.status(202).send({ success: true, message: 'Updated Foods' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: true, message: 'Some error in food update API' });
  }
};

const createOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({ success: false, message: 'Please provide foods & buyer' });
    }
    let totalPrice = 0;
    cart.map((i) => {
      totalPrice += i.price;
    });
    const newOrder = new orderModel({
      foods: cart,
      payment: totalPrice,
      buyer: req.body.id,
    });
    await newOrder.save();
    return res.status(201).send({ success: true, message: 'Order Placed Successfully!', newOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: 'false', message: 'Error in create order controller' });
  }
};

const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({ success: false, message: 'Please provide valid order id' });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    return res.status(200).send({ success: true, message: 'Order Status Updated' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: 'false', message: 'Error in change order status controller' });
  }
};

const cancelOrderController = async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({ success: true, message: 'Order Cancelled Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Error in cancel order API' });
  }
};
module.exports = {
  createFoodController,
  getAllFoodsController,
  deleteFoodController,
  updateFoodController,
  createOrderController,
  orderStatusController,
  cancelOrderController,
};
