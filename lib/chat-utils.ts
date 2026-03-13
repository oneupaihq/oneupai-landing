import React from 'react';

export interface MessagePart {
  type: 'text' | 'button';
  content: string;
  url?: string;
}

export function parseMessageWithButtons(text: string): MessagePart[] {
  const parts: MessagePart[] = [];
  const buttonRegex = /\[BUTTON:([^\|]+)\|([^\]]+)\]/g;
  
  let lastIndex = 0;
  let match;

  while ((match = buttonRegex.exec(text)) !== null) {
    // Add text before the button
    if (match.index > lastIndex) {
      const textContent = text.slice(lastIndex, match.index).trim();
      if (textContent) {
        parts.push({
          type: 'text',
          content: textContent
        });
      }
    }

    // Add the button
    parts.push({
      type: 'button',
      content: match[1], // Button text
      url: match[2] // Button URL
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after the last button
  if (lastIndex < text.length) {
    const textContent = text.slice(lastIndex).trim();
    if (textContent) {
      parts.push({
        type: 'text',
        content: textContent
      });
    }
  }

  // If no buttons were found, return the original text
  if (parts.length === 0) {
    parts.push({
      type: 'text',
      content: text
    });
  }

  return parts;
}

export function renderMessageParts(parts: MessagePart[]): React.ReactNode[] {
  return parts.map((part, index) => {
    if (part.type === 'button' && part.url) {
      return React.createElement(
        'a',
        {
          key: index,
          href: part.url,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'inline-flex items-center gap-2 bg-gradient-to-r from-[#1A80E7] to-[#00C48C] text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 mt-2 mr-2',
          style: { textDecoration: 'none' }
        },
        [
          part.content,
          React.createElement('svg', {
            key: 'arrow',
            className: 'w-4 h-4',
            fill: 'none',
            stroke: 'currentColor',
            viewBox: '0 0 24 24'
          }, React.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
            d: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
          }))
        ]
      );
    }
    
    return React.createElement('span', { key: index }, part.content);
  });
}