import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  sectionKey: string;
}

export function PageTransition({ children, className = "", sectionKey }: PageTransitionProps) {
  // Different animation variants for different section types
  const getVariants = () => {
    // Chat section has a slide from right animation
    if (sectionKey === "chat" || sectionKey.startsWith("recent-")) {
      return {
        initial: { opacity: 0, x: 20 },
        animate: { 
          opacity: 1, 
          x: 0,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.4
          } 
        },
        exit: { 
          opacity: 0, 
          x: -20,
          transition: { 
            duration: 0.2 
          } 
        }
      };
    }
    
    // About section has a fade up animation
    if (sectionKey === "about") {
      return {
        initial: { opacity: 0, y: 20 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.4
          } 
        },
        exit: { 
          opacity: 0, 
          y: 20,
          transition: { 
            duration: 0.2 
          } 
        }
      };
    }
    
    // Projects and side projects have a scale animation
    if (sectionKey === "projects" || sectionKey === "side-projects") {
      return {
        initial: { opacity: 0, scale: 0.98 },
        animate: { 
          opacity: 1, 
          scale: 1,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.4
          } 
        },
        exit: { 
          opacity: 0, 
          scale: 0.98,
          transition: { 
            duration: 0.2 
          } 
        }
      };
    }
    
    // Blog section has a subtle crossfade animation
    if (sectionKey === "blog") {
      return {
        initial: { opacity: 0, x: -20 },
        animate: { 
          opacity: 1, 
          x: 0,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.4
          } 
        },
        exit: { 
          opacity: 0, 
          x: 20,
          transition: { 
            duration: 0.2 
          } 
        }
      };
    }
    
    // Default animation for other sections
    return {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: { 
          duration: 0.3 
        } 
      },
      exit: { 
        opacity: 0,
        transition: { 
          duration: 0.2 
        } 
      }
    };
  };

  return (
    <motion.div
      className={`h-full w-full ${className}`}
      key={sectionKey}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
}