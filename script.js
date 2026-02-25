// ===================== SPLASH SCREEN =====================
(function() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;

    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        splash.classList.add('hidden');
        document.body.style.overflow = '';
        setTimeout(() => startObserver(), 100);
    }, 2800);
})();

// ===================== HERO VIDEO SWITCHER =====================
const videoSources = [
    { src: 'photos/petvid.mp4', label: '🎬 Live Demo' },
    { src: 'photos/vid3.mp4',   label: '📱 App Preview' },
    { src: 'photos/vid1.mp4',   label: '✨ Features' }
];

function switchVideo(index, btn) {
    const vid = document.getElementById('heroVid');
    const label = document.getElementById('heroVidLabel');
    if (!vid) return;

    // Fade out
    vid.style.opacity = '0';
    vid.style.transition = 'opacity 0.25s ease';

    setTimeout(() => {
        vid.src = videoSources[index].src;
        label.textContent = videoSources[index].label;
        vid.load();
        vid.play().catch(() => {});
        vid.style.opacity = '1';
    }, 250);

    // Update active button
    document.querySelectorAll('.vid-thumb').forEach((b, i) => {
        b.classList.toggle('active', i === index);
    });
}

// ===================== VIDEO SPEEDS =====================
document.addEventListener('DOMContentLoaded', () => {
    ['video1','video2','video1b','video2b'].forEach(id => {
        const v = document.getElementById(id);
        if (v) v.playbackRate = 1.5;
    });
});

// ===================== NAV TOGGLE =====================
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===================== INTERSECTION OBSERVER (REVEAL) =====================
function startObserver() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.getAttribute('data-reveal-delay') || 0;
                setTimeout(() => el.classList.add('visible'), parseInt(delay));
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-reveal], [data-reveal-delay]').forEach(el => {
        if (!el.classList.contains('visible')) observer.observe(el);
    });
}

// ===================== NAV SCROLL BEHAVIOR =====================
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.pageYOffset > 50);
});

// ===================== FAQ TOGGLE =====================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            faqItems.forEach(other => { if (other !== item) other.classList.remove('active'); });
            item.classList.toggle('active');
        });
    });
});