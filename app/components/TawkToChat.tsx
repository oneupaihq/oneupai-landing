'use client';

import { useEffect } from 'react';

export default function TawkToChat() {
  useEffect(() => {
    // Initialize Tawk.to
    (window as any).Tawk_API = (window as any).Tawk_API || {};
    (window as any).Tawk_LoadStart = new Date();
    
    // Load Tawk.to script
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/69c5bcbc32b9fc1c3eedc94d/1jkm6ig3n';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }
    
    return () => {
      // Cleanup if needed
      const tawkScript = document.querySelector('script[src*="embed.tawk.to"]');
      if (tawkScript) {
        tawkScript.remove();
      }
    };
  }, []);

  return null;
}
