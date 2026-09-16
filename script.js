/* =========================================================
   OUR LITTLE DIARY
   JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   SECRET CODE
   ========================================================= */

const SECRET_CODE = "30092024";


/* =========================================================
   ELEMENTS
   ========================================================= */

const secretScreen =
    document.getElementById("secretScreen");

const anniversaryScreen =
    document.getElementById("anniversaryScreen");

const diary =
    document.getElementById("diary");

const secretForm =
    document.getElementById("secretForm");

const secretInput =
    document.getElementById("secretCode");

const eyeButton =
    document.getElementById("eyeButton");

const errorMessage =
    document.getElementById("errorMessage");

const openDiaryButton =
    document.getElementById("openDiaryButton");


/* =========================================================
   INITIAL STATE
   ========================================================= */

if (anniversaryScreen) {
    anniversaryScreen.style.display = "none";
}

if (diary) {
    diary.style.display = "none";
}


/* =========================================================
   TOP OF PAGE
   ========================================================= */

function scrollTopInstant() {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
    });

}


/* =========================================================
   ERROR
   ========================================================= */

function showError(message) {

    if (!errorMessage) return;

    errorMessage.textContent = message;
    errorMessage.classList.add("show");

    if (secretInput) {

        secretInput.classList.remove("shake");

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


/* =========================================================
   EYE / SHOW PASSWORD
   ========================================================= */

if (eyeButton && secretInput) {

    eyeButton.addEventListener("click", () => {

        const isPassword =
            secretInput.type === "password";

        if (isPassword) {

            secretInput.type = "text";

            eyeButton.textContent = "Hide";

            eyeButton.setAttribute(
                "aria-label",
                "Hide secret code"
            );

        } else {

            secretInput.type = "password";

            eyeButton.textContent = "Show";

            eyeButton.setAttribute(
                "aria-label",
                "Show secret code"
            );

        }

        secretInput.focus();

    });

}


/* =========================================================
   SECRET INPUT
   ========================================================= */

if (secretInput) {

    secretInput.addEventListener("input", () => {

        secretInput.value =
            secretInput.value.replace(/\D/g, "");

        clearError();

    });

}


/* =========================================================
   SECRET FORM
   ========================================================= */

if (secretForm) {

    secretForm.addEventListener("submit", (event) => {

        event.preventDefault();

        clearError();

        const enteredCode =
            secretInput
                ? secretInput.value.trim()
                : "";

        if (!enteredCode) {

            showError(
                "Enter our secret date first ♡"
            );

            secretInput?.focus();

            return;
        }


        if (enteredCode !== SECRET_CODE) {

            showError(
                "That isn't our secret date ♡"
            );

            if (secretInput) {

                secretInput.value = "";

                secretInput.focus();

            }

            return;
        }


        /* ---------- CORRECT CODE ---------- */

        createHeartBurst(secretScreen);

        if (secretScreen) {

            secretScreen.classList.add(
                "screen-exit"
            );

        }


        setTimeout(() => {

            if (secretScreen) {
                secretScreen.style.display = "none";
            }

            if (anniversaryScreen) {

                anniversaryScreen.style.display =
                    "flex";

                anniversaryScreen.classList.remove(
                    "anniversary-appear"
                );

                void anniversaryScreen.offsetWidth;

                anniversaryScreen.classList.add(
                    "anniversary-appear"
                );

            }

            scrollTopInstant();

            startOpeningParticles();

        }, 850);

    });

}


/* =========================================================
   OPEN DIARY
   ========================================================= */

if (openDiaryButton) {

    openDiaryButton.addEventListener(
        "click",
        () => {

            createHeartBurst(
                anniversaryScreen
            );

            if (anniversaryScreen) {

                anniversaryScreen.classList.add(
                    "screen-exit"
                );

            }


            setTimeout(() => {

                if (anniversaryScreen) {

                    anniversaryScreen.style.display =
                        "none";

                }


                if (diary) {

                    diary.style.display = "block";

                    diary.classList.remove(
                        "diary-enter"
                    );

                    void diary.offsetWidth;

                    diary.classList.add(
                        "diary-enter"
                    );

                }

                scrollTopInstant();

                startDiary();

            }, 850);

        }
    );

}


/* =========================================================
   FLOATING PARTICLES
   ========================================================= */

function createParticle(
    container,
    type = "heart"
) {

    if (!container) return;


    const particle =
        document.createElement("span");


    if (type === "sparkle") {

        particle.className =
            "js-sparkle";

        particle.textContent = "✦";

    } else {

        particle.className =
            "js-heart";

        particle.textContent = "♡";

    }


    particle.style.left =
        `${Math.random() * 100}%`;


    particle.style.fontSize =
        `${10 + Math.random() * 12}px`;


    particle.style.animationDuration =
        `${8 + Math.random() * 7}s`;


    particle.style.animationDelay =
        `${Math.random() * 2}s`;


    container.appendChild(particle);


    setTimeout(() => {

        particle.remove();

    }, 17000);

}


/* =========================================================
   OPENING PARTICLES
   ========================================================= */

let openingParticlesStarted = false;

function startOpeningParticles() {

    if (openingParticlesStarted) return;

    openingParticlesStarted = true;

    if (!anniversaryScreen) return;


    for (let i = 0; i < 18; i++) {

        setTimeout(() => {

            createParticle(
                anniversaryScreen,
                i % 4 === 0
                    ? "sparkle"
                    : "heart"
            );

        }, i * 300);

    }


    setInterval(() => {

        if (
            anniversaryScreen.style.display !==
            "none"
        ) {

            createParticle(
                anniversaryScreen,
                Math.random() > 0.75
                    ? "sparkle"
                    : "heart"
            );

        }

    }, 1800);

}


/* =========================================================
   DIARY PARTICLES
   ========================================================= */

let diaryStarted = false;

function startDiary() {

    if (diaryStarted) return;

    diaryStarted = true;

    if (!diary) return;


    /* Initial floating particles */

    for (let i = 0; i < 15; i++) {

        setTimeout(() => {

            createParticle(
                diary,
                Math.random() > 0.75
                    ? "sparkle"
                    : "heart"
            );

        }, i * 350);

    }


    /* Continuous floating hearts */

    setInterval(() => {

        if (
            diary.style.display !==
            "none"
        ) {

            createParticle(
                diary,
                Math.random() > 0.78
                    ? "sparkle"
                    : "heart"
            );

        }

    }, 1600);


    startPetals();

    startSteam();

    startPhotoInteraction();

}


/* =========================================================
   HEART BURST
   ========================================================= */

function createHeartBurst(container) {

    if (!container) return;


    const burst =
        document.createElement("div");

    burst.className =
        "heart-burst";


    for (let i = 0; i < 16; i++) {

        const heart =
            document.createElement("span");

        heart.textContent = "♡";


        const angle =
            (360 / 16) * i;


        const distance =
            55 + Math.random() * 100;


        const x =
            Math.cos(
                angle * Math.PI / 180
            ) * distance;


        const y =
            Math.sin(
                angle * Math.PI / 180
            ) * distance;


        heart.style.setProperty(
            "--x",
            `${x}px`
        );


        heart.style.setProperty(
            "--y",
            `${y}px`
        );


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

const sections =
    document.querySelectorAll(
        ".diary-section"
    );


if (
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    sections.forEach(
        (section) => {

            observer.observe(section);

        }
    );

} else {

    sections.forEach(
        (section) => {

            section.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   PHOTO INTERACTION
   =========================================================
   Photos will be added later.
   This automatically works when photos are added.
   ========================================================= */

function startPhotoInteraction() {

    const photos =
        document.querySelectorAll(
            ".photo-card, .polaroid, .memory-photo, img"
        );


    photos.forEach((photo) => {

        photo.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    photo.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 4;


                const rotateX =
                    ((centerY - y) /
                        centerY) * 4;


                photo.style.transform =
                    `translateY(-5px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     scale(1.02)`;

            }
        );


        photo.addEventListener(
            "mouseleave",
            () => {

                photo.style.transform = "";

            }
        );

    });

}


/* =========================================================
   FALLING PETALS
   ========================================================= */

let petalsStarted = false;

function startPetals() {

    if (petalsStarted) return;

    petalsStarted = true;


    setInterval(() => {

        if (
            !diary ||
            diary.style.display === "none"
        ) {
            return;
        }


        const petal =
            document.createElement("span");


        petal.className =
            "js-petal";


        petal.textContent =
            Math.random() > 0.5
                ? "✦"
                : "·";


        petal.style.left =
            `${Math.random() * 100}%`;


        petal.style.animationDuration =
            `${9 + Math.random() * 6}s`;


        petal.style.fontSize =
            `${8 + Math.random() * 8}px`;


        diary.appendChild(petal);


        setTimeout(() => {

            petal.remove();

        }, 16000);

    }, 2300);

}


/* =========================================================
   CHAI STEAM
   ========================================================= */

let steamStarted = false;

function startSteam() {

    if (steamStarted) return;

    steamStarted = true;


    const chaiElements =
        document.querySelectorAll(
            ".chai-visual"
        );


    chaiElements.forEach(
        (cup) => {

            for (let i = 0; i < 3; i++) {

                const steam =
                    document.createElement("span");

                steam.className =
                    "js-steam";


                steam.textContent = "﹏";


                steam.style.left =
                    `${25 + i * 20}%`;


                steam.style.top = "3px";


                steam.style.animationDelay =
                    `${i * 0.55}s`;


                cup.appendChild(steam);

            }

        }
    );

}


/* =========================================================
   ENVELOPE OPEN / CLOSE
   ========================================================= */

const envelope =
    document.querySelector(
        ".envelope"
    );


if (envelope) {

    envelope.addEventListener(
        "click",
        () => {

            envelope.classList.toggle(
                "opened"
            );

        }
    );

}


/* =========================================================
   AIRPLANE CLICK
   ========================================================= */

const airplane =
    document.querySelector(
        ".goodbye-icon"
    );


if (airplane) {

    airplane.addEventListener(
        "click",
        () => {

            airplane.classList.remove(
                "fly-again"
            );

            void airplane.offsetWidth;

            airplane.classList.add(
                "fly-again"
            );

        }
    );

}


/* =========================================================
   KEYBOARD
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            secretScreen &&
            secretScreen.style.display !==
                "none" &&
            secretInput
        ) {

            secretForm?.requestSubmit();

        }

    }
);


/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            document.documentElement
                .classList
                .add("page-paused");

        } else {

            document.documentElement
                .classList
                .remove("page-paused");

        }

    }
);


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

document
    .querySelectorAll("img")
    .forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-missing"
                );

            }
        );

    });


/* =========================================================
   MOBILE TOUCH
   ========================================================= */

document.addEventListener(
    "touchstart",
    () => {

        document.documentElement
            .classList
            .add("touch-device");

    },
    {
        once: true,
        passive: true
    }
);


/* =========================================================
   FINAL CONSOLE MESSAGE
   ========================================================= */

console.log(
    "♡ Our Little Diary is ready."
);

console.log(
    "30 September 2024 — First unexpected meeting"
);

console.log(
    "14 September 2025 — Day out, no photos"
);

console.log(
    "15 September 2025 — Room + evening memories"
);
