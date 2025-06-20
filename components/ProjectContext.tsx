import { createContext, useContext, useState, ReactNode } from 'react';

// Define the project data structure
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category?: string;
  year?: string;
  featured?: boolean;
  detailUrl?: string;
  images?: string[]; // Array of additional images for carousel
}

interface ProjectContextType {
  selectedProject: ProjectData | null;
  setSelectedProject: (project: ProjectData | null) => void;
  shouldOpenChat: boolean;
  setShouldOpenChat: (shouldOpen: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [shouldOpenChat, setShouldOpenChat] = useState(false);

  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject, shouldOpenChat, setShouldOpenChat }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}