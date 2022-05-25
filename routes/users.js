// [SECTION] Modules and Dependencies
	const express = require('express');
	const UserController = require('./../controllers/users');
	const auth = require('./../auth');

// [SECTION] Routing Component
	const route = express.Router();

// [SECTION] Routes
	// User Registration
	route.post('/register', (req, res) => {
		UserController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
	});

	// User Login
	route.post('/login', (req, res) => {
		UserController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
	});

	// Set User as Admin
	route.put('/:setAdmin', auth.verify, auth.verifyAdmin, (req, res) => {
		UserController.setAdmin(req.params).then(resultFromController => res.send(resultFromController));
	});

// [SECTION] Expose Route System
	module.exports = route;