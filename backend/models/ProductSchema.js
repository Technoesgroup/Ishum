const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Day Wear", "Occasional Wear", "Party Wear"],
    required: true,
  },
  subcategory: {
    type: String,
    enum: ["Anarkali", "Sharara Suits", "Indo Western", "Fashion wear", "Dress", "Co-ord sets", "Aline Suit", "Straight Suit"],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  thumbnails: {
    type: [String],
  },
colorImages: {
  type: [
    {
      image: { type: String, required: true },
      colorName: { type: String, required: true },
    }
  ],
  validate: {
    validator: function (arr) {
      return arr.length <= 20; // ya jitna tu max chaahe
    },
    message: "You can upload maximum 20 color images",
  },
  default: [],
},
 

  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    enum: ['40','38','42', '44',],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  collectionName: {
    type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection",
    required: true,
  },
  isBestseller: {
    type: Boolean,
  },
  isExclusive: {
    type: Boolean,
  },
  isIshumStore: {
    type: Boolean,
  },
  availability: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = Product;
