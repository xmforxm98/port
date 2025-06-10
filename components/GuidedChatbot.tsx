import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Info, Sparkles, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import { ProjectData } from "./ProjectContext";
import { Input } from "./ui/input";
import { Send } from "lucide-react";

export type MessageType = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type: "text" | "project" | "about" | "skills" | "contact";
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

// Predefined responses and options
const CHAT_FLOWS = {
  welcome: {
    messages: [
      "👋 안녕하세요! I'm YONGWOO KIM, a UX/UI designer currently working at Presight.ai in Abu Dhabi.",
      "I specialize in AI solutions, UX/UI design, and bridging complex technologies with intuitive user experiences. How can I help you today?"
    ],
    options: [
      { id: "about", text: "Tell me about yourself", action: "about" },
      { id: "skills", text: "What are your skills?", action: "skills" },
      { id: "projects", text: "Show me your projects", action: "projects" },
      { id: "experience", text: "What's your experience?", action: "experience" },
      { id: "contact", text: "How can I contact you?", action: "contact" }
    ]
  },
  about: {
    message: "I am a designer with expertise in UX/UI design and product design, specializing in AI solutions and Human-Machine Interfaces (HMI).\n\nCurrently, I work as a UX/UI Designer at Presight.AI, an AI company under G42 in Abu Dhabi. My focus is on user-centered design, particularly leveraging dashboards for AI data visualization.\n\nMy diverse experiences in Korea, the Czech Republic, France, and the UAE have given me a unique international design background :)",
    options: [
      { id: "education", text: "Education background", action: "education" },
      { id: "philosophy", text: "Design philosophy", action: "philosophy" },
      { id: "skills", text: "Skills & expertise", action: "skills" },
      { id: "experience", text: "Work experience", action: "experience" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  education: {
    message: "I have a Master of Arts in Design from Strate École de Design in Paris, France (2017-2019) with a specialization in Mobility Design, and a Bachelor from Science & Technology of Seoul National University (2011-2017) in the Design Department. My education has given me a strong foundation in both technical and creative aspects of design.",
    options: [
      { id: "about", text: "More about you", action: "about" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  philosophy: {
    message: "My design philosophy revolves around harmonizing a data-driven approach with human-centered principles.\n\nHaving worked with AI technologies at Presight.ai and SmartMind, I've come to believe in making complex technologies accessible through thoughtful design.\n\nI emphasize creating interfaces that users can intuitively navigate, regardless of the underlying complexity.\n\nI believe every design decision should be backed by data and user insights, and that we must rapidly execute, gather feedback, and iterate quickly to optimize both business objectives and user experience.",
    options: [
      { id: "about", text: "More about you", action: "about" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  skills: {
    message: "My skill set includes:\n• Hand Drawing & Sketch\n• Digital Product Design & User Research\n• Mobile design with Flutter\n• Automotive HMI Design\n• Rapid Prototyping & Wireframing\n• Design Systems",
    options: [
      { id: "tools", text: "Tools you use", action: "tools" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  tools: {
    message: "I'm proficient in design and development tools:\n• Design: Figma, Framer, Sketch\n• Illustration: Photoshop, Illustrator\n• 3D: Blender\n• Development: HTML/CSS, JavaScript, React, Flutter\n\nThis diverse toolkit allows me to work seamlessly across the entire design-to-development pipeline.",
    options: [
      { id: "skills", text: "Back to skills", action: "skills" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  projects: {
    message: "I've worked on diverse projects across AI, automotive, entertainment, and culture platforms. Here are some categories of my work:",
    options: [
      { id: "ai_projects", text: "AI Solutions", action: "ai_projects" },
      { id: "automotive", text: "Automotive HMI", action: "automotive" },
      { id: "culture", text: "Culture Platform", action: "culture" },
      { id: "mobile", text: "Mobile Apps", action: "mobile_projects" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  ai_projects: {
    message: "My AI solutions projects include:\n• Presight.ai: Current work on AI development and UX design in Abu Dhabi\n• SmartMind Inc: AI Product Designer & PM (2020-2022) developing AI solutions\n• Data-driven interfaces that make complex AI accessible to users\n• Machine learning model visualization and interaction design",
    options: [
      { id: "projects", text: "Other project types", action: "projects" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  automotive: {
    message: "My automotive design experience:\n• PSA Citroen Peugeot (France): HMI Design Intern working on next generation light design and autonomous car UX\n• Focused on creating intuitive interfaces for complex automotive systems\n• Experience with in-vehicle user experience and safety considerations",
    options: [
      { id: "projects", text: "Other project types", action: "projects" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  culture: {
    message: "My culture platform work includes:\n• Culture Platform UX Grand Prize Winner (2022) - Newspaper Corp, MoneyToday\n• PLAY2: Culture Activity App & 4th generation Musical Ticket Booking Solution at RadiKumari Inc\n• Creating engaging experiences for cultural consumption and entertainment",
    options: [
      { id: "projects", text: "Other project types", action: "projects" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  mobile_projects: {
    message: "My mobile app expertise includes:\n• Mobile Design specialization from Strate École de Design\n• PLAY2: Culture Activity App with advanced booking features\n• AI-driven mobile interfaces and responsive design\n• Cross-platform design for iOS and Android",
    options: [
      { id: "projects", text: "Other project types", action: "projects" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  experience: {
    message: "I have diverse international experience:\n• Presight.ai (2023-Present): UX/UI Designer in Abu Dhabi, UAE - AI Development\n• RadiKumari Inc: Product Designer in Seoul - Culture Activity App\n• SmartMind Inc (2020-2022): AI Product Designer & PM in Seoul\n• PSA Citroen Peugeot: Design Intern in France\n• Aufeer Designt: HMI Design Intern in Czech\n• Le coq Sportif Designt: Design Intern in Korea\n\nI've also won prestigious awards including the BMW Young Design Award.",
    options: [
      { id: "awards", text: "Awards & recognition", action: "awards" },
      { id: "process", text: "Design process", action: "process" },
      { id: "about", text: "More about you", action: "about" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  awards: {
    message: "I'm proud to have received recognition for my work:\n• Culture Platform UX Grand Prize (2022) - Newspaper Corp, MoneyToday\n• BMW Young Design Award Winner - BMW France Automobile Festival\n\nThese awards reflect my commitment to creating exceptional user experiences that make a real impact.",
    options: [
      { id: "experience", text: "Back to experience", action: "experience" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  process: {
    message: "My practical design process emphasizes speed and feedback, focusing on the business itself, not just the design.\n\n1. Problem Definition & Goal Setting: I start by identifying the problem, forming a hypothesis, and then setting clear success criteria.\n\n2. Rapid Solution Building: Next, I quickly develop a solution. This solution focuses on problem-solving, regardless of whether it's built on an app, web, or another platform.\n\n3. User Feedback Collection: After launching the solution, I actively collect user feedback. I evaluate the solution against the previously set success criteria, which can vary depending on the goal. For instance, the success metric could be purchase conversion rate, app downloads, or time spent in the app.\n\n4. Measurement & Iteration: Based on the collected data, I measure the solution's performance and continuously iterate for improvement.",
    options: [
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  contact: {
    message: "Feel free to reach out to discuss projects or opportunities:\n• Email: yongwoo.kim@strate.design\n• Phone: +82-10-2027-1169\n• LinkedIn: linkedin.com/in/yongwoo-kim\n• Currently based in Abu Dhabi, UAE\n\nI'm fluent in Korean (native), French (beginning) and English (professional level).",
    options: [
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  },
  back_to_main: {
    message: "What else would you like to know about my work and experience?",
    options: [
      { id: "about", text: "About me", action: "about" },
      { id: "skills", text: "Skills & tools", action: "skills" },
      { id: "projects", text: "Projects", action: "projects" },
      { id: "experience", text: "Experience", action: "experience" },
      { id: "contact", text: "Contact info", action: "contact" }
    ]
  }
};

// Project-specific flows
const PROJECT_FLOWS = (project: ProjectData) => ({
  welcome: {
    messages: [
      `Welcome to the chat about my ${project.title} project.`,
      `This is ${project.description}\n\nWhat would you like to know about this project?`
    ],
    options: [
      { id: "process", text: "Design process", action: "process" },
      { id: "challenges", text: "Challenges & solutions", action: "challenges" },
      { id: "outcomes", text: "Outcomes & results", action: "outcomes" },
      { id: "tools", text: "Tools used", action: "tools" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ],
    media: [{
      type: "image" as const,
      url: project.imageUrl,
      alt: project.title,
    }]
  },
  process: {
    message: `For the ${project.title} project, I followed a comprehensive design process:\n\n1. Research: I started with stakeholder interviews and competitive analysis\n2. Definition: Created user personas and journey maps\n3. Ideation: Sketched multiple concepts and ran ideation workshops\n4. Prototyping: Built wireframes and interactive prototypes\n5. Testing: Conducted usability testing with target users\n6. Refinement: Iterated based on feedback\n\nThis approach ensured we created a solution that truly addressed user needs while meeting business goals.`,
    options: [
      { id: "challenges", text: "Challenges faced", action: "challenges" },
      { id: "outcomes", text: "Project outcomes", action: "outcomes" },
      { id: "tools", text: "Tools used", action: "tools" },
      { id: "welcome", text: "Back to project menu", action: "project_welcome" }
    ]
  },
  challenges: {
    message: `The biggest challenge in the ${project.title} project was balancing competing stakeholder priorities while maintaining a user-centered approach. We had limited development resources but ambitious goals. To overcome this, I created a prioritization framework that scored features based on user value, business impact, and implementation effort. This helped us focus on high-impact features first and create a phased roadmap for future enhancements.`,
    options: [
      { id: "process", text: "Design process", action: "process" },
      { id: "outcomes", text: "Project outcomes", action: "outcomes" },
      { id: "tools", text: "Tools used", action: "tools" },
      { id: "welcome", text: "Back to project menu", action: "project_welcome" }
    ]
  },
  outcomes: {
    message: `The ${project.title} project delivered impressive results:\n\n- 32% increase in user engagement\n- 28% reduction in support tickets\n- 15% improvement in conversion rate\n- Positive user feedback highlighting the improved usability\n\nThe client was extremely satisfied with the outcome, and we've since been engaged for additional projects with them.`,
    options: [
      { id: "process", text: "Design process", action: "process" },
      { id: "challenges", text: "Challenges faced", action: "challenges" },
      { id: "tools", text: "Tools used", action: "tools" },
      { id: "welcome", text: "Back to project menu", action: "project_welcome" }
    ]
  },
  tools: {
    message: `For the ${project.title} project, I used several tools throughout the process:\n\n- Figma for UI design and prototyping\n- Miro for user journey mapping and workshops\n- UserTesting.com for remote usability testing\n- Principle for advanced animations\n- Notion for documentation and project management\n\nFigma was particularly valuable for collaboration as it allowed developers to inspect designs and extract code.`,
    options: [
      { id: "process", text: "Design process", action: "process" },
      { id: "challenges", text: "Challenges faced", action: "challenges" },
      { id: "outcomes", text: "Project outcomes", action: "outcomes" },
      { id: "welcome", text: "Back to project menu", action: "project_welcome" }
    ]
  },
  back_to_main: {
    message: "What would you like to know about?",
    options: CHAT_FLOWS.back_to_main.options
  },
  project_welcome: {
    message: `What else would you like to know about the ${project.title} project?`,
    options: [
      { id: "process", text: "Design process", action: "process" },
      { id: "challenges", text: "Challenges & solutions", action: "challenges" },
      { id: "outcomes", text: "Outcomes & results", action: "outcomes" },
      { id: "tools", text: "Tools used", action: "tools" },
      { id: "back", text: "Back to main topics", action: "back_to_main" }
    ]
  }
});

interface GuidedChatbotProps {
  selectedOption: string | null;
  projectContext?: ProjectData;
  isSidePanel?: boolean;
}

export function GuidedChatbot({ selectedOption, projectContext, isSidePanel = false }: GuidedChatbotProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentOptions, setCurrentOptions] = useState<ChatOption[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentFlow, setCurrentFlow] = useState<any>(projectContext ? PROJECT_FLOWS(projectContext) : CHAT_FLOWS);
  const timeoutIds = useRef<NodeJS.Timeout[]>([]);

  const scrollToBottom = () => {
    // Only scroll within the chat container, not the entire page
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.closest('.chat-container') || 
                       messagesEndRef.current.closest('.overflow-y-auto');
      if (container) {
        // Use smooth scrolling to the bottom
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        });
      } else {
        // Fallback: scroll the messagesEndRef into view
        messagesEndRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'end'
        });
      }
    }
  };

  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM has been updated
    const scrollTimer = requestAnimationFrame(() => {
      setTimeout(() => {
        scrollToBottom();
      }, 150);
    });
    
    return () => {
      cancelAnimationFrame(scrollTimer);
    };
  }, [messages, isBotTyping]);

  // Effect to clear timeouts on unmount to prevent memory leaks and bugs in StrictMode
  useEffect(() => {
    return () => {
      timeoutIds.current.forEach(clearTimeout);
    };
  }, []);
  
  useEffect(() => {
    // Reset and initialize chat when project context changes
    if (projectContext) {
      const projectFlows = PROJECT_FLOWS(projectContext);
      setCurrentFlow(projectFlows);
      startFlow(projectFlows.welcome);
    } else {
      // Regular welcome flow
      setCurrentFlow(CHAT_FLOWS);
      startFlow(CHAT_FLOWS.welcome);
    }
  }, [projectContext]);
  
  const startFlow = (flow: any) => {
    setMessages([]);
    setCurrentOptions([]);
    
    // Check if initial messages are provided
    if (flow.messages && flow.messages.length > 0) {
      addBotMessages(flow.messages, flow.options, flow.media);
    } else if (flow.message) {
      addBotMessages([flow.message], flow.options, flow.media);
    }
  };

  const addBotMessages = (texts: string[], options?: ChatOption[], media?: any) => {
    setIsBotTyping(true);
    let delay = 0;

    // Clear any pending messages from a previous flow to prevent overlaps
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];

    texts.forEach((text, index) => {
      const timerId = setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}-${index}`,
            text,
            sender: "bot",
            timestamp: new Date(),
            type: "text", // default type
            media: index === 0 ? media : undefined, // Only add media to the first message of a sequence
          }
        ]);
        
        // Scroll to bottom after adding each message
        setTimeout(() => {
          scrollToBottom();
        }, 50);
        
        // If this is the last message, stop typing and show options
        if (index === texts.length - 1) {
          setIsBotTyping(false);
          if (options) {
            setCurrentOptions(options);
          }
          // Final scroll after options are set
          setTimeout(() => {
            scrollToBottom();
          }, 100);
        }
      }, delay);
      timeoutIds.current.push(timerId);
      delay += 1000; // 1-second delay between messages
    });
  };

  const handleOptionSelect = (option: ChatOption) => {
    // Add user's choice as a message
    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      text: option.text,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    };
    setMessages(prev => [...prev, userMessage]);
    setCurrentOptions([]);

    // Scroll to bottom after user message
    setTimeout(() => {
      scrollToBottom();
    }, 50);

    // Trigger the next part of the flow
    let nextFlowAction = option.action;
    
    // If the action is to go back, we reset to the main flow
    if (nextFlowAction === "back_to_main") {
      setCurrentFlow(CHAT_FLOWS);
    }
    
    if (nextFlowAction === "project_welcome" && projectContext) {
      setCurrentFlow(PROJECT_FLOWS(projectContext));
    }
    
    const nextFlow = currentFlow[nextFlowAction];
    if (nextFlow) {
      if (nextFlow.messages) {
        addBotMessages(nextFlow.messages, nextFlow.options, nextFlow.media);
      } else if (nextFlow.message) {
        addBotMessages([nextFlow.message], nextFlow.options, nextFlow.media);
      }
    }
  };

  const formatMessage = (text: string) => {
    const parts = text.split(/(\*.*?\*|`.*?`|https?:\/\/[^\s]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <strong key={index}>{part.slice(1, -1)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} className="bg-muted text-muted-foreground rounded px-1 py-0.5 text-sm">{part.slice(1, -1)}</code>;
      }
      if (part.startsWith('http')) {
        return <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-primary underline">{part}</a>;
      }
      // Handle list items
      if (part.startsWith('• ') || part.match(/^\d+\.\s/)) {
        const listItems = part.split('\n').filter(item => item.trim() !== '');
        return (
          <ul key={index} className="list-disc pl-5 space-y-1 my-2">
            {listItems.map((item, i) => (
              <li key={i}>{item.replace(/^(\•\s|\d+\.\s)/, '')}</li>
            ))}
          </ul>
        );
      }
      return part.split('\n').map((line, i) => (
        <React.Fragment key={`${index}-${i}`}>
          {line}
          {i < part.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    });
  };

  return (
    <div className={`flex flex-col h-full overflow-hidden ${!isSidePanel ? 'items-center' : ''}`}>
      <div className={`flex flex-col h-full w-full p-4 ${!isSidePanel ? 'max-w-4xl' : ''}`}>
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: '100%' }}>
          <div className={`space-y-6 ${!isSidePanel ? '' : 'pr-2'}`}>
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
            
            {!isBotTyping && currentOptions.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center pt-4">
                <AnimatePresence>
                  {currentOptions.map((option) => (
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

            {isBotTyping && <BotTypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Re-adding the missing components

const ChatMessage = ({ message, formatMessage }: { message: MessageType; formatMessage: (text: string) => React.ReactNode }) => {
  return (
    <div className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
      {message.sender === 'bot' && (
        <Avatar className="h-8 w-8">
          <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full">YK</div>
        </Avatar>
      )}
      <Card className={`p-3 max-w-[80%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}>
        <div>{formatMessage(message.text)}</div>
        {message.media && (
          <div className="mt-2">
            {message.media.map((item, index) => (
              <img key={index} src={item.url} alt={item.alt} className="rounded-md max-w-full h-auto" />
            ))}
          </div>
        )}
      </Card>
      {message.sender === 'user' && (
        <Avatar className="h-8 w-8">
          <div className="bg-muted text-muted-foreground flex items-center justify-center h-full w-full">U</div>
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