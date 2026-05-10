import { useEffect, useState } from "react";
import { getProjects } from "../../lib/api";
import ProjectCard from "./ProjectCard";

const API_URL = "http://localhost:3000";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await getProjects();
    setProjects(res.data);
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await fetchProjects();
      } catch (err) {
        if (!cancelled) console.error(err);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const es = new EventSource(`${API_URL}/projects/events`);

    es.addEventListener("project_changed", () => {
      fetchProjects().catch((err) => console.error(err));
    });

    es.addEventListener("ready", () => {
      // no-op
    });

    es.onerror = (err) => {
      console.error("SSE error:", err);
    };

    return () => {
      es.close();
    };
  }, []);

  if (projects.length === 0) {
    return (
      <section className="max-w-[1500px] mx-auto px-4 md:px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl md:text-5xl font-black uppercase">
            Projects
          </h2>
        </div>
        <div className="bg-white border-4 border-black p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-black text-lg text-center opacity-70">
            No projects yet. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 py-14">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl md:text-5xl font-black uppercase">Projects</h2>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            color={project.color}
            tags={[{ label: project.status || "Live", color: "bg-yellow-300" }]}
            desc={project.description}
            index={index}
            status={project.status ?? "Live"}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
            techStack={project.techStack}
            imageUrl={project.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
