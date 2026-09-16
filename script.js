/* =====================================================
   KUNNU & BHAGYA
   OUR LITTLE UNIVERSE
   ANIMATED SCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const secretScreen = document.getElementById("secretScreen");
const anniversaryScreen = document.getElementById("anniversaryScreen");
const diary = document.getElementById("diary");

const secretForm = document.getElementById("secretForm");
const secretCode = document.getElementById("secretCode");
const eyeButton = document.getElementById("eyeButton");
const errorMessage = document.getElementById("errorMessage");

const openDiaryButton = document.getElementById("openDiaryButton");


/* =====================================================
   SECRET CODE
===================================================== */

const SECRET_CODE = "30092024";


/* =====================================================
   EYE BUTTON
===================================================== */

eyeButton.addEventListener("click", () => {

    const isPassword =
        secretCode.getAttribute("type") === "password";

    if (isPassword) {

        secretCode.setAttribute("type", "text");

        eyeButton.setAttribute(
            "aria-label",
            "Hide secret code"
        );

        eyeButton.classList.add("eye-open");

    } else {

        secretCode.setAttribute("type", "password");

        eyeButton.setAttribute(
            "aria-label",
            "Show secret code"
        );

        eyeButton.classList.remove("eye-open");
    }

    secretCode.focus();
});


/* =====================================================
   REMOVE ERROR WHILE TYPING
===================================================== */

secretCode.addEventListener("input", () => {

    errorMessage.classList.remove("show-error");

    secretCode.classList.remove("wrong-code");

    secretCode.style.borderColor =
        "rgba(244, 237, 231, 0.18)";
});


/* =====================================================
   SECRET FORM
===================================================== */

secretForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const enteredCode = secretCode.value.trim();


    /* EMPTY */

    if (enteredCode === "") {

        showError("Enter our secret code first.");

        shakeInput();

        return;
    }


    /* CORRECT */

    if (enteredCode === SECRET_CODE) {

        errorMessage.classList.remove("show-error");

        secretCode.style.borderColor =
            "rgba(216, 174, 188, 0.9)";

        secretScreen.classList.add("screen-exit");


        setTimeout(() => {

            secretScreen.classList.add("hidden");

            anniversaryScreen.classList.remove("hidden");

            anniversaryScreen.classList.add("anniversary-enter");

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

            createFloatingHearts();

        }, 850);

        return;
    }


    /* WRONG */

    showError("Hmm... that's not our secret.");

    shakeInput();

    secretCode.value = "";

    secretCode.focus();

});


/* =====================================================
   ERROR
===================================================== */

function showError(message) {

    errorMessage.textContent = message;

    errorMessage.classList.add("show-error");

    secretCode.classList.add("wrong-code");

    secretCode.style.borderColor =
        "rgba(190, 100, 120, 0.75)";
}


/* =====================================================
   INPUT SHAKE
===================================================== */

function shakeInput() {

    secretCode.classList.remove("shake-input");

    void secretCode.offsetWidth;

    secretCode.classList.add("shake-input");

}


/* =====================================================
   OPEN DIARY
===================================================== */

openDiaryButton.addEventListener("click", () => {

    anniversaryScreen.classList.add("screen-exit");

    setTimeout(() => {

        anniversaryScreen.classList.add("hidden");

        diary.classList.remove("hidden");

        diary.classList.add("diary-enter");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        setTimeout(() => {

            diary.classList.remove("diary-enter");

        }, 1300);

        startDiaryAnimations();

    }, 850);

});


/* =====================================================
   DIARY SCROLL ANIMATION
===================================================== */

function startDiaryAnimations() {

    const sections =
        document.querySelectorAll(".diary-section");

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -70px 0px"
            }
        );


    sections.forEach((section) => {

        observer.observe(section);

    });

}


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createFloatingHearts() {

    const container =
        document.createElement("div");

    container.className =
        "floating-hearts-container";

    document.body.appendChild(container);


    const hearts = [
        "♡",
        "♡",
        "✦",
        "♡",
        "✧",
        "♡"
    ];


    for (let i = 0; i < 14; i++) {

        const heart =
            document.createElement("span");

        heart.className =
            "floating-heart-particle";

        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() * hearts.length
                )
            ];

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.animationDelay =
            Math.random() * 5 + "s";

        heart.style.animationDuration =
            6 + Math.random() * 5 + "s";

        heart.style.fontSize =
            9 + Math.random() * 13 + "px";

        container.appendChild(heart);
    }


    setTimeout(() => {

        container.remove();

    }, 18000);

}


/* =====================================================
   PARALLAX DECORATIONS
===================================================== */

document.addEventListener("mousemove", (event) => {

    const x =
        (event.clientX / window.innerWidth - 0.5);

    const y =
        (event.clientY / window.innerHeight - 0.5);


    const decorations =
        document.querySelectorAll(
            ".secret-decoration, .anniversary-decoration"
        );


    decorations.forEach((element, index) => {

        const strength =
            8 + index * 2;

        element.style.setProperty(
            "--mouse-x",
            `${x * strength}px`
        );

        element.style.setProperty(
            "--mouse-y",
            `${y * strength}px`
        );

    });

});


