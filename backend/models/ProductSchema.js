const  mongoose  = require("mongoose");

const productSchema = new mongoose.Schema({
  name:{
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
    enum: ["Anarkali", "Sharara Suits", "Indo Western", "Fusion wear", "Dress", "Co-ord sets"],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount:{
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    enum: ["XS","X", "L", "XL", "M"],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },

  collectionName:{
    type:String,
    enum: ["GulZaar", "Rangrez", "Noor Edits", "Rajwada riwaz", "Eid", "Karwa chauth", "Jashn E Rang", "Unveli Riwayat", "Co-ord sets","Diwali", "Anarkali", "sharara"],
    required: true,

  },

  isBestseller:{
    type: Boolean,
  },

  isExclusive:{
    type: Boolean,
  },

  isIshumStore:{
    type:Boolean,
  },

  availability: {
    type: Boolean,
    default: true, // Optional: default available
  },

}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = Product;