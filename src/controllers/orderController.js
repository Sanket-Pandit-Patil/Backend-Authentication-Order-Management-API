const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/order
// @access  Private
const createOrder = async (req, res) => {
    const { product_name, quantity } = req.body;

    if (!product_name || !quantity) {
        return res.status(400).json({ message: 'Please add product name and quantity' });
    }

    try {
        const order = await Order.create({
            user: req.user.id,
            product_name,
            quantity,
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
};
