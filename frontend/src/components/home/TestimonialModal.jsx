import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSend, FiStar, FiUser, FiBriefcase, FiMessageCircle } from "react-icons/fi";
import { createTestimonial } from "../../lib/api";
import { toast } from "sonner";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

export default function TestimonialModal({ isOpen, onClose, onSuccess }) {

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    rating: 5,
    accent: "bg-cyan-300",
  });
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const accents = [
    { name: "Cyan", class: "bg-cyan-300" },
    { name: "Pink", class: "bg-pink-300" },
    { name: "Yellow", class: "bg-yellow-300" },
    { name: "Green", class: "bg-green-400" },
    { name: "White", class: "bg-white" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;
    if (!formData.name || !formData.text) {
      toast.error("Please fill in your name and testimonial!");
      return;
    }

    setLoading(true);
    try {
      await createTestimonial(formData);
      toast.success("Thank you for your feedback!");
      onSuccess();
      onClose();
      setFormData({ name: "", role: "", text: "", rating: 5, accent: "bg-cyan-300" });
      
      // Start 60s cooldown
      setCooldown(60);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      if (error.response?.status !== 429) {
        toast.error("Failed to submit testimonial. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, y: 20, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 20, rotate: 2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl"
            >
              <Card className="bg-white border-4 border-black" shadowSize="12px" isStatic>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-black flex items-center gap-2">
                    <FiMessageCircle className="text-cyan-400" /> Give Feedback
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-2 border-4 border-black bg-white hover:bg-red-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    <FiX className="text-xl font-bold" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-black/40 flex items-center gap-2">
                        <FiUser /> Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-black/40 flex items-center gap-2">
                        <FiBriefcase /> Your Role / Company
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-all"
                        placeholder="CEO at TechCorp"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40">Testimonial Message</label>
                    <textarea
                      rows="4"
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      className="w-full px-4 py-3 bg-white border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-all resize-none"
                      placeholder="Share your experience working with me..."
                      required
                    ></textarea>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-black/40">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating: star })}
                            className={`text-2xl transition-transform hover:scale-125 ${
                              star <= formData.rating ? "text-yellow-400" : "text-neutral-200"
                            }`}
                          >
                            <FiStar fill={star <= formData.rating ? "currentColor" : "none"} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-black/40">Accent Color</label>
                      <div className="flex gap-2">
                        {accents.map((accent) => (
                          <button
                            key={accent.name}
                            type="button"
                            onClick={() => setFormData({ ...formData, accent: accent.class })}
                            className={`w-8 h-8 border-4 border-black transition-transform hover:scale-110 ${
                              accent.class
                            } ${formData.accent === accent.class ? "scale-110 ring-4 ring-cyan-200" : "opacity-60"}`}
                            title={accent.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || cooldown > 0}
                    variant={cooldown > 0 ? "white" : "black"}
                    className="w-full py-4 flex items-center justify-center gap-3 text-xl"
                  >
                    {loading ? "Submitting..." : cooldown > 0 ? (
                      `Wait ${cooldown}s...`
                    ) : (
                      <>
                        <FiSend /> Send Testimonial
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
