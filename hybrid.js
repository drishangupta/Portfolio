/*
 * hybrid.js
 * Cyberpunk Portfolio JavaScript for Hybrid Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Add cyber glitch effect to random elements
  setInterval(() => {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(el => {
      if (Math.random() > 0.95) {
        el.style.animation = 'none';
        setTimeout(() => {
          el.style.animation = 'glitch 2s infinite';
        }, 100);
      }
    });
  }, 3000);

  // Floating particles effect
  function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 2px;
      height: 2px;
      background: #00ffff;
      pointer-events: none;
      z-index: 1;
      border-radius: 50%;
      opacity: 0.7;
    `;
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
      { transform: 'translateY(0px)', opacity: 0.7 },
      { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
    ], {
      duration: Math.random() * 3000 + 2000,
      easing: 'linear'
    });
    
    animation.onfinish = () => particle.remove();
  }

  // Create particles periodically
  setInterval(createParticle, 80);
  
  // Add extra particle bursts
  setInterval(() => {
    for (let i = 0; i < 3; i++) {
      setTimeout(createParticle, i * 50);
    }
  }, 2000);

  // CYBERPUNK CURSOR SYSTEM
  const cursorDot = document.createElement('div');
  const cursorRing = document.createElement('div');
  
  cursorDot.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: #00ffff;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10001;
    box-shadow: 0 0 20px #00ffff;
  `;
  
  cursorRing.style.cssText = `
    position: fixed;
    width: 32px;
    height: 32px;
    border: 2px solid rgba(0, 255, 255, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: all 0.15s ease;
  `;
  
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorRing);
  
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Instant dot movement
    cursorDot.style.left = mouseX - 4 + 'px';
    cursorDot.style.top = mouseY - 4 + 'px';
  });
  
  // Smooth ring animation
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    cursorRing.style.left = ringX - 16 + 'px';
    cursorRing.style.top = ringY - 16 + 'px';
    
    requestAnimationFrame(animateRing);
  }
  animateRing();
  
  // Hover effects
  document.querySelectorAll('a, button, .cyber-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.transform = 'scale(1.5)';
      cursorRing.style.borderColor = '#ff0080';
      cursorDot.style.background = '#ff0080';
      cursorDot.style.boxShadow = '0 0 20px #ff0080';
    });
    
    el.addEventListener('mouseleave', () => {
      cursorRing.style.transform = 'scale(1)';
      cursorRing.style.borderColor = 'rgba(0, 255, 255, 0.5)';
      cursorDot.style.background = '#00ffff';
      cursorDot.style.boxShadow = '0 0 20px #00ffff';
    });
  });

});
