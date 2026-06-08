import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import PageTransition from "../components/PageTransition";
import ScrollProgress from "../components/animation/ScrollProgress";

export default function MainLayout() {
  return (
    <main>
      <NavBar />
      <ScrollProgress />

      <PageTransition>
        <Outlet />
      </PageTransition>

      <Footer />
    </main>
  );
}
