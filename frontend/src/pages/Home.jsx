import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import AboutSection from "../components/home/AboutSection";
import ProjectsSection from "../components/home/ProjectSection";
import ContactSection from "../components/home/ContactSection";

export default function Home() {
  return (
    <main className="bg-[#f5f5f0] min-h-screen pt-24 overflow-hidden relative">
      {/* TEXTURE / SHAPE DECORATION (like Footer) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* top-left */}
        <div className="hidden md:block absolute -top-10 -left-10 w-36 h-36 bg-pink-400 border-[5px] border-black rotate-12" />

        {/* top-right */}
        <div className="hidden lg:block absolute -top-6 right-6 w-28 h-28 bg-cyan-300 border-[5px] border-black -rotate-12" />

        {/* mid-left */}
        <div className="absolute top-[520px] left-4 md:top-[430px] md:left-10 w-24 h-24 bg-yellow-200 border-[5px] border-black rotate-6" />

        {/* mid-right */}
        <div className="absolute top-[720px] right-2 md:top-[620px] md:right-8 w-20 h-20 bg-neutral-100 border-[5px] border-black -rotate-6" />

        {/* bottom accents */}
        <div className="absolute bottom-32 left-6 md:bottom-24 w-16 h-16 bg-pink-300 border-[5px] border-black rotate-12" />
        <div className="absolute bottom-16 right-8 md:bottom-10 md:right-14 w-14 h-14 bg-cyan-200 border-[5px] border-black -rotate-12" />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <section id="home">
          <HeroSection />
        </section>

        {/* STATS (kalau mau dijadikan bagian home juga) */}
        <section>
          <StatsSection />
        </section>

        {/* ABOUT */}
        <section id="about">
          <AboutSection />
        </section>

        {/* WORK / PROJECTS */}
        <section id="work">
          <ProjectsSection />
        </section>

        {/* CONTACT */}
        <section id="contact">
          <ContactSection />
        </section>
      </div>
    </main>
  );
}
