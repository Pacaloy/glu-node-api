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

	// Retrieve All Orders
	route.get('/getAllOrders', auth.verify, auth.verifyAdmin, (req, res) => {
		OrderController.getAllOrders().then(resultFromController => res.send(resultFromController));
	});

	// Cancel Order
	route.delete('/:orderId', auth.verify, (req, res) => {
		OrderController.deleteOrder(req.params).then(resultFromController => res.send(resultFromController));
	});

	// Checkout
	route.put('/checkout', auth.verify, (req, res) => {
		OrderController.checkoutOrders(req.user).then(resultFromController => res.send(resultFromController));
	});

	// Retrieve User's Order History
	route.get('/history', auth.verify, (req, res) => {
		OrderController.orderHistory(req.user).then(resultFromController => res.send(resultFromController));
	});

// [SECTION] Expose Route System
	module.exports = route;