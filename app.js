// [SECTION] Modules and Dependencies
	const express = require('express');
	const mongoose = require('mongoose');
	const cors = require('cors');
	const dotenv = require('dotenv');
	const userRoutes = require('./routes/users');
	const productRoutes = require('./routes/products');
	const orderRoutes = require('./routes/orders');

// [SECTION] Environment Setup
	dotenv.config();
	let link = process.env.CREDENTIALS;
	const port = process.env.PORT;

// [SECTION] Server Setup
	const app = express();
	app.use(express.json());
	app.use(cors());

// [SECTION] Database Connection
	mongoose.connect(link);
	const db = mongoose.connection;
	db.once('open', () => console.log('Connected to MongoDB'));

// [SECTION] Backend Routes
	app.use('/users', userRoutes);
	app.use('/products', productRoutes);
	app.use('/orders', orderRoutes);

// [SECTION] Server Gateway Response
	app.get('/', (req, res) => res.send('Capstone Project 2'));
	app.listen(port, () => console.log(`API is Hosted at port ${port}`));