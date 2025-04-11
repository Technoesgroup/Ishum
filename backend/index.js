const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const Collection = require("./models/CollectionSchema1");
const CollectionSchema2 = require("./models/CollectionSchema2");
const userRouter = require("./router/userLoginrouter");
const ProductRouter = require("./router/Productrouter");
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


app.use("/api/user", userRouter); 
app.use("/api/products", ProductRouter); 
 







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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
