const layers = {
    sky: document.querySelector(".layer-1-sky"),
    mountains: document.querySelector(".layer-2-mountains"),
    hills: document.querySelector(".layer-3-hills-back"),
    temple: document.querySelector(".layer-4-temple"),
    jungleMid: document.querySelector(".layer-5-jungle-mid"),
    jungleFront: document.querySelector(".layer-6-jungle-front"),
    foreground: document.querySelector(".layer-7-foreground"),

    leavesLeft: document.querySelector(".leaves-left"),
    leavesRight: document.querySelector(".leaves-right"),
};

const isMobile = window.innerWidth <= 768;
const scale = isMobile ? 1.3 : 1.1;

// Desktop values
const desktopDepth = {
    sky: 0.08,
    mountains: 0.15,
    hills: 0.25,
    temple: 0.45,
    jungleMid: 0.70,
    jungleFront: 1.00,
    foreground: 1.45,
};

// Mobile values
const mobileDepth = {
    sky: 0.03,
    mountains: 0.06,
    hills: 0.10,
    temple: 0.18,
    jungleMid: 0.28,
    jungleFront: 0.40,
    foreground: 0.60,
};

const depth = isMobile ? mobileDepth : desktopDepth;

const lerp = (start, end, amount) =>
    start + (end - start) * amount;

// scroll state
let targetScroll = 0;
let currentScroll = 0;

// 🎯 mouse state (NEW)
let targetMouseX = 0;
let mouseX = 0;

// mouse tracking
window.addEventListener("mousemove", (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 → 1
});

// scroll tracking
window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;
});
const logo = document.querySelector(".logo");

if (logo) {
    let hover = false;

    logo.addEventListener("mouseenter", () => {
        hover = true;
    });

    logo.addEventListener("mouseleave", () => {
        hover = false;

        // reset smoothly
        logo.style.transform = `translate(0px, 0px) scale(1)`;
    });

    logo.addEventListener("mousemove", (e) => {
        if (!hover) return;

        const rect = logo.getBoundingClientRect();

        // normalize mouse inside logo (-1 to 1)
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        // VERY small movement
        const moveX = x * 6;
        const moveY = y * 4;

        const scale = 1.03; // subtle zoom only

        logo.style.transform = `
            translate(${moveX}px, ${moveY}px)
            scale(${scale})
        `;
    });
}
function animate() {
    requestAnimationFrame(animate);

    // smooth scroll + mouse
    currentScroll = lerp(currentScroll, targetScroll, 0.08);
    mouseX = lerp(mouseX, targetMouseX, 0.06);

    const progress = Math.min(currentScroll / window.innerHeight, 1);

    const move = isMobile ? progress * 180 : progress * 450;

    // 🔥 VERY SMALL mouse strength (IMPORTANT)
    const mouseStrength = isMobile ? 3 : 6;

    // helper
    const apply = (el, d) => {
        if (!el) return;

        const x = mouseX * mouseStrength * d;
        const y = -move * d;

        el.style.transform = `
            translate(${x}px, ${y}px)
            scale(${scale})
        `;
    };

    // BACK LAYERS
    apply(layers.sky, depth.sky);
    apply(layers.mountains, depth.mountains);
    apply(layers.hills, depth.hills);
    apply(layers.temple, depth.temple);
    apply(layers.jungleMid, depth.jungleMid);
    apply(layers.jungleFront, depth.jungleFront);
    apply(layers.foreground, depth.foreground);

    // 🍃 LEAVES (slightly stronger but still subtle)
    if (layers.leavesLeft) {
        layers.leavesLeft.style.transform = `
            translate(
                ${mouseX * 10 - progress * 80}px,
                ${-progress * 180}px
            )
            scale(${scale})
        `;
    }

    if (layers.leavesRight) {
        layers.leavesRight.style.transform = `
            translate(
                ${mouseX * 10 + progress * 80}px,
                ${-progress * 180}px
            )
            scale(${scale})
        `;
    }
}

animate();