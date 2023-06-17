const express = require("express");
const userModel = require("../db/models/userModel");

const router = express.Router();

// GET /users
router.get("/", async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// GET /users/:id
router.get("/:id", async (req, res) => {
    try {
        const user = await userModel.getUser(req.params.id);
        res.json(user);
    } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// POST /users
router.post("/", async (req, res) => {
    try {
        const user = await userModel.createUser(req.body);
        res.json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// PUT /users/:id
router.put("/:id", async (req, res) => {
    try {
        const user = await userModel.updateUser(req.params.id, req.body);
        res.json(user);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// DELETE /users/:id
router.delete("/:id", async (req, res) => {
    try {
        const user = await userModel.deleteUser(req.params.id);
        res.json(user);
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

module.exports = router;