const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const CollectionSec = mongoose.model("CollectionSec", collectionSchema);

module.exports = CollectionSec;