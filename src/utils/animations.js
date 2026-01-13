// Intersection Observer for scroll animations
export const observeElements = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .scale-in').forEach(el => {
    observer.observe(el);
  });
};

// Smooth scroll with offset
export const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.querySelector(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

