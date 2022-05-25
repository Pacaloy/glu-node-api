// [SECTION] Modules and Dependencies
	const User = require('./../models/User');
	const Product = require('./../models/Product');
	const bcrypt = require('bcrypt');
	const dotenv = require('dotenv');
	const auth = require('./../auth');

// [SECTION] Environment Variables Setup
	dotenv.config();
	const salt = parseInt(process.env.SALT);

// [SECTION] Functionalities
	// Register New Account
	module.exports.registerUser = (reqBody) => {
		let newUser = new User({
			email: reqBody.email,
			password: bcrypt.hashSync(reqBody.password, salt)
		});

		return newUser.save().then((user, error) => {
			if (user) {
				return user;
			} else {
				return {message: 'Registration Failed'}
			}
		});
	};

	// User Login/Authentication
	module.exports.loginUser = (reqBody) => {
		return User.findOne({email: reqBody.email}).then(result => {
			if (result == null) {
				return {message: 'Invalid email or password'};
			} else {
				const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

				if (isPasswordCorrect) {
					return {accessToken: auth.createAccessToken(result.toObject())};
				} else {
					return {message: 'Invalid email or password'};
				}
			}
		});
	};

	// Create Order
	module.exports.createOrder = async (req, res) => {
		console.log(req.user)
		if (req.user.isAdmin) {
			return res.send({message: 'Action Forbidden'});
		}

		let isUserUpdated = await User.findById(req.user.id).then(user => {
			let newOrder = {
				productId: req.body.productId,
				quantity: req.body.quantity
			};

			let newOrders = {
				products: newOrder,
				totalAmount: req.body.quantity * Product.findById(req.body.productId).then(result => {
					console.log(result.price)
					return result.price;
				})
			};

			console.log(parseInt(newOrders.totalAmount))

			user.orders.push(newOrders);

			return user.save().then(user => true).catch(error => error.message);

			if (isUserUpdated !== true) {
				return res.send({message: isUserUpdated});
			}
		});

		let isProductUpdated = await Product.findById(req.body.productId).then(product => {
			let order = {
				orderId: req.user.id
			};

			product.orders.push(order);

			return product.save().then(product => true).catch(error => error.message);

			if (isProductUpdated !== true) {
				return res.send({message: isProductUpdated});
			}
		});

		if (isUserUpdated && isProductUpdated) {
			return res.send({message: 'Ordered Successfully'});
		}
	};