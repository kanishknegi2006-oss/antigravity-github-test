/* ===== MARVEL VAULT — Interactive JavaScript with Static Data ===== */

import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js'

/* ===== Three.js Liquid Background ===== */
// Initialize on existing canvas
const backgroundCanvas = document.getElementById('particleCanvas');
const app = LiquidBackground(backgroundCanvas);

// Configuration for cinematic "Chrome/Metallic" look
if (app) {
    // Load background image texture
    const bgImgSource = 'assets/hero-liquid-bg.png';
    app.loadImage(bgImgSource);

    // Apply material properties for the mercury/chrome effect
    app.liquidPlane.material.metalness = 0.9;
    app.liquidPlane.material.roughness = 0.1;

    // Deeper waves for more dynamic look
    if (app.liquidPlane.uniforms && app.liquidPlane.uniforms.displacementScale) {
        app.liquidPlane.uniforms.displacementScale.value = 8;
    }

    // Disable rain to keep the tech-focused UI clean
    app.setRain(false);
}
else {
    // FALLBACK FOR MOBILE: 
    // Use your original CSS-based animated background logic here 
    // to save battery and processing power.
    console.log("Mobile detected: WebGL background disabled for performance.");
}

// ===== Intersection Observer for Scroll Animations =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Apply delay-based entrance
            setTimeout(() => entry.target.classList.add('visible'), index * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

function initReveals() {
    const revealElements = document.querySelectorAll('.category-card, .review-card, .feature-item, .about-visual, .product-card.reveal');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}


// ===== Static Product Data =====
const PRODUCTS = [
    {
        title: "Iron Man Mark LXXXV",
        series: "AVENGERS: ENDGAME",
        description: "Nano-tech armor with LED-lit Arc Reactor. Die-cast alloy construction.",
        price: 189.99,
        oldPrice: 249.99,
        badge: "NEW",
        imageUrl: "assets/iron-man.png",
        glowColor: "#ff4444"
    },
    {
        title: "Spider-Man Integrated Suit",
        series: "NO WAY HOME",
        description: "Articulated web-slinging pose. Magnetic web accessories included.",
        price: 159.99,
        oldPrice: 199.99,
        badge: "BEST SELLER",
        imageUrl: "assets/spider-man.png",
        glowColor: "#e23636"
    },
    {
        title: "Black Panther Vibranium",
        series: "WAKANDA FOREVER",
        description: "Kinetic energy suit with UV-reactive vibranium accents.",
        price: 219.99,
        oldPrice: 279.99,
        badge: "LIMITED",
        imageUrl: "assets/black-panther.png",
        glowColor: "#a855f7"
    },
    {
        title: "Thor God of Thunder",
        series: "LOVE AND THUNDER",
        description: "Stormbreaker with lightning FX. Asgardian armor detail.",
        price: 174.99,
        oldPrice: 229.99,
        imageUrl: "assets/thor.png",
        glowColor: "#3b82f6"
    },
    {
        title: "Captain America Shield",
        series: "AVENGERS: ENDGAME",
        description: "Vibranium shield replica. Super soldier serum articulation.",
        price: 164.99,
        oldPrice: 219.99,
        imageUrl: "assets/captain-america.png",
        glowColor: "#2563eb"
    },
    {
        title: "Doctor Strange Mystic",
        series: "MULTIVERSE OF MADNESS",
        description: "Illuminated spell circles. Cloak of Levitation fabric.",
        price: 199.99,
        oldPrice: 259.99,
        badge: "NEW",
        imageUrl: "assets/doctor-strange.png",
        glowColor: "#f97316"
    },
    {
        title: "Hulk Smash Edition",
        series: "AVENGERS: AGE OF ULTRON",
        description: "Oversized 12\" figure. Gamma-powered LED eyes. Destructible base.",
        price: 234.99,
        oldPrice: 299.99,
        badge: "LIMITED",
        imageUrl: "assets/hulk.png",
        glowColor: "#22c55e"
    }
];


// ===== Dynamic Product Loading (Static) =====
async function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    // Simulate network delay for premium feel
    productsGrid.innerHTML = `
        <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <div class="loader-spinner" style="margin-bottom: 1rem;"></div>
            <h3 style="color: var(--text-muted); letter-spacing: 2px;">SYNCING WITH VAULT...</h3>
        </div>`;

    setTimeout(() => {
        productsGrid.innerHTML = PRODUCTS.map((p, index) => `
            <div class="product-card reveal" style="transition-delay: ${index * 0.1}s">
                ${p.badge ? `<div class="card-badge ${p.badge.toLowerCase().replace(' ', '')}">${p.badge}</div>` : ''}
                <div class="card-image-wrap">
                    <img src="${p.imageUrl}" alt="${p.title}" loading="lazy">
                    <div class="card-glow" style="--glow-color: ${p.glowColor || '#ff4444'};"></div>
                </div>
                <div class="card-content">
                    <span class="card-series">${p.series}</span>
                    <h3 class="card-title">${p.title}</h3>
                    <p class="card-desc">${p.description}</p>
                    <div class="card-footer">
                        <div class="card-price">
                            <span class="price-current">$${p.price.toFixed(2)}</span>
                            ${p.oldPrice ? `<span class="price-old">$${p.oldPrice.toFixed(2)}</span>` : ''}
                        </div>
                        <button class="card-cart-btn" aria-label="Add ${p.title} to cart">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Observe new cards for scroll-reveal
        productsGrid.querySelectorAll('.product-card').forEach(card => {
            revealObserver.observe(card);
        });

        attachProductInteractions();
    }, 800);
}

function attachProductInteractions() {
    // Re-attach Tilt
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Re-attach Cart Logic
    document.querySelectorAll('.card-cart-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => this.style.transform = '', 150);
            }, 100);

            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                let count = parseInt(cartCount.textContent) || 0;
                count++;
                cartCount.textContent = count;
                cartCount.style.display = 'flex';
                cartCount.style.transform = 'scale(1.3)';
                setTimeout(() => cartCount.style.transform = '', 200);
            }
        });
    });
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
}

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            counter.textContent = Math.floor(easeProgress * target);
            if (progress < 1) requestAnimationFrame(updateCounter);
            else counter.textContent = target;
        }
        requestAnimationFrame(updateCounter);
    });
}

// This block moved up to be available for dynamic loading

const heroStats = document.querySelector('.hero-stats');
let counterAnimated = false;
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            counterAnimated = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });
if (heroStats) statsObserver.observe(heroStats);

// ===== Newsletter Form (Static) =====
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('emailInput');
        const btn = newsletterForm.querySelector('.btn-primary span');
        const email = input.value;

        if (!email) return;

        const originalText = btn.textContent;
        btn.textContent = 'PROCESSING...';

        // Simulate local success
        setTimeout(() => {
            btn.textContent = 'ASSEMBLED ✓';
            input.value = '';
            input.placeholder = 'Welcome to the Avengers Initiative!';

            setTimeout(() => {
                btn.textContent = originalText;
                input.placeholder = 'Enter your email address';
            }, 3000);
        }, 1200);
    });
}

// ===== Sub-navigation Active State =====
function initSubNav() {
    const subNavLinks = document.querySelectorAll('.sub-nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (subNavLinks.length === 0) return;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        subNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// ===== HERO LOADOUT DATA =====
const HERO_DATA = [
    {
        name: "IRON MAN",
        tag: "// MARK LXXXV — NANO-TECH ARMOR",
        image: "assets/iron-man.png",
        glowColor: "#ff4444",
        description: `
            <p><strong>SUIT TYPE:</strong> Nano-tech / Die-cast Alloy Hybrid.</p>
            <p><strong>KEY FEATURES:</strong> * <strong>Nano Lightning Refocuser:</strong> Large back-mounted apparatus to absorb and redirect energy.</p>
            <p><strong>ENERGY SHIELD:</strong> Hard-light blue shield capable of protecting multiple people.</p>
            <p><strong>NANO GAUNTLET INTEGRATION:</strong> The suit’s right hand can shift into a containment vessel for the Infinity Stones.</p>
            <p><strong>SUIT HISTORY:</strong> Tony Stark's final masterpiece, combining the sleekness of the Mark L with more traditional, durable plating.</p>
        `
    },
    {
        name: "DOCTOR STRANGE",
        tag: "// SORCERER SUPREME — MYSTIC ARTS",
        image: "assets/doctor-strange.png",
        glowColor: "#f97316",
        description: `
            <p><strong>PRIMARY RELICS:</strong> * <strong>Cloak of Levitation:</strong> A sentient, ancient relic that provides flight and has a "personality" of its own. It often acts independently to protect Strange.</p>
            <p><strong>EYE OF AGAMOTTO:</strong> A pendant traditionally used to house the Time Stone, capable of manipulating local time flows.</p>
            <p><strong>SLING RING:</strong> A small double-finger ring used to open interdimensional portals.</p>
            <p><strong>ATTIRE:</strong> High-quality layered Japanese wool with intricate embroidery.</p>
        `
    },
    {
        name: "CAPTAIN AMERICA",
        tag: "// SUPER SOLDIER — SENTINEL OF LIBERTY",
        image: "assets/captain-america.png",
        glowColor: "#2563eb",
        description: `
            <p><strong>THE SHIELD:</strong> A 2.5-foot diameter concavo-convex disc made of a unique Vibranium-Steel alloy. It absorbs nearly all kinetic energy and vibrations.</p>
            <p><strong>THE SUIT:</strong> Designed for high-impact combat with reinforced Kevlar-like weaving and magnetic mounts for the shield on the back and forearm.</p>
            <p><strong>SPECIAL NOTE:</strong> In his final battle, Rogers also proved "worthy" to wield Mjolnir, granting him the powers of Thor.</p>
        `
    },
    {
        name: "THOR",
        tag: "// GOD OF THUNDER — ASGARDIAN ROYALTY",
        image: "assets/thor.png",
        glowColor: "#3b82f6",
        description: `
            <p><strong>WEAPONS:</strong> * <strong>Stormbreaker:</strong> An enchanted axe-hammer forged in Nidavellir; it can summon the Bifrost bridge for interstellar travel.</p>
            <p><strong>MJOLNIR:</strong> His original hammer, enchanted by Odin so only the worthy can lift it.</p>
            <p><strong>ARMOR:</strong> Asgardian metal plating with "Disc" motifs that act as focal points for lightning manipulation.</p>
        `
    },
    {
        name: "THE HULK",
        tag: "// GAMMA MUTATE — SMART HULK",
        image: "assets/hulk.png",
        glowColor: "#22c55e",
        description: `
            <p><strong>PHYSICAL TRAITS:</strong> Green skin caused by excessive Gamma radiation exposure.</p>
            <p><strong>LOADOUT (SMART HULK):</strong> * <strong>Tactical Bodysuit:</strong> A specialized, highly elastic fabric suit designed by Stark Industries to stretch without tearing during transformations.</p>
            <p><strong>NANO GAUNTLET:</strong> Bruce was the only hero durable enough to survive the initial radiation surge of the Nano Gauntlet "Snap."</p>
            <p><strong>POWERS:</strong> Infinite strength scaling with anger and a regenerative healing factor.</p>
        `
    },
    {
        name: "BLACK PANTHER",
        tag: "// KING OF WAKANDA — T'CHALLA",
        image: "assets/black-panther.png",
        glowColor: "#a855f7",
        description: `
            <p><strong>THE HABIT:</strong> A triple-weave Vibranium suit that is completely bulletproof.</p>
            <p><strong>SUIT TECH:</strong> * <strong>Kinetic Energy Distribution:</strong> The suit absorbs the force of impacts (glows purple) and can release that energy in a powerful radial pulse.</p>
            <p><strong>RETRACTABLE CLAWS:</strong> Made of anti-metal Vibranium capable of slicing through almost any surface, including Captain America's shield.</p>
        `
    }
];

// ===== Vault Modal System =====
function openVault(index) {
    const hero = HERO_DATA[index];
    if (!hero) return;

    const modal = document.getElementById('vaultModal');
    const modalImg = document.getElementById('modalHeroImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTag = document.getElementById('modalTag');

    if (!modal) return;

    modalImg.src = hero.image;
    modalImg.alt = hero.name;
    modalTitle.textContent = hero.name;
    modalDesc.innerHTML = hero.description;
    if (modalTag) modalTag.textContent = hero.tag;

    // Set glow color
    modal.style.setProperty('--modal-glow', hero.glowColor);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVault() {
    const modal = document.getElementById('vaultModal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('vaultModal');
    if (modal && e.target === modal) {
        closeVault();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVault();
    }
});

// ===== Initialize =====
window.addEventListener('DOMContentLoaded', () => {
    initReveals();
    loadProducts();
    initSubNav();
});

// Smooth Scroll Refined
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = document.querySelector('.sub-nav') ? 140 : 80;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Global Exports for HTML Event Handlers =====
window.openVault = openVault;
window.closeVault = closeVault;
