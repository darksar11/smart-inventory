import express from "express";
import Inventory from "../models/Inventory.js";

const router = express.Router();

// Get all inventory items
router.get("/", async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new item
router.post("/add", async (req, res) => {
    const { productName, quantity, price } = req.body;
    try {
        const newItem = new Inventory({ productName, quantity, price });
        await newItem.save();
        res.json({ message: "Item added successfully", item: newItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an existing item
router.put("/update/:id", async (req, res) => {
    try {
        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Item updated", item: updatedItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an item
router.delete("/delete/:id", async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
