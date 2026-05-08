import express from 'express';
import connectToDb from './Database/Database.js';
import userRouter from './Router/UserRouter.js';
import Itemrouter from './Router/ItemsRouter.js';
import Whishrouter from './Router/Wishlist.js';
import Addcartrouter from './Router/AddCartRouter.js';
import Oderrouter from './Router/OrderRouter.js';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import cors from 'cors';

const app = express();

// =======================
// DATABASE CONNECTION
// =======================
connectToDb();

// =======================
// CORS CONFIG (IMPORTANT - MUST BE FIRST)
// =======================
const allowedOrigins = [
  'https://yourshop01.netlify.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
}));


// =======================
// MIDDLEWARES
// =======================
app.use(express.json());
app.use(cookieParser());

// =======================
// CLOUDINARY CONFIG
// =======================
cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

// =======================
// ROUTES
// =======================
app.use('/user', userRouter);
app.use('/item', Itemrouter);
app.use('/whishlist', Whishrouter);
app.use('/cart', Addcartrouter);
app.use('/order', Oderrouter);

// =======================
// TEST ROUTE
// =======================
app.get('/', (req, res) => {
  res.send('Backend is running successfully');
});

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});