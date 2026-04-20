const Collection = require("../models/CollectionSchema1");
const uploadToCloudinary = require("../Until/CloudinaryUpload");

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

    // 🔥 Cloudinary upload
    const result = await uploadToCloudinary(
      req.file.buffer,
      "collections"
    );

    const newCollection = new Collection({
      title: req.body.title,
      image: result.secure_url // ✅ Cloud URL
    });

    await newCollection.save();

    res.status(201).json({
      message: "Collection added successfully",
      collection: newCollection
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add collection" });
  }
};

exports.updateCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await Collection.findById(id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    if (req.body.title) {
      collection.title = req.body.title;
    }

    if (req.file) {
      // 🔥 new image upload
      const result = await uploadToCloudinary(
        req.file.buffer,
        "collections"
      );

      collection.image = result.secure_url;
    }

    await collection.save();

    res.status(200).json({
      message: "Collection updated successfully",
      collection
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update collection" });
  }
};
