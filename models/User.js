// [SECTION] Modules and Dependencies
	const mongoose = require('mongoose');

// [SECTION] Schema/Blueprint
	const userSchema = new mongoose.Schema({
		email: {
			type: String,
			required: [true, 'Email is Required']
		},
		password: {
			type: String,
			required: [true, 'Password is Required']
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		orders: [
			{
				products: [
					{
						productName: {
							type: String,
							required: [true, 'Product Name is Required']
						},
						quantity: {
							type: Number,
							required: [true, 'Product Quantity is Required']
						}
					}
				],
				totalAmount: {
					type: Number,
					required: [true, 'Total Amount is Required']
				},
				purchasedOn: {
					type: Date,
					default: new Date()
				}
			}
		]
	});

// [SECTION] Model
	module.exports = mongoose.model('User', userSchema);