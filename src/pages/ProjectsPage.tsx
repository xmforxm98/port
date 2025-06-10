import React, { useState } from "react";
import { ProjectsGallery } from "../../components/ProjectsGallery";
import { ProjectDetail } from "../../components/ProjectDetail";
import { ProjectData } from "../../components/ProjectContext";

interface ProjectsPageProps {
  onDiscussProject?: (project: ProjectData) => void;
  projectChatActive?: boolean;
  selectedProject?: ProjectData | null;
  onCloseProjectChat?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  const [viewingProject, setViewingProject] = useState<ProjectData | null>(null);

  const handleViewProject = (project: ProjectData) => {
    setViewingProject(project);
  };

  const handleBackToGallery = () => {
    setViewingProject(null);
  };

  // 프로젝트 상세 보기 (사이드 채팅 포함)
  if (viewingProject) {
    return (
      <ProjectDetail
        project={viewingProject}
        onBack={handleBackToGallery}
      />
    );
  }

  // 프로젝트 갤러리
  return (
    <ProjectsGallery 
      isSideProjects={false} 
      onDiscussProject={handleViewProject}
    />
  );
}; 