const Collection = require("../models/CollectionSchema1");

exports.getCollections = async (req, res) => {
    try {
        const collections = await Collection.find();
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.addCollection = async (req, res) => {
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
};
