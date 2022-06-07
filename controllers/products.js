// [SECTION] Modules and Dependencies
	const Product = require('./../models/Product');

// [SECTION] Functionalities

	// Add Product
	module.exports.addProduct = (reqBody) => {
		let newProduct = new Product({
			name: reqBody.name,
			description: reqBody.description,
			price: reqBody.price,
			imageLink : reqBody.imageLink
		});

		return newProduct.save().then((product, error) => {
			if (error) {
				return {message: 'Adding of product failed'};
			} else {
				return product;
			}
		});
	};
	
	// Retrieve All Products
	module.exports.getAllProducts = () => {
		return Product.find({}).then(result => {
			return result;
		}).catch(error => error);
	};

	// Retrieve All Active Products
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

	// Update a Product
	module.exports.updateProduct = (reqParams, reqBody) => {
		let updatedProduct = {
			name: reqBody.name,
			description: reqBody.description,
			price: reqBody.price,
			imageLink: reqBody.imageLink
		};

		return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((product, error) => {
			if (error) {
				return false;
			} else {
				return {message: 'Product Updated'};
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

	// Activating a Product
	module.exports.activateProduct = (reqParams) => {
		let updateActiveField = {
			isActive: true
		};

		return Product.findByIdAndUpdate(reqParams.productId, updateActiveField).then((product, error) => {
			if (error) {
				return {message: 'Activating Product Failed'};
			} else {
				return {message: 'Product Successfully Activated'};
			}
		}).catch(error => error);
	};
