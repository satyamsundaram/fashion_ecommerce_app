const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const subcategoryRoutes = require('./routes/subcategories');

const {createUsersTable} = require('./db/schemas/users');
const {createAddressesTable} = require('./db/schemas/addresses');
const {createCategoriesTable} = require('./db/schemas/categories');
const {createSubcategoriesTable} = require('./db/schemas/subcategories');
const {createProductsTable} = require('./db/schemas/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

createUsersTable().then(() => createAddressesTable());
createCategoriesTable().then(() => createSubcategoriesTable().then(() => createProductsTable()));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.use('/users', userRoutes);
app.use('/subcategories', subcategoryRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
