import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "./ui/use-mobile";

interface SplitViewLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  isRightPanelOpen: boolean;
}

export function SplitViewLayout({ 
  leftPanel, 
  rightPanel, 
  isRightPanelOpen 
}: SplitViewLayoutProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Animation variants
  const rightPanelVariants = {
    hidden: { 
      x: isMobile ? 0 : "100%", 
      y: isMobile ? "100%" : 0,
      opacity: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    visible: { 
      x: 0, 
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  const leftPanelVariants = {
    full: { 
      width: "100%",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    shrink: { 
      width: isMobile ? "100%" : "50%",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  if (isMobile) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        {/* Left panel (project) stays in place */}
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          {leftPanel}
        </div>
        
        {/* Right panel (chat) slides up from bottom */}
        {isRightPanelOpen && (
          <motion.div
            className="absolute inset-0 flex h-full w-full items-center justify-center bg-background"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            style={{ zIndex: 10 }}
          >
            {rightPanel}
          </motion.div>
        )}
      </div>
    );
  }

  // On desktop, use a side-by-side layout that centers its content
  return (
    <div className="flex h-full w-full overflow-hidden">
      <motion.div
        className="flex h-full items-start justify-center pt-8"
        initial={false}
        animate={isRightPanelOpen ? "shrink" : "full"}
        variants={leftPanelVariants}
      >
        {leftPanel}
      </motion.div>

      {isRightPanelOpen && (
        <motion.div
          className="h-full w-1/2 flex-shrink-0 overflow-y-auto border-l p-4"
          initial="hidden"
          animate="visible"
          variants={rightPanelVariants}
        >
          {rightPanel}
        </motion.div>
      )}
    </div>
  );
}