/* =========================================================
   OUR ANNIVERSARY DIARY
   Secret Code: 30092024
   ========================================================= */

const SECRET_CODE = "30092024";

/* ---------- ELEMENTS ---------- */

const secretScreen = document.getElementById("secretScreen");
const anniversaryScreen = document.getElementById("anniversaryScreen");
const diary = document.getElementById("diary");

const secretForm = document.getElementById("secretForm");
const secretInput = document.getElementById("secretCode");
const eyeButton = document.getElementById("eyeButton");
const errorMessage = document.getElementById("errorMessage");

const openDiaryButton = document.getElementById("openDiaryButton");


/* ---------- INITIAL STATE ---------- */

if (anniversaryScreen) {
    anniversaryScreen.style.display = "none";
}

if (diary) {
    diary.style.display = "none";
}


/* ---------- HELPER: SCROLL TOP ---------- */

function goToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
    });
}


/* ---------- ERROR MESSAGE ---------- */

function showError(message) {
    if (!errorMessage) return;

    errorMessage.textContent = message;
    errorMessage.classList.add("show");

    if (secretInput) {
        secretInput.classList.remove("shake");

        // Restart shake animation
        void secretInput.offsetWidth;

        secretInput.classList.add("shake");

        setTimeout(() => {
            secretInput.classList.remove("shake");
        }, 500);
    }
}


function clearError() {
    if (!errorMessage) return;

    errorMessage.textContent = "";
    errorMessage.classList.remove("show");
}


/* ---------- EYE BUTTON ---------- */

if (eyeButton && secretInput) {

    eyeButton.addEventListener("click", () => {

        if (secretInput.type === "password") {
            secretInput.type = "text";
            eyeButton.textContent = "Hide";
            eyeButton.setAttribute("aria-label", "Hide secret code");
        } else {
            secretInput.type = "password";
            eyeButton.textContent = "Show";
            eyeButton.setAttribute("aria-label", "Show secret code");
        }

        secretInput.focus();
    });

}


/* ---------- INPUT ---------- */

if (secretInput) {

    secretInput.addEventListener("input", () => {

        // Only numbers
        secretInput.value = secretInput.value.replace(/\D/g, "");

        clearError();

    });

}


/* ---------- SECRET CODE ---------- */

if (secretForm) {

    secretForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const enteredCode = secretInput
            ? secretInput.value.trim()
            : "";

        clearError();

        if (!enteredCode) {

            showError("Enter our secret date first ♡");

            if (secretInput) {
                secretInput.focus();
            }

            return;
        }


        if (enteredCode === SECRET_CODE) {

            // Small exit animation
            if (secretScreen) {
                secretScreen.classList.add("screen-exit");
            }

            createHeartBurst(secretScreen);

            setTimeout(() => {

                if (secretScreen) {
                    secretScreen.style.display = "none";
                }

                if (anniversaryScreen) {
                    anniversaryScreen.style.display = "flex";
                    anniversaryScreen.classList.remove("screen-exit");
                    anniversaryScreen.classList.add("anniversary-appear");
                }

                goToTop();

                startIntroParticles();

            }, 850);

        } else {

            showError("That isn't our secret date ♡");

            if (secretInput) {
                secretInput.value = "";
                secretInput.focus();
            }

        }

    });

}


/* ---------- OPEN DIARY ---------- */

if (openDiaryButton) {

    openDiaryButton.addEventListener("click", () => {

        if (anniversaryScreen) {
            anniversaryScreen.classList.add("screen-exit");
        }

        createHeartBurst(anniversaryScreen);

        setTimeout(() => {

            if (anniversaryScreen) {
                anniversaryScreen.style.display = "none";
            }

            if (diary) {

                diary.style.display = "block";

                diary.classList.remove("diary-enter");

                // Restart animation
                void diary.offsetWidth;

                diary.classList.add("diary-enter");
            }

            goToTop();

            startDiaryAnimations();

        }, 850);

    });

}


/* =========================================================
   FLOATING HEARTS / SPARKLES
   ========================================================= */

function createParticle(container, type = "heart") {

    if (!container) return;

    const particle = document.createElement("span");

    particle.className =
        type === "sparkle"
            ? "js-sparkle"
            : "js-heart";

    particle.textContent =
        type === "sparkle"
            ? "✦"
            : "♡";

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration =
        (7 + Math.random() * 8) + "s";

    particle.style.animationDelay =
        Math.random() * 4 + "s";

    particle.style.fontSize =
        (10 + Math.random() * 14) + "px";

    container.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 17000);
}


/* ---------- INTRO PARTICLES ---------- */

let introParticlesStarted = false;

function startIntroParticles() {

    if (introParticlesStarted) return;

    introParticlesStarted = true;

    const container = anniversaryScreen;

    if (!container) return;

    for (let i = 0; i < 18; i++) {

        setTimeout(() => {

            createParticle(
                container,
                i % 3 === 0 ? "sparkle" : "heart"
            );

        }, i * 350);

    }

}


/* ---------- DIARY PARTICLES ---------- */

let diaryParticlesStarted = false;

