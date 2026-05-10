import { Navigate, Outlet } from "react-router-dom";
import AdminFrame from "./AdminFrame";
import { useAuth } from "../context/AuthContext";
import PageTransition from "../components/PageTransition";

export default function AdminLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  // No user at all -> Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User exists but NOT admin -> Back to public home
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <AdminFrame>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </AdminFrame>
  );
}
