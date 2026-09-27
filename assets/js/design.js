document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    // 2026-09-27: 止めた（いつもの矢印に戻す）。矢印が消えると押せる所が分かりにくく、設備会社の語り口とも合わないため（金継ぎ 見立て 問い7）。
    // 戻すときは USE_CUSTOM_CURSOR を true にする（design.css 側は body.custom-cursor のときだけ矢印を消す）
    const USE_CUSTOM_CURSOR = false;
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    
    // Only enable on devices with fine pointer (mouse)
    if (USE_CUSTOM_CURSOR && window.matchMedia('(pointer: fine)').matches) {
        document.body.classList.add('custom-cursor');
        cursorDot.className = 'cursor-dot';
        cursorOutline.className = 'cursor-outline';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay (using animate for smoothness)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    // Simple Parallax Logic
    const parallaxElements = document.querySelectorAll('.parallax-element');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach((el, index) => {
                const speed = el.dataset.speed || 0.2;
                // Alternate direction based on index for variety
                const direction = index % 2 === 0 ? 1 : -1;
                el.style.transform = `translateY(${scrolled * speed * direction}px)`;
            });
        });
    }
});
