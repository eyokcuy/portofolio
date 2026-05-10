import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  FiGrid, 
  FiLayers, 
  FiMessageSquare, 
  FiArrowLeft,
  FiLogOut,
  FiUsers,
  FiActivity
} from "react-icons/fi";
import { toast } from "sonner";

const sidebarGroups = [
  {
    title: "Main",
    links: [
      { name: "Dashboard", to: "/admin", icon: <FiGrid /> },
    ]
  },
  {
    title: "Content",
    links: [
      { name: "Projects", to: "/admin/projects", icon: <FiLayers /> },
      { name: "Testimonials", to: "/admin/testimonials", icon: <FiMessageSquare /> },
    ]
  },
  {
    title: "Access Control",
    links: [
      { name: "User Accounts", to: "/admin/users", icon: <FiUsers /> },
    ]
  }
];

export default function AdminSidebar({ onClose }) {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-black border-r-0 md:border-r-[5px] border-yellow-300 flex flex-col h-full shrink-0 shadow-2xl md:shadow-none">
      <div className="p-6 border-b-[5px] border-yellow-300 shrink-0 flex items-center justify-between md:block">
        <div>
          <h2 className="text-yellow-300 font-black uppercase text-xl">Admin</h2>
          <p className="text-yellow-300/60 text-[10px] font-bold uppercase tracking-widest mt-1">
            System Control
          </p>
        </div>
        <button onClick={onClose} className="md:hidden text-yellow-300 text-2xl font-black">
          ✕
        </button>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-6 content-start overflow-y-auto scrollbar-hide">
        {sidebarGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <h3 className="px-5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300/40">
              {group.title}
            </h3>
            <div className="flex flex-col gap-2">
              {group.links.map((link) => {
                const isActive =
                  link.to === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(link.to);

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className={`flex items-center gap-4 px-5 py-3.5 border-2 font-black uppercase text-[11px] tracking-wider transition-all duration-150 ${
                      isActive
                        ? "bg-yellow-300 text-black border-yellow-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] translate-x-1"
                        : "bg-white text-black border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:bg-yellow-300/10 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)] hover:border-white hover:text-white"
                    }`}
                  >
                    <span className="text-lg" aria-hidden>
                      {link.icon}
                    </span>
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t-[5px] border-yellow-300 bg-black/50 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 border-2 border-white bg-transparent text-white font-black uppercase text-[10px] tracking-tighter hover:bg-white hover:text-black transition-all duration-200"
        >
          <FiArrowLeft className="text-sm" /> Public Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 border-2 border-pink-400 bg-transparent text-pink-400 font-black uppercase text-[10px] tracking-tighter hover:bg-pink-400 hover:text-black transition-all duration-200"
        >
          <FiLogOut className="text-sm" /> Log Out
        </button>
      </div>
    </aside>
  );
}
