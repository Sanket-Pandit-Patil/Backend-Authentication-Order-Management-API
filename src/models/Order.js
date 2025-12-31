const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    product_name: {
        type: String,
        required: [true, 'Please add a product name'],
    },
    quantity: {
        type: Number,
        required: [true, 'Please add a quantity'],
        min: 1,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
