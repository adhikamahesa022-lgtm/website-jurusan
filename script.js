document.documentElement.classList.add('js');

const music = new Audio('music/The Weeknd - Starboy.mp3');
music.loop = true;
music.volume = 0.35;
music.preload = 'auto';

const musicEnabledKey = 'if26-music-enabled';
const musicTimeKey = 'if26-music-time';
let musicEnabled = localStorage.getItem(musicEnabledKey) !== 'false';

const restoreMusicPosition = () => {
    const savedTime = Number.parseFloat(localStorage.getItem(musicTimeKey));

    if (Number.isFinite(savedTime) && savedTime < music.duration) {
        music.currentTime = savedTime;
    }

    if (musicEnabled) {
        startMusic();
    }
};

const saveMusicPosition = () => {
    if (music.readyState > 0 && Number.isFinite(music.currentTime)) {
        localStorage.setItem(musicTimeKey, music.currentTime.toString());
    }
};

const musicToggle = document.createElement('button');
musicToggle.className = 'music-toggle';
musicToggle.type = 'button';
musicToggle.setAttribute('aria-label', 'Nyalakan musik');
musicToggle.textContent = '♪ Musik';
document.body.appendChild(musicToggle);

const updateMusicButton = () => {
    const isPlaying = !music.paused;
    musicToggle.classList.toggle('is-playing', isPlaying);
    musicToggle.textContent = isPlaying ? '♫ Musik' : '♪ Musik';
    musicToggle.setAttribute('aria-label', isPlaying ? 'Matikan musik' : 'Nyalakan musik');
};

const startMusic = () => {
    if (!musicEnabled) {
        updateMusicButton();
        return;
    }

    music.play().then(updateMusicButton).catch(updateMusicButton);
};

musicToggle.addEventListener('click', () => {
    if (music.paused) {
        musicEnabled = true;
        localStorage.setItem(musicEnabledKey, 'true');
        startMusic();
    } else {
        musicEnabled = false;
        localStorage.setItem(musicEnabledKey, 'false');
        saveMusicPosition();
        music.pause();
        updateMusicButton();
    }
});

music.addEventListener('loadedmetadata', restoreMusicPosition, { once: true });
music.addEventListener('timeupdate', saveMusicPosition);
window.addEventListener('beforeunload', saveMusicPosition);
document.addEventListener('pointerdown', startMusic, { once: true });
document.addEventListener('keydown', startMusic, { once: true });
startMusic();

const revealSelectors = [
    '.hero-content',
    '.hero-image',
    '.page-header',
    '.materi-card',
    '.materi-detail',
    '.materi-box',
    '.btn-kembali',
    '.member-section'
];

const revealElements = document.querySelectorAll(revealSelectors.join(', '));

revealElements.forEach((element, index) => {
    element.classList.add('reveal-on-scroll');
    element.style.setProperty('--reveal-delay', `${Math.min(index * 70, 420)}ms`);
});

const showElement = (element) => element.classList.add('is-visible');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            showElement(entry.target);
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px'
    });

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach(showElement);
}