import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useProject, ProjectData } from "./ProjectContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollArea } from "./ui/scroll-area";
import { MessageSquare } from "lucide-react";

interface ProjectsGalleryProps {
  isSideProjects: boolean;
  onDiscussProject: (project: ProjectData) => void;
}

const mainProjects: ProjectData[] = [
        {
          id: "creative-portfolio",
          title: "PSA Integrated Vehicle Management & Smartwatch App",
          description: "A futuristic driving experience with autonomous parking via smartwatch gesture control and comprehensive vehicle management.",
          imageUrl: "https://raw.githubusercontent.com/xmforxm98/Images/main/C1.png",
          year: "2020",
          tags: ["Automotive", "IoT", "Smartwatch", "UX/UI Design"],
          featured: true,
        },
        {
          id: "smart-city-platform",
          title: "Smart City Management Platform",
          description: "An integrated platform for urban planning and smart city infrastructure management with real-time monitoring and analytics.",
          imageUrl: "https://raw.githubusercontent.com/xmforxm98/Images/main/S1.png",
          year: "2021",
          tags: ["Smart City", "Platform Design", "Urban Planning", "IoT"],
          featured: true,
        },
        {
          id: "made-project",
          title: "M.A.D.E. Project: Lead Designer & PM Role",
          description: "A marketplace platform connecting marketers and advertisers through competition-based talent discovery and digital advertising market innovation.",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          year: "2022",
          tags: ["Lead Design", "Product Management", "Digital Marketing", "UX Research"],
          featured: true,
        },
        {
          id: "play2-project",
          title: "PL@Y2",
          description: "Live Event Ticketing Solution featuring ticket transfer market and reservation prototype with 9M user data analysis and innovative UX solutions.",
          imageUrl: "/images/play1.png",
          year: "2023",
          tags: ["UX/UI Design", "Sales Management", "Event Platform", "User Research"],
          featured: true,
        },
        {
          id: "b2b-saas-project",
          title: "B2B SaaS AI Solution",
          description: "Real-time data monitoring and AI insight derivation tools for enterprise clients with predictive analytics and automated anomaly detection.",
          imageUrl: "/images/dataanalytics1.png",
          year: "2023",
          tags: ["AI", "B2B", "Data Analytics", "Enterprise"],
          featured: true,
        }
      ];

const sideProjects = [/* ... side projects data ... */]; // This part is now handled in App.tsx

const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ isSideProjects, onDiscussProject }) => {
  const { setSelectedProject } = useProject();
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>(mainProjects);

  const handleOpenProject = (project: ProjectData) => {
    if (onDiscussProject) {
      onDiscussProject(project);
    }
  };

  const handleNavigateToProjectChat = (project: ProjectData) => {
    if (onDiscussProject) {
      onDiscussProject(project);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      <ScrollArea className="flex-1">
        <div className="p-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden group flex flex-col h-full bg-white/5 backdrop-blur-sm border-white/10">
                  <div 
                    className="relative overflow-hidden h-48 cursor-pointer"
                    onClick={() => handleOpenProject(project)}
                  >
                    <ImageWithFallback 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {project.featured && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-background/80">Featured</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 
                        className="font-medium mb-1 cursor-pointer hover:text-primary"
                        onClick={() => handleOpenProject(project)}
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">{project.year ?? ''}</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleNavigateToProjectChat(project)}
                        >
                         Discuss with AI
                         <MessageSquare size={16} className="ml-2"/>
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export { ProjectsGallery };