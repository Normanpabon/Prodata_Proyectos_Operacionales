import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import ProjectCard from "./ProjectCard";
function ProjectList() {
  const { projects, getProjectsByUnit, getAllStatus } = useUser();
  useEffect(() => {
    getProjectsByUnit();
    getAllStatus();
  }, []);
  return (
    <div>
      {projects.map((project) => {
        return <ProjectCard key={project.id} project={project} />;
      })}
    </div>
  );
}

export default ProjectList;