// [SECTION] Modules and Dependencies
	const express = require('express');
	const OrderController = require('./../controllers/orders');
	const auth = require('./../auth');

// [SECTION] Routing Component
	const route = express.Router();

// [SECTION] Routes
	// Create Order
	route.post('/createOrder', auth.verify, OrderController.createOrder);

	// Retrieve Orders
	route.get('/getOrders', auth.verify, OrderController.getOrders);

// [SECTION] Expose Route System
	module.exports = route;