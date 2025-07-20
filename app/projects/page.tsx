
// Project section component to showcase top projects
interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "Project 1",
    description: "Description of project 1 and its key features",
    technologies: ["React", "TypeScript", "Node.js"],
    imageUrl: "/project1.jpg",
    liveUrl: "https://project1.com",
    githubUrl: "https://github.com/username/project1"
  },
  {
    title: "Project 2", 
    description: "Description of project 2 and its key features",
    technologies: ["Next.js", "TailwindCSS", "MongoDB"],
    imageUrl: "/project2.jpg",
    liveUrl: "https://project2.com",
    githubUrl: "https://github.com/username/project2"
  },
  {
    title: "Project 3",
    description: "Description of project 3 and its key features", 
    technologies: ["Vue.js", "Firebase", "SCSS"],
    imageUrl: "/project3.jpg",
    githubUrl: "https://github.com/username/project3"
  }
];

const ProjectSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-gray-600 hover:text-gray-800"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;