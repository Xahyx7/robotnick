// Product data
const productData = {
    'robotic-hand': {
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
    'robotic-pet': {
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
    'robotic-caretaker': {
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
};

let currentProductIndex = 0;
const productIds = Object.keys(productData);

// Initialize website
document.addEventListener('DOMContentLoaded', function() {
    // Show main content after intro
    setTimeout(() => {
        document.getElementById('intro-screen').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
        startProductShowcase();
    }, 5000);
});

// Product showcase sequence
function startProductShowcase() {
    setTimeout(() => {
        showNextProduct();
    }, 1000);
}

function showNextProduct() {
    const currentProduct = productIds[currentProductIndex];
    const productElement = document.getElementById(currentProduct);
    
    // Animate product into view
    productElement.style.animation = 'productSlideIn 1s ease-out forwards';
    
    // Start typewriter effects
    setTimeout(() => {
        typewriterEffect(productElement, currentProduct);
    }, 500);
    
    // Move to next product after delay
    setTimeout(() => {
        if (currentProductIndex < productIds.length - 1) {
            // Move current product up and show next
            productElement.style.animation = 'productSlideUp 1s ease-in forwards';
            currentProductIndex++;
            setTimeout(() => {
                showNextProduct();
            }, 1000);
        } else {
            // All products shown, start gallery loop
            setTimeout(() => {
                startGalleryLoop();
            }, 3000);
        }
    }, 8000);
}

function typewriterEffect(productElement, productId) {
    const data = productData[productId];
    const titleElement = productElement.querySelector('.product-title');
    const modelElement = productElement.querySelector('.product-model');
    const featureElements = productElement.querySelectorAll('.feature');
    const priceElement = productElement.querySelector('.product-price');
    
    // Type title
    typeText(titleElement, data.title, 100);
    
    // Type model after title
    setTimeout(() => {
        typeText(modelElement, data.model, 80);
    }, 1500);
    
    // Type features
    data.features.forEach((feature, index) => {
        setTimeout(() => {
            typeText(featureElements[index], `• ${feature}`, 60);
        }, 2500 + (index * 800));
    });
    
    // Type price last
    setTimeout(() => {
        typeText(priceElement, data.price, 80);
    }, 6000);
}

function typeText(element, text, speed) {
    element.textContent = '';
    element.style.width = 'auto';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Gallery loop functionality
function startGalleryLoop() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let activeIndex = 0;
    
    function rotateGallery() {
        // Remove active class from all items
        galleryItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to current item with fade effect
        galleryItems[activeIndex].style.opacity = '0';
        
        setTimeout(() => {
            galleryItems[activeIndex].classList.add('active');
            galleryItems[activeIndex].style.opacity = '1';
        }, 300);
        
        // Move to next item
        activeIndex = (activeIndex + 1) % galleryItems.length;
    }
    
    // Start rotation
    setInterval(rotateGallery, 3000);
}

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

// Gallery item click handlers
document.addEventListener('click', function(e) {
    if (e.target.closest('.gallery-item')) {
        const item = e.target.closest('.gallery-item');
        const productType = item.getAttribute('data-product');
        
        // Add special highlight effect
        item.style.transform = 'scale(1.2) rotateY(360deg)';
        item.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            item.style.transform = 'scale(1.1)';
        }, 800);
    }
});
