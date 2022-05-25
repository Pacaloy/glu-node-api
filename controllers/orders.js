// [SECTION] Modules and Dependencies
	const User = require('./../models/User');
	const Product = require('./../models/Product');
	const Order = require('./../models/Order');
	const auth = require('./../auth');

// [SECTION] Functionalities
	// Create Order
	module.exports.createOrder = async (req, res) => {
		if (req.user.isAdmin) {
			return res.send({message: 'Action Forbidden'});
		}

		let isOrderAdded = await Product.findById(req.body.productId).then(product => {
			let newOrder = new Order({
				userId: req.user.id,
				totalAmount: req.body.quantity * product.price
			});

			newOrder.products.push(req.body);

			return newOrder.save().then(product => true).catch(error => error.message);

			if (isOrderAdded !== true) {
				return res.send({message: isOrderAdded});
			}
		});

		if (isOrderAdded) {
			return res.send({message: 'Order Added'});
		}
	};