/* =========================================================
   KUNNU & BHAGYA — OUR LITTLE UNIVERSE
   SCRIPT.JS
========================================================= */


/* =========================================================
   SECRET CODE
========================================================= */

const SECRET_CODE = "30092024";


/* =========================================================
   ELEMENTS
========================================================= */

const lockScreen = document.getElementById("lockScreen");
const secretCode = document.getElementById("secretCode");
const unlockBtn = document.getElementById("unlockBtn");
const codeError = document.getElementById("codeError");

const mainContent = document.getElementById("mainContent");
const backgroundMusic = document.getElementById("backgroundMusic");
const beginButton = document.getElementById("beginButton");
const intro = document.getElementById("intro");


/* =========================================================
   INITIAL STATE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (mainContent) {
        mainContent.style.display = "none";
    }

    if (secretCode) {
        secretCode.focus();
    }

    prepareStoryAnimations();

});


/* =========================================================
   UNLOCK WEBSITE
========================================================= */

function unlockWebsite() {

    const enteredCode = secretCode.value.trim();

    if (enteredCode === SECRET_CODE) {

        codeError.textContent = "";

        unlockBtn.disabled = true;
        secretCode.disabled = true;

        unlockBtn.textContent = "Opening our universe… ♡";

        createUnlockParticles();

        lockScreen.classList.add("unlocking");

        setTimeout(() => {

            lockScreen.style.display = "none";

            mainContent.style.display = "block";

            document.body.style.overflowY = "auto";

            startMusic();

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

            revealHero();

        }, 1300);

    } else {

        codeError.textContent =
            "That isn't the date where our story began. ♡";

        secretCode.classList.remove("wrong-code");

        void secretCode.offsetWidth;

        secretCode.classList.add("wrong-code");

        secretCode.value = "";

        secretCode.focus();

    }

}


/* =========================================================
   BUTTON CLICK
========================================================= */

if (unlockBtn) {

    unlockBtn.addEventListener("click", unlockWebsite);

}


/* =========================================================
   ENTER KEY
========================================================= */

if (secretCode) {

    secretCode.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            unlockWebsite();
        }

    });

}


/* =========================================================
   MUSIC
========================================================= */

function startMusic() {

    if (!backgroundMusic) {
        return;
    }

    backgroundMusic.volume = 0.35;

    const playPromise = backgroundMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {
                console.log("Background music started.");
            })
            .catch(() => {

                /*
                    Some browsers block audio even after interaction.
                    The website itself still works normally.
                */

                console.log(
                    "Music autoplay was blocked by the browser."
                );

            });

    }

}


/* =========================================================
   BEGIN OUR STORY BUTTON
========================================================= */

