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

	// Retrieve All Products
	route.get('/all', (req, res) => {
		ProductController.getAllProducts().then(resultFromController => res.send(resultFromController));
	});

	// Retrieve All Active Products
	route.get('/active', (req, res) => {
		ProductController.getAllActive().then(resultFromController => res.send(resultFromController));
	});

	// Retrieve Specific Product
	route.get('/:productId', (req, res) => {
		ProductController.getProduct(req.params).then(resultFromController => res.send(resultFromController));
	});

	// Update a Product
	route.put('/:productId', auth.verify, auth.verifyAdmin, (req, res) => {
		ProductController.updateProduct(req.params, req.body).then(resultFromController => res.send(resultFromController));
	});

	// Archiving a Product
	route.put('/:productId/archive', auth.verify, auth.verifyAdmin, (req, res) => {
		ProductController.archiveProduct(req.params).then(resultFromController => res.send(resultFromController));
	});

	// Activating a Product
	route.put('/:productId/activate', auth.verify, auth.verifyAdmin, (req, res) => {
		ProductController.activateProduct(req.params).then(resultFromController => res.send(resultFromController));
	});

// [SECTION] Expose Route System
	module.exports = route;
