import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import GooeyNav from "@/components/ui/GooeyNav/GooeyNav";
import { navItems } from "@/config/navigation";
import { ProjectProvider } from "../components/ProjectContext";
import Aurora from "../components/Aurora";
import { trackPageView, pageTitle } from "@/lib/analytics";

// Pages
import { AboutPage } from "../components/AboutPage";
import { BlogPage } from "../components/BlogPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { SideProjectsPage } from "@/pages/SideProjectsPage";
import { ChatPage } from "@/pages/ChatPage";

// Analytics 추적 컴포넌트
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const url = location.pathname;
    const title = pageTitle[url as keyof typeof pageTitle] || 'yongwoo.kim';
    trackPageView(url, title);
  }, [location]);

  return null;
}

// 페이지 애니메이션 설정
const pageVariants = {
  initial: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  in: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

// 메인 레이아웃 컴포넌트
function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  const handleSelectOption = (option: string) => {
    const navItem = navItems.find(item => item.id === option);
    if (navItem) {
      navigate(navItem.href);
    }
  };

  // 현재 경로에 따른 선택된 섹션 결정
  const getCurrentSection = () => {
    const path = location.pathname;
    const navItem = navItems.find(item => item.href === path);
    return navItem ? navItem.id : "chat";
  };

  return (
    <>
      <AnalyticsTracker />
      <div className="relative flex flex-col h-screen w-screen bg-background overflow-hidden text-white">
        <header className="shrink-0 pt-4">
          <div className="container mx-auto px-4 flex justify-center">
            <GooeyNav 
              items={navItems}
              onSelect={handleSelectOption}
              current={getCurrentSection()}
            />
          </div>
        </header>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="relative flex-1 flex flex-col h-full w-full">
            {/* Aurora Background Effect */}
            <div className="absolute inset-0 z-0">
              <Aurora 
                colorStops={["#3100a3", "#10949d", "#284dbd"]}
                amplitude={0.7}
                blend={0.25}
                speed={0.4}
              />
            </div>
            
            {/* Main Content */}
            <main className="relative z-10 flex flex-1 flex-col w-full h-full overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial="initial"
                  animate="in"
                  exit="exit"
                  variants={pageVariants}
                  className="w-full h-full"
                >
                  <Routes>
                    <Route path="/" element={<ChatPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/projects" element={<ProjectsPage isSideProjects={false} />} />
                    <Route path="/side-projects" element={<SideProjectsPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ProjectProvider>
        <MainLayout />
      </ProjectProvider>
    </Router>
  );
}