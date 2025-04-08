const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const Collection = require("./models/CollectionSchema1");
const CollectionSchema2 = require("./models/CollectionSchema2");
const path = require("path");

const app = express();
const PORT = 4000;
const MONGO_URI = "mongodb+srv://harshrajput30411:IshumDatabasebyHarsh@ishum.tlzws.mongodb.net/?retryWrites=true&w=majority&appName=Ishum";


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));


// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


// Route to get collections
app.get("/collections", async (req, res) => {
    try {
        const collections = await Collection.find();
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Route to add a new collection
app.post("/collections", upload.single("image"), async (req, res) => {
    try {
        if (!req.file || !req.body.title) {
            return res.status(400).json({ message: "Title and Image are required" });
        }

        const newCollection = new Collection({
            title: req.body.title,
            image: `/uploads/${req.file.filename}` // Store relative path
        });

        await newCollection.save();
        res.status(201).json({ message: "Collection added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to add collection" });
    }
});


// Route to get collections
app.get("/collectionsSec", async (req, res) => {
    try {
        const collections = await CollectionSchema2.find();
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Route to add a new collection
app.post("/collectionsSec", upload.single("image"), async (req, res) => {
    try {
        if (!req.file || !req.body.title) {
            return res.status(400).json({ message: "Title and Image are required" });
        }

        const newCollection = new CollectionSchema2({
            title: req.body.title,
            image: `/uploads/${req.file.filename}` // Store relative path
        });

        await newCollection.save();
        res.status(201).json({ message: "Collection added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to add collection" });
    }
});



// User Registration
app.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });
        
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// User Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });
        
        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});


// app.post("/AddCards", upload.single("image"), async (req, res) => {
//     try {
//         const { name, description, category, price } = req.body;
//         const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

//         const newProduct = new Product({ name, description, category, price, image: imagePath });
//         await newProduct.save();

//         res.json({ success: true, message: "Product added successfully!" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// });




// app.get("/GetCards", async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json({ success: true, data: products });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// });

// // API to Delete Product
// app.delete("/DeleteCard/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await Product.findByIdAndDelete(id);
        
//         if (!result) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }

//         res.json({ success: true, message: "Product deleted successfully!" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// });



// // API to Edit Product
// app.put("/EditCard/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, description, category, price } = req.body;

//         const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, category, price }, { new: true });
//         res.json({ success: true, data: updatedProduct });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
