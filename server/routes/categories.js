const express = require("express");
const categoryModel = require("../db/models/categoryModel");

const router = express.Router();

// GET /categories
router.get("/", async (req, res) => {
    try {
        const categories = await categoryModel.getAllCategories();
        res.json(categories);
    } catch (err) {
        console.error('Error retrieving categories:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// GET /categories/:id
router.get("/:id", async (req, res) => {
    try {
        const category = await categoryModel.getCategory(req.params.id);
        res.json(category);
    } catch (err) {
        console.error('Error retrieving category:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// POST /categories
router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const category = await categoryModel.createCategory(req.body);
        res.json(category);
    } catch (err) {
        console.error('Error creating category:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// PUT /categories/:id
router.put("/:id", async (req, res) => {
    try {
        const category = await categoryModel.updateCategory(req.params.id, req.body);
        res.json(category);
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// DELETE /categories/:id
router.delete("/:id", async (req, res) => {
    try {
        const category = await categoryModel.deleteCategory(req.params.id);
        res.json(category);
    } catch (err) {
        console.error('Error deleting category:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

module.exports = router;