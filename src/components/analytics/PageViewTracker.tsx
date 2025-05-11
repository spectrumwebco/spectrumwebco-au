import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Get or create a session ID
const getSessionId = (): string => {
  let sessionId = localStorage.getItem('session_id');
  
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('session_id', sessionId);
  }
  
  return sessionId;
};

// Track a page view
const trackPageView = async (url: string, referrer?: string) => {
  try {
    const sessionId = getSessionId();
    const userId = localStorage.getItem('user_id'); // If you have user authentication
    
    const response = await fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        sessionId,
        userId,
        referrer,
        userAgent: navigator.userAgent,
      }),
    });
    
    if (!response.ok) {
      console.error('Failed to track page view');
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

interface PageViewTrackerProps {
  children?: React.ReactNode;
}

const PageViewTracker: React.FC<PageViewTrackerProps> = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view when the location changes
    trackPageView(
      window.location.pathname + window.location.search,
      document.referrer
    );
  }, [location.pathname, location.search]);
  
  return <>{children}</>;
};

export default PageViewTracker;
