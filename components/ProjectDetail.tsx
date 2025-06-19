import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MessageSquare, Calendar, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProjectData } from "./ProjectContext";
import { ProjectChatbot } from "../src/components/ProjectChatbot";
import { useMediaQuery } from "./ui/use-mobile";

interface ProjectDetailProps {
  project: ProjectData;
  onBack: () => void;
  onStartChat?: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleStartChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  // Gallery images based on project type
  const getGalleryImages = () => {
    if (project.id === "creative-portfolio") {
      return [
        {
          url: "https://raw.githubusercontent.com/xmforxm98/Images/main/C1.png",
          alt: "PSA Vehicle Management - Main Dashboard Overview"
        },
        {
          url: "https://raw.githubusercontent.com/xmforxm98/Images/main/C2.png",
          alt: "PSA Vehicle Management - Smartwatch Interface Design"
        },
        {
          url: "https://raw.githubusercontent.com/xmforxm98/Images/main/C3.png", 
          alt: "PSA Vehicle Management - Gesture Control System"
        },
        {
          url: "https://raw.githubusercontent.com/xmforxm98/Images/main/C4.png",
          alt: "PSA Vehicle Management - Autonomous Parking Feature"
        },
        {
          url: "https://raw.githubusercontent.com/xmforxm98/Images/main/C5.png",
          alt: "PSA Vehicle Management - User Experience Flow"
        }
      ];
    } else if (project.id === "smart-city-platform") {
      return [
        {
          url: "https://raw.githubusercontent.com/xmforxm98/Images/main/S1.png",
          alt: "Smart City Platform - Main Dashboard Overview"
        },
        {
          url: "https://raw.githubusercontent.com/xmforxm98/Images/main/S2.png",
          alt: "Smart City Platform - Urban Analytics Interface"
        },
        {
          url: "https://raw.githubusercontent.com/xmforxm98/Images/main/S3.png",
          alt: "Smart City Platform - Infrastructure Monitoring"
        },
        {
          url: "https://raw.githubusercontent.com/xmforxm98/Images/main/S4.png",
          alt: "Smart City Platform - Real-time Data Visualization"
        }
      ];
    }
    return [];
  };

  const galleryImages = getGalleryImages();

