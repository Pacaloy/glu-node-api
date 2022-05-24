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

	// Retrieve All Active Courses
	module.exports.getAllActive = () => {
		return Product.find({isActive: true}).then(result => {
			return result;
		}).catch(error => error);
	};

	// Retrieve Specific Product
	module.exports.getProduct = (reqParams) => {
		return Product.findById(reqParams.productId).then(result => {
			return result;
		}).catch(error => error);
	};


