import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiAlertTriangle, FiArrowRight } from "react-icons/fi";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function RateLimitPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(60);
  
  // Get the last path to redirect back
  const from = location.state?.from || "/";

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate(from, { replace: true });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate, from]);

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, rotate: -2 }}
        animate={{ scale: 1, rotate: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white border-8 border-black text-center py-12 px-8" shadowSize="16px" isStatic>
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 bg-red-400 border-4 border-black flex items-center justify-center"
              >
                <FiClock className="text-6xl text-black" />
              </motion.div>
              <div className="absolute -top-4 -right-4 bg-yellow-300 border-4 border-black p-2 rotate-12">
                <FiAlertTriangle className="text-2xl" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 leading-none">
            Slow Down, <br /> Rocket Man!
          </h1>
          
          <p className="font-bold text-black/60 mb-8 uppercase text-sm tracking-widest">
            You've hit our rate limit. Take a breath and wait a moment.
          </p>

          <div className="bg-black text-yellow-300 py-6 mb-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
            <span className="text-6xl font-black tabular-nums">{timeLeft}</span>
            <span className="block text-xs font-black uppercase tracking-widest mt-2">Seconds Remaining</span>
          </div>

          <p className="text-xs font-black text-black/30 uppercase italic mb-8">
            Redirecting back automatically...
          </p>

          <Button 
            variant="black" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => navigate(from)}
            disabled={timeLeft > 0}
          >
            {timeLeft > 0 ? "Wait for it..." : "Take me back now"} <FiArrowRight />
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
