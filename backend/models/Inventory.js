import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now }
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
