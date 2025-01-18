const express = require('express');
// const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const route = require('./routes/testRoute');
const connectDB = require('./config/db');

const register = require('./routes/authRoutes');
const user = require('./routes/userRoutes');
const restarantRoutes = require('./routes/restaurantRoutes');
const category = require('./routes/categoryRoutes');
const food = require('./routes/foodRoutes');

dotenv.config();
// console.log(process.env.PORT);

//DB config
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//main route

app.use('/api/v1/test', route);
app.use('/api/v1', register);
app.use('/api/v1/user', user);
app.use('/api/v1/restaurant', restarantRoutes);
app.use('/api/v1/category', category);
app.use('/api/v1/food', food);

app.get('/', (req, res) => {
  return res.status(200).send('<h1>Welcome to the food server APP...</h1>');
});

app.all('*', (req, res) => {
  res.status(404).send({ success: false, message: 'Some Error Occured please check path' });
});
const PORT = process.env.PORT || 8080; //port

app.listen(PORT, () => console.log(`Node Server listening on ${PORT}`.white.bgRed));
