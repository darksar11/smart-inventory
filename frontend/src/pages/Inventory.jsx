import React, { useState, useEffect } from "react";
import { getInventory, addProduct, deleteProduct, updateProduct } from "../api";
import { 
    TableContainer, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody, 
    Paper, 
    Button, 
    TextField, 
    Typography, 
    Box, 
    Modal 
} from "@mui/material";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ productName: "", quantity: "", price: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [editProduct, setEditProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getInventory();
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const handleAddProduct = async () => {
        try {
            if (!newProduct.productName || !newProduct.quantity || !newProduct.price) {
                alert("Please fill in all fields.");
                return;
            }
            await addProduct(newProduct);
            setNewProduct({ productName: "", quantity: "", price: "" });
            fetchProducts();
        } catch (error) {
            console.error("Error adding product", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    const handleEditProduct = async () => {
        try {
            if (!editProduct.productName || !editProduct.quantity || !editProduct.price) {
                alert("Please fill in all fields.");
                return;
            }
            await updateProduct(editProduct._id, editProduct);
            setEditProduct(null);
            setIsModalOpen(false);
            fetchProducts();
        } catch (error) {
            console.error("Error updating product", error);
        }
    };

    const lowStockThreshold = 10;

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Inventory Management
            </Typography>

            {/* Product Input Fields */}
            <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                <TextField
                    label="Product Name"
                    value={newProduct.productName}
                    onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                />
                <TextField
                    type="number"
                    label="Quantity"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                />
                <TextField
                    type="number"
                    label="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleAddProduct}
                >
                    Add Product
                </Button>
            </Box>

            {/* Search Bar */}
            <TextField
                fullWidth
                label="Search Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 3 }}
            />

            {/* Inventory Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .filter(product => product.productName.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((product) => (
                                <TableRow 
                                    key={product._id}
                                    sx={{ 
                                        backgroundColor: product.quantity < lowStockThreshold 
                                            ? 'rgba(255, 0, 0, 0.1)' 
                                            : 'inherit' 
                                    }}
                                >
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell 
                                        align="right" 
                                        sx={{ 
                                            color: product.quantity < lowStockThreshold 
                                                ? 'red' 
                                                : 'inherit' 
                                        }}
                                    >
                                        {product.quantity}
                                    </TableCell>
                                    <TableCell align="right">₹{product.price}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() => {
                                                setEditProduct(product);
                                                setIsModalOpen(true);
                                            }}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDeleteProduct(product._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Modal */}
            {isModalOpen && (
                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}>
                        <Box sx={{
                            width: "90vw",
                            maxWidth: "400px",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2
                        }}>
                            <Typography variant="h6" mb={2}>Edit Product</Typography>
                            <TextField
                                fullWidth
                                label="Product Name"
                                value={editProduct?.productName || ""}
                                onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value })}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                type="number"
                                label="Quantity"
                                value={editProduct?.quantity || ""}
                                onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                type="number"
                                label="Price"
                                value={editProduct?.price || ""}
                                onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                                margin="normal"
                            />
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Button variant="contained" color="primary" onClick={handleEditProduct}>Update</Button>
                                <Button variant="outlined" color="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            )}
        </Box>
    );
};

export default Inventory;
