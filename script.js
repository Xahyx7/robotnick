// --- PRODUCT DATA ---
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

// --- TYPEWRITER EFFECT ---
function typeText(element, text, speed, callback) {
  element.textContent = '';
  element.style.width = 'auto';
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

// --- SHOWCASE LOOP ---
let activeIndex = 0;
let loopTimer = null;

function setupShowcaseLoop() {
  // Place all products at same spot (CSS does this), hide all but one.
  const displays = productData.map(p => document.getElementById(p.id));
  function hideAll() {
    displays.forEach(el => {
      el.classList.remove('active');
      // Reset typewriter text
      el.querySelectorAll('.product-title, .product-model, .feature, .product-price').forEach(field => {
        field.textContent = '';
        field.classList.remove('typing');
      });
    });
  }

  function showAndAnimate(index) {
    hideAll();
    const p = productData[index];
    const el = document.getElementById(p.id);
    el.classList.add('active');

    // Start typewriter animation for title, model, features, price
    const titleEl = el.querySelector('.product-title');
    const modelEl = el.querySelector('.product-model');
    const featureEls = el.querySelectorAll('.feature');
    const priceEl = el.querySelector('.product-price');

    // Animate typing step by step
    typeText(titleEl, p.title, 60, () => {
      typeText(modelEl, p.model, 40, () => {
        // Features, one after another
        function featureWriter(i) {
          if (i>=p.features.length) {
            // Now type price
            setTimeout(() => {
              typeText(priceEl, p.price, 40);
            }, 350);
            return;
          }
          typeText(featureEls[i], "• "+p.features[i], 25, () => {
            setTimeout(()=>featureWriter(i+1), 270);
          });
        }
        featureWriter(0);
      });
    });
  }

  function loop() {
    showAndAnimate(activeIndex);
    // Next index (cycle)
    activeIndex = (activeIndex+1)%productData.length;
    loopTimer = setTimeout(loop, 8000); // 8 seconds per product
  }

  // Start on load
  loop();
}

// --- INTRO SEQUENCE HANDLER ---
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    // After intro, hide screen and start main content
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('main-content').classList.remove('hidden');
    // Start showcase product loop
    setupShowcaseLoop();
    // (You can also start the gallery loop below if you wish)
  }, 5000); // Adjust to match your intro animation length
});

// (Optional) Smooth scroll and gallery code stays the same

// Smooth scrolling for navigation
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
