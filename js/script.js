// Scroll Animations with Stagger
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animate-in');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all section content
const animateElements = document.querySelectorAll('.section-title, .section-label, .section-subtitle, .service-card, .project-card, .testimonial-card, .hero-title, .hero-desc, .hero-actions, .hero-stats, .contact-card, .blog-card, .gallery-item, .about-intro, .htimeline-item');
animateElements.forEach(el => {
  observer.observe(el);
});

// Custom Cursor Glow Effect
const cursor = document.getElementById('cursor');
const cursorGlow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate glow effect with smooth trailing
function animateGlow() {
  // Smooth movement for glow effect
  glowX += (mouseX - glowX) * 0.15;
  glowY += (mouseY - glowY) * 0.15;
  
  if (cursorGlow) {
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
  }
  
  requestAnimationFrame(animateGlow);
}

animateGlow();

// Hover effects for interactive elements
const interactiveElements = document.querySelectorAll('button, a, .btn, input, textarea, .contact-card, .blog-card, .gallery-item, .chip');

interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    if (cursorGlow) cursorGlow.style.width = '60px';
    if (cursorGlow) cursorGlow.style.height = '60px';
    if (cursorGlow) cursorGlow.style.borderColor = 'rgba(217, 225, 197, 0.8)';
  });
  
  element.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.style.width = '40px';
    if (cursorGlow) cursorGlow.style.height = '40px';
    if (cursorGlow) cursorGlow.style.borderColor = 'rgba(217, 225, 197, 0.4)';
  });
});

// Hide glow when leaving window
document.addEventListener('mouseleave', () => {
  if (cursorGlow) cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  if (cursorGlow) cursorGlow.style.opacity = '1';
});

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('is-active');
    navLinks.classList.toggle('open');
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('is-active');
      navLinks.classList.remove('open');
    });
  });
}

// Navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 0) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Show success message
    const successAlert = document.getElementById('successAlert');
    if (successAlert) {
      successAlert.classList.add('show');
      
      // Reset form
      contactForm.reset();
      
      // Hide alert after 5 seconds
      setTimeout(() => {
        successAlert.classList.remove('show');
      }, 5000);
    }
    
    // Here you can add code to send the form data to your backend
    // Example with fetch:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, subject, message })
    // });
  });
}

// Analog Clock with Date
function initializeClock() {
  const canvas = document.getElementById('clockCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const radius = canvas.width / 2;
  
  function drawClock() {
    // Clear canvas completely
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save context state
    ctx.save();
    
    // Translate to center
    ctx.translate(radius, radius);
    
    // Draw components
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
    
    // Restore context state
    ctx.restore();
  }
  
  function drawFace(ctx, radius) {
    // Draw circle background
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.9, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(26, 26, 26, 0.9)';
    ctx.fill();
    
    // Draw border
    ctx.strokeStyle = 'rgba(74, 158, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw center dot
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.08, 0, 2 * Math.PI);
    ctx.fillStyle = '#4a9eff';
    ctx.fill();
  }
  
  function drawNumbers(ctx, radius) {
    ctx.font = Math.floor(radius * 0.15) + 'px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    
    for (let num = 1; num <= 12; num++) {
      const ang = num * Math.PI / 6;
      ctx.save();
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.75);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.restore();
    }
  }
  
  function drawTime(ctx, radius) {
    const now = new Date();
    
    // Hour hand
    let hour = now.getHours() % 12;
    hour = (hour * Math.PI / 6) + (now.getMinutes() * Math.PI / (6 * 60));
    drawHand(ctx, hour, radius * 0.5, 4, '#4a9eff');
    
    // Minute hand
    let minute = (now.getMinutes() * Math.PI / 30) + (now.getSeconds() * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.7, 3, 'rgba(217, 225, 197, 0.9)');
    
    // Second hand
    let second = (now.getSeconds() * Math.PI / 30);
    drawHand(ctx, second, radius * 0.75, 1.5, 'rgba(217, 225, 197, 0.6)');
  }
  
  function drawHand(ctx, ang, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.sin(ang) * length, -Math.cos(ang) * length);
    ctx.stroke();
  }
  
  // Update date display
  function updateDate() {
    const dateDisplay = document.getElementById('dateDisplay');
    if (dateDisplay) {
      const now = new Date();
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      const dateString = now.toLocaleDateString('en-US', options);
      dateDisplay.textContent = dateString;
    }
  }
  
  updateDate();
  drawClock();
  
  // Update clock every second
  setInterval(drawClock, 1000);
}

// Initialize clock when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeClock);
} else {
  initializeClock();
}

// Disable Copy Feature (except on contact page)
const isContactPage = window.location.pathname.includes('contact.html');

if (!isContactPage) {
  // Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable Ctrl+C copy
  document.addEventListener('copy', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable keyboard shortcuts for copy
  document.addEventListener('keydown', function(e) {
    // Ctrl+C or Cmd+C
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      e.preventDefault();
      return false;
    }
  });

  // Add CSS to disable text selection
  document.documentElement.style.userSelect = 'none';
  document.documentElement.style.webkitUserSelect = 'none';
  document.documentElement.style.msUserSelect = 'none';
  document.documentElement.style.mozUserSelect = 'none';
}