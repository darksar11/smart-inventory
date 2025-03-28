import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = [
    { name: "Jan", sales: 400 },
    { name: "Feb", sales: 300 },
    { name: "Mar", sales: 500 },
    { name: "Apr", sales: 200 },
    { name: "May", sales: 600 }
];

const Dashboard = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                📊 Dashboard
            </Typography>

            {/* Summary Cards */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ backgroundColor: "#1E88E5", color: "#fff", borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Total Products</Typography>
                            <Typography variant="h4" fontWeight="bold">120</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ backgroundColor: "#43A047", color: "#fff", borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Total Sales</Typography>
                            <Typography variant="h4" fontWeight="bold">₹ 50,000</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ backgroundColor: "#D81B60", color: "#fff", borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Low Stock Items</Typography>
                            <Typography variant="h4" fontWeight="bold">8</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Sales Chart */}
            <Box mt={4} sx={{ backgroundColor: "#fff", p: 3, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="h6" mb={2}>
                    Sales Overview
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sampleData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#1E88E5" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default Dashboard;
