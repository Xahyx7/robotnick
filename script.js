// Product data
const productData = [
  {
    id: 'robotic-hand',
    title: 'Neural Robotic Hand',
    model: 'Model: RH-2025 Pro',
    features: [
      'AI-powered neural grip recognition',
      'Advanced pressure control system',
      'Medical-grade prosthetic compatibility',
      'Real-time gesture learning'
    ],
    price: 'Starting at $15,999'
  },
  {
    id: 'robotic-pet',
    title: 'AI Pet Companion',
    model: 'Model: AI-Pet Pro',
    features: [
      'Emotional intelligence AI',
      'Adaptive personality development',
      'Health monitoring sensors',
      'Interactive play algorithms'
    ],
    price: 'Starting at $3,999'
  },
  {
    id: 'robotic-caretaker',
    title: 'CareBot Assistant',
    model: 'Model: CareBot Pro',
    features: [
      'Medical monitoring systems',
      'Emergency response protocols',
      'Medication management AI',
      'Companion interaction modes'
    ],
    price: 'Starting at $29,999'
  }
];

// Typewriter effect function
function typeText(element, text, speed, callback) {
  element.textContent = '';
  let i = 0;
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      if (callback) callback();
    }
  }
  type();
}

// Product showcase variables
let activeIndex = 0;
let showcaseInterval;

// Initialize showcase loop
function setupShowcaseLoop() {
  const displays = productData.map(p => document.getElementById(p.id));
  
  function hideAllProducts() {
    displays.forEach(el => {
      el.classList.remove('active');
      // Clear all text
      el.querySelectorAll('.product-title, .product-model, .feature, .product-price').forEach(field => {
        field.textContent = '';
      });
    });
  }

  function showAndAnimateProduct(index) {
    hideAllProducts();
    
    const product = productData[index];
    const element = document.getElementById(product.id);
    element.classList.add('active');

    // Get elements for typewriter animation
    const titleEl = element.querySelector('.product-title');
    const modelEl = element.querySelector('.product-model');
    const featureEls = element.querySelectorAll('.feature');
    const priceEl = element.querySelector('.product-price');

    // Start typewriter sequence
    typeText(titleEl, product.title, 80, () => {
      setTimeout(() => {
        typeText(modelEl, product.model, 60, () => {
          setTimeout(() => {
            animateFeatures(0);
          }, 300);
        });
      }, 200);
    });

    function animateFeatures(featureIndex) {
      if (featureIndex < product.features.length) {
        typeText(featureEls[featureIndex], `• ${product.features[featureIndex]}`, 40, () => {
          setTimeout(() => {
            animateFeatures(featureIndex + 1);
          }, 400);
        });
      } else {
        setTimeout(() => {
          typeText(priceEl, product.price, 70);
        }, 500);
      }
    }
  }

  function nextProduct() {
    showAndAnimateProduct(activeIndex);
    activeIndex = (activeIndex + 1) % productData.length;
  }

  // Start the loop
  nextProduct();
  showcaseInterval = setInterval(nextProduct, 10000); // 10 seconds per product
}

// Gallery loop functionality
function startGalleryLoop() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  let galleryActiveIndex = 0;
  
  function rotateGallery() {
    // Remove active class from all items
    galleryItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to current item with animation
    galleryItems[galleryActiveIndex].classList.add('active');
    
    // Move to next item
    galleryActiveIndex = (galleryActiveIndex + 1) % galleryItems.length;
  }
  
  // Start gallery rotation
  setInterval(rotateGallery, 3000); // Change every 3 seconds
}

// Gallery item click handlers
function setupGalleryInteraction() {
  document.addEventListener('click', function(e) {
    if (e.target.closest('.gallery-item')) {
      const item = e.target.closest('.gallery-item');
      
      // Add special click effect
      item.style.transform = 'scale(1.2) rotateY(360deg)';
      item.style.transition = 'all 0.8s ease';
      
      setTimeout(() => {
        item.style.transform = 'scale(1.1)';
      }, 800);
    }
  });
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Start intro sequence
  setTimeout(() => {
    // Hide intro screen
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('main-content').classList.remove('hidden');
    
    // Start main showcase loop
    setupShowcaseLoop();
    
    // Start gallery animations
    setTimeout(() => {
      startGalleryLoop();
    }, 2000);
    
    // Setup interactions
    setupGalleryInteraction();
    setupSmoothScrolling();
    
  }, 5000); // After 5 second intro
});
