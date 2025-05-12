
require("dotenv").config();
const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");
const collectionRoutes = require("./router/collectionRoutes");
const userRouter = require("./router/userLoginrouter");
const ProductRouter = require("./router/Productrouter");
const cartRouter = require("./router/Cartrouter");
const shippingRoutes = require("./router/Shippingrouter");
const reviewRoutes = require('./router/ReviewRoutes')
const Razorpay = require("razorpay");
const crypto = require("crypto");
const path = require("path");
const app = express();
const PORT = 4000;
const orderRoutes = require('./router/OrderRoutes');
const MONGO_URI = process.env.MONGO_URI;




app.use(cors({
    origin: 'https://ishum.in',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // if using cookies or sessions
  }));
  
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));


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
    const expectedSignature = crypto.createHmac("sha256", "FXqRgaBmdvJDjVzN28PAlgGl")
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        res.json({ status: "success", message: "Payment verified successfully" });
    } else {
        res.status(400).json({ status: "fail", message: "Invalid signature" });
    }
});



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
