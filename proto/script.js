// /c:/Users/thoma/CodeHome/hollis-brunt.github.io/proto/script.js
// Smoothly shrink <h1> from 12vw (top) to 5vw over the first 600px of scrolling

(function () {
    const h1 = document.querySelector('h1');
    if (!h1) return;

    const MIN_VW = 5;   // at 600px or more
    const MAX_VW = 13;  // at top
    const SHRINK_DISTANCE = 600; // px over which to shrink

    let ticking = false;

    function updateFontSize() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const progress = Math.min(1, Math.max(0, scrollTop / SHRINK_DISTANCE)); // 0..1 over 600px
        const size = MAX_VW - progress * (MAX_VW - MIN_VW);
        h1.style.fontSize = size.toFixed(3) + 'vw';
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateFontSize);
            ticking = true;
        }
    }

    // initialize and attach listeners
    updateFontSize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
})();