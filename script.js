/* =========================================================
   OUR ANNIVERSARY — SCRIPT.JS
   Bhagya ♡ Kunnu
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const secretScreen = document.getElementById("secretScreen");
    const anniversaryScreen = document.getElementById("anniversaryScreen");
    const diary = document.getElementById("diary");

    const secretForm = document.getElementById("secretForm");
    const secretCode = document.getElementById("secretCode");
    const errorMessage = document.getElementById("errorMessage");

    const eyeButton = document.getElementById("eyeButton");
    const openDiaryButton = document.getElementById("openDiaryButton");

    const finalEnvelope = document.querySelector(".final-envelope");
    const plane = document.querySelector(".plane");

    /* =====================================================
       SECRET CODE
       ===================================================== */

    const SECRET_CODE = "30092024";

    /* =====================================================
       INITIAL STATE
       ===================================================== */

    if (anniversaryScreen) {
        anniversaryScreen.style.display = "none";
    }

    if (diary) {
        diary.style.display = "none";
    }


    /* =====================================================
       PASSWORD EYE
       ===================================================== */

    if (eyeButton && secretCode) {

        eyeButton.addEventListener("click", () => {

            const isPassword = secretCode.type === "password";

            secretCode.type = isPassword ? "text" : "password";

            eyeButton.textContent = isPassword ? "◉" : "○";

        });

    }


    /* =====================================================
       SECRET FORM
       ===================================================== */

    if (secretForm && secretCode) {

        secretForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const enteredCode = secretCode.value.trim();

            if (enteredCode === SECRET_CODE) {

                if (errorMessage) {
                    errorMessage.textContent = "";
                }

                if (secretScreen) {

                    secretScreen.classList.add("leaving");

                    setTimeout(() => {

                        secretScreen.style.display = "none";

                        if (anniversaryScreen) {
                            anniversaryScreen.style.display = "flex";
                            anniversaryScreen.classList.add("show-intro");
                        }

                        startIntroEffects();

                    }, 650);

                }

            } else {

                if (errorMessage) {
                    errorMessage.textContent = "That isn't our date ♡";
                }

                secretCode.classList.remove("wrong-code");

                void secretCode.offsetWidth;

                secretCode.classList.add("wrong-code");

            }

        });

    }


    /* =====================================================
       ENTER KEY
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
       OPEN DIARY
       ===================================================== */

    if (openDiaryButton) {

        openDiaryButton.addEventListener("click", () => {

            if (anniversaryScreen) {

                anniversaryScreen.classList.add("intro-leaving");

            }

            setTimeout(() => {

                if (anniversaryScreen) {
                    anniversaryScreen.style.display = "none";
                }

                if (diary) {

                    diary.style.display = "block";

                    diary.classList.add("diary-visible");

                    window.scrollTo({
                        top: 0,
                        behavior: "instant"
                    });

                    startDiaryEffects();

                }

            }, 700);

        });

    }


    /* =====================================================
       INTRO EFFECTS
       ===================================================== */

    function startIntroEffects() {

        createIntroParticles();

    }


    function createIntroParticles() {

        const container = anniversaryScreen;

        if (!container) return;

        for (let i = 0; i < 16; i++) {

            const particle = document.createElement("span");

            particle.className = "intro-particle";

            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = Math.random() * 100 + "%";

            particle.style.animationDelay =
                (Math.random() * 3).toFixed(2) + "s";

            particle.style.animationDuration =
                (3 + Math.random() * 4).toFixed(2) + "s";

            container.appendChild(particle);

        }

    }


    /* =====================================================
       DIARY EFFECTS
       ===================================================== */

    function startDiaryEffects() {

        createFloatingHearts();

        createFallingPetals();

        setupSectionReveal();

        setupPhotoInteraction();

        setupFinalEnvelope();

        setupPlane();

        setupChaiSteam();

        setupImageFallbacks();

    }


    /* =====================================================
       FLOATING HEARTS
       ===================================================== */

    function createFloatingHearts() {

        const container = document.querySelector(".diary-background");

        if (!container) return;

        for (let i = 0; i < 18; i++) {

            const heart = document.createElement("span");

            heart.className = "dynamic-heart";

            heart.innerHTML = "♡";

            heart.style.left = Math.random() * 100 + "%";

            heart.style.animationDelay =
                (Math.random() * 8).toFixed(2) + "s";

            heart.style.animationDuration =
                (7 + Math.random() * 7).toFixed(2) + "s";

            heart.style.fontSize =
                (10 + Math.random() * 15).toFixed(0) + "px";

            container.appendChild(heart);

        }

    }


    /* =====================================================
       FALLING PETALS
       ===================================================== */

    function createFallingPetals() {

        const container = document.querySelector(".diary-background");

        if (!container) return;

        for (let i = 0; i < 20; i++) {

            const petal = document.createElement("span");

            petal.className = "falling-petal";

            petal.innerHTML = "✦";

            petal.style.left = Math.random() * 100 + "%";

            petal.style.animationDelay =
                (Math.random() * 10).toFixed(2) + "s";

            petal.style.animationDuration =
                (8 + Math.random() * 8).toFixed(2) + "s";

            petal.style.fontSize =
                (7 + Math.random() * 9).toFixed(0) + "px";

            container.appendChild(petal);

        }

    }


    /* =====================================================
       SECTION REVEAL
       ===================================================== */

    function setupSectionReveal() {

        const sections = document.querySelectorAll(".diary-page");

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("page-visible");

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        sections.forEach((section) => {

            observer.observe(section);

        });

    }


    /* =====================================================
       PHOTO INTERACTION
       ===================================================== */

    function setupPhotoInteraction() {

        const photos = document.querySelectorAll(".photo-frame");

        photos.forEach((photo) => {

            photo.addEventListener("pointermove", (event) => {

                const rect = photo.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY =
                    ((x - centerX) / centerX) * 4;

                const rotateX =
                    ((centerY - y) / centerY) * 4;

                photo.style.setProperty(
                    "--mouse-x",
                    `${rotateY}deg`
                );

                photo.style.setProperty(
                    "--mouse-y",
                    `${rotateX}deg`
                );

                photo.classList.add("photo-interacting");

            });


            photo.addEventListener("pointerleave", () => {

                photo.classList.remove("photo-interacting");

                photo.style.setProperty(
                    "--mouse-x",
                    "0deg"
                );

                photo.style.setProperty(
                    "--mouse-y",
                    "0deg"
                );

            });

        });

    }


    /* =====================================================
       FINAL ENVELOPE
       ===================================================== */

    function setupFinalEnvelope() {

        if (!finalEnvelope) return;

        finalEnvelope.addEventListener("click", () => {

            finalEnvelope.classList.toggle("opened");

        });

    }


    /* =====================================================
       PLANE
       ===================================================== */

    function setupPlane() {

        if (!plane) return;

        plane.addEventListener("click", () => {

            plane.classList.remove("plane-replay");

            void plane.offsetWidth;

            plane.classList.add("plane-replay");

        });

    }


    /* =====================================================
       CHAI STEAM
       ===================================================== */

    function setupChaiSteam() {

        const chaiCup = document.querySelector(".chai-cup");

        if (!chaiCup) return;

        /*
           Only create extra steam if the HTML doesn't
           already contain steam elements.
        */

        const existingSteam =
            chaiCup.querySelectorAll(".steam");

        if (existingSteam.length >= 3) {
            return;
        }

        for (let i = 0; i < 3; i++) {

            const steam = document.createElement("span");

            steam.className = "js-steam";

            steam.style.left =
                (25 + i * 20) + "%";

            steam.style.animationDelay =
                (i * 0.8) + "s";

            chaiCup.appendChild(steam);

        }

    }


    /* =====================================================
       IMAGE FALLBACK
       ===================================================== */

    function setupImageFallbacks() {

        const images = document.querySelectorAll(
            ".photo-frame img"
        );

        images.forEach((image) => {

            image.addEventListener("error", () => {

                const frame =
                    image.closest(".photo-frame");

                if (!frame) return;

                frame.classList.add("missing-photo");

                image.classList.add("image-not-found");

            });

            /*
               If image already failed before JS attached
               the listener.
            */

            if (
                image.complete &&
                image.naturalWidth === 0 &&
                image.getAttribute("src")
            ) {

                const frame =
                    image.closest(".photo-frame");

                if (frame) {
                    frame.classList.add("missing-photo");
                }

                image.classList.add("image-not-found");

            }

        });

    }


    /* =====================================================
       PAUSE / RESUME ANIMATIONS WHEN TAB HIDDEN
       ===================================================== */

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            document.body.classList.add("page-paused");

        } else {

            document.body.classList.remove("page-paused");

        }

    });


    /* =====================================================
       SMOOTH DIARY NAVIGATION
       ===================================================== */

    const diaryLinks =
        document.querySelectorAll('a[href^="#"]');

    diaryLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       PHOTO SLOT CHECK
       ===================================================== */

    /*
       Expected photo structure:

       30 September 2024
       ------------------
       images/30-sep-auto.jpg
       images/30-sep-cafe.jpg

       14 September 2025
       ------------------
       NO PHOTOS

       15 September 2025
       ------------------
       images/15-sep-1.jpg
       images/15-sep-2.jpg
       images/15-sep-3.jpg

       Goodbye
       ------------------
       images/goodbye.jpg

       Total anniversary photos = 6 only if goodbye.jpg
       is also added separately.

       Main dated galleries:
       30 Sep = 2
       15 Sep = 3
    */


    /* =====================================================
       ACCESSIBILITY
       ===================================================== */

    if (secretCode) {

        secretCode.addEventListener("input", () => {

            if (errorMessage) {
                errorMessage.textContent = "";
            }

        });

    }


    /* =====================================================
       REDUCED MOTION
       ===================================================== */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reduceMotion.matches) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }


    /* =====================================================
       EXTRA ANIMATION STYLES
       ===================================================== */

    const dynamicStyle =
        document.createElement("style");

    dynamicStyle.textContent = `

        /* Secret screen exit */

        #secretScreen.leaving {
            animation: secretExit 0.65s ease forwards;
        }


        @keyframes secretExit {
            0% {
                opacity: 1;
                transform: scale(1);
            }

            100% {
                opacity: 0;
                transform: scale(1.04);
                filter: blur(8px);
            }
        }


        /* Wrong password */

        .wrong-code {
            animation: wrongCode 0.45s ease;
        }


        @keyframes wrongCode {

            0%,
            100% {
                transform: translateX(0);
            }

            25% {
                transform: translateX(-8px);
            }

            50% {
                transform: translateX(8px);
            }

            75% {
                transform: translateX(-5px);
            }

        }


        /* Intro */

        #anniversaryScreen.show-intro {
            animation: introAppear 1.2s ease forwards;
        }


        #anniversaryScreen.intro-leaving {
            animation: introLeave 0.7s ease forwards;
        }


        @keyframes introAppear {

            from {
                opacity: 0;
                transform: scale(0.96);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }

        }


        @keyframes introLeave {

            from {
                opacity: 1;
                transform: scale(1);
            }

            to {
                opacity: 0;
                transform: scale(1.06);
                filter: blur(6px);
            }

        }


        /* Intro particles */

        .intro-particle {
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: rgba(255,255,255,0.55);
            pointer-events: none;
            animation: introParticle 4s ease-in-out infinite;
        }


        @keyframes introParticle {

            0% {
                opacity: 0;
                transform: translateY(20px) scale(0.5);
            }

            30% {
                opacity: 1;
            }

            70% {
                opacity: 0.8;
            }

            100% {
                opacity: 0;
                transform: translateY(-70px) scale(1.2);
            }

        }


        /* Floating hearts */

        .dynamic-heart {
            position: absolute;
            bottom: -40px;
            color: rgba(255, 194, 214, 0.5);
            pointer-events: none;
            animation: dynamicHeartRise 10s linear infinite;
            z-index: 1;
        }


        @keyframes dynamicHeartRise {

            0% {
                opacity: 0;
                transform:
                    translate3d(0, 0, 0)
                    rotate(0deg)
                    scale(0.7);
            }

            15% {
                opacity: 0.8;
            }

            50% {
                transform:
                    translate3d(30px, -45vh, 0)
                    rotate(25deg)
                    scale(1);
            }

            100% {
                opacity: 0;
                transform:
                    translate3d(-35px, -105vh, 0)
                    rotate(-25deg)
                    scale(0.6);
            }

        }


        /* Falling petals */

        .falling-petal {
            position: absolute;
            top: -30px;
            color: rgba(232, 201, 218, 0.42);
            pointer-events: none;
            animation: petalFall 12s linear infinite;
            z-index: 1;
        }


        @keyframes petalFall {

            0% {
                opacity: 0;
                transform:
                    translate3d(0, -20px, 0)
                    rotate(0deg);
            }

            10% {
                opacity: 0.8;
            }

            50% {
                transform:
                    translate3d(45px, 50vh, 0)
                    rotate(180deg);
            }

            100% {
                opacity: 0;
                transform:
                    translate3d(-35px, 110vh, 0)
                    rotate(360deg);
            }

        }


        /* Diary entrance */

        #diary.diary-visible {
            animation: diaryEnter 1.1s ease both;
        }


        @keyframes diaryEnter {

            from {
                opacity: 0;
                transform: translateY(25px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }

        }


        /* Section reveal */

        .diary-page {
            opacity: 0;
            transform: translateY(35px);
            transition:
                opacity 0.9s ease,
                transform 0.9s ease;
        }


        .diary-page.page-visible {
            opacity: 1;
            transform: translateY(0);
        }


        /* Photo movement */

        .photo-interacting {
            transform:
                perspective(800px)
                rotateX(var(--mouse-y))
                rotateY(var(--mouse-x))
                scale(1.045) !important;

            transition:
                transform 0.12s ease-out !important;

            z-index: 20 !important;
        }


        /* Missing photo */

        .photo-frame.missing-photo {
            position: relative;
        }


        .photo-frame.missing-photo::after {
            content: "Your photo will live here ♡";
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 20px;
            color: rgba(255,255,255,0.55);
            font-size: 13px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            background:
                linear-gradient(
                    145deg,
                    rgba(255,255,255,0.035),
                    rgba(255,255,255,0.01)
                );
            pointer-events: none;
        }


        .image-not-found {
            opacity: 0 !important;
        }


        /* Plane replay */

        .plane.plane-replay {
            animation: planeTravel 6s ease-in-out !important;
        }


        /* Chai steam */

        .js-steam {
            position: absolute;
            bottom: 75%;
            width: 2px;
            height: 30px;
            border-radius: 50%;
            background: rgba(255,255,255,0.18);
            filter: blur(3px);
            animation: steamRise 3s ease-in-out infinite;
        }


        @keyframes steamRise {

            0% {
                opacity: 0;
                transform:
                    translateY(10px)
                    scaleX(0.8);
            }

            40% {
                opacity: 0.6;
            }

            100% {
                opacity: 0;
                transform:
                    translateY(-35px)
                    scaleX(1.5);
            }

        }


        /* Final envelope */

        .final-envelope.opened .envelope-paper {
            animation:
                envelopeOpenOnce 1.2s ease forwards;
        }


        @keyframes envelopeOpenOnce {

            0% {
                transform:
                    translateY(0)
                    rotate(0deg);
            }

            50% {
                transform:
                    translateY(-20px)
                    rotate(-2deg);
            }

            100% {
                transform:
                    translateY(-8px)
                    rotate(0deg);
            }

        }


        /* Pause background animations */

        .page-paused * {
            animation-play-state: paused !important;
        }


        /* Reduced motion */

        .reduce-motion *,
        .reduce-motion *::before,
        .reduce-motion *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }

    `;

    document.head.appendChild(dynamicStyle);

});
