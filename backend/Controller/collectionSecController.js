const CollectionSchema2 = require("../models/CollectionSchema2");

exports.getCollectionsSec = async (req, res) => {
    try {
        const collections = await CollectionSchema2.find();
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.addCollectionSec = async (req, res) => {
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
};
