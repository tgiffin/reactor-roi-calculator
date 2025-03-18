
import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './pages/Index';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import './index.css';

// Create a container element where our app will be mounted
class ReactorCalculator {
  constructor(targetSelector: string) {
    const targetElement = document.querySelector(targetSelector);
    
    if (!targetElement) {
      console.error(`Reactor Calculator: Target element "${targetSelector}" not found`);
      return;
    }
    
    // Create a container for our React app
    const container = document.createElement('div');
    container.id = 'reactor-calculator-root';
    container.style.width = '100%';
    container.style.margin = '0 auto';
    
    // Add container to the target element
    targetElement.appendChild(container);
    
    // Initialize React
    const queryClient = new QueryClient();
    const root = ReactDOM.createRoot(container);
    
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Index />
          </TooltipProvider>
        </QueryClientProvider>
      </React.StrictMode>
    );
  }
}

// Make it available globally
window.ReactorCalculator = ReactorCalculator;

// Auto-initialize if there's a default container
document.addEventListener('DOMContentLoaded', () => {
  const defaultContainer = document.getElementById('reactor-calculator-container');
  if (defaultContainer) {
    new ReactorCalculator('#reactor-calculator-container');
  }
});

// Export for module usage
export default ReactorCalculator;
