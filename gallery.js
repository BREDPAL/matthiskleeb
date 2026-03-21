const images = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const counter = document.getElementById('lightboxCounter');
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Enter real fullscreen — allowed because this is a user click
    document.documentElement.requestFullscreen().catch(() => {});
}

function closeLightbox(e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
    }
}

function navigate(e, dir) {
    e.stopPropagation();
    currentIndex = (currentIndex + dir + images.length) % images.length;
    updateLightbox();
}

function updateLightbox() {
    const src = images[currentIndex].src.replace('/web/', '/full/');
    lightboxImg.src = src;
    counter.textContent = (currentIndex + 1) + ' / ' + images.length;
}

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        // Fullscreen exits automatically with Escape
    }
    if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % images.length; updateLightbox(); }
    if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + images.length) % images.length; updateLightbox(); }
});

// Exit lightbox when exiting fullscreen (e.g. via Escape)
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});
