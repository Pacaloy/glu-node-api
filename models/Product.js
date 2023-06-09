// [SECTION] Modules and Dependencies
	const mongoose = require('mongoose');

// [SECTION] Schema/Blueprint
	const productSchema = new mongoose.Schema({
		name: {
			type: String,
			required: [true, 'Product Name is Required']
		},
		description: {
			type: String,
			required: [true, 'Product Description is Required']
		},
		price: {
			type: Number,
			required: [true, 'Price is Required']
		},
		imageLink: {
			type: String,
			required: [true, 'Product Image Link is Required']
		},
		isActive: {
			type: Boolean,
			default: true
		},
		createdOn: {
			type: Date,
			default: new Date()
		}
	});

// [SECTION] Model
	module.exports = mongoose.model('Product', productSchema);