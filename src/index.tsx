import React, { useState, useEffect, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RootLayout } from '@/components/RootLayout';
import '@/styles/tailwind.css';

// Create a wrapper for the async Home component
const AsyncHomeWrapper = () => {
  const [HomeComponent, setHomeComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loadHome = async () => {
      try {
        // Dynamically import the Home component
        const homeModule = await import('@/app/page');
        setHomeComponent(() => homeModule.default);
      } catch (error) {
        console.error('Failed to load Home component:', error);
      }
    };

    loadHome();
  }, []);

  if (!HomeComponent) {
    return <div>Loading...</div>;
  }

  return <HomeComponent />;
};

// Create a router-like structure to handle different pages
const App = () => {
  return (
    <RootLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <AsyncHomeWrapper />
      </Suspense>
    </RootLayout>
  );
};

// Mount the app to the DOM
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
