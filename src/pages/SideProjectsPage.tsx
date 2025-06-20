import React, { useState, useEffect } from "react";
import { sideProjects } from "../data/sideProjects";
import Masonry from "../../components/Masonry";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Dock from "../../components/Dock";
import { VscHome, VscArchive, VscEdit, VscSymbolClass, VscRobot } from 'react-icons/vsc';

export const SideProjectsPage: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 카테고리 매핑
  const getCategoryFromTags = (tags: string[]): string => {
    if (tags.some(tag => tag.toLowerCase().includes('ai') || tag.toLowerCase().includes('creative') || tag.toLowerCase().includes('character design'))) return 'AI';
    if (tags.some(tag => tag.toLowerCase().includes('automotive') || tag.toLowerCase().includes('concept') || tag.toLowerCase().includes('product design'))) return 'Sketch';
    if (tags.some(tag => tag.toLowerCase().includes('illustration') || tag.toLowerCase().includes('storytelling'))) return 'Illustration';
    if (tags.some(tag => tag.toLowerCase().includes('design') || tag.toLowerCase().includes('ux') || tag.toLowerCase().includes('iot'))) return '3D';
    return 'Other';
  };

  // 필터링된 프로젝트
  const filteredProjects = activeFilter === 'ALL' 
    ? sideProjects 
    : sideProjects.filter(project => getCategoryFromTags(project.tags) === activeFilter);

  // 모든 프로젝트의 모든 이미지를 개별 아이템으로 변환
  const allImages: Array<{ id: string; img: string; url: string; height: number; projectTitle: string; category: string }> = [];
  
  filteredProjects.forEach((project) => {
    const category = getCategoryFromTags(project.tags);
    
    // 메인 이미지 추가
    allImages.push({
      id: `${project.id}_main`,
      img: project.imageUrl,
      url: project.imageUrl,
      height: 300 + Math.floor(Math.random() * 200),
      projectTitle: project.title,
      category
    });
    
    // 추가 이미지들 추가
    if (project.images) {
      project.images.forEach((imageUrl, index) => {
        // 메인 이미지와 중복되지 않도록 확인
        if (imageUrl !== project.imageUrl) {
          allImages.push({
            id: `${project.id}_${index}`,
            img: imageUrl,
            url: imageUrl,
            height: 300 + Math.floor(Math.random() * 200),
            projectTitle: project.title,
            category
          });
        }
      });
    }
  });

  // AI 카테고리가 먼저 나오도록 정렬 (ALL 필터일 때)
  if (activeFilter === 'ALL') {
    allImages.sort((a, b) => {
      if (a.category === 'AI' && b.category !== 'AI') return -1;
      if (a.category !== 'AI' && b.category === 'AI') return 1;
      return 0;
    });
  }

  const handleImageClick = (imageUrl: string) => {
    const index = allImages.findIndex(img => img.url === imageUrl);
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < allImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const goToPrevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === 'Escape') {
          closeModal();
        } else if (e.key === 'ArrowRight') {
          goToNextImage();
        } else if (e.key === 'ArrowLeft') {
          goToPrevImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  // 로딩 상태 관리
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5초 후 로딩 완료

    return () => clearTimeout(timer);
  }, []);

  // Dock 필터 아이템
  const filterItems = [
    { 
      icon: <VscHome size={18} />, 
      label: 'ALL', 
      onClick: () => setActiveFilter('ALL'),
      className: activeFilter === 'ALL' ? 'active' : ''
    },
    { 
      icon: <VscEdit size={18} />, 
      label: 'Sketch', 
      onClick: () => setActiveFilter('Sketch'),
      className: activeFilter === 'Sketch' ? 'active' : ''
    },
    { 
      icon: <VscArchive size={18} />, 
      label: 'Illustration', 
      onClick: () => setActiveFilter('Illustration'),
      className: activeFilter === 'Illustration' ? 'active' : ''
    },
    { 
      icon: <VscSymbolClass size={18} />, 
      label: '3D', 
      onClick: () => setActiveFilter('3D'),
      className: activeFilter === '3D' ? 'active' : ''
    },
    { 
      icon: <VscRobot size={18} />, 
      label: 'AI', 
      onClick: () => setActiveFilter('AI'),
      className: activeFilter === 'AI' ? 'active' : ''
    },
  ];

  return (
    <div className="relative w-full h-full">
      {/* Clean Background - same as other tabs */}
      
      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-white/40 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
        </div>
      )}
      
      {/* Masonry Grid */}
      <div className="relative z-10 h-full overflow-auto">
        <div className="p-6">
          {/* Dock Filter */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <Dock 
              items={filterItems}
              panelHeight={68}
              baseItemSize={50}
              magnification={70}
            />
          </div>

          <div style={{ height: '87vh' }}>
            <Masonry
              items={allImages.map(item => ({
                ...item,
                onClick: () => handleImageClick(item.url)
              }))}
              ease="power3.out"
              duration={0.6}
              stagger={0.02}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={true}
            />
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-60"
            onClick={closeModal}
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          {selectedImageIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-60 p-2"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevImage();
              }}
            >
              <ChevronLeft size={48} />
            </button>
          )}

          {/* Next Button */}
          {selectedImageIndex < allImages.length - 1 && (
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-60 p-2"
              onClick={(e) => {
                e.stopPropagation();
                goToNextImage();
              }}
            >
              <ChevronRight size={48} />
            </button>
          )}

          {/* Image */}
          <div className="relative">
            <img
              src={allImages[selectedImageIndex].url}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 