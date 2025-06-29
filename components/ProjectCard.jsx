import Button from "../components/Button";

const ProjectCard = ({ projectTitle, projectDescription, projectThumb, techStack, liveDemoUrl, sourceCodeUrl }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-slate-300 group">
      <div className="relative overflow-hidden">
        <img
          src={projectThumb}
          alt={projectTitle}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-slate-800 mb-3 line-clamp-1">{projectTitle}</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4 line-clamp-3">{projectDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-slate-200 transition-colors duration-200">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {liveDemoUrl && (
            <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer">
              <Button size="small" aria-label={`View live demo of ${projectTitle}`}>
                Live Demo
              </Button>
            </a>
          )}
          {sourceCodeUrl && (
            <a href={sourceCodeUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="small" aria-label={`View source code of ${projectTitle}`}>
                Source Code
              </Button>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
