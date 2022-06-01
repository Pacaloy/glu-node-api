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

	// Set User as Admin
	module.exports.setAdmin = (reqParams) => {
		let updateAdmin = {
			isAdmin: true
		}

		return User.findByIdAndUpdate(reqParams.setAdmin, updateAdmin).then((user, error) => {
			if (error) {
				return {message: 'Action Failed'};
			} else {
				return {message: 'User Set as Admin'};
			}
		}).catch(error => error);
	};

	// Get the User's Details
	module.exports.getProfile = (data) => {
		return User.findById(data).then(result => {
			result.password = '';
			return result;
		});
	};