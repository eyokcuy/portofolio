import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getFeedbacks } from "../../lib/api";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import FeedbackModal from "./FeedbackModal";
import { FiPlus } from "react-icons/fi";

export default function FeedbacksSection() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFeedbacks = useCallback(async () => {
    try {
      const res = await getFeedbacks();
      setFeedbacks(res.data);
    } catch {
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  // SSE for real-time updates
  useEffect(() => {
    const es = new EventSource("http://localhost:3000/feedbacks/events");

    es.addEventListener("feedback_changed", () => {
      getFeedbacks()
        .then((res) => setFeedbacks(res.data))
        .catch(() => {});
    });

    es.onerror = () => {
      // silent
    };

    return () => {
      es.close();
    };
  }, []);

  const prev = () =>
    setActive((a) => (a === 0 ? feedbacks.length - 1 : a - 1));
  const next = () =>
    setActive((a) => (a === feedbacks.length - 1 ? 0 : a + 1));

  if (loading) {
    return (
      <section className="max-w-[1500px] mx-auto px-4 md:px-6 py-14">
        <Card className="bg-black text-yellow-300" shadowSize="12px">
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
            Feedbacks
          </h2>
          <p className="mt-8 text-white font-bold text-lg">Loading...</p>
        </Card>
      </section>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <section className="max-w-[1500px] mx-auto px-4 md:px-6 py-14">
        <Card className="bg-black text-yellow-300" shadowSize="12px">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
              Feedbacks
            </h2>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="yellow"
              className="flex items-center gap-2 py-2 px-4 text-xs"
            >
              <FiPlus /> Give Feedback
            </Button>
          </div>
          <p className="mt-8 text-white font-bold text-lg opacity-70">
            No feedbacks yet. Be the first!
          </p>
        </Card>

        <FeedbackModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchFeedbacks}
        />
      </section>
    );
  }

  const current = feedbacks[active] || feedbacks[0];

  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 py-14">
      <Card className="bg-black text-yellow-300" shadowSize="12px" hoverScale={1}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
            Feedbacks
          </h2>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="yellow"
              className="flex items-center gap-2 py-2 px-4 text-xs"
            >
              <FiPlus /> Give Feedback
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={prev}
                variant="white"
                className="w-10 h-10 flex items-center justify-center font-black text-lg p-0"
                aria-label="Previous feedback"
              >
                ←
              </Button>
              <Button
                onClick={next}
                variant="white"
                className="w-10 h-10 flex items-center justify-center font-black text-lg p-0"
                aria-label="Next feedback"
              >
                →
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 60, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -60, rotate: -2 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card
                className={`${current.accent || "bg-cyan-300"} text-black`}
                shadowSize="8px"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-lg">
                      {i < (current.rating || 5) ? "★" : "☆"}
                    </span>
                  ))}
                </div>

                <p className="text-lg font-bold leading-relaxed">
                  "{current.text}"
                </p>

                <div className="mt-4 pt-4 border-t-2 border-black flex items-center gap-3">
                  <div className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center text-white font-black text-sm shrink-0">
                    {(current.name || "?").charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase text-black">
                      {current.name}
                    </p>
                    <p className="text-xs font-bold opacity-70 text-black">
                      {current.role}
                    </p>
                    {current.createdAt ? (
                      <p className="text-[10px] font-bold opacity-60 text-black">
                        {new Date(current.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          },
                        )}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {feedbacks.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-3 h-3 border-2 border-yellow-300 transition-all duration-200 ${
                i === active ? "bg-yellow-300 scale-125" : "bg-black"
              }`}
              aria-label={`Go to feedback ${i + 1}`}
            />
          ))}
        </div>
      </Card>

      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchFeedbacks} 
      />
    </section>
  );
}
