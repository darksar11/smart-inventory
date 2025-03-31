import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

// Simulating an API call to get sales data
const fetchSalesData = (period) => {
  // In a real app, this would be an API call like:
  // return axios.get(`/api/sales?period=${period}`);
  
  // For demo purposes, we'll generate random data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  
  if (period === "monthly") {
    return Promise.resolve(
      months.map(month => ({
        name: month,
        sales: Math.floor(Math.random() * 1000) + 100,
        profit: Math.floor(Math.random() * 500) + 50
      }))
    );
  } else if (period === "quarterly") {
    return Promise.resolve(
      quarters.map(quarter => ({
        name: quarter,
        sales: Math.floor(Math.random() * 2000) + 500,
        profit: Math.floor(Math.random() * 1000) + 200
      }))
    );
  } else {
    return Promise.resolve(
      ["2023", "2024", "2025"].map(year => ({
        name: year,
        sales: Math.floor(Math.random() * 5000) + 1000,
        profit: Math.floor(Math.random() * 2500) + 500
      }))
    );
  }
};

const Dashboard = () => {
    const [salesData, setSalesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [timePeriod, setTimePeriod] = useState("monthly");
    const [summaryStats, setSummaryStats] = useState({
        totalProducts: 0,
        totalSales: 0,
        lowStockItems: 0
    });

    // Effect to load dynamic data
    useEffect(() => {
        setIsLoading(true);
        
        // Fetch sales data based on selected time period
        fetchSalesData(timePeriod)
            .then(data => {
                setSalesData(data);
                
                // Calculate summary stats based on the data
                const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
                setSummaryStats({
                    totalProducts: 120 + Math.floor(Math.random() * 30), // Demo random variation
                    totalSales: totalSales,
                    lowStockItems: 8 + Math.floor(Math.random() * 5) // Demo random variation
                });
                
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching sales data:", error);
                setIsLoading(false);
            });
    }, [timePeriod]);

    const handlePeriodChange = (event) => {
        setTimePeriod(event.target.value);
    };

    const refreshData = () => {
        // Re-fetch data with the current time period
        fetchSalesData(timePeriod)
            .then(data => {
                setSalesData(data);
                const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
                setSummaryStats({
                    ...summaryStats,
                    totalSales: totalSales
                });
            });
    };

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 4
            }}>
                <Typography variant="h4" fontWeight="bold">
                    📊 Dashboard
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={refreshData}
                    sx={{ borderRadius: 2 }}
                >
                    Refresh Data
                </Button>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ 
                        bgcolor: "#1E88E5", 
                        color: "#fff", 
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 6px 25px rgba(0,0,0,0.15)'
                        }
                    }}>
                        <CardContent>
                            <Typography variant="h6">Total Products</Typography>
                            <Typography variant="h4" fontWeight="bold">
                                {summaryStats.totalProducts}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ 
                        bgcolor: "#43A047", 
                        color: "#fff", 
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 6px 25px rgba(0,0,0,0.15)'
                        }
                    }}>
                        <CardContent>
                            <Typography variant="h6">Total Sales</Typography>
                            <Typography variant="h4" fontWeight="bold">
                                ₹ {summaryStats.totalSales.toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ 
                        bgcolor: "#D81B60", 
                        color: "#fff", 
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 6px 25px rgba(0,0,0,0.15)'
                        }
                    }}>
                        <CardContent>
                            <Typography variant="h6">Low Stock Items</Typography>
                            <Typography variant="h4" fontWeight="bold">
                                {summaryStats.lowStockItems}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Sales Chart */}
            <Box mt={4} sx={{ 
                bgcolor: "#fff", 
                p: 3, 
                borderRadius: 2, 
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mb: 2 
                }}>
                    <Typography variant="h6">
                        Sales Overview
                    </Typography>
                    
                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel>Time Period</InputLabel>
                        <Select
                            value={timePeriod}
                            label="Time Period"
                            onChange={handlePeriodChange}
                            size="small"
                        >
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="quarterly">Quarterly</MenuItem>
                            <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                
                {isLoading ? (
                    <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography>Loading chart data...</Typography>
                    </Box>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#fff', 
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                    border: 'none'
                                }} 
                            />
                            <Legend />
                            <Bar 
                                dataKey="sales" 
                                name="Sales (₹)" 
                                fill="#1E88E5" 
                                radius={[5, 5, 0, 0]}
                                barSize={35}
                            />
                            <Bar 
                                dataKey="profit" 
                                name="Profit (₹)" 
                                fill="#43A047" 
                                radius={[5, 5, 0, 0]}
                                barSize={35}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Box>

            {/* Product Performance */}
            <Box mt={4} sx={{ 
                bgcolor: "#fff", 
                p: 3, 
                borderRadius: 2, 
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}>
                <Typography variant="h6" mb={2}>
                    Top Selling Products
                </Typography>
                <Grid container spacing={2}>
                    {['Laptop', 'Smartphone', 'Headphones', 'Keyboard'].map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ 
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-3px)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {product}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Units Sold: {Math.floor(Math.random() * 100) + 20}
                                    </Typography>
                                    <Typography variant="body2" color="success.main" fontWeight="bold">
                                        +{Math.floor(Math.random() * 30) + 5}% from last month
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Dashboard;
