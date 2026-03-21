function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen().catch(() => {});
    }
}

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
    document.querySelector('.hamburger').classList.toggle('open');
}
