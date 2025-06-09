import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar } from "./ui/avatar";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SendIcon, Info, Sparkles, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import { ProjectData } from "./ProjectContext";

export type MessageType = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type: "text" | "project" | "about" | "skills" | "contact";
  media?: {
    type: "image";
    url: string;
    alt: string;
  }[];
};

const welcomeMessages: MessageType[] = [
  {
    id: "welcome-1",
    text: "👋 Hi there! I'm YONGWOO.KIM, a product designer with 6+ years of experience crafting digital experiences.",
    sender: "bot",
    timestamp: new Date(),
    type: "text",
  },
  {
    id: "welcome-2",
    text: "How can I help you today? Try asking about my projects, skills, or background!",
    sender: "bot",
    timestamp: new Date(),
    type: "text",
  },
];

const aboutContent: MessageType = {
  id: "about-content",
  text: "I'm a product designer passionate about creating intuitive and impactful digital experiences. With a background in both design and front-end development, I bring a unique perspective to every project. I've worked with startups and enterprise companies across fintech, healthcare, and e-commerce sectors.",
  sender: "bot",
  timestamp: new Date(),
  type: "about",
};

const skillsContent: MessageType = {
  id: "skills-content",
  text: "My skill set includes:\n- UX/UI Design\n- User Research\n- Interaction Design\n- Design Systems\n- Prototyping\n- Figma & Sketch\n- Basic Front-end Development\n- Design Thinking",
  sender: "bot",
  timestamp: new Date(),
  type: "skills",
};

const contactContent: MessageType = {
  id: "contact-content",
  text: "Feel free to reach out:\n- Email: yongwoo.kim@designportfolio.com\n- LinkedIn: linkedin.com/in/yongwookim\n- Twitter: @yongwookim\n- Portfolio: www.yongwookim.com",
  sender: "bot",
  timestamp: new Date(),
  type: "contact",
};

interface ChatInterfaceProps {
  selectedOption: string | null;
  projectContext?: ProjectData;
}

