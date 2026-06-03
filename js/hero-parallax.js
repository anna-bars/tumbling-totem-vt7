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

let targetScroll = 0;
let currentScroll = 0;

function animate() {

    currentScroll = lerp(
        currentScroll,
        targetScroll,
        0.08
    );

    // միայն hero հատվածում
    const progress = Math.min(
        currentScroll / window.innerHeight,
        1
    );

    // Desktop / Mobile range
    const move = isMobile
        ? progress * 180
        : progress * 450;

    // SKY
    if (layers.sky)
        layers.sky.style.transform =
            `translateY(${-move * depth.sky}px)`;

    // MOUNTAINS
    if (layers.mountains)
        layers.mountains.style.transform =
            `translateY(${-move * depth.mountains}px)`;

    // HILLS
    if (layers.hills)
        layers.hills.style.transform =
            `translateY(${-move * depth.hills}px)`;

    // TEMPLE
    if (layers.temple)
        layers.temple.style.transform =
            `translateY(${-move * depth.temple}px)`;

    // JUNGLE MID
    if (layers.jungleMid)
        layers.jungleMid.style.transform =
            `translateY(${-move * depth.jungleMid}px)`;

    // JUNGLE FRONT
    if (layers.jungleFront)
        layers.jungleFront.style.transform =
            `translateY(${-move * depth.jungleFront}px)`;

    // FOREGROUND
    if (layers.foreground)
        layers.foreground.style.transform =
            `translateY(${-move * depth.foreground}px)`;

    // 🍃 LEFT LEAF
    if (layers.leavesLeft) {

        const x = isMobile
            ? -progress * 25
            : -progress * 80;

        const y = isMobile
            ? -progress * 40
            : -progress * 180;

        const rotate = isMobile
            ? -2
            : -4;

        layers.leavesLeft.style.transform =
            `translate(${x}px, ${y}px)
             rotate(${rotate}deg)`;
    }

    // 🍃 RIGHT LEAF
    if (layers.leavesRight) {

        const x = isMobile
            ? progress * 25
            : progress * 80;

        const y = isMobile
            ? -progress * 40
            : -progress * 180;

        const rotate = isMobile
            ? 2
            : 4;

        layers.leavesRight.style.transform =
            `translate(${x}px, ${y}px)
             rotate(${rotate}deg)`;
    }

    requestAnimationFrame(animate);
}

window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;
});

animate();