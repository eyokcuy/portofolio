import { motion } from "framer-motion";

export default function ProjectCardHeader({ title, color, liveUrl, imageUrl }) {
  const headerContent = (
    <>
      {imageUrl ? (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ) : null}

      <h3
        className={`text-4xl font-black uppercase text-center px-4 relative z-10 ${
          imageUrl ? "text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]" : ""
        } group-hover:-translate-y-1 transition-transform duration-150`}
      >
        {title}
      </h3>
    </>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`h-52 ${
        imageUrl ? "bg-transparent" : color
      } border-b-4 border-black flex items-center justify-center relative overflow-hidden group`}
    >
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full flex items-center justify-center"
        >
          {headerContent}
        </a>
      ) : (
        headerContent
      )}

      {liveUrl && (
        <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 border-2 border-black text-xs font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20">
          ↗ Open
        </div>
      )}
    </motion.div>
  );
}
