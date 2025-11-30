document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    
    // Only enable on devices with fine pointer (mouse)
    if (window.matchMedia('(pointer: fine)').matches) {
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
