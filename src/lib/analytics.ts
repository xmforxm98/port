// Google Analytics 유틸리티 함수들
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// 페이지뷰 추적
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-2DXZZJC7DK', {
      page_location: window.location.origin + url,
      page_title: title,
    });
  }
};

// 커스텀 이벤트 추적
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// 페이지별 제목 매핑
export const pageTitle = {
  '/': 'Chat - yongwoo.kim',
  '/about': 'About Me - yongwoo.kim',
  '/projects': 'Projects - yongwoo.kim',
  '/side-projects': 'Gallery - yongwoo.kim',
  '/blog': 'Blog - yongwoo.kim',
} as const; 