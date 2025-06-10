import React from "react";
import { PageTransition } from "../../components/PageTransition";
import { ChatPage } from "../pages/ChatPage";
import { AboutPage } from "../../components/AboutPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { SideProjectsPage } from "../pages/SideProjectsPage";
import { BlogPage } from "../../components/BlogPage";
import { ProfileWrapper } from "../../components/auth/ProfileWrapper";
import { ProjectData } from "../../components/ProjectContext";

interface ContentRouterProps {
  selectedSection: string;
  projectChatActive: boolean;
  selectedProject: ProjectData | null;
  onDiscussProject: (project: ProjectData) => void;
  onCloseProjectChat?: () => void;
}

export const ContentRouter: React.FC<ContentRouterProps> = ({
  selectedSection,
  projectChatActive,
  selectedProject,
  onDiscussProject,
  onCloseProjectChat,
}) => {
  const renderContent = () => {
    switch (selectedSection) {
      case "chat":
        return (
          <ChatPage
            selectedOption={projectChatActive && selectedProject ? "project" : "new"}
            projectContext={projectChatActive && selectedProject ? selectedProject : undefined}
          />
        );
      case "about":
        return <AboutPage />;
      case "projects":
        return (
          <ProjectsPage 
            onDiscussProject={onDiscussProject}
            projectChatActive={projectChatActive}
            selectedProject={selectedProject}
            onCloseProjectChat={onCloseProjectChat}
          />
        );
      case "side-projects":
        return <SideProjectsPage />;
      case "blog":
        return <BlogPage />;
      case "profile":
        return <ProfileWrapper />;
      default:
        if (selectedSection.startsWith("recent-")) {
          return <ChatPage selectedOption={selectedSection} />;
        }
        return <ChatPage selectedOption="new" />;
    }
  };

  const getSectionKey = () => {
    if (selectedSection === "chat" && projectChatActive && selectedProject) {
      return `chat-project-${selectedProject.id}`;
    }
    return selectedSection;
  };

  return (
    <PageTransition sectionKey={getSectionKey()}>
      {renderContent()}
    </PageTransition>
  );
}; 