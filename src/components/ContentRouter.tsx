import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AboutPage } from '../../components/AboutPage';
import { BlogPage } from '../../components/BlogPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { SideProjectsPage } from '@/pages/SideProjectsPage';
import { ChatPage } from '@/pages/ChatPage';

interface ContentRouterProps {
  selectedSection: string;
}

const pageVariants = {
  initial: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  in: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export function ContentRouter({ selectedSection }: ContentRouterProps) {
  let content;

  switch (selectedSection) {
    case 'about':
      content = <AboutPage />;
      break;
    case 'projects':
      content = <ProjectsPage isSideProjects={false} />; 
      break;
    case 'side-projects':
      content = <SideProjectsPage />;
      break;
    case 'blog':
      content = <BlogPage />;
      break;
    case 'chat':
      content = <ChatPage />;
      break;
    default:
      content = <AboutPage />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedSection}
        initial="initial"
        animate="in"
        exit="exit"
        variants={pageVariants}
        className="w-full h-full"
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}; 