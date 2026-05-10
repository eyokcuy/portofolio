import ProjectCardUI from "../../ui/card/ProjectCard";

export default function ProjectCard({
  title,
  color,
  tags,
  desc,
  index,
  status,
  githubUrl,
  liveUrl,
  techStack,
  imageUrl,
}) {
  return (
    <ProjectCardUI
      title={title}
      headerColor={color}
      tags={tags}
      description={desc}
      index={index}
      ctaText="View Project →"
      status={status}
      githubUrl={githubUrl}
      liveUrl={liveUrl}
      techStack={techStack}
      imageUrl={imageUrl}
    />
  );
}
