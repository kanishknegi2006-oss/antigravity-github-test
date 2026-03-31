/* ===== MARVEL VAULT — Interactive JavaScript with Static Data ===== */

// ===== Particle Background =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

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

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = [
            '226, 54, 54',    // Marvel red
            '168, 85, 247',   // Purple
            '59, 130, 246',   // Blue
            '6, 182, 212',    // Cyan
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (mouse.x !== null && mouse.y !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                this.x += dx / dist * 0.8;
                this.y += dy / dist * 0.8;
            }
        }

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();

        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${this.color}, ${this.opacity * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function initParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const opacity = (1 - dist / 150) * 0.15;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(226, 54, 54, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    drawConnections();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

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
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => this.style.transform = '', 150);
            }, 100);

            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                let count = parseInt(cartCount.textContent);
                count++;
                cartCount.textContent = count;
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
            <p><strong>DESIGNATION:</strong> MARK LXXXV (85)</p>
            <p><strong>SUIT TYPE:</strong> Nanotechnology / Die-cast Alloy Hybrid.</p>
            <p><strong>KEY LOADOUT:</strong> Features a Nano Lightning Refocuser to redirect energy and a Hard-light Energy Shield.</p>
            <p><strong>VAULT NOTE:</strong> Tony Stark's final masterpiece, integrating the sleekness of the Mark L with traditional heavy plating.</p>
        `
    },
    {
        name: "DOCTOR STRANGE",
        tag: "// SORCERER SUPREME — MYSTIC ARTS",
        image: "assets/doctor-strange.png",
        glowColor: "#f97316",
        description: `
            <p><strong>DESIGNATION:</strong> MASTER OF THE MYSTIC ARTS</p>
            <p><strong>PRIMARY RELICS:</strong> The sentient Cloak of Levitation and the Eye of Agamotto.</p>
            <p><strong>KEY LOADOUT:</strong> Sling Ring for interdimensional travel and illuminated Eldritch Magic spell circles.</p>
            <p><strong>VAULT NOTE:</strong> Attire crafted from high-quality layered wool with intricate screen-matched embroidery.</p>
        `
    },
    {
        name: "CAPTAIN AMERICA",
        tag: "// SUPER SOLDIER — SENTINEL OF LIBERTY",
        image: "assets/captain-america.png",
        glowColor: "#2563eb",
        description: `
            <p><strong>DESIGNATION:</strong> THE FIRST AVENGER</p>
            <p><strong>PRIMARY WEAPON:</strong> 2.5ft Diameter Vibranium-Steel Alloy Shield.</p>
            <p><strong>KEY LOADOUT:</strong> Reinforced Kevlar-weave tactical suit with magnetic shield mounts.</p>
            <p><strong>VAULT NOTE:</strong> This edition commemorates the moment Rogers proved "worthy" to wield Mjolnir.</p>
        `
    },
    {
        name: "THOR",
        tag: "// GOD OF THUNDER — ASGARDIAN ROYALTY",
        image: "assets/thor.png",
        glowColor: "#3b82f6",
        description: `
            <p><strong>DESIGNATION:</strong> GOD OF THUNDER</p>
            <p><strong>PRIMARY WEAPONS:</strong> Stormbreaker (Axe-hammer) and the enchanted Mjolnir.</p>
            <p><strong>KEY LOADOUT:</strong> Asgardian metal plating with lightning manipulation focal points.</p>
            <p><strong>VAULT NOTE:</strong> Stormbreaker is capable of summoning the Bifrost bridge for interstellar travel.</p>
        `
    },
    {
        name: "THE HULK",
        tag: "// GAMMA MUTATE — SMART HULK",
        image: "assets/hulk.png",
        glowColor: "#22c55e",
        description: `
            <p><strong>DESIGNATION:</strong> GAMMA-POWERED BEHEMOTH</p>
            <p><strong>SUIT TYPE:</strong> Stark Industries Tactical Bodysuit (High-elasticity fabric).</p>
            <p><strong>KEY LOADOUT:</strong> Nano Gauntlet integration and oversized 12-inch articulation.</p>
            <p><strong>VAULT NOTE:</strong> Features Gamma-powered LED eyes and a specialized destructible base.</p>
        `
    },
    {
        name: "BLACK PANTHER",
        tag: "// KING OF WAKANDA — T'CHALLA",
        image: "assets/black-panther.png",
        glowColor: "#a855f7",
        description: `
            <p><strong>DESIGNATION:</strong> KING OF WAKANDA</p>
            <p><strong>SUIT TYPE:</strong> Triple-weave Vibranium Panther Habit.</p>
            <p><strong>KEY LOADOUT:</strong> UV-reactive Vibranium accents and retractable Anti-metal claws.</p>
            <p><strong>VAULT NOTE:</strong> The suit absorbs kinetic energy (purple glow) and releases it in radial pulses.</p>
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
