import React from "react";
import { ProjectsGallery } from "../../components/ProjectsGallery";
import { ProjectData } from "../../components/ProjectContext";

interface ProjectsPageProps {
  onDiscussProject: (project: ProjectData) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onDiscussProject }) => {
  return (
    <ProjectsGallery 
      isSideProjects={false} 
      onDiscussProject={onDiscussProject}
    />
  );
}; 