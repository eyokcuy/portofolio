import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayouts";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./views/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminFeedbacks from "./pages/admin/AdminFeedbacks";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminStats from "./pages/admin/AdminStats";
import RateLimit from "./pages/RateLimit";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Navigate to="/login" replace />} />
        <Route path="/rate-limit" element={<RateLimit />} />

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/feedbacks" element={<AdminFeedbacks />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/stats" element={<AdminStats />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              border: "3px solid black",
              borderRadius: "0",
              boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
              fontWeight: "bold",
              fontFamily: "inherit",
            },
          }}
        />
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
