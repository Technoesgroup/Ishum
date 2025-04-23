const Cart = require('../models/Cart');
const Product = require('../models/ProductSchema');

// Add to Cart
exports.addToCart = async (req, res) => {
  const { userId, productId, size, color, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ userId });

    const newItem = {
      productId: product._id,
      title: product.name,
      image: product.image,
      price: product.price,
      size,
      color,
      quantity
    };

    if (!cart) {
      cart = new Cart({ userId, items: [newItem] });
    } else {
      const existingItem = cart.items.find(
        i => i.productId.toString() === productId && i.size === size && i.color === color
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push(newItem);
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove from Cart
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Remove item based on productId
    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save(); // Save updated cart
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.getCart = async (req, res) => {
    const { userId } = req.params;
    console.log("Fetching cart for user:", userId);  // ✅ check this shows up
  
    try {
      const cart = await Cart.findOne({ userId });
      console.log("Cart found:", cart); // ✅ log fetched cart
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      res.status(200).json({ cartItems: cart.items });
    } catch (err) {
      console.error("Cart fetch error:", err);
      res.status(500).json({ error: err.message });
    }
  };
  
  
  