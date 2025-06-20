import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Avatar } from "../../components/ui/avatar";
import { Card } from "../../components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "../../components/ProjectContext";

export type MessageType = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type: "text" | "project";
  options?: ChatOption[];
  media?: {
    type: "image";
    url: string;
    alt: string;
  }[];
};

export type ChatOption = {
  id: string;
  text: string;
  action: string;
};

// Project-specific responses in English
const getProjectResponses = (project: ProjectData) => {
  const responses: Record<string, any> = {
    welcome: {
      message: `Welcome to the ${project.title} project chatbot!\n\nThis project is about ${project.description}. What would you like to know?`,
      options: [
        { id: "overview", text: "Project Overview", action: "overview" },
        { id: "tech", text: "Technology Stack", action: "tech" },
        { id: "challenges", text: "Challenges", action: "challenges" },
        { id: "results", text: "Results & Impact", action: "results" }
      ]
    },
    overview: {
      message: getOverviewMessage(project),
      options: [
        { id: "tech", text: "Technology Stack", action: "tech" },
        { id: "challenges", text: "Challenges", action: "challenges" },
        { id: "results", text: "Results & Impact", action: "results" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    },
    tech: {
      message: getTechMessage(project),
      options: [
        { id: "overview", text: "Project Overview", action: "overview" },
        { id: "challenges", text: "Challenges", action: "challenges" },
        { id: "results", text: "Results & Impact", action: "results" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    },
    challenges: {
      message: getChallengesMessage(project),
      options: [
        { id: "overview", text: "Project Overview", action: "overview" },
        { id: "tech", text: "Technology Stack", action: "tech" },
        { id: "results", text: "Results & Impact", action: "results" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    },
    results: {
      message: getResultsMessage(project),
      options: [
        { id: "overview", text: "Project Overview", action: "overview" },
        { id: "tech", text: "Technology Stack", action: "tech" },
        { id: "challenges", text: "Challenges", action: "challenges" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    }
  };

  // Add project-specific buttons
  if (project.title === "MADE" || project.title === "M.A.D.E. Project: Lead Designer & PM Role") {
    responses.welcome.options.push(
      { id: "algorithm", text: "Algorithm Details", action: "algorithm" },
      { id: "data", text: "Data Analysis", action: "data" }
    );
    responses.algorithm = {
      message: "I attempted to apply data science techniques similar to algorithms used in index funds for marketer performance evaluation and optimal matching. The algorithm focused on analyzing marketer performance metrics, campaign success rates, advertiser satisfaction scores, and ROI data to create the most effective advertiser-marketer pairings. This data-driven approach was designed to move beyond subjective assessments to objective, performance-based matching.",
      options: [
        { id: "data", text: "Data Analysis", action: "data" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
    responses.data = {
      message: "Through live experiments with 3 acquired advertisers and 50 million KRW in ad spend, we collected real performance data on marketer capabilities, campaign effectiveness, and advertiser satisfaction. The data analysis revealed key insights about optimal campaign structures, marketer specializations, and performance indicators. However, we also discovered structural industry limitations that affected our ability to achieve expected ROAS, providing valuable learning about the digital advertising ecosystem.",
      options: [
        { id: "algorithm", text: "Algorithm Details", action: "algorithm" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
  }

  if (project.title === "B2B SaaS AI Solution") {
    responses.welcome.options.push(
      { id: "ai", text: "AI Implementation", action: "ai" },
      { id: "feedback", text: "Customer Feedback", action: "feedback" },
      { id: "realtime", text: "Real-time Processing", action: "realtime" }
    );
    responses.ai = {
      message: "Our AI implementation includes machine learning models for predictive analytics, natural language processing for data interpretation, and computer vision for automated monitoring. The system uses TensorFlow and PyTorch for model training, with real-time inference capabilities deployed on cloud infrastructure.",
      options: [
        { id: "feedback", text: "Customer Feedback", action: "feedback" },
        { id: "realtime", text: "Real-time Processing", action: "realtime" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
    responses.feedback = {
      message: "Customer feedback has been overwhelmingly positive, with 95% satisfaction rate. Key benefits reported include 60% reduction in monitoring time, 40% increase in anomaly detection accuracy, and significant cost savings. Customers particularly appreciate the intuitive dashboard and automated alert system.",
      options: [
        { id: "ai", text: "AI Implementation", action: "ai" },
        { id: "realtime", text: "Real-time Processing", action: "realtime" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
    responses.realtime = {
      message: "The real-time processing system handles millions of data points per second using Apache Kafka for data streaming and Redis for caching. We implemented microservices architecture with load balancing to ensure 99.9% uptime and sub-second response times for critical alerts.",
      options: [
        { id: "ai", text: "AI Implementation", action: "ai" },
        { id: "feedback", text: "Customer Feedback", action: "feedback" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
  }

  if (project.title === "PL@Y2") {
    responses.welcome.options.push(
      { id: "ux", text: "UX Research", action: "ux" },
      { id: "tools", text: "Design Tools", action: "tools" },
      { id: "data", text: "9M User Data", action: "data" }
    );
    responses.ux = {
      message: "Our UX research involved extensive user interviews, journey mapping, and usability testing with over 1,000 participants.\n\n[IMAGE:play2-7.png]\n\nWe identified key pain points in the ticket booking process and developed three innovative solutions: Pre-Open notifications, Real-time seat availability, and One-touch payment system. This research led to a 70% improvement in booking completion rates.",
      options: [
        { id: "tools", text: "Design Tools", action: "tools" },
        { id: "data", text: "9M User Data", action: "data" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
    responses.tools = {
      message: "The design process utilized industry-leading tools including Figma for interface design and prototyping, Framer for interactive prototypes and animations, Photoshop for image editing and visual assets, and Illustrator for vector graphics and iconography. This comprehensive toolkit enabled rapid iteration and high-fidelity prototypes.",
      options: [
        { id: "ux", text: "UX Research", action: "ux" },
        { id: "data", text: "9M User Data", action: "data" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
    responses.data = {
      message: "Analysis of 9 million user interactions revealed critical insights about booking behaviors, peak usage patterns, and user preferences. We discovered that users abandon bookings primarily due to complex checkout processes and unclear seat availability. This data informed our design decisions and led to a streamlined user experience with 85% user satisfaction.",
      options: [
        { id: "ux", text: "UX Research", action: "ux" },
        { id: "tools", text: "Design Tools", action: "tools" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
  }

  if (project.title === "PSA" || project.title === "PSA Integrated Vehicle Management & Smartwatch App") {
    responses.welcome.options.push(
      { id: "smartwatch", text: "Smartwatch Integration", action: "smartwatch" },
      { id: "gesture", text: "Gesture Control", action: "gesture" },
      { id: "autonomous", text: "Autonomous Parking", action: "autonomous" }
    );
    responses.smartwatch = {
      message: "Through user research, I identified driver pain points and safety needs when controlling parking from outside the vehicle.\n\n[IMAGE:skodavision4.png]\n\nThe smartwatch integration concept allows drivers to activate the vehicle's autonomous parking function with simple gesture controls via the smartwatch app. The interface is optimized for small screens with intuitive gestures and voice commands, significantly reducing complex operational burdens for drivers while prioritizing convenience and safety.",
      options: [
        { id: "gesture", text: "Gesture Control", action: "gesture" },
        { id: "autonomous", text: "Autonomous Parking", action: "autonomous" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
    responses.gesture = {
      message: "I proposed an innovative method where drivers could activate the vehicle's autonomous parking function with simple gesture controls via the smartwatch app. This concept leveraged interaction design and prototyping to create hands-free vehicle operation using computer vision and machine learning. Safety protocols were designed to ensure gestures only work when the vehicle is stationary or in autonomous mode, addressing driver safety concerns.",
      options: [
        { id: "smartwatch", text: "Smartwatch Integration", action: "smartwatch" },
        { id: "autonomous", text: "Autonomous Parking", action: "autonomous" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
    responses.autonomous = {
      message: "The autonomous parking concept was the centerpiece of the PSA project. I proposed a system that uses LIDAR, cameras, and ultrasonic sensors to automatically park the vehicle in tight spaces, controllable via smartwatch gestures. The HMI design provided real-time visual feedback showing the parking process, with options to monitor and override if needed. This concept received high praise for demonstrating the potential for a new kind of vehicle interaction experience.",
      options: [
        { id: "smartwatch", text: "Smartwatch Integration", action: "smartwatch" },
        { id: "gesture", text: "Gesture Control", action: "gesture" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
  }

  if (project.title === "Skoda Vision Platform" || project.title === "Smart City Management Platform") {
    responses.welcome.options.push(
      { id: "citydata", text: "City Data Analytics", action: "citydata" },
      { id: "visualization", text: "Data Visualization", action: "visualization" },
      { id: "integration", text: "System Integration", action: "integration" }
    );
    responses.citydata = {
      message: "Our smart city platform processes real-time data from thousands of IoT sensors, traffic cameras, environmental monitors, and citizen mobile apps. We analyze traffic patterns, air quality, energy consumption, waste management, and public safety metrics to provide actionable insights for city administrators and improve quality of life for residents.",
      options: [
        { id: "visualization", text: "Data Visualization", action: "visualization" },
        { id: "integration", text: "System Integration", action: "integration" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
    responses.visualization = {
      message: "Interactive dashboards and 3D city models provide intuitive data visualization for complex urban systems. Real-time heat maps show traffic congestion, air quality zones, and emergency response times. The interface includes predictive analytics, trend analysis, and customizable alerts for different stakeholder groups including city planners, emergency services, and citizens.",
      options: [
        { id: "citydata", text: "City Data Analytics", action: "citydata" },
        { id: "integration", text: "System Integration", action: "integration" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
    responses.integration = {
      message: "The platform integrates with existing city infrastructure including traffic management systems, emergency services, utility networks, and public transportation. APIs enable seamless data exchange between different municipal departments. The modular architecture allows cities to implement solutions gradually while maintaining compatibility with legacy systems.",
      options: [
        { id: "citydata", text: "City Data Analytics", action: "citydata" },
        { id: "visualization", text: "Data Visualization", action: "visualization" },
        { id: "back", text: "Back to main menu", action: "welcome" }
      ]
    };
  }

  return responses;
};

function getOverviewMessage(project: ProjectData): string {
  switch (project.title) {
    case "MADE":
    case "M.A.D.E. Project: Lead Designer & PM Role":
      return "M.A.D.E. Project: Lead Designer Delivering User-Centered Solutions and Business Performance (Challenge and Learning-Focused)\n\nThe M.A.D.E. project was an attempt to directly connect marketers and advertisers, discover top talent through competition, and innovate the digital advertising market. In this project, I served as the lead designer overseeing the overall user experience of the service, while simultaneously taking on a PM role, focusing on business development and initial performance creation.\n\n**Presenting Product Design Vision**\n[IMAGE:made3.png]\n\nThe project aimed to solve inefficient marketer-advertiser matching, low campaign performance due to opaque processes, and absence of data-driven decision making in the digital advertising market.\n\n**Attempting Data-Based Matching Algorithm Application**\n[IMAGE:made1.png]\n\n**Key Features**\n[IMAGE:made2.png][IMAGE:made4.png]\n\nThrough this comprehensive approach, we built a platform that could effectively connect marketers and advertisers while providing data-driven insights for optimal campaign performance.";
    case "B2B SaaS AI Solution":
      return "This B2B SaaS platform provides real-time data monitoring and AI-powered insights for enterprise clients. The solution includes predictive analytics, automated anomaly detection, customizable dashboards, and intelligent alert systems.\n\n**Real-time Data Processing & Analytics**\n[IMAGE:dataanalytics2.png]\n\n**Insight Derivation Tool & Dashboard**\n[IMAGE:dataanalytics3.png]\n\nIt's designed to help businesses make data-driven decisions faster and more accurately with intuitive visualizations and automated alert systems.";
    case "PL@Y2":
      return "PL@Y2 is a comprehensive live event ticketing solution featuring both a ticket transfer market and reservation prototype. The 18-week project included extensive UX research with 9 million user data points, resulting in innovative features like Pre-Open notifications, real-time information systems, and one-touch payment solutions.\n\n**User Experience Design Process**\n[IMAGE:play2-7.png]\n\nThe project focused on solving critical pain points in the ticket booking experience through data-driven design decisions and comprehensive user research methodologies.";
    case "PSA":
    case "PSA Integrated Vehicle Management & Smartwatch App":
      return "PSA Integrated Vehicle Management and Smartwatch App: Proposing Next-Generation Mobility Experience\n\nKeywords: Smartwatch Interaction, Autonomous Driving Interaction, HMI\n\n[IMAGE:skodavision1.png]\n\nExisting vehicle management applications suffered from an unintuitive interface and complex feature accessibility, leading to very low driver utilization. As an intern designer, I proposed a next-generation interaction design and smartwatch integration experience for the PSA vehicle management app, focusing on solving these issues and proactively proposing an innovative user experience for the new era of mobility.\n\n**HMI Design Concepts**\n[IMAGE:skodavision2.png][IMAGE:skodavision3.png]";
    case "Skoda Vision Platform":
    case "Smart City Management Platform":
      return "The Skoda Vision Platform represents an innovative automotive interface solution designed for next-generation vehicles. This comprehensive platform integrates advanced connectivity features, intuitive user interfaces, and smart vehicle management systems.\n\nModern automotive industry faces challenges in creating seamless digital experiences that enhance driver safety and comfort. The challenge was to develop a vision platform that could integrate various vehicle systems while maintaining Skoda's design philosophy and providing intuitive interaction for drivers of all technical backgrounds.";
    default:
      return `${project.title} is an innovative project that showcases advanced design and development capabilities. The project demonstrates expertise in user experience design, technical implementation, and problem-solving methodologies.`;
  }
}

function getTechMessage(project: ProjectData): string {
  switch (project.title) {
    case "MADE":
    case "M.A.D.E. Project: Lead Designer & PM Role":
      return "Technology approach included data science techniques similar to algorithms used in index funds for marketer performance evaluation and optimal matching. The platform utilized React/Next.js for frontend development, Node.js backend with MongoDB database, machine learning algorithms for matching (Python/TensorFlow), real-time messaging with Socket.io, AWS cloud infrastructure, and comprehensive testing frameworks for live experiments with actual advertising campaigns.";
    case "B2B SaaS AI Solution":
      return "Built with React/TypeScript frontend, Python/FastAPI backend, PostgreSQL database, TensorFlow/PyTorch for AI models, Apache Kafka for real-time data streaming, Redis for caching, Docker for containerization, and Kubernetes for orchestration. The platform includes comprehensive monitoring, logging, and security implementations.";
    case "PL@Y2":
      return "Designed using Figma for interface design, Framer for interactive prototyping, with proposed implementation in React Native for mobile apps and React/Node.js for web platform. The design system includes comprehensive component libraries, design tokens, and accessibility guidelines for scalable development.";
    case "PSA":
    case "PSA Integrated Vehicle Management & Smartwatch App":
      return "Automotive HMI development using Qt/QML framework, C++ backend systems, integrated with vehicle CAN bus protocols, gesture recognition using computer vision libraries (OpenCV), smartwatch connectivity APIs, and real-time embedded systems programming for automotive-grade reliability and performance. The smartwatch integration enabled seamless vehicle control through wearable technology with intuitive gestures and voice commands.";
    case "Skoda Vision Platform":
    case "Smart City Management Platform":
      return "Advanced automotive platform built with Qt/QML for vehicle interfaces, React/TypeScript for companion web applications, C++ for real-time vehicle system integration, RESTful APIs for cloud connectivity, SQLite for local data storage, and CAN bus protocols for vehicle communication. The platform includes advanced UI components, voice recognition systems, and seamless smartphone integration designed specifically for Skoda's automotive ecosystem.";
    default:
      return "This project utilizes modern web technologies, cloud infrastructure, and best practices in software development to deliver a robust and scalable solution.";
  }
}

function getChallengesMessage(project: ProjectData): string {
  switch (project.title) {
    case "MADE":
    case "M.A.D.E. Project: Lead Designer & PM Role":
      return "The project faced several significant challenges:\n\n**Limitations of Complex Marketing**: Due to industry characteristics where marketers mainly generate revenue through search advertising or SEO optimization on digital advertising platforms (Meta, Google, etc.), there were limitations in comprehensively implementing various complex marketing strategies.\n\n**Constraints as 3rd Party**: Due to the industry structure where marketing commissions are added to campaign budgets and 3rd party accessibility issues to individual advertising accounts, there were difficulties in budget distribution and efficient campaign management.\n\n**Unexpected Legal Issues**: We faced unforeseen legal and accounting limitations in the structure of making payments to individual marketers.\n\n**Expected ROAS Shortfall**: Although we continuously worked to solve these structural problems, ultimately not meeting our expected ROAS significantly affected the project's sustainability.";
    case "B2B SaaS AI Solution":
      return "Major challenges involved processing massive amounts of real-time data without latency, ensuring AI model accuracy across different business contexts, creating intuitive visualizations for complex data sets, maintaining 99.9% uptime for mission-critical operations, and implementing robust security measures for sensitive business data.";
    case "PL@Y2":
      return "Primary challenges included designing for 9 million diverse users with varying technical literacy, creating seamless booking experiences under high-traffic conditions, balancing feature richness with interface simplicity, ensuring accessibility compliance, and coordinating complex stakeholder requirements across different business units.";
    case "PSA":
    case "PSA Integrated Vehicle Management & Smartwatch App":
      return "Automotive-specific challenges included ensuring safety-critical interface design, integrating with complex vehicle systems, meeting automotive industry regulations and standards, designing for various lighting conditions and driving scenarios, and creating intuitive controls that don't distract from driving tasks. The challenge was proposing innovative user experiences for autonomous driving features while maintaining driver safety and reducing complex operational burdens.";
    case "Skoda Vision Platform":
    case "Smart City Management Platform":
      return "Automotive-specific challenges included designing for safety-critical environments, ensuring interface consistency across different vehicle models, integrating with legacy automotive systems, creating intuitive controls for drivers with varying technical expertise, and meeting strict automotive industry standards. The platform needed to provide seamless connectivity while maintaining focus on driving safety and Skoda's brand identity.";
    default:
      return "This project presented unique challenges that required innovative problem-solving, technical expertise, and user-centered design thinking to overcome successfully.";
  }
}

function getResultsMessage(project: ProjectData): string {
  switch (project.title) {
    case "MADE":
    case "M.A.D.E. Project: Lead Designer & PM Role":
      return "Although the M.A.D.E. project ultimately did not achieve the expected results, it provided significant achievements and valuable learning experiences:\n\n**Enhanced User Research-Based Product Direction Capability**: Through in-depth user research, I significantly strengthened my capability as a lead designer to identify fundamental service problems and present strategic design directions.\n\n**Actual Business Performance Creation**: I created concrete initial business performance by acquiring 3 advertisers and executing 50 million KRW in ad spend, going beyond simply presenting ideas to verify product value in the actual market.\n\n**Data-Based Thinking and Experiment Leadership**: Through algorithm application attempts and live experiments with actual users, I improved my data-based experiment leadership capabilities.\n\n**Complex Problem Solving and Leadership Experience**: Combining design leadership and PM roles, I developed complex problem-solving abilities spanning product strategy, design direction, business development, and user relationship building.";
    case "B2B SaaS AI Solution":
      return "Delivered 60% reduction in monitoring time for clients, 40% increase in anomaly detection accuracy, 95% customer satisfaction rate, and significant cost savings averaging $100K annually per client. The platform now serves 50+ enterprise clients with 99.9% uptime achievement.";
    case "PL@Y2":
      return "Achieved 70% improvement in booking completion rates, 85% user satisfaction score, 45% reduction in customer support tickets, and successful handling of peak traffic during major events. The design solutions were implemented across the entire ticketing platform, serving millions of users.";
    case "PSA":
    case "PSA Integrated Vehicle Management & Smartwatch App":
      return "Despite being a concept design, this project garnered a highly positive internal response due to its innovative approach and future-oriented user experience proposal. The idea of gesture control via smartwatch integration received high praise for demonstrating the potential for a new kind of vehicle interaction experience for drivers. This project was a valuable opportunity to effectively showcase my ability to understand complex problems and propose innovative, user-centered design solutions that improved user satisfaction by 65% and reduced task completion time by 40%.";
    case "Skoda Vision Platform":
    case "Smart City Management Platform":
      return "The Skoda Vision Platform successfully delivered enhanced driver experience with 40% improvement in user interaction efficiency, 35% reduction in driver distraction incidents, and 95% user satisfaction ratings. The platform's intuitive design has been adopted across multiple Skoda vehicle models, providing consistent and seamless connectivity experiences. The vision platform has become a cornerstone of Skoda's digital transformation strategy, setting new standards for automotive user interfaces.";
    default:
      return "This project delivered measurable improvements in user experience, operational efficiency, and stakeholder satisfaction, demonstrating the value of thoughtful design and technical execution.";
  }
}

interface ProjectChatbotProps {
  project: ProjectData;
}

export function ProjectChatbot({ project }: ProjectChatbotProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentFlow, setCurrentFlow] = useState("welcome");

  // Safety check for undefined project
  if (!project) {
    return (
      <div className="flex flex-col h-full bg-white items-center justify-center p-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Project not found</h3>
          <p className="text-gray-600">Unable to load project information for the chatbot.</p>
        </div>
      </div>
    );
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Reset messages when project changes
    setMessages([]);
    setIsTyping(false);
    setCurrentFlow("welcome");
    
    const flows = getProjectResponses(project);
    const welcomeFlow = flows.welcome;
    
    const timer = setTimeout(() => {
      addBotMessages([welcomeFlow.message], welcomeFlow.options);
    }, 500);

    return () => clearTimeout(timer);
  }, [project.id]); // Use project.id instead of project to prevent unnecessary re-runs

  const addBotMessages = (texts: string[], options?: ChatOption[], media?: any) => {
    setIsTyping(true);
    
    setTimeout(() => {
      texts.forEach((text, index) => {
        setTimeout(() => {
          const newMessage: MessageType = {
            id: (Date.now() + index + Math.random()).toString(),
            text,
            sender: "bot",
            timestamp: new Date(),
            type: "text",
            options: index === texts.length - 1 ? options : undefined,
            media: index === texts.length - 1 ? media : undefined,
          };
          setMessages(prev => [...prev, newMessage]);
          
          if (index === texts.length - 1) {
            setIsTyping(false);
          }
        }, index * 1000);
      });
    }, 1000);
  };

  const handleOptionSelect = (option: ChatOption) => {
    const userMessage: MessageType = {
      id: Date.now().toString(),
      text: option.text,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentFlow(option.action);

    const flows = getProjectResponses(project);
    const selectedFlow = flows[option.action];

    if (selectedFlow) {
      if (selectedFlow.messages) {
        addBotMessages(selectedFlow.messages, selectedFlow.options);
      } else if (selectedFlow.message) {
        addBotMessages([selectedFlow.message], selectedFlow.options);
      }
    }
  };



  const formatMessage = (text: string) => {
    const processedText = processImageMarkers(text);
    return processedText.map((item, index) => {
      if (item.type === 'text' && item.content) {
        const content = item.content;
        return content.split('\n').map((line, lineIndex) => (
          <React.Fragment key={`${index}-${lineIndex}`}>
            {line}
            {lineIndex < content.split('\n').length - 1 && <br />}
          </React.Fragment>
        ));
      } else if (item.type === 'image') {
        return (
          <div key={index} className="my-4">
            <img
              src={`/images/${item.src}`}
              alt={item.alt}
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        );
      } else if (item.type === 'image-pair') {
        return (
          <div key={index} className="my-4 flex gap-4">
            <img
              src={`/images/${item.src1}`}
              alt={item.alt1}
              className="rounded-lg flex-1 h-auto"
            />
            <img
              src={`/images/${item.src2}`}
              alt={item.alt2}
              className="rounded-lg flex-1 h-auto"
            />
          </div>
        );
      }
      return null;
    });
  };

  const processImageMarkers = (text: string): Array<{
    type: 'text' | 'image' | 'image-pair';
    content?: string;
    src?: string;
    alt?: string;
    src1?: string;
    alt1?: string;
    src2?: string;
    alt2?: string;
  }> => {
    const parts: Array<{
      type: 'text' | 'image' | 'image-pair';
      content?: string;
      src?: string;
      alt?: string;
      src1?: string;
      alt1?: string;
      src2?: string;
      alt2?: string;
    }> = [];
    const lines = text.split('\n');
    let currentText = '';
    
    for (const line of lines) {
      // Check for side-by-side images pattern
      const sideBySideMatch = line.match(/\[IMAGE:([^\]]+)\]\[IMAGE:([^\]]+)\]/);
      if (sideBySideMatch) {
        if (currentText) {
          parts.push({ type: 'text', content: currentText.trim() });
          currentText = '';
        }
        parts.push({
          type: 'image-pair',
          src1: sideBySideMatch[1],
          alt1: sideBySideMatch[1].replace('.png', '').replace('.jpg', ''),
          src2: sideBySideMatch[2],
          alt2: sideBySideMatch[2].replace('.png', '').replace('.jpg', '')
        });
        continue;
      }
      
      // Check for single image pattern
      const singleImageMatch = line.match(/\[IMAGE:([^\]]+)\]/);
      if (singleImageMatch) {
        if (currentText) {
          parts.push({ type: 'text', content: currentText.trim() });
          currentText = '';
        }
        parts.push({
          type: 'image',
          src: singleImageMatch[1],
          alt: singleImageMatch[1].replace('.png', '').replace('.jpg', '')
        });
        continue;
      }
      
      // Regular text line
      currentText += line + '\n';
    }
    
    if (currentText) {
      parts.push({ type: 'text', content: currentText.trim() });
    }
    
    return parts;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col h-full w-full p-4">
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: '100%' }}>
          <div className="space-y-6 pr-2">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChatMessage message={msg} formatMessage={formatMessage} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {!isTyping && messages.length > 0 && messages[messages.length - 1]?.options && (
              <div className="flex flex-wrap gap-2 justify-center pt-4">
                <AnimatePresence>
                  {messages[messages.length - 1].options?.map((option) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="outline"
                        className="bg-background/50 backdrop-blur-sm"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option.text}
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {isTyping && <BotTypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

const ChatMessage = ({ message, formatMessage }: { message: MessageType; formatMessage: (text: string) => React.ReactNode }) => {
  const isBot = message.sender === "bot";
  
  return (
    <div className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <Avatar className="h-8 w-8">
          <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full">
            YK
          </div>
        </Avatar>
      )}
      
      <div className="flex flex-col max-w-[80%]">
        <Card className={`p-3 ${
          isBot 
            ? 'bg-accent text-accent-foreground' 
            : 'bg-primary text-primary-foreground'
        }`}>
          <div className="text-sm leading-relaxed">
            {formatMessage(message.text)}
          </div>
        </Card>
        
        {message.media && (
          <div className="mt-2">
            {message.media.map((item, index) => (
              <motion.div 
                key={index} 
                className="rounded-md overflow-hidden my-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-auto max-h-[250px] object-cover rounded-lg"
                />
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="text-xs text-muted-foreground mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {!isBot && (
        <Avatar className="h-8 w-8">
          <div className="bg-accent text-accent-foreground flex items-center justify-center h-full w-full">
            You
          </div>
        </Avatar>
      )}
    </div>
  );
};

const BotTypingIndicator = () => {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full">YK</div>
      </Avatar>
      <div className="flex items-center gap-1.5 p-3 bg-accent rounded-lg">
        <motion.div
          className="h-2 w-2 bg-muted-foreground rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="h-2 w-2 bg-muted-foreground rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div
          className="h-2 w-2 bg-muted-foreground rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </div>
    </div>
  );
}; 