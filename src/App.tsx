import React, { useState, useEffect } from "react";
import { useAuth } from "../components/auth/AuthContext";
import { useProject, ProjectData } from "../components/ProjectContext";
import { SplitViewLayout } from "../components/SplitViewLayout";
import { ProjectViewerPanel } from "../components/ProjectViewerPanel";
import { ContentRouter } from "./components/ContentRouter";
import Aurora from "../components/Aurora";
import GooeyNav from "./components/ui/GooeyNav/GooeyNav";
import { navItems } from "./config/navigation";

export default function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const { selectedProject, setSelectedProject } = useProject();
  const [selectedSection, setSelectedSection] = useState<string>("chat");
  const [projectChatActive, setProjectChatActive] = useState<boolean>(false);


  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  // Set chat as the default section when user authenticates
  useEffect(() => {
    if (isAuthenticated) {
      setSelectedSection("chat");
    }
  }, [isAuthenticated]);

  // Reset project chat state when changing sections
  useEffect(() => {
    if (selectedSection !== "chat") {
      setProjectChatActive(false);
    }
  }, [selectedSection]);

  const handleNewChat = () => {
    setSelectedSection("chat");
    setProjectChatActive(false);
  };

  const handleSelectOption = (option: string) => {
    setSelectedSection(option);
    if (option !== "chat") {
      setProjectChatActive(false);
    }
  };

  const handleStartProjectChat = (project: ProjectData) => {
    setSelectedProject(project);
    setProjectChatActive(true);
  };

  const handleCloseProjectChat = () => {
    setProjectChatActive(false);
    setSelectedProject(null);
  };



  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // The AuthPage logic is removed as we are skipping authentication for now
  /*
  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen bg-background">
        <AuthPage />
      </div>
    );
  }
  */

  return (
    <div className="relative flex flex-col h-screen w-screen bg-background overflow-hidden text-white">
      <header className="shrink-0 pt-4">
        <div className="container mx-auto px-4 flex justify-center">
          <GooeyNav 
            items={navItems}
            onSelect={handleSelectOption}
            current={selectedSection}
          />
        </div>
      </header>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="relative flex-1 flex flex-col h-full w-full">
          {/* Background Aurora effect */}
          <div className="absolute inset-0 z-0">
            <Aurora
              colorStops={["#089f8f", "#0ea5e9", "#0284c7"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.3}
            />
          </div>

          {/* Main Content */}
          <main className="relative z-10 flex flex-1 flex-col w-full h-full overflow-y-auto">
            <SplitViewLayout
              leftPanel={
                <ContentRouter
                  selectedSection={selectedSection}
                  projectChatActive={projectChatActive}
                  selectedProject={selectedProject}
                  onDiscussProject={handleStartProjectChat}
                  onCloseProjectChat={handleCloseProjectChat}
                />
              }
              rightPanel={null}
              isRightPanelOpen={false}
            />
          </main>
        </div>
      </div>
      <footer className="shrink-0 border-t border-white/10 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>&copy; 2024 Yongwoo Kim. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}