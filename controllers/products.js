// [SECTION] Modules and Dependencies
	const Product = require('./../models/Product');

// [SECTION] Functionalities
	// Add Product
	module.exports.addProduct = (reqBody) => {
		let newProduct = new Product({
			name: reqBody.name,
			description: reqBody.description,
			price: reqBody.price
		});

		return newProduct.save().then((product, error) => {
			if (error) {
				return {message: 'Adding of product failed'};
			} else {
				return product;
			}
		});
	};



