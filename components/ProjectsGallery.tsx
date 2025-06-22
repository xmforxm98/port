import React, { useState, useEffect } from "react";
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
import { sideProjects } from "../src/data/sideProjects";

interface ProjectsGalleryProps {
  isSideProjects: boolean;
  onDiscussProject: (project: ProjectData, openChat?: boolean) => void;
}

const mainProjects: ProjectData[] = [
        {
          id: "play2-project",
          title: "PL@Y2",
          description: "Live Event Ticketing Solution featuring ticket transfer market and reservation prototype with 9M user data analysis and innovative UX solutions.",
          imageUrl: "/images/play0.png",
          images: [
            "/images/play0.png",
            "/images/play1.png",
            "/images/play2.png",
            "/images/play5.png"
          ],
          year: "2023",
          tags: ["UX/UI Design", "Sales Management", "Event Platform", "User Research"],
          featured: true,
        },
        {
          id: "made-project",
          title: "M.A.D.E. Project: Lead Designer & PM Role",
          description: "A marketplace platform connecting marketers and advertisers through competition-based talent discovery and digital advertising market innovation.",
          imageUrl: "/images/made0.jpg",
          images: [
            "/images/made0.jpg",
            "/images/made1.png",
            "/images/made2.png",
            "/images/made3.png"
          ],
          year: "2022",
          tags: ["Lead Design", "Product Management", "Digital Marketing", "UX Research"],
          featured: true,
        },
        {
          id: "b2b-saas-project",
          title: "B2B SaaS AI Solution",
          description: "Real-time data monitoring and AI insight derivation tools for enterprise clients with predictive analytics and automated anomaly detection.",
          imageUrl: "/images/dataanalytics1.png",
          images: [
            "/images/dataanalytics1.png",
            "/images/dataanalytics2.png",
            "/images/dataanalytics3.png"
          ],
          year: "2023",
          tags: ["AI", "B2B", "Data Analytics", "Enterprise"],
          featured: true,
        },
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
          title: "HMI - SKODA Vision E Concept",
          description: "An innovative automotive vision platform for Skoda featuring next-generation vehicle interface design and smart connectivity solutions.",
          imageUrl: "/images/skodavision1.png",
          images: [
            "/images/skodavision1.png",
            "/images/skodavision2.png",
            "/images/skodavision3.png",
            "/images/skodavision4.png"
          ],
          year: "2021",
          tags: ["Automotive", "Vision Platform", "Interface Design", "Skoda"],
          featured: true,
        }
      ];

const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ isSideProjects, onDiscussProject }) => {
  const { setSelectedProject } = useProject();
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>(isSideProjects ? sideProjects : mainProjects);

  useEffect(() => {
    setFilteredProjects(isSideProjects ? sideProjects : mainProjects);
  }, [isSideProjects]);

  const handleOpenProject = (project: ProjectData) => {
    if (onDiscussProject) {
      onDiscussProject(project, false);
    }
  };

  const handleNavigateToProjectChat = (project: ProjectData) => {
    if (onDiscussProject) {
      onDiscussProject(project, true);
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
                <Card 
                  className="overflow-hidden group flex flex-col h-full bg-white/5 backdrop-blur-sm border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                  onClick={() => handleOpenProject(project)}
                >
                  <div className="relative overflow-hidden h-48">
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
                      <h3 className="font-medium mb-1 group-hover:text-primary transition-colors duration-200">
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigateToProjectChat(project);
                          }}
                          className="hover:bg-primary/20"
                        >
                         Ask Chatbot
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