if (beginButton) {

    beginButton.addEventListener("click", () => {

        if (!intro) {
            return;
        }

        intro.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}


/* =========================================================
   STORY REVEAL ANIMATIONS
========================================================= */

function prepareStoryAnimations() {

    const animatedElements = document.querySelectorAll(
        ".story-card, .intro-letter, .distance-card, .final-love-card"
    );

    animatedElements.forEach((element) => {

        element.style.opacity = "0";

        const currentTransform =
            window.getComputedStyle(element).transform;

        if (
            currentTransform === "none" ||
            currentTransform === "matrix(1, 0, 0, 1, 0, 0)"
        ) {

            element.style.transform =
                "translateY(45px)";

        } else {

            element.dataset.originalTransform =
                currentTransform;

            element.style.transform =
                `${currentTransform} translateY(45px)`;

        }

    });

}


/* =========================================================
   INTERSECTION OBSERVER
========================================================= */

const storyObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            const element = entry.target;

            element.style.opacity = "1";

            const originalTransform =
                element.dataset.originalTransform;

            if (originalTransform) {

                element.style.transform =
                    originalTransform;

            } else {

                element.style.transform =
                    "translateY(0)";

            }

            observer.unobserve(element);

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);


/* =========================================================
   OBSERVE STORY ELEMENTS
========================================================= */

function activateStoryObserver() {

    const animatedElements = document.querySelectorAll(
        ".story-card, .intro-letter, .distance-card, .final-love-card"
    );

    animatedElements.forEach((element) => {

        storyObserver.observe(element);

    });

}

activateStoryObserver();


/* =========================================================
   HERO REVEAL
========================================================= */

function revealHero() {

    const heroContent =
        document.querySelector(".hero-content");

    const heroTeddy =
        document.querySelector(".hero-teddy");

    const heroGuitar =
        document.querySelector(".hero-guitar");

    if (heroContent) {

        heroContent.style.opacity = "0";
        heroContent.style.transform = "translateY(25px)";

        setTimeout(() => {

            heroContent.style.transition =
                "opacity 1.2s ease, transform 1.2s ease";

            heroContent.style.opacity = "1";
            heroContent.style.transform = "translateY(0)";

        }, 200);

    }

    if (heroTeddy) {

        heroTeddy.style.opacity = "0";

        setTimeout(() => {

            heroTeddy.style.transition =
                "opacity 1s ease";

            heroTeddy.style.opacity = "1";

        }, 700);

    }

    if (heroGuitar) {

        heroGuitar.style.opacity = "0";

        setTimeout(() => {

            heroGuitar.style.transition =
                "opacity 1s ease";

            heroGuitar.style.opacity = "1";

        }, 900);

    }

}


/* =========================================================
   UNLOCK PARTICLES
========================================================= */

function createUnlockParticles() {

    const particleContainer =
        document.createElement("div");

    particleContainer.className =
        "unlock-particles";

    particleContainer.style.position = "fixed";
    particleContainer.style.inset = "0";
    particleContainer.style.pointerEvents = "none";
    particleContainer.style.zIndex = "10001";
    particleContainer.style.overflow = "hidden";

    document.body.appendChild(particleContainer);

    for (let i = 0; i < 45; i++) {

        const particle =
            document.createElement("span");

        particle.textContent =
            Math.random() > 0.45 ? "♡" : "✦";

        particle.style.position = "absolute";
        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        particle.style.fontSize =
            8 + Math.random() * 18 + "px";

        particle.style.color =
            "rgba(255,180,220," +
            (0.35 + Math.random() * 0.65) +
            ")";

        particle.style.opacity = "0";

        particle.style.transform =
            "scale(0.3)";

        particle.style.transition =
            "all " +
            (0.7 + Math.random() * 0.7) +
            "s ease";

        particleContainer.appendChild(particle);

        requestAnimationFrame(() => {

            particle.style.opacity = "1";

            particle.style.transform =
                "translateY(" +
                (-40 - Math.random() * 120) +
                "px) scale(" +
                (0.7 + Math.random() * 1.2) +
                ")";

        });

    }

    setTimeout(() => {

        particleContainer.remove();

    }, 1800);

}


/* =========================================================
   FLOATING HEARTS
========================================================= */

function createFloatingHeart() {

    const heart =
        document.createElement("span");

    heart.textContent = "♡";

    heart.style.position = "fixed";
    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.bottom = "-30px";

    heart.style.fontSize =
        12 + Math.random() * 20 + "px";

    heart.style.color =
        "rgba(244,157,207," +
        (0.35 + Math.random() * 0.5) +
        ")";

    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1";

    heart.style.transition =
        "transform 5s linear, opacity 5s linear";

    document.body.appendChild(heart);

    requestAnimationFrame(() => {

        heart.style.transform =
            "translateY(-110vh) rotate(" +
            (-30 + Math.random() * 60) +
            "deg)";

        heart.style.opacity = "0";

    });

    setTimeout(() => {

        heart.remove();

    }, 5200);

}


/* =========================================================
   START FLOATING HEARTS AFTER UNLOCK
========================================================= */

let heartInterval = null;

function startFloatingHearts() {

    if (heartInterval) {
        return;
    }

    heartInterval =
        setInterval(() => {

            createFloatingHeart();

        }, 2600);

}


/* Start hearts after successful unlock */

if (unlockBtn) {

    unlockBtn.addEventListener("click", () => {

        if (
            secretCode &&
            secretCode.value.trim() === SECRET_CODE
        ) {

            setTimeout(() => {

                startFloatingHearts();

            }, 1200);

        }

    });

}


/* =========================================================
   IMAGE LOADING
========================================================= */

const storyImages =
    document.querySelectorAll("img");

storyImages.forEach((image) => {

    image.addEventListener("load", () => {

        image.classList.add("image-loaded");

    });

    image.addEventListener("error", () => {

        image.classList.add("image-error");

        console.warn(
            "Image could not be loaded:",
            image.getAttribute("src")
        );

    });

});


/* =========================================================
   PREVENT ACCIDENTAL FORM-LIKE SUBMISSION
========================================================= */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" &&
        document.activeElement === secretCode
    ) {
        return;
    }

});


/* =========================================================
   PAGE VISIBILITY / MUSIC
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (!backgroundMusic) {
            return;
        }

        if (document.hidden) {

            /*
                Don't force music to restart when the user
                returns. The browser decides playback policy.
            */

            return;

        }

    }
);


/* =========================================================
   SMALL SCREEN TOUCH SUPPORT
========================================================= */

document.addEventListener(
    "touchstart",
    () => {

        if (
            backgroundMusic &&
            mainContent &&
            mainContent.style.display === "block" &&
            backgroundMusic.paused
        ) {

            backgroundMusic.play().catch(() => {});

        }

    },
    {
        once: true
    }
);


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "♡ Kunnu & Bhagya — Our Little Universe is ready."
);
