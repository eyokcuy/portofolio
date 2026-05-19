import { useEffect, useState } from "react";
import { getProjects, getFeedbacks } from "../../lib/api";
import Card from "../../ui/Card";
import {
  FiFolder,
  FiMessageSquare,
  FiActivity,
  FiDatabase,
  FiSettings,
  FiFileText,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

export default function AdminDashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    setLoading(true);

    Promise.all([getProjects(), getFeedbacks()])
      .then(([projects, feedbacks]) => {
        const endTime = performance.now();
        setLatency(Math.round(endTime - startTime));
        setProjectCount(projects.data.length);
        setFeedbackCount(feedbacks.data.length);
      })
      .catch(() => {
        setLatency(0);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Header */}
      <div className="bg-black border-4 border-black p-6 md:p-10 shadow-[10px_10px_0px_0px_rgba(165,243,252,1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-cyan-400 font-black uppercase tracking-widest text-xs mb-2">
              Welcome Back,
            </p>
            <h1 className="text-white text-4xl md:text-6xl font-black uppercase leading-none">
              Control <br /> <span className="text-yellow-400">Center</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(253,224,71,1)]">
              <p className="font-black text-2xl leading-none">
                {new Date().getDate()}
              </p>
              <p className="text-[10px] font-bold uppercase opacity-60">
                {new Date().toLocaleString("default", { month: "short" })}
              </p>
            </div>
            <div className="bg-yellow-400 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <p className="font-black text-2xl leading-none">Admin</p>
              <p className="text-[10px] font-bold uppercase opacity-60 italic">
                Mode
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          isStatic
          className="group bg-white hover:bg-cyan-400 transition-colors duration-300"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-black uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                Total Assets
              </p>
              <p className="text-6xl font-black mt-2 group-hover:scale-110 transition-transform origin-left">
                {projectCount}
              </p>
            </div>
            <FiFolder className="text-4xl" />
          </div>
          <p className="mt-4 font-black uppercase text-sm tracking-tighter">
            Verified Projects
          </p>
          <div className="h-2 bg-black mt-4 w-full" />
        </Card>

        <Card
          isStatic
          className="group bg-white hover:bg-pink-400 transition-colors duration-300"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-black uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                Social Proof
              </p>
              <p className="text-6xl font-black mt-2 group-hover:scale-110 transition-transform origin-left">
                {feedbackCount}
              </p>
            </div>
            <FiMessageSquare className="text-4xl" />
          </div>
          <p className="mt-4 font-black uppercase text-sm tracking-tighter">
            Client Feedbacks
          </p>
          <div className="h-2 bg-black mt-4 w-full" />
        </Card>

        <Card
          isStatic
          className="sm:col-span-2 lg:col-span-2 bg-yellow-400 relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-xs font-black uppercase opacity-60">
              System Health
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-4 h-4 bg-green-500 border-2 border-black animate-pulse" />
              <p className="text-2xl font-black uppercase tracking-tight">
                API Operational
              </p>
            </div>
            <p className="mt-2 font-bold text-sm max-w-[250px]">
              All systems are running optimally. Connectivity latency:{" "}
              <span className="font-black text-black">
                {latency > 0 ? `${latency}ms` : "Calculating..."}
              </span>
            </p>

            <div className="flex gap-2 mt-4">
              <div className="px-2 py-1 bg-black text-white text-[10px] font-black uppercase">
                v2.4.0-stable
              </div>
              <div className="px-2 py-1 bg-white border-2 border-black text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Node v20.x
              </div>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -right-10 -bottom-10 text-[120px] opacity-10 font-black pointer-events-none select-none">
            CORE
          </div>
        </Card>
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black uppercase border-l-8 border-black pl-4">
            System Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-4 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-400 border-2 border-black flex items-center justify-center text-xl">
                  <FiCheckCircle className="text-black" />
                </div>
                <p className="font-black uppercase text-sm">Deployment Score</p>
              </div>
              <div className="h-4 bg-neutral-200 border-2 border-black overflow-hidden">
                <div className="h-full bg-purple-400 w-[92%]" />
              </div>
              <p className="text-[10px] font-bold mt-2 uppercase text-right">
                92% Stability
              </p>
            </div>
            <div className="border-4 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-400 border-2 border-black flex items-center justify-center text-xl">
                  <FiActivity className="text-black" />
                </div>
                <p className="font-black uppercase text-sm">Traffic Volume</p>
              </div>
              <div className="h-4 bg-neutral-200 border-2 border-black overflow-hidden">
                <div className="h-full bg-green-400 w-[65%]" />
              </div>
              <p className="text-[10px] font-bold mt-2 uppercase text-right">
                High Availability
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black uppercase border-l-8 border-yellow-400 pl-4">
            Quick Links
          </h2>
          <div className="flex flex-col gap-3">
            <button className="w-full text-left bg-black text-white p-4 font-black uppercase text-xs border-4 border-black hover:bg-cyan-400 hover:text-black transition-colors flex justify-between items-center group">
              Audit Logs <FiFileText />
            </button>
            <button className="w-full text-left bg-white text-black p-4 font-black uppercase text-xs border-4 border-black hover:bg-pink-400 transition-colors flex justify-between items-center group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Security Settings{" "}
              <FiSettings className="group-hover:rotate-45 transition-transform" />
            </button>
            <button className="w-full text-left bg-yellow-400 text-black p-4 font-black uppercase text-xs border-4 border-black hover:bg-white transition-colors flex justify-between items-center group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Database Backup <FiDatabase />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
