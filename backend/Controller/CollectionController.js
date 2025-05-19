const Collection = require("../models/CollectionSchema1");
const fs = require('fs');
const path = require('path');

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
            image: `/uploads/${req.file.filename}`
        });

        await newCollection.save();
        res.status(201).json({ message: "Collection added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to add collection" });
    }
};

// ✅ New: Update/Edit Collection
exports.updateCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await Collection.findById(id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // Update title if provided
    if (req.body.title) {
      collection.title = req.body.title;
    }

    // Update image if new file is uploaded
    if (req.file) {
      // Delete old image from the server (optional)
      if (collection.image) {
        const oldImagePath = path.join(__dirname, '..', collection.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      collection.image = `/uploads/${req.file.filename}`;
    }

    await collection.save();
    res.status(200).json({ message: "Collection updated successfully", collection });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update collection" });
  }
};

