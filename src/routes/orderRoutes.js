const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/order', protect, createOrder);
router.get('/orders', protect, getOrders);

module.exports = router;
