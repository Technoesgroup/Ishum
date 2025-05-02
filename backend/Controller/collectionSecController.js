const CollectionSchema2 = require("../models/CollectionSchema2");


exports.getCollectionsSec = async (req, res) => {
    try {
        const collections = await CollectionSchema2.find();
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// controllers/collectionController.js

exports.addCollectionSec = async (req, res) => {
    try {

        // console.log("BODY:", req.body);
        // console.log("FILE:", req.file);

        const { title } = req.body;
        const imagePath = "/uploads/" + req.file.filename;

        const newCollection = new CollectionSchema2({ title, image: imagePath });
        await newCollection.save();

        res.status(201).json({ message: "Collection 2 added successfully", newCollection });
    } catch (error) {
        console.error("Error in addCollectionSec:", error);
        res.status(500).json({ message: "Failed to add Collection 2" });
    }
};

