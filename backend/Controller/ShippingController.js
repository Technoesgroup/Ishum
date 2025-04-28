const Shipping = require("../models/ShippingSchema");

const saveShipping = async (req, res) => {
    try {
        const newShipping = new Shipping(req.body);
        await newShipping.save();
        res.status(201).json(newShipping);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getShipping = async (req, res) => {
    try {
        const shipping = await Shipping.findOne({ userId: req.params.userId });
        if (!shipping) return res.status(404).json({ message: "Not found" });
        res.status(200).json(shipping);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateShipping = async (req, res) => {
    try {
        const updated = await Shipping.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    saveShipping,
    getShipping,
    updateShipping,
};

