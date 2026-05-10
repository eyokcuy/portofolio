import { motion } from "framer-motion";
import ProjectCardHeader from "./ProjectCardHeader";
import ProjectCardTags from "./ProjectCardTags";
import ProjectCardBody from "./ProjectCardBody";
import ProjectCardCTA from "./ProjectCardCTA";
import ProjectCardStatusBadge from "./ProjectCardStatusBadge";
import ProjectCardTechStack from "./ProjectCardTechStack";
import ProjectCardFooter from "./ProjectCardFooter";

export default function ProjectCard({
  title,
  headerColor,
  tags = [],
  description,
  ctaText = "View Project →",
  index = 0,
  status = "Live",
  githubUrl,
  liveUrl,
  techStack = [],
  imageUrl,
}) {
  return (
    <motion.article
      whileHover={{
        scale: 1.02,
        rotate: index % 2 === 0 ? -1 : 1,
        boxShadow: "none",
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className="bg-white border-4 border-black overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
    >
      <ProjectCardHeader
        title={title}
        color={headerColor}
        liveUrl={liveUrl}
        imageUrl={imageUrl}
      />

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <ProjectCardStatusBadge status={status} />
        </div>

        <ProjectCardTechStack techStack={techStack} />
        <ProjectCardTags tags={tags} />
        <ProjectCardBody description={description} />
        <ProjectCardFooter githubUrl={githubUrl} liveUrl={liveUrl} />
      </div>
    </motion.article>
  );
}
