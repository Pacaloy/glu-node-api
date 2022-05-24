// [SECTION] Modules and Dependencies
	const express = require('express');
	const ProductController = require('./../controllers/products');
	const auth = require('./../auth');

// [SECTION] Routing Component
	const route = express.Router();

// [SECTION] Routes
	// Add Product
	route.post('/add', auth.verify, auth.verifyAdmin, (req, res) => {
		ProductController.addProduct(req.body).then(resultFromController => res.send(resultFromController));
	});

	// Retrieve All Active Courses
	route.get('/active', (req, res) => {
		ProductController.getAllActive().then(resultFromController => res.send(resultFromController));
	});

// [SECTION] Expose Route System
	module.exports = route;
