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
}

function closeLightbox(e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
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

// Click on lightbox image = next image
lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
});

// Change cursor on lightbox image to indicate clickable
lightboxImg.style.cursor = 'pointer';

document.addEventListener('keydown', (e) => {
    // In lightbox: ESC closes lightbox
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % images.length;
            updateLightbox();
        }
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightbox();
        }
        return;
    }
    // Not in lightbox: ESC goes back to Stories
    if (e.key === 'Escape') {
        window.location.href = 'portfolio.html';
    }
});
