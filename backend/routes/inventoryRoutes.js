import express from "express";
import Inventory from "../models/Inventory.js";

const router = express.Router();

// Get all inventory items with optional search
router.get("/", async (req, res) => {
    const { search, sortBy = 'productName', order = 'asc' } = req.query;
    try {
        let query = {};
        if (search) {
            query.productName = { $regex: search, $options: 'i' };
        }

        const sortOptions = {};
        sortOptions[sortBy] = order === 'asc' ? 1 : -1;

        const inventory = await Inventory.find(query).sort(sortOptions);
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new item with validation
router.post("/add", async (req, res) => {
    const { productName, quantity, price } = req.body;
    
    if (!productName || quantity === undefined || price === undefined) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newItem = new Inventory({ 
            productName, 
            quantity: Number(quantity), 
            price: Number(price) 
        });
        await newItem.save();
        res.status(201).json({ message: "Item added successfully", item: newItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an existing item
router.put("/update/:id", async (req, res) => {
    try {
        const { productName, quantity, price } = req.body;
        const updatedItem = await Inventory.findByIdAndUpdate(
            req.params.id, 
            { productName, quantity, price, lastUpdated: Date.now() }, 
            { new: true, runValidators: true }
        );
        
        if (!updatedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        
        res.json({ message: "Item updated", item: updatedItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an item
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
        
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        
        res.json({ message: "Item deleted", item: deletedItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;