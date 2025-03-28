import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const isDashboard = location.pathname === "/dashboard";
    const isInventory = location.pathname === "/inventory";

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                p: 2, 
                backgroundColor: "primary.main", 
                color: "white",
                boxShadow: 2,
            }}
        >
            {/* Title */}
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Smart Inventory
            </Typography>

            {/* Navigation Buttons */}
            <Box>
                <Button 
                    component={Link} 
                    to="/inventory" 
                    variant="contained" 
                    color={isInventory ? "success" : "secondary"}
                    sx={{ mr: 2 }}
                >
                    Inventory
                </Button>
                
                <Button 
                    component={Link} 
                    to={isDashboard ? "/login" : "/dashboard"} 
                    variant="contained" 
                    color={isDashboard ? "error" : "secondary"}
                >
                    {isDashboard ? "Logout" : "Dashboard"}
                </Button>
            </Box>
        </Box>
    );
};

export default Header;