  // Gallery images for project gallery section (excluding main image)
  const projectGalleryImages = galleryImages.slice(1);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleMainImageClick = () => {
    setSelectedImageIndex(0); // First image is at index 0 in galleryImages
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : galleryImages.length - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex < galleryImages.length - 1 ? selectedImageIndex + 1 : 0);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    } else if (e.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (e.key === 'ArrowRight') {
      handleNextImage();
    }
  };

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImageIndex]);

  const getProjectContent = () => {
    if (project.id === "creative-portfolio") {
      return `
PSA Integrated Vehicle Management and Smartwatch App: Proposing Next-Generation Mobility Experience
Keywords: Smartwatch Interaction, Autonomous Driving Interaction, HMI

## Challenge

Existing vehicle management applications suffered from an unintuitive interface and complex feature accessibility, leading to very low driver utilization. Furthermore, future autonomous driving features would necessitate complex operations and extensive information delivery. The current legacy UI/UX posed a significant risk of confusing users, highlighting the need for a new user experience. My focus was on solving these issues and proactively proposing an innovative user experience for the new era of mobility.

## Solution and My Role

As an intern designer, I proposed a next-generation interaction design and a smartwatch integration experience for the PSA vehicle management app. My approach was rooted in user-centered design methodologies, aiming to find UX/UI solutions optimized for a future mobility environment.

### Proposing Intuitive Autonomous Parking via Smartwatch Gesture Control
Through user research, I identified driver pain points and safety needs when controlling parking from outside the vehicle.
Based on this, I leveraged interaction design and concept prototyping to propose an innovative method: drivers could activate the vehicle's autonomous parking function with simple gesture controls via the smartwatch app. This significantly reduced complex operational burdens for drivers, prioritizing convenience and safety.

### Proposing Future-Oriented Vehicle Management Dashboard and Remote Control UI Concepts
For the main vehicle management app, I designed a dashboard concept that allowed for visually clear identification of key information like vehicle status, fuel levels, and driving history.
Basic remote control functions, such as locking/unlocking the vehicle and controlling the air conditioning, were also proposed with an intuitive UI concept to maximize usability.

## Outcome

Despite being a concept design, this project garnered a highly positive internal response due to its innovative approach and future-oriented user experience proposal. The idea of gesture control via smartwatch integration, in particular, received high praise for demonstrating the potential for a new kind of vehicle interaction experience for drivers. This project was a valuable opportunity for me to effectively showcase my ability to understand complex problems and propose innovative, user-centered design solutions.

## Key Features

• **Smartwatch Integration**: Control key vehicle functions from your wrist, specifically activating the autonomous parking feature
• **Gesture Control**: Issue parking commands with intuitive gestures, eliminating complex operations
• **Real-time Vehicle Status Monitoring**: Check and manage all vehicle information in real-time via the smartphone app
• **Remote Control**: Increase convenience by remotely controlling various functions like vehicle lock/unlock, engine start, and temperature adjustment`;
    } else if (project.id === "smart-city-platform") {
      return `
The Smart City Management Platform represents a comprehensive solution for modern urban planning and infrastructure management. This integrated platform enables city administrators to monitor, analyze, and optimize urban systems through real-time data visualization and intelligent analytics.

## Project Challenge

Modern cities face unprecedented challenges in managing complex infrastructure systems, from traffic flow and energy distribution to waste management and public safety. Traditional urban management approaches often operate in silos, lacking the integration necessary for efficient city-wide coordination. The challenge was to create a unified platform that could aggregate diverse data sources and provide actionable insights for better urban decision-making.

## Design Solution

I developed a user-centric design approach that prioritizes clarity, accessibility, and real-time functionality for city administrators and urban planners.

### Integrated Dashboard System
The platform features a comprehensive dashboard that consolidates data from multiple urban systems - traffic sensors, energy grids, waste management, and public services - into a single, intuitive interface that enables quick decision-making and efficient resource allocation.

### Real-time Monitoring & Analytics
Advanced data visualization tools provide real-time monitoring of city infrastructure, allowing administrators to identify patterns, predict potential issues, and respond proactively to urban challenges before they become critical problems.

### Modular Interface Design
The platform's modular design allows different departments to access relevant information while maintaining a consistent user experience. Each module can be customized based on specific departmental needs while preserving overall system coherence.

### Mobile-responsive Design
Understanding that city management requires flexibility, the platform was designed to be fully responsive, enabling administrators to monitor and manage city systems from any device, whether in the office or in the field.

## Project Impact

The Smart City Management Platform has significantly improved urban operational efficiency, enabling better resource allocation, faster emergency response times, and more informed policy decisions. The platform's intuitive design has reduced training time for new users while increasing overall system adoption across city departments.

## Key Features

• **Real-time Data Integration**: Consolidates multiple urban data sources into a unified monitoring system
• **Predictive Analytics**: Uses machine learning to forecast urban trends and potential infrastructure issues
• **Interactive Mapping**: Provides geographic visualization of city data for spatial analysis and planning
• **Multi-department Access**: Enables different city departments to access relevant data through role-based permissions
• **Emergency Response Tools**: Rapid alert systems and coordination tools for emergency situations
• **Performance Metrics**: Comprehensive KPI tracking for measuring city service effectiveness`;
    } else if (project.id === "made-project") {
      return `
M.A.D.E. Project: Lead Designer Delivering User-Centered Solutions and Business Performance (Challenge and Learning-Focused)

The M.A.D.E. project was an attempt to directly connect marketers and advertisers, discover top talent through competition, and innovate the digital advertising market. In this project, I served as the lead designer overseeing the overall user experience of the service, while simultaneously taking on a PM role, focusing on business development and initial performance creation.

## Challenge

At the time, the digital advertising market had the following clear problems:

**Inefficient Marketer-Advertiser Matching**: Advertisers struggled to find capable marketers, and talented marketers had difficulty getting opportunities to showcase their potential.

**Low Campaign Performance**: Due to opaque processes and lack of performance-based reward systems, advertising campaigns often showed poor ROI (Return on Investment).

**Absence of Data-Driven Decision Making**: There was no sophisticated system to objectively evaluate marketers' actual performance and find optimal matches.

The M.A.D.E. project aimed to solve these problems and build a new ecosystem that would drive high-performance campaigns through competition and rewards.

## My Role and Solution

As lead designer, I oversaw the overall user experience (UX) of the service, while also taking on a PM role focusing on creating business performance.

### User Research-Centered Product Design Leadership (Lead Designer Role)

**Leading Core User Research**: I directly designed and executed user research to deeply understand the needs and pain points of potential users (advertisers, marketers). This helped derive the service's core value proposition and feature direction.

**Presenting Product Design Vision**: Collaborating with one designer, I presented the overall UX/UI direction and core interaction vision for the M.A.D.E. project. Rather than creating specific design deliverables, I focused on clearly defining the user journey and core flows, providing design guidelines that would enable the designer to work efficiently.

**Attempting Data-Based Matching Algorithm Application**: I attempted to apply data science techniques similar to algorithms used in index funds for marketer performance evaluation and optimal matching. This was an important process to provide users with the best matching experience.

### Initial Business Development and Performance Creation (PM Role)

**Direct Advertiser Acquisition and Sales Leadership**: Delegating specific schedule management to another PM, I directly acquired 3 advertisers and continuously communicated with them to convey the value of the M.A.D.E. project.

**Securing Ad Spend and Live Experiments**: Through the acquired advertisers, I secured approximately 50 million KRW in ad spend to conduct live experiments through actual advertising campaign operations. This allowed us to verify the service's marketability and core hypotheses.

**Rapid Reflection of Product User Feedback**: I led user-centered rapid iterations by directly meeting with advertiser and marketer users to quickly collect in-depth feedback and reflect it in product improvement directions.

## Key Achievements and Learning

Although the M.A.D.E. project ultimately did not achieve the expected results, it provided the following visible achievements and valuable learning experiences as both lead designer and PM:

### Enhanced User Research-Based Product Direction Capability
Through in-depth user research, I significantly strengthened my capability as a lead designer to identify fundamental service problems and present strategic design directions to solve them.

### Actual Business Performance Creation and Market Validation
I created concrete initial business performance by acquiring 3 advertisers and executing 50 million KRW in ad spend. This was an important experience that went beyond simply presenting ideas to verify product value in the actual market and confirm revenue model possibilities.

### Data-Based Thinking and Experiment Leadership
Through algorithm application attempts, I directly experienced how data affects user experience and business performance. Additionally, through live experiments with actual users, I improved my data-based experiment leadership capabilities by verifying hypotheses and quickly collecting feedback to improve products.

### Complex Problem Solving and Leadership Experience
Combining design leadership and PM roles, I developed complex problem-solving abilities spanning product strategy formulation, design direction presentation, business development, user relationship building, and technical challenges. In particular, I demonstrated leadership in successfully leading projects through smooth communication and collaboration with external stakeholders.

## Challenges and Valuable Learning Through Difficulties

Despite the initial idea's potential, this project had limitations in final performance creation due to the following unexpected external and internal factors:

### Limitations of Complex Marketing
Due to industry characteristics where marketers mainly generate revenue through search advertising or SEO optimization on digital advertising platforms (Meta, Google, etc.), there were limitations in comprehensively implementing various complex marketing strategies within our platform.

### Constraints as 3rd Party
Due to the industry structure where marketing commissions are added to campaign budgets and 3rd party accessibility issues to individual advertising accounts, there were difficulties in budget distribution and efficient campaign management.

### Unexpected Legal Issues
We faced unforeseen legal and accounting limitations in the structure of making payments to individual marketers.

### Expected ROAS (Return on Ad Spend) Shortfall
Although we continuously worked to solve these structural problems, ultimately not meeting our expected ROAS significantly affected the project's sustainability.

This project provided me with valuable experience in leading user-centered design, creating actual business performance, and rapidly learning and growing in challenging situations. Although it did not achieve perfect success, the process of deeply understanding these structural constraints and market characteristics and learning through failure will greatly contribute to solving complex problems and creating substantial value in any future environment.

## Key Features

• **Competition-Based Talent Discovery**: Platform enabling marketers to showcase their skills through competitive campaigns
• **Data-Driven Matching Algorithm**: Advanced matching system pairing advertisers with optimal marketers based on performance metrics
• **Performance-Based Rewards**: Transparent compensation structure incentivizing high-quality campaign results
• **Real-Time Campaign Monitoring**: Comprehensive dashboard for tracking campaign performance and ROI
• **User Research Integration**: Deep user insights driving platform development and feature prioritization
• **Rapid Iteration Framework**: Agile approach enabling quick response to user feedback and market changes`;
    }
    
    return `
This project represents a comprehensive approach to modern design challenges, focusing on user-centered solutions that deliver both aesthetic appeal and functional excellence.

## Project Overview

The ${project.title} project showcases my ability to tackle complex design problems while maintaining a clear focus on user needs and business objectives. Through careful research, iterative design, and collaborative development, this project demonstrates the full spectrum of modern UX/UI design practices.`;
  };

  const projectContent = getProjectContent() + `

## Design Process

### Research & Discovery
I began this project with extensive user research to understand the target audience's needs, pain points, and behavioral patterns. This foundation informed every subsequent design decision and ensured the final product would resonate with users.

### Ideation & Conceptualization
Multiple design concepts were explored through sketching, wireframing, and rapid prototyping. Each iteration was evaluated against user requirements and technical constraints to identify the most promising direction.

### Design Development
The chosen concept was refined through high-fidelity mockups and interactive prototypes. Special attention was paid to accessibility, responsive design, and consistency across all touchpoints.

### Testing & Validation
User testing sessions provided valuable feedback that shaped the final design. Multiple rounds of testing ensured the solution met both user expectations and business goals.

## Key Features

• **Intuitive Navigation**: Streamlined user flows that guide users naturally through the experience
• **Responsive Design**: Optimized for all device types and screen sizes
• **Accessibility**: WCAG compliant design ensuring inclusive user experience
• **Performance**: Optimized for fast loading and smooth interactions
• **Scalability**: Design system approach allowing for future growth and modifications

## Technical Implementation

The project was developed using modern web technologies and best practices. Close collaboration with the development team ensured that the design vision was faithfully translated into the final product.

## Results & Impact

The project delivered measurable improvements in user engagement, conversion rates, and overall user satisfaction. These outcomes validated the design approach and demonstrated the value of user-centered design principles.

## Lessons Learned

This project reinforced the importance of continuous user feedback throughout the design process. It also highlighted the value of close collaboration between design and development teams in achieving optimal results.
  `;

  return (
    <div className="flex h-full relative">
      {/* Main content */}
      <div 
        className={`flex flex-col overflow-auto transition-all duration-300 ${
          isChatOpen 
            ? isMobile 
              ? "w-full" 
              : "w-1/2" 
            : "w-full"
        }`}
      >
        <motion.div 
          className="max-w-4xl mx-auto p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back button */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="gap-2 hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </motion.div>

          {/* Project header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
              {project.featured && (
                <Badge variant="secondary">Featured</Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              {project.description}
            </p>

            {/* Project meta */}
            <div className="flex items-center justify-between border-b border-muted pb-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {project.year}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  onClick={handleStartChat}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask to Chat
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Featured image */}
          <motion.div 
            className="mb-8 rounded-lg overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={(project.id === "creative-portfolio" || project.id === "smart-city-platform") && galleryImages.length > 0 ? handleMainImageClick : undefined}
          >
            <ImageWithFallback
              src={project.imageUrl}
              alt={project.title}
                              className={`w-full aspect-video object-cover ${
                  (project.id === "creative-portfolio" || project.id === "smart-city-platform") && galleryImages.length > 0
                    ? "transition-transform duration-300 group-hover:scale-105" 
                    : ""
                }`}
            />
          </motion.div>

          {/* Additional images gallery for projects with multiple images */}
          {(project.id === "creative-portfolio" || project.id === "smart-city-platform") && galleryImages.length > 1 && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <h3 className="text-xl font-semibold mb-4">Project Gallery</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {projectGalleryImages.map((image, index) => (
                   <motion.div
                     key={index}
                     className="rounded-lg overflow-hidden group cursor-pointer"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                     whileHover={{ y: -5 }}
                     onClick={() => handleImageClick(index + 1)} // +1 because main image is at index 0
                   >
                     <ImageWithFallback
                       src={image.url}
                       alt={image.alt}
                       className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                     />
                   </motion.div>
                 ))}
              </div>
            </motion.div>
          )}

          {/* Project highlights */}
          <motion.div 
            className="grid md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {project.id === "creative-portfolio" ? (
              <>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Innovation</h3>
                  <p className="text-sm text-muted-foreground">
                    Pioneering smartwatch gesture control for autonomous parking in automotive UX.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Seamless connection between smartphone app and smartwatch for unified experience.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Future-Ready</h3>
                  <p className="text-sm text-muted-foreground">
                    Designed for upcoming autonomous driving features with forward-thinking approach.
                  </p>
                </Card>
              </>
            ) : project.id === "smart-city-platform" ? (
              <>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Unified platform consolidating multiple urban systems for comprehensive city management.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Real-time Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced data visualization and predictive analytics for proactive urban planning.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Scalability</h3>
                  <p className="text-sm text-muted-foreground">
                    Modular design enabling flexible adaptation to different city departments and needs.
                  </p>
                </Card>
              </>
            ) : (
              <>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Challenge</h3>
                  <p className="text-sm text-muted-foreground">
                    Balancing user needs with business constraints while delivering innovative solutions.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Solution</h3>
                  <p className="text-sm text-muted-foreground">
                    User-centered design approach with iterative testing and refinement.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Improved user engagement and satisfaction through thoughtful design.
                  </p>
                </Card>
              </>
            )}
          </motion.div>

          {/* Project content */}
          <motion.div 
            className="max-w-none mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="whitespace-pre-wrap text-base leading-relaxed text-foreground space-y-4">
              {projectContent.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('• ')) {
                  const listItems = paragraph.split('\n').filter(item => item.startsWith('• '));
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                      {listItems.map((item, itemIndex) => (
                        <li key={itemIndex}>{item.replace('• ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div 
            className="border-t border-muted pt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={handleStartChat}
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <MessageSquare className="h-5 w-5" />
                Ask more about this project
              </Button>
              {project.detailUrl && (
                <Button variant="outline" size="lg" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  External Link
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className={`absolute top-0 right-0 h-full bg-background border-l border-muted shadow-xl ${
              isMobile ? "w-full bottom-0" : "w-1/2"
            }`}
            initial={{ 
              x: isMobile ? 0 : "100%",
              y: isMobile ? "100%" : 0
            }}
            animate={{ 
              x: 0,
              y: 0
            }}
            exit={{ 
              x: isMobile ? 0 : "100%",
              y: isMobile ? "100%" : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col h-full">
              {/* Chat header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-medium">Chat about {project.title}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCloseChat}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <X size={18} />
                </Button>
              </div>
              
              {/* Chat content */}
              <div className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto chat-container" style={{ maxHeight: '100%' }}>
                  <ProjectChatbot project={project} />
                </div>
              </div>
            </div>

            {/* Mobile drag indicator */}
            {isMobile && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-1 bg-muted-foreground/30 rounded-full"></div>
              </div>
            )}
                     </motion.div>
         )}
       </AnimatePresence>

       {/* Image Viewer Modal */}
       <AnimatePresence>
         {selectedImageIndex !== null && (
                        <motion.div
               className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={handleCloseModal}
             >
             <div className="relative w-full h-full flex items-center justify-center p-2">
               {/* Close button */}
               <button
                 onClick={handleCloseModal}
                 className="absolute top-3 right-3 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
               >
                 <X size={20} />
               </button>

               {/* Previous button */}
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   handlePrevImage();
                 }}
                 className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 p-2.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
               >
                 <ChevronLeft size={20} />
               </button>

               {/* Next button */}
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   handleNextImage();
                 }}
                 className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 p-2.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
               >
                 <ChevronRight size={20} />
               </button>

               {/* Image */}
               <motion.div
                 className="w-full h-full flex flex-col items-center justify-center"
                 initial={{ scale: 0.8 }}
                 animate={{ scale: 1 }}
                 exit={{ scale: 0.8 }}
                 onClick={(e) => e.stopPropagation()}
               >
                 <div className="flex-1 flex items-center justify-center w-full" style={{ maxHeight: 'calc(100vh - 120px)' }}>
                   <ImageWithFallback
                     src={galleryImages[selectedImageIndex].url}
                     alt={galleryImages[selectedImageIndex].alt}
                     className="max-w-[98vw] max-h-full object-contain rounded-lg shadow-2xl"
                   />
                 </div>

                 {/* Thumbnails */}
                 <div className="mt-2 mb-2">
                   <div className="flex justify-center space-x-1.5 bg-black/30 rounded-lg p-2">
                     {galleryImages.map((image, index) => (
                       <button
                         key={index}
                         onClick={(e) => {
                           e.stopPropagation();
                           setSelectedImageIndex(index);
                         }}
                         className={`relative w-12 h-9 rounded overflow-hidden transition-all duration-200 ${
                           index === selectedImageIndex 
                             ? 'ring-2 ring-white scale-105' 
                             : 'opacity-70 hover:opacity-100 hover:scale-105'
                         }`}
                       >
                         <ImageWithFallback
                           src={image.url}
                           alt={`Thumbnail ${index + 1}`}
                           className="w-full h-full object-cover"
                         />
                         {index === selectedImageIndex && (
                           <div className="absolute inset-0 bg-white/20" />
                         )}
                       </button>
                     ))}
                   </div>
                 </div>

                 {/* Image info */}
                 <div className="bg-black/50 text-white px-3 py-1.5 rounded-lg">
                   <p className="text-xs text-center">
                     {galleryImages[selectedImageIndex].alt}
                   </p>
                   <p className="text-xs text-center text-gray-300">
                     {selectedImageIndex + 1} / {galleryImages.length}
                   </p>
                 </div>
               </motion.div>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   );
 } 