/* =====================================================
   ADD DYNAMIC ANIMATION CSS
===================================================== */

const dynamicStyle =
    document.createElement("style");

dynamicStyle.textContent = `

/* -----------------------------------------
   ERROR
----------------------------------------- */

.error-message {
    opacity: 0;
    height: 0;
    overflow: hidden;

    margin-top: 0;

    color: #c98b9c;

    font-size: 11px;

    letter-spacing: .5px;

    transition:
        opacity .3s ease,
        height .3s ease,
        margin .3s ease;
}

.error-message.show-error {
    opacity: 1;

    height: 20px;

    margin-top: 14px;
}


/* -----------------------------------------
   WRONG CODE
----------------------------------------- */

.wrong-code {
    box-shadow:
        0 0 25px rgba(190, 100, 120, .08);
}


/* -----------------------------------------
   EYE OPEN
----------------------------------------- */

.eye-open .eye-icon {
    transform:
        rotate(45deg)
        scaleY(.35);
}

.eye-open .eye-icon::after {
    opacity: .25;
}


/* -----------------------------------------
   SCREEN EXIT
----------------------------------------- */

.screen-exit {
    animation:
        cinematicExit
        .85s
        cubic-bezier(.65,0,.35,1)
        forwards;
}


/* -----------------------------------------
   ANNIVERSARY ENTER
----------------------------------------- */

.anniversary-enter {
    animation:
        anniversaryReveal
        1.3s
        cubic-bezier(.22,.61,.36,1)
        both;
}


/* -----------------------------------------
   DIARY ENTER
----------------------------------------- */

.diary-enter {
    animation:
        diaryReveal
        1.2s
        cubic-bezier(.22,.61,.36,1)
        both;
}


/* -----------------------------------------
   FLOATING HEART CONTAINER
----------------------------------------- */

.floating-hearts-container {
    position: fixed;

    inset: 0;

    pointer-events: none;

    overflow: hidden;

    z-index: 100;
}


/* -----------------------------------------
   FLOATING HEART PARTICLES
----------------------------------------- */

.floating-heart-particle {
    position: absolute;

    bottom: -30px;

    color:
        rgba(216, 174, 188, .55);

    font-family:
        "Cormorant Garamond",
        Georgia,
        serif;

    animation:
        particleFloat
        8s
        linear
        forwards;
}


/* -----------------------------------------
   DECORATION MOUSE MOVEMENT
----------------------------------------- */

.secret-decoration,
.anniversary-decoration {
    transition:
        transform .6s
        cubic-bezier(.22,.61,.36,1);
}


/* -----------------------------------------
   KEYFRAMES
----------------------------------------- */

@keyframes cinematicExit {

    0% {
        opacity: 1;
        transform: scale(1);
        filter: blur(0);
    }

    100% {
        opacity: 0;
        transform: scale(1.06);
        filter: blur(12px);
    }
}


@keyframes anniversaryReveal {

    0% {
        opacity: 0;
        transform:
            scale(.94)
            translateY(35px);
        filter: blur(12px);
    }

    60% {
        opacity: 1;
    }

    100% {
        opacity: 1;
        transform:
            scale(1)
            translateY(0);
        filter: blur(0);
    }
}


@keyframes diaryReveal {

    0% {
        opacity: 0;
        transform:
            translateY(45px);
        filter: blur(8px);
    }

    100% {
        opacity: 1;
        transform:
            translateY(0);
        filter: blur(0);
    }
}


@keyframes particleFloat {

    0% {
        transform:
            translateY(0)
            translateX(0)
            rotate(0deg);

        opacity: 0;
    }

    10% {
        opacity: .8;
    }

    50% {
        transform:
            translateY(-50vh)
            translateX(25px)
            rotate(15deg);

        opacity: .65;
    }

    80% {
        opacity: .35;
    }

    100% {
        transform:
            translateY(-110vh)
            translateX(-30px)
            rotate(-15deg);

        opacity: 0;
    }
}

`;

document.head.appendChild(dynamicStyle);


/* =====================================================
   SECRET CODE ENTER KEY
===================================================== */

secretCode.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        secretForm.requestSubmit();

    }

});


/* =====================================================
   PREVENT NON-NUMERIC INPUT
===================================================== */

secretCode.addEventListener("input", () => {

    secretCode.value =
        secretCode.value.replace(/\D/g, "");

});


/* =====================================================
   INITIAL STATE
===================================================== */

if (diary) {

    diary.classList.add("hidden");

}

if (anniversaryScreen) {

    anniversaryScreen.classList.add("hidden");

}


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "♡ Kunnu & Bhagya — Our Little Universe ♡"
);
