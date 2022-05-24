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

	// Update Product
	module.exports.updateProduct = (reqParams, reqBody) => {
		let updatedProduct = {
			name: reqBody.name,
			description: reqBody.description,
			price: reqBody.price
		};

		return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((product, error) => {
			if (error) {
				return false;
			} else {
				return {message: 'Update Failed'};
			}
		}).catch(error => error);
	};

	// Archiving a Product
	module.exports.archiveProduct = (reqParams) => {
		let updateActiveField = {
			isActive: false
		};

		return Product.findByIdAndUpdate(reqParams.productId, updateActiveField).then((product, error) => {
			if (error) {
				return {message: 'Archiving Product Failed'};
			} else {
				return {message: 'Product Successfully Archived'};
			}
		}).catch(error => error);
	};
