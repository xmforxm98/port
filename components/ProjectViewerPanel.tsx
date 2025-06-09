import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink, X } from "lucide-react";
import { motion } from "framer-motion";
import { useMediaQuery } from "./ui/use-mobile";
import { ProjectData } from "./ProjectContext";

interface ProjectViewerPanelProps {
  project: ProjectData;
  onClose: () => void;
}

export function ProjectViewerPanel({ project, onClose }: ProjectViewerPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col h-full bg-background"
      drag={isMobile ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(event, info) => {
        if (isMobile && info.offset.x > 100) {
          onClose();
        }
      }}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium">Project Details</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose} 
          className="h-8 w-8 p-0 rounded-full"
        >
          <X size={18} />
        </Button>
      </div>
      
      {/* Mobile drag indicator */}
      {isMobile && (
        <div className="flex justify-center py-2">
          <div className="w-8 h-1 bg-muted-foreground/30 rounded-full"></div>
        </div>
      )}
      
      <ScrollArea className="flex-1">
        <motion.div 
          className="p-6"
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          <motion.h1 
            className="text-2xl font-medium mb-4"
            variants={itemVariants}
          >
            {project.title}
          </motion.h1>
          
          <motion.div 
            className="rounded-lg overflow-hidden mb-6"
            variants={itemVariants}
          >
            <ImageWithFallback
              src={project.imageUrl}
              alt={project.title}
              className="w-full aspect-video object-cover"
            />
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-2 mb-4"
            variants={itemVariants}
          >
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
            <Badge variant="outline">{project.year}</Badge>
            {project.featured && (
              <Badge variant="secondary">Featured</Badge>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="font-medium mb-2">Overview</h3>
            <p className="text-muted-foreground mb-6">{project.description}</p>
          </motion.div>
          
          <motion.div 
            className="space-y-6 mb-6"
            variants={itemVariants}
          >
            <Card className="p-4">
              <h3 className="font-medium mb-2">Design Challenge</h3>
              <p className="text-muted-foreground">
                For the {project.title} project, I was tasked with creating a solution that addresses 
                user needs while meeting business objectives. The primary challenge was balancing 
                competing stakeholder priorities with limited resources.
              </p>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-2">Process & Methodology</h3>
              <p className="text-muted-foreground">
                I followed a comprehensive design process:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>Research: Stakeholder interviews and competitive analysis</li>
                <li>Definition: User personas and journey maps</li>
                <li>Ideation: Multiple concepts and workshops</li>
                <li>Prototyping: Wireframes to high-fidelity prototypes</li>
                <li>Testing: Usability testing with target users</li>
                <li>Refinement: Iterations based on feedback</li>
              </ul>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-2">Outcomes & Results</h3>
              <p className="text-muted-foreground">
                The {project.title} project delivered impressive results:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>32% increase in user engagement</li>
                <li>28% reduction in support tickets</li>
                <li>15% improvement in conversion rate</li>
                <li>Positive user feedback highlighting improved usability</li>
              </ul>
            </Card>
          </motion.div>
          
          <motion.div 
            className="mt-8"
            variants={itemVariants}
          >
            {project.detailUrl && (
              <Button variant="outline" className="gap-2">
                <ExternalLink size={16} />
                View Full Case Study
              </Button>
            )}
          </motion.div>
        </motion.div>
      </ScrollArea>
    </motion.div>
  );
}