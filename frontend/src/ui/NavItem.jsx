import { Link } from "react-router-dom";

export default function NavItem({
  to = "/",
  label,
  isActive,
  onClick,
  variant = "white",
  className = "",
}) {
  const baseClass = `px-4 py-1.5 text-sm font-bold uppercase tracking-wide border-2 border-black
                     shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                     hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
                     transition-all duration-100 flex items-center justify-center`;

  const activeClass =
    "bg-black text-yellow-300 shadow-none translate-x-[3px] translate-y-[3px]";

  const variants = {
    white: "bg-white text-black",
    black: "bg-black text-yellow-300",
    yellow: "bg-yellow-300 text-black",
  };

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${isActive ? activeClass : ""} ${className}`}
    >
      {label}
    </Link>
  );
}
