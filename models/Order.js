// [SECTION] Modules and Dependencies
	const mongoose = require('mongoose');

// [SECTION] Schema/Blueprint
	const orderSchema = new mongoose.Schema({
		userId: {
			type: String,
			required: [true, 'User ID is Required']
		},
		products: [
			{
				productId: {
					type: String,
					required: [true, 'Product ID is Required']
				},
				quantity: {
					type: Number,
					required: [true, 'Quantity is Required']
				}
			}
		],
		totalAmount: {
			type: Number,
			required: [true, 'Total Amount is Required']
		},
		isPaid: {
			type: Boolean,
			default: false
		},
		purchasedOn: {
			type: Date,
			default: new Date()
		}
	});

// [SECTION] Model
	module.exports = mongoose.model('Order', orderSchema);