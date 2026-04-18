// script.js

// ===== DOM Elements =====
const intro3d = document.getElementById('intro3d');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const floatingBtn = document.getElementById('floatingBtn');
const navLinks = document.querySelectorAll('.nav-link');

// ===== INTRO ANIMATION =====
window.addEventListener('load', () => {
    setTimeout(() => {
        intro3d.classList.add('hidden');
    }, 3000);
});

// ===== NAVIGATION =====
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== SCROLL ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

// Scroll animation for elements with [data-scroll]
const scrollElements = document.querySelectorAll('[data-scroll]');

scrollElements.forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 30%',
            scrub: false,
            markers: false
        },
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power2.out'
    });
});

// ===== 3D CANVAS ANIMATION =====
function initThreeScene() {
    const canvas = document.getElementById('canvas3d');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true, 
        alpha: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.1);
    camera.position.z = 5;

    // Create animated shapes
    const geometries = [
        new THREE.IcosahedronGeometry(1, 4),
        new THREE.OctahedronGeometry(1),
        new THREE.TetrahedronGeometry(1)
    ];

    const materials = [
        new THREE.MeshPhongMaterial({ 
            color: 0xff6b35, 
            emissive: 0xff6b35,
            shininess: 100,
            wireframe: false 
        }),
        new THREE.MeshPhongMaterial({ 
            color: 0xff1744, 
            emissive: 0xff1744,
            shininess: 100 
        }),
        new THREE.MeshPhongMaterial({ 
            color: 0x00d4ff, 
            emissive: 0x00d4ff,
            shininess: 100 
        })
    ];

    const meshes = [];

    for (let i = 0; i < 3; i++) {
        const mesh = new THREE.Mesh(geometries[i], materials[i]);
        mesh.position.set(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
        );
        scene.add(mesh);
        meshes.push({
            mesh: mesh,
            vx: (Math.random() - 0.5) * 0.005,
            vy: (Math.random() - 0.5) * 0.005,
            vz: (Math.random() - 0.5) * 0.005
        });
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff6b35, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff1744, 0.8);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        meshes.forEach(obj => {
            obj.mesh.rotation.x += 0.001;
            obj.mesh.rotation.y += 0.0015;
            obj.mesh.rotation.z += 0.001;

            obj.mesh.position.x += obj.vx;
            obj.mesh.position.y += obj.vy;
            obj.mesh.position.z += obj.vz;

            // Bounce off boundaries
            if (Math.abs(obj.mesh.position.x) > 4) obj.vx *= -1;
            if (Math.abs(obj.mesh.position.y) > 4) obj.vy *= -1;
            if (Math.abs(obj.mesh.position.z) > 4) obj.vz *= -1;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

// Initialize 3D scene when loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeScene);
} else {
    initThreeScene();
}

// ===== FLOATING BUTTON =====
floatingBtn.addEventListener('click', () => {
    window.open('https://wa.me/919876543210', '_blank');
});

// ===== BUTTON CLICK HANDLERS =====
document.querySelectorAll('.btn-primary, .cta-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent.includes('FREE TRIAL') || this.textContent.includes('SCHEDULE DEMO') || this.textContent.includes('START') || this.textContent.includes('TOUR')) {
            alert('Thank you for your interest! Please contact us on WhatsApp: +91 98765 43210');
        } else if (this.textContent.includes('CHOOSE PLAN') || this.textContent.includes('JOIN NOW')) {
            alert('Choose your membership plan! Contact us for details: +91 98765 43210');
        }
    });
});

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const final = parseInt(stat.textContent);
        if (isNaN(final)) return;
        
        let current = 0;
        const increment = final / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= final) {
                stat.textContent = final + (stat.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
            }
        }, 30);
    });
}

// Trigger counter animation on scroll
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(aboutSection);
        }
    });
    observer.observe(aboutSection);
}

// ===== FORM SUBMISSION (if needed) =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Rock Fitness Studio Website - Premium Version');
    console.log('Location: Shivrampally, Hyderabad');
    console.log('Contact: +91 98765 43210');
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection && window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images (for future image integration)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
