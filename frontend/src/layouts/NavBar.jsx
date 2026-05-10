import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "../ui/NavItem";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  const handleScroll = (id) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  useEffect(() => {
    const els = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          );

        const top = visible[0];
        if (top?.target?.id) setActiveId(top.target.id);
      },
      {
        root: null,
        threshold: [0.15, 0.3, 0.45, 0.6, 0.75],
        rootMargin: "-85px 0px -55% 0px",
      },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="w-full bg-yellow-300 border-b-4 border-black font-mono fixed top-0 left-0 z-50">
      <div className="max-w-[1700px] mx-auto px-16 flex items-center justify-between h-16 relative">
        <Link
          to="/"
          className="text-xl font-black uppercase tracking-tight border-2 border-black bg-white px-3 py-1
                     shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                     hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
                     transition-all duration-100"
        >
          eyokkk
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ id, label }) => (
            <NavItem
              key={id}
              label={label}
              isActive={activeId === id}
              onClick={(e) => {
                e.preventDefault();
                setActiveId(id);
                handleScroll(id);
              }}
            />
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-2">
          <NavItem to="/login" label="Login" variant="white" />
          <NavItem to="/signup" label="Sign Up →" variant="black" />
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-1.5 p-2 border-2 border-black bg-white
                     shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                     hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
                     transition-all duration-100"
        >
          <span
            className={`block w-5 h-0.5 bg-black transition-all duration-200 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-black transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-black transition-all duration-200 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t-4 border-black bg-yellow-300 px-4 pb-4 flex flex-col gap-2 pt-4">
          {navLinks.map(({ id, label }) => (
            <NavItem
              key={id}
              label={label}
              isActive={activeId === id}
              onClick={(e) => {
                e.preventDefault();
                setActiveId(id);
                handleScroll(id);
                setMenuOpen(false);
              }}
            />
          ))}

          <div className="flex gap-2 mt-1">
            <NavItem
              to="/login"
              label="Login"
              variant="white"
              className="flex-1"
              onClick={() => setMenuOpen(false)}
            />
            <NavItem
              to="/signup"
              label="Sign Up →"
              variant="black"
              className="flex-1"
              onClick={() => setMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
