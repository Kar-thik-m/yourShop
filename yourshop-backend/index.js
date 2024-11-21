import express from 'express';
import connectToDb from './Database/Database.js';
import userRouter from './Router/UserRouter.js';
import Itemrouter from './Router/ItemsRouter.js';
import Whishrouter from './Router/Wishlist.js';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import Addcartrouter from './Router/AddCartRouter.js';
import Oderrouter from './Router/OrderRouter.js';
import cors from 'cors';

const app = express();

// Connect to the database
connectToDb();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: 'https://yourshop-backend.onrender.com',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
   
  credentials: true,  
}));


cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});


app.use('/user', userRouter);
app.use('/item', Itemrouter);
app.use('/whishlist', Whishrouter);
app.use('/cart', Addcartrouter);
app.use('/order', Oderrouter);


app.get('/', (req, res) => {
  res.send('Hello World');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
