import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import PageTransition from "../components/PageTransition";

export default function MainLayout() {
  return (
    <main>
      <NavBar />

      <PageTransition>
        <Outlet />
      </PageTransition>

      <Footer />
    </main>
  );
}