export function ChatInterface({ selectedOption, projectContext }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (shouldAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, shouldAutoScroll]);

  // Initialize chat based on context
  useEffect(() => {
    if (projectContext) {
      // If we have project context, initialize with project-specific welcome
      const projectWelcome: MessageType[] = [
        {
          id: "project-welcome-1",
          text: `Welcome to the chat about my ${projectContext.title} project.`,
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        },
        {
          id: "project-welcome-2",
          text: `This is ${projectContext.description}\n\nFeel free to ask me any questions about the design process, challenges, or outcomes of this project!`,
          sender: "bot",
          timestamp: new Date(),
          type: "text",
          media: [{
            type: "image",
            url: projectContext.imageUrl,
            alt: projectContext.title,
          }],
        },
      ];
      setMessages(projectWelcome);
    } else if (selectedOption === "new" || !messages.length) {
      // Regular welcome for new chats
      setMessages(welcomeMessages);
    }
  }, [projectContext, selectedOption]);

  // Handle selected option from sidebar
  useEffect(() => {
    if (selectedOption && !projectContext) {
      if (selectedOption === "new") {
        setMessages(welcomeMessages);
      } else if (selectedOption === "about") {
        handleAboutRequest();
      } else if (selectedOption === "skills") {
        handleSkillsRequest();
      } else if (selectedOption === "contact") {
        handleContactRequest();
      } else if (selectedOption.startsWith("recent-")) {
        // For recent conversations, we could load them from storage in a real app
        setMessages(welcomeMessages);
      }
    }
  }, [selectedOption]);

  const handleSend = () => {
    if (input.trim() === "") return;
    
    // Enable auto-scroll when user sends a message
    setShouldAutoScroll(true);
    
    const userMessage: MessageType = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };
    
    setMessages([...messages, userMessage]);
    setInput("");
    
    // Process the user's message and respond
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      
      if (projectContext) {
        // Handle project-specific questions
        handleProjectQuestion(lowerInput, projectContext);
      } else if (lowerInput.includes("about") || lowerInput.includes("who are you") || lowerInput.includes("background")) {
        handleAboutRequest();
      } else if (lowerInput.includes("skill") || lowerInput.includes("can you") || lowerInput.includes("expertise")) {
        handleSkillsRequest();
      } else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("reach")) {
        handleContactRequest();
      } else {
        // Default response
        const botMessage: MessageType = {
          id: Date.now().toString(),
          text: "I'm not sure I understand. Would you like to know more about me, my skills, or how to contact me?",
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        };
        setMessages(prev => [...prev, botMessage]);
      }
    }, 500);
  };
  
  const handleProjectQuestion = (question: string, project: ProjectData) => {
    // Generate responses based on project questions
    let response = "";
    
    if (question.includes("process") || question.includes("how did you")) {
      response = `For the ${project.title} project, I followed a comprehensive design process:\n\n1. Research: I started with stakeholder interviews and competitive analysis\n2. Definition: Created user personas and journey maps\n3. Ideation: Sketched multiple concepts and ran ideation workshops\n4. Prototyping: Built wireframes and interactive prototypes\n5. Testing: Conducted usability testing with target users\n6. Refinement: Iterated based on feedback\n\nThis approach ensured we created a solution that truly addressed user needs while meeting business goals.`;
    } else if (question.includes("challenge") || question.includes("difficult")) {
      response = `The biggest challenge in the ${project.title} project was balancing competing stakeholder priorities while maintaining a user-centered approach. We had limited development resources but ambitious goals. To overcome this, I created a prioritization framework that scored features based on user value, business impact, and implementation effort. This helped us focus on high-impact features first and create a phased roadmap for future enhancements.`;
    } else if (question.includes("outcome") || question.includes("result")) {
      response = `The ${project.title} project delivered impressive results:\n\n- 32% increase in user engagement\n- 28% reduction in support tickets\n- 15% improvement in conversion rate\n- Positive user feedback highlighting the improved usability\n\nThe client was extremely satisfied with the outcome, and we've since been engaged for additional projects with them.`;
    } else if (question.includes("tool") || question.includes("software")) {
      response = `For the ${project.title} project, I used several tools throughout the process:\n\n- Figma for UI design and prototyping\n- Miro for user journey mapping and workshops\n- UserTesting.com for remote usability testing\n- Principle for advanced animations\n- Notion for documentation and project management\n\nFigma was particularly valuable for collaboration as it allowed developers to inspect designs and extract code.`;
    } else {
      response = `The ${project.title} project was one of my favorite projects to work on. It involved solving complex problems for real users, and seeing the positive impact after launch was incredibly rewarding. I'd be happy to share more specific details about any aspect of the project you're curious about - the research findings, design decisions, team collaboration, or implementation challenges.`;
    }
    
    const botMessage: MessageType = {
      id: Date.now().toString(),
      text: response,
      sender: "bot",
      timestamp: new Date(),
      type: "text",
    };
    
    setMessages(prev => [...prev, botMessage]);
  };
  
  const handleAboutRequest = () => {
    setMessages(prev => [...prev, aboutContent]);
  };
  
  const handleSkillsRequest = () => {
    setMessages(prev => [...prev, skillsContent]);
  };
  
  const handleContactRequest = () => {
    setMessages(prev => [...prev, contactContent]);
  };

  const formatMessage = (text: string) => {
    // Handle markdown-like formatting
    return text
      .split('\n')
      .map((line, i) => {
        // Bold text
        const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <p key={i} dangerouslySetInnerHTML={{ __html: boldText }} />;
      });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const messageVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 300 
      } 
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { 
        duration: 0.2 
      } 
    }
  };

  const inputVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 300,
        delay: 0.3
      } 
    }
  };

  const projectBannerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Project context banner */}
      {projectContext && (
        <motion.div
          className="flex items-center gap-3 p-3 bg-accent/50 mb-2 mx-4 mt-4 rounded-md"
          variants={projectBannerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={projectContext.imageUrl}
              alt={projectContext.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{projectContext.title}</span>
              <Badge variant="outline" className="text-xs">{projectContext.category}</Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Tag className="h-3 w-3" />
              <span>{projectContext.tags.join(", ")}</span>
            </div>
          </div>
          <div className="flex flex-col items-end text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Info className="h-3 w-3" />
              <span>Project Chat</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>{projectContext.year}</span>
            </div>
          </div>
        </motion.div>
      )}

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-[800px] mx-auto">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={messageVariants}
                custom={index}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-3 max-w-[80%]">
                  {message.sender === "bot" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30,
                        delay: index * 0.1 + 0.1
                      }}
                    >
                      <Avatar className="h-8 w-8">
                        <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full">
                          AD
                        </div>
                      </Avatar>
                    </motion.div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    style={{ originX: message.sender === "user" ? 1 : 0 }}
                  >
                    <Card
                      className={`p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      <div className="space-y-2">
                        {formatMessage(message.text)}
                        
                        {message.media && message.media.length > 0 && (
                          <motion.div 
                            className="mt-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                          >
                            {message.media.map((item, mediaIndex) => (
                              <motion.div 
                                key={mediaIndex} 
                                className="rounded-md overflow-hidden my-2"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                              >
                                <ImageWithFallback
                                  src={item.url}
                                  alt={item.alt}
                                  className="w-full h-auto max-h-[250px] object-cover"
                                />
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                  {message.sender === "user" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30,
                        delay: index * 0.1 + 0.1
                      }}
                    >
                      <Avatar className="h-8 w-8">
                        <div className="bg-accent text-accent-foreground flex items-center justify-center h-full w-full">
                          You
                        </div>
                      </Avatar>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <motion.div 
        className="p-4 border-t"
        variants={inputVariants}
        initial="initial"
        animate="animate"
      >
        <div className="flex gap-2 max-w-[800px] mx-auto">
          <Input
            placeholder={projectContext 
              ? `Ask about the ${projectContext.title} project...` 
              : "Ask about my experience, skills, or projects..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleSend} className="px-3">
              <SendIcon size={18} />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}