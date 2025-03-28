import React, { useState, useEffect } from "react";
import axios from "axios";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ productName: "", quantity: "", price: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/inventory");
    setProducts(res.data);
  };

  const addProduct = async () => {
    await axios.post("http://localhost:5000/api/inventory", newProduct);
    setNewProduct({ productName: "", quantity: "", price: "" });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/inventory/${id}`);
    fetchProducts();
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Inventory Dashboard</h1>

      {/* Add Product Form */}
      <div style={styles.form}>
        <input
          style={styles.input}
          name="productName"
          placeholder="Product Name"
          value={newProduct.productName}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="price"
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />
        <button style={styles.button} onClick={addProduct}>Add Product</button>
      </div>

      {/* Search */}
      <input
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p._id} style={p.quantity < 10 ? styles.lowStock : null}>
              <td style={styles.td}>{p.productName}</td>
              <td style={styles.td}>{p.quantity}</td>
              <td style={styles.td}>₹{p.price}</td>
              <td style={styles.td}>
                <button style={styles.deleteBtn} onClick={() => deleteProduct(p._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    flex: "1",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  searchBar: {
    padding: "10px",
    marginBottom: "20px",
    fontSize: "16px",
    width: "100%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px",
    background: "#f3f4f6",
    borderBottom: "2px solid #ccc",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },
  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
  lowStock: {
    backgroundColor: "#ffe4e6", // Light red for low stock
  },
};

export default Inventory;
