const express = require("express");
const productModel = require("../db/models/productModel");

const router = express.Router();

// GET /products
router.get("/", async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (err) {
        console.error('Error retrieving products:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// GET /products/:id
router.get("/:id", async (req, res) => {
    try {
        const product = await productModel.getProduct(req.params.id);
        res.json(product);
    } catch (err) {
        console.error('Error retrieving product:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// POST /products
router.post("/", async (req, res) => {
    try {
        const product = await productModel.createProduct(req.body);
        res.json(product);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// PUT /products/:id
router.put("/:id", async (req, res) => {
    try {
        const product = await productModel.updateProduct(req.params.id, req.body);
        res.json(product);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// DELETE /products/:id
router.delete("/:id", async (req, res) => {
    try {
        const product = await productModel.deleteProduct(req.params.id);
        res.json(product);
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

module.exports = router;