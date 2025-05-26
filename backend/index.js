require('dotenv').config(); 

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const collectionRoutes = require("./router/collectionRoutes");
const userRouter = require("./router/userLoginrouter");
const ProductRouter = require("./router/Productrouter");
const cartRouter = require("./router/Cartrouter");
const shippingRoutes = require("./router/Shippingrouter");
const reviewRoutes = require('./router/ReviewRoutes')
const compression = require("compression");
const Razorpay = require("razorpay");
const wishlistRoutes =  require("./router/WishlistRoutes");
const crypto = require("crypto");
const path = require("path");
const app = express();
const PORT = 4000;
const orderRoutes = require('./router/OrderRoutes');
const MONGO_URI = process.env.MONGO_URI;



const allowedOrigins = [
  'https://www.ishum.in',
  'https://ishum.in',
  // 'https://ishum-frontend.onrender.com',   
  'http://localhost:5173',
  'http://localhost:5174',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS Error: Not allowed =>", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(compression()); // for gzip compression

app.use("/uploads", express.static("uploads", {
  maxAge: '7d' // cache images for 7 days
}));

// console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,   // Replace with your Razorpay key_secret
});

// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));




app.use("/api/user", userRouter); 
app.use("/api", collectionRoutes);
app.use("/api/products", ProductRouter); 
app.use("/api/cart", cartRouter); 
app.use("/api/shipping", shippingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api', reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Create order
app.post("/create-order", async (req, res) => {
    const { amount, currency = "INR", receipt = "receipt#1" } = req.body;

    try {
        const options = {
            amount: amount * 100, // amount in paisa
            currency,
            receipt,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Verify payment
app.post("/verify-payment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        res.json({ status: "success", message: "Payment verified successfully" });
    } else {
        res.status(400).json({ status: "fail", message: "Invalid signature" });
    }
});




app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
