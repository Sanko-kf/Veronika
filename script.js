// Gestion des particules
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles');
        this.createParticles();
        this.animate();
    }

    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Taille aléatoire entre 2px et 8px
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Position aléatoire
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        
        // Animation aléatoire
        const duration = Math.random() * 4 + 4; // 4-8 secondes
        const delay = Math.random() * 2;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        // Couleur aléatoire
        const colors = [
            'rgba(255, 255, 255, 0.8)',
            'rgba(255, 255, 255, 0.6)',
            'rgba(255, 255, 255, 0.4)',
            'rgba(135, 206, 250, 0.6)',
            'rgba(221, 160, 221, 0.6)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    animate() {
        // Animation continue des particules
        this.particles.forEach((particle, index) => {
            const rect = particle.getBoundingClientRect();
            
            // Si la particule sort de l'écran, la repositionner
            if (rect.top > window.innerHeight || rect.left > window.innerWidth) {
                particle.style.top = Math.random() * window.innerHeight + 'px';
                particle.style.left = Math.random() * window.innerWidth + 'px';
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Gestion des interactions 3D améliorées
class Quote3D {
    constructor() {
        this.card = document.getElementById('quoteCard');
        this.cursor = null;
        this.isMouseOver = false;
        this.init();
    }

    init() {
        this.createCustomCursor();
        
        this.card.addEventListener('mouseenter', () => {
            this.isMouseOver = true;
        });

        this.card.addEventListener('mouseleave', () => {
            this.isMouseOver = false;
            this.resetCard();
        });

        this.card.addEventListener('mousemove', (e) => {
            if (this.isMouseOver) {
                this.handleMouseMove(e);
            }
        });

        // Gestion du curseur personnalisé
        document.addEventListener('mousemove', (e) => {
            this.updateCustomCursor(e);
        });
    }

    createCustomCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        document.body.appendChild(this.cursor);
    }

    handleMouseMove(e) {
        const rect = this.card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calcul des rotations plus sensibles et fluides
        const rotateX = (mouseY / rect.height) * 30;
        const rotateY = (mouseX / rect.width) * -30;
        
        // Application de la transformation 3D avec perspective améliorée
        this.card.style.transform = `
            perspective(1200px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(30px)
        `;
        
        // Effet de parallaxe plus subtil sur le contenu
        const content = this.card.querySelector('.quote-content');
        const parallaxX = mouseX * 0.02;
        const parallaxY = mouseY * 0.02;
        
        content.style.transform = `translate(${parallaxX}px, ${parallaxY}px)`;
        
        // Effet de brillance qui suit la souris
        const glowX = (mouseX / rect.width) * 100;
        const glowY = (mouseY / rect.height) * 100;
        this.card.style.background = `
            radial-gradient(circle at ${glowX}% ${glowY}%, 
                rgba(255, 255, 255, 0.2) 0%, 
                rgba(255, 255, 255, 0.1) 50%, 
                rgba(255, 255, 255, 0.05) 100%)
        `;
    }

    resetCard() {
        this.card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        const content = this.card.querySelector('.quote-content');
        content.style.transform = 'translate(0px, 0px)';
        this.card.style.background = 'rgba(255, 255, 255, 0.1)';
    }

    updateCustomCursor(e) {
        if (this.cursor) {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        }
    }
}

// Gestion des transitions de texte fluides
class TextTransitionManager {
    constructor() {
        this.texts = [
            "Hi my sunshine !",
            "Is it your imagination playing tricks on you ?",
            "I am very real :)",
            "- Kevin Ferreira"
        ];
        
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.init();
    }

    init() {
        // Changement automatique toutes les 4 secondes
        setInterval(() => {
            this.changeText();
        }, 4000);

        // Changement au clic
        document.addEventListener('click', () => {
            this.changeText();
        });
    }

    changeText() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        const texts = document.querySelectorAll('.quote-text');
        const currentText = texts[this.currentIndex];
        
        // Fade out du texte actuel
        currentText.classList.remove('active');
        currentText.classList.add('fade-out');
        
        setTimeout(() => {
            // Changer l'index
            this.currentIndex = (this.currentIndex + 1) % this.texts.length;
            const nextText = texts[this.currentIndex];
            
            // Reset du texte précédent
            currentText.classList.remove('fade-out');
            
            // Fade in du nouveau texte
            nextText.classList.add('fade-in');
            nextText.classList.add('active');
            
            setTimeout(() => {
                nextText.classList.remove('fade-in');
                this.isTransitioning = false;
            }, 1200);
            
        }, 600);
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new Quote3D();
    new TextTransitionManager();
    
    // Effet de chargement
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Recréer les particules si nécessaire
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.left > window.innerWidth) {
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.left = Math.random() * window.innerWidth + 'px';
        }
    });
});
