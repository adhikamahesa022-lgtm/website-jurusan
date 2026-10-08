document.documentElement.classList.add('js');

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
