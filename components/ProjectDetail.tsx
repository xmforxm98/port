import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MessageSquare, Calendar, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProjectData, useProject } from "./ProjectContext";
import { ProjectChatbot } from "../src/components/ProjectChatbot";
import { useMediaQuery } from "./ui/use-mobile";
import ProcessFlow from "../src/components/ui/ProcessFlow";
import ProblemTable from "../src/components/ui/ProblemTable";

interface ProjectDetailProps {
  project: ProjectData;
  onBack: () => void;
  onStartChat?: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { shouldOpenChat, setShouldOpenChat } = useProject();

  const handleStartChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setShouldOpenChat(false);
  };

  // Auto-open chat if shouldOpenChat is true
  useEffect(() => {
    if (shouldOpenChat) {
      setIsChatOpen(true);
      setShouldOpenChat(false);
    }
  }, [shouldOpenChat, setShouldOpenChat]);

  // Gallery images based on project type
  const getGalleryImages = () => {
    // If project has images array (side projects), use that
    if (project.images && project.images.length > 0) {
      return project.images.map((imageUrl, index) => ({
        url: imageUrl,
        alt: `${project.title} - Image ${index + 1}`
      }));
    }
    
    // For main projects with specific gallery logic
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
    if (project.id === "play2-project") {
      return `
Next Generation Live Event Ticketing Platform

Using existing cloud technology, we have produced a prototype of a serverless cloud-based real-time ticket reservation solution and released some. In order to prove the business model and hypothesis, we have signed a contract with major agencies and open 3 musical performances in Korea and sell them to users.

This project was a challenging solution to present a new ticketing UX that never existed before in Zero Two One. To this end, we analyzed user needs through in-depth interviews with more than 9 million user behavior data recorded on PL@Y2 from 2020 to 2022.

## 1. UX Research

I planned and executed quantitative/standard research with 2 team members. Power BI, Kibana, and Elastic studies were used to analyze PL@Y2's 9 million user behavior data, and interview methods were used for in-depth surveys.

The 9 million data include user-entered reviews and ticketing data from Interpark, Kakao and NHN, Korea's leading corporate ticketing companies. We also conducted a survey and in-depth interview with 38 event ticket buyers.

As a result, I had a deep understanding of the core user base of PL@Y2. The main key users of ticketing were **women between the ages of 20 and 30** who watched the same work more than twice and spent an average of **300,000 won per month** on cultural activities more than three times a week.

## 2. Problem Definition

Through research, we identified consumers' most important difficulties and their ultimate needs due to environmental limitations of the existing ticketing system. Their three key Pain Points were server problems, overlapping selections, macros and lack of real-time information, and the ultimate demand of ticket-buying users was the front seat of the work they were booking.

The causes of the ticketing experience, which was negative for not achieving the goal, could be defined as the environmental constraints of the system.

## 3. Solution

Our team tried to find the optimal UX solution to the problem presented. To this end, we created hypotheses for a total of four core UX environments, structured the hypotheses with UX/UI, and started designing them according to the design language of the existing PL@Y2.

### 3.1 UX Solution 1 - Pre Open

We designed a UX that allows users to come in an hour before the official opening of the ticket and book the essentials of ticket reservation.

This allows users waiting for resale to access anywhere on their mobile, not on their PCs, to avoid wasting time, and to eliminate the seat selection advantage of the resale-purpose macro program, allowing real buyers to buy seats.

In addition, reflecting the insights of the user behavior experience obtained through research, it is structured to enable **casting-first selection** rather than date-first selection of works.

### 3.2 UX Solution 2 - Real Time Information

It shows the number of real-time visitors to the circuit you want to enter to make a reservation and reveals the number of real-time visitors who select seats.

This will allow users to take various strategies for ticket reservation, such as choosing seats with low seat competition and viewing the rounds they want to see.

### 3.3 UX Solution 3 - One Touch Payment

In the case of the existing ticket reservation system, due to environmental problems such as PG company's server connected to the web/app, if the same seat is selected and purchased, the server does not provide information on the pre-empted seat.

Instead of making payments in real time, we devised a UX method that temporarily stores payment data in PL@Y2 servers and establishes an architecture in which connected PG servers are stable and pay sequentially to solve server problems and solve payments with one touch.

Through this, we have established a UX solution that allows you to immediately select another seat and try to pay even if the payment fails.

## Key Achievements

The PL@Y2 platform delivered significant improvements in user experience and business metrics:

**70% Improvement in Booking Completion Rates**: The streamlined booking process and real-time updates significantly reduced user abandonment.

**85% User Satisfaction Score**: Post-launch user feedback indicated high satisfaction with the new booking experience.

**45% Reduction in Customer Support Tickets**: Intuitive design and clear user flows reduced the need for customer support intervention.

**Successful High-Traffic Handling**: The platform successfully managed peak traffic during major event releases without system failures.

## Impact and Recognition

The PL@Y2 platform has become a benchmark for innovative ticketing solutions in Korea, with the design solutions being implemented across the entire ticketing platform serving millions of users. The project demonstrated the power of data-driven design and the importance of user-centered approaches in creating successful digital products.

## Key Features

• **Pre-Open Booking**: Hour-before access with casting-first selection to eliminate macro advantages
• **Real-Time Information**: Live visitor counts and seat competition data for strategic booking
• **One-Touch Payment**: Temporary data storage with sequential PG processing for seamless payments
• **Mobile-First Design**: Optimized for mobile access with responsive interface
• **Data-Driven Insights**: Based on 9M+ user behavior data from major Korean ticketing platforms
• **Agency Integration**: Partnerships with major agencies for 3 live musical performances`;
    } else if (project.id === "creative-portfolio") {
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
HMI - SKODA Vision E Concept: Next-Generation Automotive Interface Design

Participating in the Skoda Vision E project, I developed innovative scenarios to enhance the driving experience of modern vehicles. I designed and presented motion graphics that perfectly align with Skoda's distinctive design language, creating a seamless and engaging user interface for the future of automotive technology.

## Project Overview

The SKODA Vision E Concept represents a revolutionary approach to automotive Human-Machine Interface (HMI) design. This project focused on reimagining how drivers and passengers interact with vehicle systems, particularly in the context of autonomous and semi-autonomous driving scenarios.

## My Role and Solution

As the HMI designer for the SKODA Vision E Concept, I was responsible for creating intuitive interface designs and developing comprehensive user scenarios that would define the future of in-vehicle experiences.

### Scenario Development and User Experience Design

I devised a wide variety of scenarios specifically designed to improve the driving experience of modern vehicles. These scenarios considered different use cases, from traditional driving to fully autonomous modes, ensuring that the interface remains relevant and useful across all driving contexts.

### Motion Design and Brand Integration

Working closely with Skoda's design team, I created motion design elements that are perfectly suited to Skoda's established design language. The animations and transitions were crafted to feel natural and intuitive while maintaining the brand's sophisticated and modern aesthetic.

## Various Activities for Autonomous Vehicles

In the case of Skoda's Vision E, the concept featured an expansive display that extended from the driver's position to the passenger seat, creating an immersive digital environment that transforms the entire cabin experience.

This wide-format display enabled us to present a comprehensive range of activities and services, including:

### Integrated Service Applications
- **Ticket Reservation Systems**: Seamless booking for entertainment, travel, and events
- **Information Services**: Real-time access to relevant data and updates  
- **E-Book Platform**: Digital reading experiences optimized for automotive environments
- **Payment Service Integration**: Secure and convenient transaction capabilities

### Location-Based Tourism Services

One of the most well-received features was the "Touring On Trip" service, which provides location-based recommendations for characteristic local destinations and services. This innovative feature received significant positive feedback for its ability to enhance travel experiences by connecting passengers with unique local opportunities and attractions.

The service intelligently suggests points of interest, local restaurants, cultural sites, and unique experiences based on the vehicle's current location and route, transforming every journey into an opportunity for discovery and exploration.

## Key Achievements and Innovation

The SKODA Vision E Concept successfully demonstrated how automotive interfaces can evolve beyond traditional vehicle controls to become comprehensive lifestyle platforms. The project showcased the potential for vehicles to serve as mobile entertainment and service hubs while maintaining safety and usability standards.

## Key Features

• **Extended Display Technology**: Wide-format screen spanning driver and passenger areas for immersive experiences
• **Scenario-Based Interface Design**: Multiple user scenarios optimized for different driving modes and contexts
• **Motion Design Integration**: Smooth animations and transitions aligned with Skoda's design language
• **Location-Based Services**: Intelligent recommendations for local attractions and services  
• **Integrated Service Platform**: Comprehensive apps for entertainment, information, and commerce
• **Autonomous-Ready Design**: Interface designed for both traditional and autonomous driving scenarios`;
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

## Ranking System 

A digital advertising marketing solution based on AI algorithms that connects advertisers and marketers and ranks revenue-based ROAS to create the best marketing plan for advertisers.

## Project - Project Architecture

Gain and refine various raw data on advertisers' products to create digital advertising campaigns such as Google/Facebook/Naver. AI automatically generates ads at specific intervals and organizes advertising campaigns based on efficiency.

Finally, we used the Multi-Armed Bandit model to recommend advertising campaigns in real time and automatically create recommended campaigns to achieve maximum advertising efficiency. To that end, we started the project in two groups: the data science team and the web team.

As a PM, I was in charge of coordinating the schedule between the web development team and the data science team, securing and selecting UX data necessary for the situation, and leading the design planning.

## IA Information Structure Chart & Flow Chart

After defining requirements and functions with data science and web team members, we created a screen design IA information structure diagram. As users are divided into advertisers and marketers, we created an information structure diagram considering the perspective of the two users.

## Screen Design and Design System ~ Screen Design

Based on the information structure diagram, the overall screen was designed, and like one designer in the team, we designed a basic design system that includes common components such as buttons, input windows, and warning phrases. Later, based on the design system, we quickly moved to screen design and reduced development time by aligning it with web requirements in real time.

## Solution Result

A total of more than 40 screens appeared on the web screen divided into advertisers and marketers two sides. Advertisers have 18 screens in total, including screens to create ads and check the performance of ads, and 22 screens in total, including those to link marketing accounts, receive ads, conduct marketing, and verify performance.

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
    } else if (project.id === "b2b-saas-project") {
      return `
B2B SaaS AI Solution: Enterprise Data Analytics Platform

This comprehensive B2B SaaS solution provides enterprise clients with powerful real-time data monitoring and AI-driven insight generation capabilities. The platform combines advanced analytics with intuitive user experience design to help businesses make data-driven decisions and detect anomalies automatically.

## Project Overview

The project focuses on delivering sophisticated data analytics tools that transform complex enterprise data into actionable insights. By leveraging AI algorithms and predictive analytics, the platform enables organizations to monitor their operations in real-time and proactively address potential issues before they impact business performance.

## My Role and Solution

As the lead designer for this enterprise solution, I was responsible for creating an intuitive and powerful interface that could handle complex data visualization while remaining accessible to users across different technical skill levels.

## Real-time Data Dashboard

Our platform delivers comprehensive real-time data from companies nationwide through an intuitive dashboard interface. 

We developed a sophisticated monitoring system that presents critical, time-sensitive data in a clear, at-a-glance format. The dashboard enables users to track important metrics as they change in real-time, while also providing historical data recording and comparison capabilities over extended periods.

This real-time approach ensures that business leaders can respond immediately to changing conditions and make informed decisions based on the most current information available.

## Insight Derivation Tools

The platform provides powerful analytical tools that enable users to extract meaningful insights through flexible data combination options.

Users can select from various data sources and combine them in customizable ways to uncover hidden patterns, trends, and correlations that might not be apparent when viewing data in isolation. This approach empowers business analysts and decision-makers to explore their data from multiple perspectives and discover actionable insights that drive strategic planning.

## Key Achievements and Learning

The B2B SaaS AI Solution successfully delivered enhanced data visibility and decision-making capabilities for enterprise clients, resulting in improved operational efficiency and proactive issue resolution across multiple industry verticals.

## Key Features

• **Real-Time Data Monitoring**: Comprehensive dashboard displaying live business metrics and performance indicators
• **AI-Powered Analytics**: Advanced algorithms for predictive analytics and automated anomaly detection
• **Customizable Data Combinations**: Flexible tools allowing users to combine different data sources for deeper insights
• **Historical Data Tracking**: Long-term data storage with comparison and trend analysis capabilities
• **Enterprise Integration**: Seamless connection with existing business systems and data sources
• **Scalable Architecture**: Platform designed to handle large-scale enterprise data processing requirements`;
    }
    
    return `
This project represents a comprehensive approach to modern design challenges, focusing on user-centered solutions that deliver both aesthetic appeal and functional excellence.

## Project Overview

The ${project.title} project showcases my ability to tackle complex design problems while maintaining a clear focus on user needs and business objectives. Through careful research, iterative design, and collaborative development, this project demonstrates the full spectrum of modern UX/UI design practices.`;
  };

  const projectContent = getProjectContent();

  // Function to render bold text from **text** markdown
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

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
                {project.id === "play2-project" && (
                  <div className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <a 
                      href="https://apps.apple.com/kw/app/pl-y2/id1159328039?l=en-GB" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      App Store
                    </a>
                  </div>
                )}
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
            onClick={galleryImages.length > 0 ? handleMainImageClick : undefined}
          >
            <ImageWithFallback
              src={project.imageUrl}
              alt={project.title}
              className={`w-full aspect-video object-cover ${
                galleryImages.length > 0
                  ? "transition-transform duration-300 group-hover:scale-105" 
                  : ""
              }`}
            />
          </motion.div>

          {/* Additional images gallery for projects with multiple images */}
          {galleryImages.length > 1 && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <h3 className="text-xl font-semibold mb-4">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            ) : project.id === "play2-project" ? (
              <>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Challenge</h3>
                  <p className="text-sm text-muted-foreground">
                    Traditional ticketing systems with poor real-time availability and complex booking processes.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Solution</h3>
                  <p className="text-sm text-muted-foreground">
                    Serverless cloud-based real-time reservation platform with data-driven UX design.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    70% improvement in booking completion rates and 85% user satisfaction score.
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
                  const heading = paragraph.replace('## ', '');
                  // Add Process Flow before UX Research section for PLAY2 project
                  if (project.id === "play2-project" && heading === '1. UX Research') {
                    return (
                      <div key={index}>
                        <motion.div 
                          className="mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <ProcessFlow />
                        </motion.div>
                        <h2 className="text-2xl font-bold mt-8 mb-4">
                          {heading}
                        </h2>
                      </div>
                    );
                  }
                  // Add Problem Table after Problem Definition heading for PLAY2 project
                  if (project.id === "play2-project" && heading === '2. Problem Definition') {
                    return (
                      <div key={index}>
                        <h2 className="text-2xl font-bold mt-8 mb-4">
                          {heading}
                        </h2>
                      </div>
                    );
                  }
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {heading}
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
                        <li key={itemIndex}>{renderTextWithBold(item.replace('• ', ''))}</li>
                      ))}
                    </ul>
                  );
                }
                // Handle PLAY2 project specific content with images
                if (project.id === "play2-project") {
                  // Add image after UX Research section
                                     if (paragraph.includes("300,000 won per month")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <ImageWithFallback
                            src="/images/play2.png"
                            alt="PLAY2 User Research Data Analysis"
                            className="w-full h-auto object-cover"
                          />
                        </motion.div>
                      </div>
                    );
                  }
                  
                  // Add problem table after Problem Definition
                                     if (paragraph.includes("The causes of the ticketing experience")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <ProblemTable />
                        </motion.div>
                      </div>
                    );
                  }
                  
                  // Add image after Solution intro
                                     if (paragraph.includes("design language of the existing PL@Y2")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <ImageWithFallback
                            src="/images/play1.png"
                            alt="PLAY2 Solution Overview"
                            className="w-full h-auto object-cover"
                          />
                        </motion.div>
                      </div>
                    );
                  }
                  
                  // Add images after Pre Open solution
                                     if (paragraph.includes("casting-first selection")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <div className="rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src="/images/play4.png"
                              alt="PLAY2 Pre-Open Feature"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src="/images/play3.png"
                              alt="PLAY2 Casting Selection"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        </motion.div>
                      </div>
                    );
                  }
                  
                  // Add image after Real Time Information solution
                                     if (paragraph.includes("rounds they want to see")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <ImageWithFallback
                            src="/images/play5.png"
                            alt="PLAY2 Real-time Information"
                            className="w-full h-auto object-cover"
                          />
                        </motion.div>
                      </div>
                    );
                  }
                  
                  // Add images after One Touch Payment solution
                                     if (paragraph.includes("payment fails")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <div className="rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src="/images/play6.png"
                              alt="PLAY2 One Touch Payment"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src="/images/play2.png"
                              alt="PLAY2 Payment Flow"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        </motion.div>
                      </div>
                    );
                  }
                }
                
                // Handle M.A.D.E. project specific content with images
                if (project.id === "made-project") {
                  // Add image after Project Architecture section
                                     if (paragraph.includes("data science team and the web team")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <ImageWithFallback
                            src="/images/made1.png"
                            alt="M.A.D.E. Project Architecture"
                            className="w-full h-auto object-cover"
                          />
                        </motion.div>
                      </div>
                    );
                  }
                  
                  // Add image after IA Information Structure Chart section
                                     if (paragraph.includes("perspective of the two users")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <ImageWithFallback
                            src="/images/made3.png"
                            alt="M.A.D.E. IA Information Structure Chart"
                            className="w-full h-auto object-cover"
                          />
                        </motion.div>
                      </div>
                    );
                  }
                  
                  // Add image after Screen Design section
                                     if (paragraph.includes("aligning it with web requirements in real time")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <ImageWithFallback
                            src="/images/made5.png"
                            alt="M.A.D.E. Screen Design and Design System"
                            className="w-full h-auto object-cover"
                          />
                        </motion.div>
                      </div>
                    );
                  }
                  
                  // Add image after Solution Result section
                                     if (paragraph.includes("conduct marketing, and verify performance")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <ImageWithFallback
                            src="/images/made6.png"
                            alt="M.A.D.E. Solution Result"
                            className="w-full h-auto object-cover"
                          />
                        </motion.div>
                      </div>
                    );
                  }
                }
                
                // Handle B2B SaaS project specific content with images
                if (project.id === "b2b-saas-project") {
                  // Add image after Real-time Data Dashboard section
                                     if (paragraph.includes("most current information available")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <ImageWithFallback
                            src="/images/dataanalytics2.png"
                            alt="B2B SaaS Real-time Data Dashboard"
                            className="w-full h-auto object-cover"
                          />
                        </motion.div>
                      </div>
                    );
                  }
                  
                  // Add image after Insight Derivation Tools section
                                     if (paragraph.includes("drive strategic planning")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <ImageWithFallback
                            src="/images/dataanalytics3.png"
                            alt="B2B SaaS Insight Derivation Tools"
                            className="w-full h-auto object-cover"
                          />
                        </motion.div>
                      </div>
                    );
                  }
                }
                
                // Handle HMI - SKODA Vision E Concept project specific content with images  
                if (project.id === "smart-city-platform") {
                  // Add images after Motion Design and Brand Integration section
                                     if (paragraph.includes("sophisticated and modern aesthetic")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 space-y-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <div className="rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src="/images/skodavision1.png"
                              alt="SKODA Vision E Concept - HMI Design"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src="/images/skodavision4.png"
                              alt="SKODA Vision E Concept - Interface Design"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        </motion.div>
                      </div>
                    );
                  }
                  
                  // Add image after Location-Based Tourism Services section
                                     if (paragraph.includes("opportunity for discovery and exploration")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <ImageWithFallback
                            src="/images/skodavision5.png"
                            alt="SKODA Vision E Concept - Touring On Trip Service"
                            className="w-full h-auto object-cover"
                          />
                        </motion.div>
                      </div>
                    );
                  }
                }
                
                // Handle PSA project specific content with images
                if (project.id === "creative-portfolio") {
                  // Add all 4 images after outcome section
                                     if (paragraph.includes("innovative, user-centered design solutions")) {
                     return (
                       <div key={index}>
                         <p className="mb-4">{renderTextWithBold(paragraph)}</p>
                        <motion.div 
                          className="my-6 space-y-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <div className="rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src="/images/psa1.png"
                              alt="PSA Smartwatch and Mobile App Interface Design"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src="/images/psa2.png"
                              alt="PSA Login Interface and Vehicle Selection"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src="/images/psa3.png"
                              alt="PSA Integrated Smartwatch and Mobile Experience"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src="/images/psa4.png"
                              alt="PSA Gesture Control and Autonomous Parking Features"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        </motion.div>
                      </div>
                    );
                  }
                }
                
                return (
                  <p key={index} className="mb-4">
                    {renderTextWithBold(paragraph)}
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
            className={`absolute top-0 right-0 h-full bg-transparent border-l border-muted shadow-xl ${
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
              <div className="flex justify-end items-center p-4 border-b">
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