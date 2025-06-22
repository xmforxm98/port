import React from 'react';
import { motion } from 'framer-motion';

interface ProcessStep {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface ProcessFlowProps {
  className?: string;
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ className = '' }) => {
  const steps: ProcessStep[] = [
    {
      id: 'ux-research',
      title: 'UX Research',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1V3H9V1L3 7V9H21Z"/>
          <circle cx="7.5" cy="14" r="3"/>
          <circle cx="16.5" cy="14" r="3"/>
          <path d="M7.5 18C5.15 18 1 19.17 1 21.5V23H14V21.5C14 19.17 9.85 18 7.5 18Z"/>
          <path d="M16.5 18C14.15 18 10 19.17 10 21.5V23H23V21.5C23 19.17 18.85 18 16.5 18Z"/>
        </svg>
      )
    },
    {
      id: 'problem-define',
      title: 'Problem Define',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M15.5 14H20.5L22 15.5V20.5L20.5 22H15.5L14 20.5V15.5L15.5 14ZM18 19C18.55 19 19 18.55 19 18S18.55 17 18 17 17 17.45 17 18 17.45 19 18 19ZM9.5 3L11 4.5V9.5L9.5 11H4.5L3 9.5V4.5L4.5 3H9.5ZM7 8C7.55 8 8 7.55 8 7S7.55 6 7 6 6 6.45 6 7 6.45 8 7 8Z"/>
          <circle cx="11" cy="6" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      id: 'solution',
      title: 'Solution',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M9 12L7 10L5 12L7 14L9 12ZM21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5ZM19 5H5V19H19V5ZM12 7H17V9H12V7ZM12 11H17V13H12V11ZM12 15H17V17H12V15Z"/>
          <circle cx="12" cy="9" r="3" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'rapid-prototype',
      title: 'Rapid Prototype',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M12 2L13.09 6.26L17 4L14.74 8.04L19 9L14.74 9.96L17 14L13.09 11.74L12 16L10.91 11.74L7 14L9.26 9.96L5 9L9.26 8.04L7 4L10.91 6.26L12 2Z"/>
          <path d="M19 15L18 17H16L17 19L15 20L16 22H18L19 20L21 21L20 19L22 18L20 17L21 15L19 16L18 14L19 15Z"/>
        </svg>
      )
    }
  ];

  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="flex items-center space-x-4 max-w-4xl w-full">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex-1"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-4 text-center hover:bg-white/20 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center justify-center space-x-3">
                  <div className="text-white/80 group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-white font-medium text-sm lg:text-base whitespace-nowrap">
                    {step.title}
                  </span>
                </div>
              </div>
            </motion.div>
            
            {index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + 0.5) * 0.2, duration: 0.3 }}
                className="flex-shrink-0"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProcessFlow; 