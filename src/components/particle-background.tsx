"use client";

import React, { useEffect } from 'react';

export function ParticleBackground() {
  useEffect(() => {
    const container = document.body;
    const particles: HTMLElement[] = [];
    // Only add particles if they don't exist already
    if (container.querySelector('.particle')) {
        return;
    }

    for (let i = 0; i < 40; i++) {
      const d = document.createElement('div');
      d.className = 'particle fixed w-0.5 h-0.5 pointer-events-none rounded-full animate-float';
      d.style.left = `${Math.random() * 100}vw`;
      d.style.top = `${Math.random() * 100}vh`;
      d.style.animationDelay = `${Math.random() * 8}s`;
      d.style.background = Math.random() < 0.5 ? 'hsl(var(--primary))' : 'hsl(var(--accent))';
      container.appendChild(d);
      particles.push(d);
    }

    return () => {
      particles.forEach(p => {
          if (container.contains(p)) {
              container.removeChild(p)
          }
      });
    };
  }, []);

  return null;
}
