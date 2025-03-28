import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


// Import all pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

// Main Layout Component (Replaced Chakra's Box & Container)
const MainLayout = ({ children }) => (
  <div>
    <Header />
    <div className="container">{children}</div> {/* Replaced Chakra with CSS class */}
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes with Layout */}
        <Route element={<MainLayout />}>
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventory" 
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            } 
          />
        </Route>
        
        
      </Routes>
    </Router>
  );
}

export default App;
