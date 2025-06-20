import React, { useState, useEffect } from "react";
import { ContentRouter } from "@/components/ContentRouter";
import GooeyNav from "@/components/ui/GooeyNav/GooeyNav";
import { navItems } from "@/config/navigation";
import { ProjectProvider } from "../components/ProjectContext";
import Aurora from "../components/Aurora";

export default function App() {
  const [selectedSection, setSelectedSection] = useState<string>("chat");

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
            {/* Aurora Background Effect */}
            <div className="absolute inset-0 z-0">
              <Aurora 
                colorStops={["#3100a3", "#10949d", "#284dbd"]}
                amplitude={0.7}
                blend={0.25}
                speed={0.4}
              />
            </div>
            
            {/* Main Content */}
            <main className="relative z-10 flex flex-1 flex-col w-full h-full overflow-y-auto">
              <ContentRouter selectedSection={selectedSection} />
            </main>
          </div>
        </div>
      </div>
    </ProjectProvider>
  );
}