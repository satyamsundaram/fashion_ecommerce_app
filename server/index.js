const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const subcategoryRoutes = require('./routes/subcategories');

const {createUsersTable} = require('./db/schemas/users');
const {createUserAddressesTable} = require('./db/schemas/userAddresses');
const {createUserPhoneNumbersTable} = require('./db/schemas/userPhoneNumbers');
const {createCartItemsTable} = require('./db/schemas/cartItems');

const {createCategoriesTable} = require('./db/schemas/categories');
const {createSubcategoriesTable} = require('./db/schemas/subcategories');
const {createProductsTable} = require('./db/schemas/products');
const {createProductImagesTable} = require('./db/schemas/productImages');

const {createOrdersTable} = require('./db/schemas/orders');
const {createOrderItemsTable} = require('./db/schemas/orderItems');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

async function createTables() {
  try {
    await createUsersTable();
    await createUserAddressesTable();
    await createUserPhoneNumbersTable();

    await createCategoriesTable();
    await createSubcategoriesTable();
    await createProductsTable();
    await createProductImagesTable();
    await createCartItemsTable();

    await createOrdersTable();
    await createOrderItemsTable();
    
    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

createTables();


// Routes
app.get('/', (req, res) => {
  res.send('The API is up and running!');
})
app.use('/users', userRoutes);
app.use('/subcategories', subcategoryRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
