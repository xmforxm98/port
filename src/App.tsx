import React, { useState, useEffect } from "react";
import { ContentRouter } from "@/components/ContentRouter";
import GooeyNav from "@/components/ui/GooeyNav/GooeyNav";
import { navItems } from "@/config/navigation";
import { ProjectProvider } from "../components/ProjectContext";

export default function App() {
  const [selectedSection, setSelectedSection] = useState<string>("about");

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  const handleSelectOption = (option: string) => {
    setSelectedSection(option);
  };

  return (
    <ProjectProvider>
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
            {/* Background Aurora effect is now handled globally via CSS */}
            
            {/* Main Content */}
            <main className="relative z-10 flex flex-1 flex-col w-full h-full overflow-y-auto">
              <ContentRouter selectedSection={selectedSection} />
            </main>
          </div>
        </div>
        <footer className="shrink-0 border-t border-white/10 py-4">
          <div className="container mx-auto px-4 text-center text-sm text-gray-400">
            <p>&copy; 2024 Yongwoo Kim. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </ProjectProvider>
  );
}