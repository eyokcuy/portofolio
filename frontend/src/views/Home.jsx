// src/views/Home.jsx

import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import TechStackSection from "../components/home/TechStackSection";
import ProjectsSection from "../components/home/ProjectSection";
import FeedbacksSection from "../components/home/FeedbacksSection";
import ContactSection from "../components/home/ContactSection";
import SectionReveal from "../components/animation/SectionReveal";

export default function Home() {
  return (
    <main className="bg-[#f5f5f0] min-h-screen pt-24 overflow-hidden relative">
      {/* TEXTURE / SHAPE DECORATION (like Footer) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* top-left (mobile hidden) */}
        <div className="hidden md:block absolute -top-10 -left-10 w-40 h-40 bg-pink-400 border-[5px] border-black rotate-12" />

        {/* top-right */}
        <div className="hidden lg:block absolute -top-6 right-6 w-28 h-28 bg-cyan-300 border-[5px] border-black -rotate-12" />

        {/* hero-mid left */}
        <div className="absolute top-[200px] left-3 sm:top-[220px] sm:left-6 md:top-[260px] md:left-10 w-24 h-24 bg-yellow-200 border-[5px] border-black rotate-6" />

        {/* hero-mid right */}
        <div className="absolute top-[340px] right-2 sm:top-[360px] sm:right-6 md:top-[430px] md:right-10 w-20 h-20 bg-neutral-100 border-[5px] border-black -rotate-6" />

        {/* section accents */}
        <div className="absolute bottom-[180px] left-4 sm:bottom-[220px] sm:left-10 w-16 h-16 bg-pink-300 border-[5px] border-black rotate-12" />
        <div className="absolute bottom-[120px] right-5 sm:bottom-[160px] sm:right-12 w-14 h-14 bg-cyan-200 border-[5px] border-black -rotate-12" />

        {/* subtle texture overlay */}
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_10%,rgba(0,0,0,0.08),transparent_35%),radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.06),transparent_35%),linear-gradient(rgba(0,0,0,0.04),rgba(0,0,0,0.00))]" />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <section id="home">
          <SectionReveal>
            <HeroSection />
          </SectionReveal>
        </section>

        {/* STATS */}
        <section>
          <SectionReveal>
            <StatsSection />
          </SectionReveal>
        </section>

        {/* ABOUT */}
        <section id="about">
          <SectionReveal>
            <AboutSection />
          </SectionReveal>
        </section>

        {/* SERVICES */}
        <section id="services">
          <SectionReveal>
            <ServicesSection />
          </SectionReveal>
        </section>

        {/* TECH STACK */}
        <section id="tech-stack">
          <SectionReveal>
            <TechStackSection />
          </SectionReveal>
        </section>

        {/* WORK / PROJECTS */}
        <section id="work">
          <SectionReveal>
            <ProjectsSection />
          </SectionReveal>
        </section>

        {/* FEEDBACKS */}
        <section id="feedbacks">
          <SectionReveal>
            <FeedbacksSection />
          </SectionReveal>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <SectionReveal>
            <ContactSection />
          </SectionReveal>
        </section>
      </div>
    </main>
  );
}
