/*
    script2.js
    Shows <header> when the top of the first <section> is within 30px
    of the viewport top or when the user has scrolled past it (stays on).
*/

(function () {
    function init() {
        const header = document.querySelector('header');
        const firstSection = document.querySelector('section');
        if (!header || !firstSection) return;

        const style = document.createElement('style');
        style.textContent = `
            header.hb-hidden { opacity: 0; pointer-events: none; transition: opacity .18s linear; }
            header.hb-visible { opacity: 1; pointer-events: auto; transition: opacity .18s linear; }
        `;
        document.head.appendChild(style);

        header.classList.add('hb-hidden');

        let ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        }

        function updateVisibility() {
            const rect = firstSection.getBoundingClientRect();
            // Show header when the section top is <= 30px from the viewport top (includes after scrolling past)
            const withinOrPast = rect.top <= 30;
            if (withinOrPast) {
                header.classList.add('hb-visible');
                header.classList.remove('hb-hidden');
            } else {
                header.classList.add('hb-hidden');
                header.classList.remove('hb-visible');
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        // Initial check
        updateVisibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
