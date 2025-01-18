const restaurantModel = require('../models/restaurantModel');

//Creation of Restaurant
const createRestaurantController = async (req, res) => {
  try {
    const { title, imageUrl, food, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } =
      req.body;

    //check if title is there or not
    if (!title || !coords) {
      return res.status(500).send({ success: false, message: 'Please provide title/coords of restaurant' });
    }

    const newRestaurant = await restaurantModel.create({
      title,
      imageUrl,
      food,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    return res.status(201).send({ success: true, message: `${newRestaurant.title} Restaurant Cretaed Successfully!` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'Error in Restaurant create API' });
  }
};

const getAllRestaurantsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const restaurants = await restaurantModel.findById(id);
      if (!restaurants) {
        return res.status(404).send({ success: false, message: 'Restaurant not found' });
      }
      return res.status(200).send({ success: true, restaurants });
    }
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({ success: false, message: 'No restaurant Available' });
    }
    return res.status(200).send({ success: true, length: restaurants.length, restaurants });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Error in get all restaurant API' });
  }
};

const deleteRestaurantController = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await restaurantModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(500).send({ success: false, message: 'Please Enter Valid ID' });
    }
    return res.status(200).send({ success: true, message: `${deleted.title} has been deleted successfully...` });
  } catch (error) {
    console.log(error);
    return res.status(404).send({ success: false, message: 'Some Error in delete Restaurant API' });
  } finally {
    console.log('We invoked delete API ');
  }
};
module.exports = { createRestaurantController, getAllRestaurantsController, deleteRestaurantController };
