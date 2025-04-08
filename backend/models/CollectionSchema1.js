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

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
