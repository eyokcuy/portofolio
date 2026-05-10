import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { FiUser, FiLock, FiLogIn, FiArrowLeft, FiUserPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isLogin) {
        const result = await login(username, password);
        if (result.success) {
          const loggedUser = result.user;
          toast.success(`Welcome back, ${username}!`);
          // Redirect based on role from the database
          if (loggedUser.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          toast.error(result.message);
        }
      } else {
        if (password !== confirmPassword) {
          return toast.error("Passwords do not match!");
        }
        const result = await register(username, password);
        if (result.success) {
          toast.success("Registration successful! Please login.");
          setIsLogin(true);
          setPassword("");
          setConfirmPassword("");
        } else {
          toast.error(result.message);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Reset fields on toggle
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
        {/* Neo-Brutalism Particles Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Rectangles */}
          <motion.div 
            animate={{ rotate: 360, x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[15%] w-16 h-16 border-4 border-black bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
          <motion.div 
            animate={{ rotate: -360, x: [0, -30, 0], y: [0, 60, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[20%] right-[10%] w-20 h-20 border-4 border-black bg-cyan-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-12"
          />
          
          {/* Dots/Circles */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-[25%] right-[25%] w-8 h-8 rounded-full border-4 border-black bg-pink-400"
          />
          <motion.div 
            animate={{ x: [0, 100, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-[10%] left-[20%] w-6 h-6 rounded-full border-4 border-black bg-black"
          />

          {/* Triangles (using CSS clip-path or borders) */}
          <motion.div 
            animate={{ rotate: 45, y: [0, -40, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute top-[60%] left-[5%] w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-black opacity-10"
          />

          {/* Grid lines pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
          />
        </div>

        <motion.div 
          layout
          className="w-full max-w-6xl grid lg:grid-cols-2 bg-white border-[8px] border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative z-10 overflow-hidden"
        >
          
          {/* CONTENT SECTION (SWAPS LEFT/RIGHT) */}
          <motion.div 
            layout="position"
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`p-8 md:p-16 flex flex-col justify-center bg-white ${isLogin ? "lg:order-1" : "lg:order-2"}`}
          >
            <div className="mb-10">
              <motion.div 
                layout
                className={`inline-block p-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 ${isLogin ? "bg-yellow-300" : "bg-cyan-300"}`}
              >
                {isLogin ? <FiLock className="text-4xl text-black" /> : <FiUserPlus className="text-4xl text-black" />}
              </motion.div>
              <motion.h1 
                layout="position"
                className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none text-black"
              >
                {isLogin ? "Sign" : "Create"} <br />
                <span className={isLogin ? "text-yellow-400" : "text-cyan-500"}>
                  {isLogin ? "In" : "Account"}
                </span>
              </motion.h1>
              <motion.p 
                layout="position"
                className="mt-6 font-bold text-black/60 uppercase text-sm tracking-widest max-w-xs leading-relaxed"
              >
                {isLogin 
                  ? "Access your account to manage your profile and view exclusive content." 
                  : "Join our community to showcase your projects and connect with others."}
              </motion.p>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 font-black uppercase text-xs hover:underline decoration-4 text-black"
              >
                <FiArrowLeft /> Back to Home
              </button>
            </div>
          </motion.div>

          {/* FORM SECTION (SWAPS LEFT/RIGHT) */}
          <motion.div 
            layout="position"
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`p-8 md:p-12 flex flex-col justify-center border-black min-h-[600px] ${isLogin ? "lg:order-2 lg:border-l-[8px]" : "lg:order-1 lg:border-r-[8px]"} ${isLogin ? "bg-cyan-50" : "bg-yellow-50"}`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0, x: isLogin ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? -50 : 50 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              >
                <h2 className="text-2xl font-black uppercase mb-8 border-b-4 border-black inline-block pb-1">
                  {isLogin ? "Login Form" : "Register Form"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40">Username</label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="username"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40">Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="space-y-2"
                    >
                      <label className="text-xs font-black uppercase tracking-widest text-black/40">Confirm Password</label>
                      <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-white border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    variant="black"
                    disabled={isSubmitting}
                    className="w-full py-4 text-lg mt-4 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
                    {isLogin ? <FiLogIn /> : <FiUserPlus />}
                  </Button>
                </form>

                <div className="mt-10 text-center">
                  <p className="font-bold text-black/60 uppercase text-[10px] tracking-widest mb-3">
                    {isLogin ? "New here? Create an account" : "Already have an account?"}
                  </p>
                  <button 
                    onClick={toggleMode}
                    className={`px-8 py-2 border-4 border-black font-black uppercase text-xs transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 ${isLogin ? "bg-cyan-300 hover:bg-cyan-400" : "bg-yellow-300 hover:bg-yellow-400"}`}
                  >
                    {isLogin ? "Register Now" : "Login Now"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