function startDiaryAnimations() {

    if (diaryParticlesStarted) return;

    diaryParticlesStarted = true;

    if (!diary) return;

    // Continuous tiny hearts
    setInterval(() => {

        createParticle(
            diary,
            Math.random() > 0.72
                ? "sparkle"
                : "heart"
        );

    }, 1400);

    // Extra tiny floating particles at the beginning
    for (let i = 0; i < 12; i++) {

        setTimeout(() => {

            createParticle(
                diary,
                Math.random() > 0.75
                    ? "sparkle"
                    : "heart"
            );

        }, i * 500);

    }

}


/* =========================================================
   HEART BURST
   ========================================================= */

function createHeartBurst(container) {

    if (!container) return;

    const burst = document.createElement("div");

    burst.className = "heart-burst";

    for (let i = 0; i < 14; i++) {

        const heart = document.createElement("span");

        heart.textContent = "♡";

        const angle =
            (360 / 14) * i;

        const distance =
            60 + Math.random() * 80;

        const x =
            Math.cos(angle * Math.PI / 180) *
            distance;

        const y =
            Math.sin(angle * Math.PI / 180) *
            distance;

        heart.style.setProperty(
            "--x",
            `${x}px`
        );

        heart.style.setProperty(
            "--y",
            `${y}px`
        );

        heart.style.animationDelay =
            Math.random() * 0.15 + "s";

        burst.appendChild(heart);
    }

    container.appendChild(burst);

    setTimeout(() => {
        burst.remove();
    }, 1200);

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const diarySections =
    document.querySelectorAll(".diary-section");


if ("IntersectionObserver" in window) {

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    diarySections.forEach((section) => {
        sectionObserver.observe(section);
    });

} else {

    diarySections.forEach((section) => {
        section.classList.add("visible");
    });

}


/* =========================================================
   PHOTO FLOAT / TILT
   ========================================================= */

const photos =
    document.querySelectorAll(
        ".photo-card, .polaroid, .memory-photo"
    );


photos.forEach((photo, index) => {

    photo.addEventListener("mousemove", (event) => {

        const rect =
            photo.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateY =
            ((x - centerX) / centerX) * 5;

        const rotateX =
            ((centerY - y) / centerY) * 5;

        photo.style.transform =
            `translateY(-6px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.02)`;

    });


    photo.addEventListener("mouseleave", () => {

        photo.style.transform = "";

    });

});


/* =========================================================
   MOUSE PARALLAX
   ========================================================= */

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX =
        (event.clientX / window.innerWidth - 0.5);

    mouseY =
        (event.clientY / window.innerHeight - 0.5);

    document.documentElement.style.setProperty(
        "--mouse-x",
        mouseX.toFixed(3)
    );

    document.documentElement.style.setProperty(
        "--mouse-y",
        mouseY.toFixed(3)
    );

});


/* =========================================================
   ENVELOPE INTERACTION
   ========================================================= */

const envelope =
    document.querySelector(".final-envelope");


if (envelope) {

    envelope.addEventListener("click", () => {

        envelope.classList.toggle("opened");

    });

}


/* =========================================================
   CHAI STEAM
   ========================================================= */

const chaiCups =
    document.querySelectorAll(
        ".chai-cup, .chai"
    );


chaiCups.forEach((cup) => {

    for (let i = 0; i < 3; i++) {

        const steam =
            document.createElement("span");

        steam.className = "js-steam";

        steam.style.left =
            `${25 + i * 20}%`;

        steam.style.animationDelay =
            `${i * 0.5}s`;

        cup.appendChild(steam);

    }

});


/* =========================================================
   PETALS
   ========================================================= */

function createPetal() {

    if (!diary || diary.style.display === "none") {
        return;
    }

    const petal =
        document.createElement("span");

    petal.className = "js-petal";

    petal.textContent = "✦";

    petal.style.left =
        Math.random() * 100 + "%";

    petal.style.animationDuration =
        (8 + Math.random() * 7) + "s";

    petal.style.animationDelay =
        Math.random() * 3 + "s";

    diary.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 16000);

}


setInterval(createPetal, 2200);


/* =========================================================
   AIRPLANE / GOODBYE MOMENT
   ========================================================= */

const airplane =
    document.querySelector(".airplane");


if (airplane) {

    airplane.addEventListener("click", () => {

        airplane.classList.remove("fly-again");

        void airplane.offsetWidth;

        airplane.classList.add("fly-again");

    });

}


/* =========================================================
   KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener("keydown", (event) => {

    // Enter on secret screen
    if (
        event.key === "Enter" &&
        secretScreen &&
        secretScreen.style.display !== "none" &&
        secretInput
    ) {

        secretForm?.requestSubmit();

    }

});


/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            document.documentElement
                .classList.add("page-paused");

        } else {

            document.documentElement
                .classList.remove("page-paused");

        }

    }
);


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

document
    .querySelectorAll("img")
    .forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-missing");

        });

    });


/* =========================================================
   CONSOLE
   ========================================================= */

console.log(
    "♡ Our little universe is ready."
);

console.log(
    "Secret date: 30 September 2024"
);
