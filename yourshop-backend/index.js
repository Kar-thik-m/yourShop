import express from "express";
import connectToDb from "./Database/Database.js";
import userRouter from "./Router/UserRouter.js";
import Itemrouter from "./Router/ItemsRouter.js";
import Whishrouter from "./Router/Wishlist.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import Addcartrouter from "./Router/AddCartRouter.js";
import Oderrouter from "./Router/OrderRouter.js";
import cors from "cors";

const app = express();


connectToDb();


app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const PORT = process.env.PORT || 5000;


cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});


app.use("/user", userRouter);
app.use("/item", Itemrouter);
app.use("/whishlist", Whishrouter);
app.use("/cart", Addcartrouter);
app.use("/order", Oderrouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
