const jwt = require('jsonwebtoken');
const secret = 'CapstoneProject2';

module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {});
};

module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if (typeof token !== 'undefined') {
		token = token.slice(7, token.length);

		jwt.verify(token, secret, (error, decodedToken) => {
			if (error) {
				return res.send({
					auth: 'Failed',
					message: error.message
				});
			} else {
				req.user = decodedToken;
				
				next();
			}
		});
	} else {
		return res.send({auth: 'Failed. No token'});
	}
};

module.exports.verifyAdmin = (req, res, next) => {
	if (req.user.isAdmin) {
		next();
	} else {
		return res.send({
			auth: 'Failed',
			message: 'Action Forbidden'
		});
	}
}