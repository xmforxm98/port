import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Avatar } from "../../components/ui/avatar";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Send, Sparkles } from "lucide-react";
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
      messages: [
        `Welcome to the ${project.title} project chatbot!`,
        `This project is about ${project.description}. What would you like to know?`
      ],
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

  if (project.title === "Smart City" || project.title === "Smart City Management Platform") {
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
    case "Smart City":
    case "Smart City Management Platform":
      return "The Smart City Management Platform represents a comprehensive solution for modern urban planning and infrastructure management. This integrated platform enables city administrators to monitor, analyze, and optimize urban systems through real-time data visualization and intelligent analytics.\n\nModern cities face unprecedented challenges in managing complex infrastructure systems, from traffic flow and energy distribution to waste management and public safety. The challenge was to create a unified platform that could aggregate diverse data sources and provide actionable insights for better urban decision-making.";
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
    case "Smart City":
    case "Smart City Management Platform":
      return "Full-stack solution with React/D3.js frontend for data visualization, Python/Django backend, PostgreSQL with time-series extensions, IoT data ingestion using MQTT, real-time analytics with Apache Spark, GIS integration with PostGIS, and cloud deployment on AWS with microservices architecture. The platform consolidates data from multiple urban systems including traffic sensors, energy grids, waste management, and public services.";
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
    case "Smart City":
    case "Smart City Management Platform":
      return "Complex challenges involved integrating disparate data sources and legacy systems, creating meaningful visualizations for multi-layered urban data, ensuring real-time performance with city-scale data volumes, addressing privacy concerns with citizen data, and designing interfaces usable by both technical and non-technical city officials.";
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
    case "Smart City":
    case "Smart City Management Platform":
      return "The Smart City Management Platform has significantly improved urban operational efficiency, enabling better resource allocation, faster emergency response times, and more informed policy decisions. The platform's intuitive design has reduced training time for new users while increasing overall system adoption across city departments. Enabled 30% improvement in traffic flow optimization, 25% reduction in emergency response times, and 20% improvement in energy efficiency.";
    default:
      return "This project delivered measurable improvements in user experience, operational efficiency, and stakeholder satisfaction, demonstrating the value of thoughtful design and technical execution.";
  }
}

interface ProjectChatbotProps {
  project: ProjectData;
}

export function ProjectChatbot({ project }: ProjectChatbotProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
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
    const flows = getProjectResponses(project);
    const welcomeFlow = flows.welcome;
    
    setTimeout(() => {
      addBotMessages(welcomeFlow.messages, welcomeFlow.options);
    }, 500);
  }, [project]);

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

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simple response for free-form questions
    setTimeout(() => {
      const responses = [
        "That's an interesting question! Feel free to use the quick reply buttons to explore specific aspects of this project.",
        "Thanks for your question! The quick reply options below can help you learn more about different aspects of this project.",
        "I'd be happy to help! Try clicking on the quick reply buttons to get detailed information about this project."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const flows = getProjectResponses(project);
      
      addBotMessages([randomResponse], flows.welcome.options);
    }, 1000);
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
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
        <Avatar className="w-10 h-10">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            {project.title.substring(0, 2)}
          </div>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{project.title} Chatbot</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Online</span>
          </div>
        </div>
        <Sparkles className="w-5 h-5 text-purple-500" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} formatMessage={formatMessage} />
          ))}
        </AnimatePresence>
        
        {isTyping && <BotTypingIndicator />}
        
        {messages.length > 0 && messages[messages.length - 1]?.options && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2"
          >
            {messages[messages.length - 1].options?.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                size="sm"
                onClick={() => handleOptionSelect(option)}
                className="text-sm hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
              >
                {option.text}
              </Button>
            ))}
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm" className="px-3">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

const ChatMessage = ({ message, formatMessage }: { message: MessageType; formatMessage: (text: string) => React.ReactNode }) => {
  const isBot = message.sender === "bot";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} gap-2`}
    >
      {isBot && (
        <Avatar className="w-8 h-8 mt-1">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
            AI
          </div>
        </Avatar>
      )}
      
      <div className={`max-w-[80%] ${isBot ? 'order-2' : 'order-1'}`}>
        <Card className={`p-3 ${
          isBot 
            ? 'bg-white border-gray-200 text-gray-800' 
            : 'bg-blue-500 text-white border-blue-500'
        }`}>
          <div className="text-sm leading-relaxed">
            {formatMessage(message.text)}
          </div>
        </Card>
        
        {message.media && (
          <div className="mt-2">
            {message.media.map((item, index) => (
              <img
                key={index}
                src={item.url}
                alt={item.alt}
                className="rounded-lg max-w-full h-auto"
              />
            ))}
          </div>
        )}
        
        <div className="text-xs text-gray-500 mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};

const BotTypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start gap-2"
  >
    <Avatar className="w-8 h-8">
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
        AI
      </div>
    </Avatar>
    <Card className="p-3 bg-white border-gray-200">
      <div className="flex space-x-1">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: dot * 0.2,
            }}
          />
        ))}
      </div>
    </Card>
  </motion.div>
); 