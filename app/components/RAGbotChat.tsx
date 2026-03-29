'use client';

import { useEffect } from 'react';

export default function RAGbotChat() {
  useEffect(() => {
    // Initialize RAGbot
    (window as any).RAGbot = 'ragbot';
    (window as any).ragbot = (window as any).ragbot || function() {
      ((window as any).ragbot.q = (window as any).ragbot.q || []).push(arguments);
    };
    
    // Load RAGbot script
    const script = document.createElement('script');
    script.id = 'ragbot';
    script.src = 'https://ragbot0.vercel.app/widget/undefined/embed.js';
    script.async = true;
    
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }
    
    return () => {
      // Cleanup if needed
      const ragbotScript = document.getElementById('ragbot');
      if (ragbotScript) {
        ragbotScript.remove();
      }
    };
  }, []);

  return null;
}
