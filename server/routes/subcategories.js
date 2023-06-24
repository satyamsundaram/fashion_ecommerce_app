const express = require("express");
const subcategoryModel = require("../db/models/subcategoryModel");

const router = express.Router();

// GET /subcategories
router.get("/", async (req, res) => {
    try {
        const subcategories = await subcategoryModel.getAllSubcategories();
        res.json(subcategories);
    } catch (err) {
        console.error('Error retrieving subcategories:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// GET /subcategories/:id
router.get("/:id", async (req, res) => {
    try {
        const subcategory = await subcategoryModel.getSubcategory(req.params.id);
        res.json(subcategory);
    } catch (err) {
        console.error('Error retrieving subcategory:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// POST /subcategories
router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const subcategory = await subcategoryModel.createSubcategory(req.body);
        res.json(subcategory);
    } catch (err) {
        console.error('Error creating subcategory:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// PUT /subcategories/:id
router.put("/:id", async (req, res) => {
    try {
        const subcategory = await subcategoryModel.updateSubcategory(req.params.id, req.body);
        res.json(subcategory);
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// DELETE /subcategories/:id
router.delete("/:id", async (req, res) => {
    try {
        const subcategory = await subcategoryModel.deleteSubcategory(req.params.id);
        res.json(subcategory);
    } catch (err) {
        console.error('Error deleting subcategory:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

module.exports = router;