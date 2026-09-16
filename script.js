/* =========================================================
   KUNNU & BHAGYA — 2 YEAR ANNIVERSARY DIARY
   JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. ELEMENTS
    ===================================================== */

    const secretScreen = document.getElementById("secretScreen");
    const anniversaryScreen = document.getElementById("anniversaryScreen");
    const diary = document.getElementById("diary");

    const secretForm = document.getElementById("secretForm");
    const secretCode = document.getElementById("secretCode");
    const eyeButton = document.getElementById("eyeButton");
    const errorMessage = document.getElementById("errorMessage");

    const openDiaryButton = document.getElementById("openDiaryButton");

    const finalEnvelope = document.getElementById("finalEnvelope");
    const plane = document.querySelector(".airplane");

    const SECRET_CODE = "30092024";


    /* =====================================================
       2. INITIAL STATE
    ===================================================== */

    if (anniversaryScreen) {
        anniversaryScreen.style.display = "none";
    }

    if (diary) {
        diary.style.display = "none";
    }


    /* =====================================================
       3. PASSWORD EYE BUTTON
    ===================================================== */

    if (eyeButton && secretCode) {

        eyeButton.addEventListener("click", () => {

            if (secretCode.type === "password") {

                secretCode.type = "text";
                eyeButton.textContent = "◉";
                eyeButton.setAttribute("aria-label", "Hide password");

            } else {

                secretCode.type = "password";
                eyeButton.textContent = "◌";
                eyeButton.setAttribute("aria-label", "Show password");

            }

            secretCode.focus();
        });
    }


    /* =====================================================
       4. PASSWORD CHECK
    ===================================================== */

    if (secretForm && secretCode) {

        secretForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const enteredCode = secretCode.value.trim();

            if (enteredCode === SECRET_CODE) {

                if (errorMessage) {
                    errorMessage.textContent = "";
                }

                secretScreen.classList.add("secret-exit");

                setTimeout(() => {

                    if (secretScreen) {
                        secretScreen.style.display = "none";
                    }

                    if (anniversaryScreen) {

                        anniversaryScreen.style.display = "flex";

                        requestAnimationFrame(() => {
                            anniversaryScreen.classList.add("show");
                        });
                    }

                    startRomanticEffects();

                }, 850);

            } else {

                if (errorMessage) {
                    errorMessage.textContent =
                        "Hmm… date yaad hai na? Try again ♡";
                }

                secretCode.classList.remove("wrong-code");

                void secretCode.offsetWidth;

                secretCode.classList.add("wrong-code");

                secretCode.value = "";
                secretCode.focus();
            }
        });
    }


    /* =====================================================
       5. OPEN DIARY
    ===================================================== */

    if (openDiaryButton) {

        openDiaryButton.addEventListener("click", () => {

            if (anniversaryScreen) {
                anniversaryScreen.classList.add("intro-exit");
            }

            setTimeout(() => {

                if (anniversaryScreen) {
                    anniversaryScreen.style.display = "none";
                }

                if (diary) {

                    diary.style.display = "block";

                    requestAnimationFrame(() => {
                        diary.classList.add("diary-enter");
                    });
                }

                startDiaryAnimations();

            }, 700);
        });
    }


    /* =====================================================
       6. ENTER KEY SUPPORT
    ===================================================== */

    if (secretCode) {

        secretCode.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                if (secretForm) {
                    secretForm.requestSubmit();
                }
            }
        });
    }


    /* =====================================================
       7. ROMANTIC PARTICLES
    ===================================================== */

    function createIntroParticles() {

        const container =
            document.querySelector(".intro-particles") ||
            document.body;

        for (let i = 0; i < 24; i++) {

            const particle = document.createElement("span");

            particle.className = "intro-particle";

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.top =
                Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 5 + "s";

            particle.style.animationDuration =
                4 + Math.random() * 5 + "s";

            container.appendChild(particle);
        }
    }


    /* =====================================================
       8. FLOATING HEARTS
    ===================================================== */

    function createFloatingHearts() {

        const heartContainer = document.createElement("div");

        heartContainer.className = "dynamic-hearts";

        document.body.appendChild(heartContainer);

        setInterval(() => {

            const heart = document.createElement("span");

            heart.className = "dynamic-heart";

            heart.textContent = "♡";

            heart.style.left =
                Math.random() * 100 + "vw";

            heart.style.animationDuration =
                6 + Math.random() * 5 + "s";

            heart.style.animationDelay =
                Math.random() * 1.5 + "s";

            heartContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 12000);

        }, 1300);
    }


    /* =====================================================
       9. FALLING PETALS
    ===================================================== */

    function createFallingPetals() {

        const petalContainer = document.createElement("div");

        petalContainer.className = "falling-petals";

        document.body.appendChild(petalContainer);

        setInterval(() => {

            const petal = document.createElement("span");

            petal.className = "falling-petal";

            petal.textContent = "✦";

            petal.style.left =
                Math.random() * 100 + "vw";

            petal.style.animationDuration =
                7 + Math.random() * 5 + "s";

            petal.style.animationDelay =
                Math.random() * 2 + "s";

            petalContainer.appendChild(petal);

            setTimeout(() => {
                petal.remove();
            }, 14000);

        }, 1800);
    }


    /* =====================================================
       10. SECTION REVEAL
    ===================================================== */

    function setupSectionReveal() {

        const sections =
            document.querySelectorAll(
                ".memory-section, .photo-section, .letter-section, .future-section, .goodbye-section, .final-section"
            );

        if (!sections.length) return;

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("section-visible");

                            observer.unobserve(entry.target);
                        }
                    });

                },
                {
                    threshold: 0.15
                }
            );

        sections.forEach((section) => {
            observer.observe(section);
        });
    }


    /* =====================================================
       11. PHOTO FLOAT / TILT
    ===================================================== */

    function setupPhotoInteraction() {

        const photos =
            document.querySelectorAll(".polaroid");

        photos.forEach((photo) => {

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

                photo.style.setProperty(
                    "--mouse-x",
                    rotateX + "deg"
                );

                photo.style.setProperty(
                    "--mouse-y",
                    rotateY + "deg"
                );

                photo.classList.add("photo-interacting");
            });


            photo.addEventListener("mouseleave", () => {

                photo.classList.remove("photo-interacting");

                photo.style.removeProperty("--mouse-x");
                photo.style.removeProperty("--mouse-y");
            });
        });
    }


    /* =====================================================
       12. IMAGE FALLBACK
    ===================================================== */

    function setupImageFallback() {

        const images =
            document.querySelectorAll(".photo-frame img");

        images.forEach((img) => {

            img.addEventListener("error", () => {

                const frame =
                    img.closest(".photo-frame");

                if (frame) {

                    frame.classList.add("missing-photo");

                    img.style.display = "none";
                }
            });


            img.addEventListener("load", () => {

                const frame =
                    img.closest(".photo-frame");

                if (frame) {
                    frame.classList.remove("missing-photo");
                }
            });
        });
    }


    /* =====================================================
       13. CHAI STEAM
    ===================================================== */

    function setupChaiSteam() {

        const chaiCup =
            document.querySelector(".chai-cup");

        if (!chaiCup) return;

        const existingSteam =
            chaiCup.querySelectorAll(".steam");

        if (existingSteam.length) return;

        for (let i = 0; i < 3; i++) {

            const steam =
                document.createElement("span");

            steam.className = "steam js-steam";

            steam.style.left =
                (25 + i * 22) + "%";

            steam.style.animationDelay =
                (i * 0.7) + "s";

            chaiCup.appendChild(steam);
        }
    }


    /* =====================================================
       14. AIRPLANE ANIMATION
    ===================================================== */

    function setupAirplane() {

        if (!plane) return;

        plane.addEventListener("click", () => {

            plane.classList.remove("plane-replay");

            void plane.offsetWidth;

            plane.classList.add("plane-replay");
        });
    }


    /* =====================================================
       15. FINAL ENVELOPE
    ===================================================== */

    function setupFinalEnvelope() {

        if (!finalEnvelope) return;

        finalEnvelope.addEventListener("click", () => {

            finalEnvelope.classList.toggle("opened");

            const finalMessage =
                document.querySelector(".final-message");

            if (
                finalEnvelope.classList.contains("opened") &&
                finalMessage
            ) {

                finalMessage.classList.add(
                    "message-visible"
                );
            }
        });
    }


    /* =====================================================
       16. LETTER CARD
    ===================================================== */

    function setupLetterAnimation() {

        const letter =
            document.querySelector(".letter-paper");

        if (!letter) return;

        letter.addEventListener("click", () => {

            letter.classList.remove("letter-bump");

            void letter.offsetWidth;

            letter.classList.add("letter-bump");
        });
    }


    /* =====================================================
       17. PHOTO GENTLE MOVEMENT
    ===================================================== */

    function setupPhotoFloat() {

        const photos =
            document.querySelectorAll(".polaroid");

        photos.forEach((photo, index) => {

            photo.style.animationDelay =
                (index * 0.7) + "s";
        });
    }


    /* =====================================================
       18. START INTRO EFFECTS
    ===================================================== */

    function startRomanticEffects() {

        createIntroParticles();
        createFloatingHearts();
        createFallingPetals();
    }


    /* =====================================================
       19. START DIARY EFFECTS
    ===================================================== */

    function startDiaryAnimations() {

        setupSectionReveal();
        setupPhotoInteraction();
        setupImageFallback();
        setupChaiSteam();
        setupAirplane();
        setupFinalEnvelope();
        setupLetterAnimation();
        setupPhotoFloat();

        document.body.classList.add("diary-active");
    }


    /* =====================================================
       20. INITIAL IMAGE SETUP
    ===================================================== */

    setupImageFallback();


    /* =====================================================
       21. REDUCE MOTION ACCESSIBILITY
    ===================================================== */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reduceMotion.matches) {
        document.body.classList.add("reduce-motion");
    }


    /* =====================================================
       22. PAUSE ANIMATIONS WHEN TAB IS HIDDEN
    ===================================================== */

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            document.body.classList.add("page-paused");

        } else {

            document.body.classList.remove("page-paused");
        }
    });

});
