const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');

const {createUsersTable} = require('./db/schemas/users');
const {createAddressesTable} = require('./db/schemas/addresses');
const {createCategoriesTable} = require('./db/schemas/categories');
const {createProductsTable} = require('./db/schemas/products');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

createUsersTable().then(() => createAddressesTable());
createCategoriesTable().then(() => createProductsTable());

// Routes
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
