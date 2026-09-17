/* =========================================
   OUR LITTLE UNIVERSE
   script.js
   ========================================= */

// ---------- CODE ENTRY ----------
const SECRET_CODE = "30092024";

const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const codeInput = document.getElementById("secretCode");
const unlockBtn = document.getElementById("unlockBtn");
const errorMessage = document.getElementById("codeError");

function unlockUniverse() {
    if (!codeInput) return;

    const enteredCode = codeInput.value.trim();

    if (enteredCode === SECRET_CODE) {
        if (errorMessage) {
            errorMessage.textContent = "";
        }

        if (lockScreen) {
            lockScreen.classList.add("unlocked");
        }

        setTimeout(() => {
            if (lockScreen) {
                lockScreen.style.display = "none";
            }

            if (mainContent) {
                mainContent.style.display = "block";
            }

            document.body.classList.add("universe-open");

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

            startMusic();
        }, 900);

    } else {
        if (errorMessage) {
            errorMessage.textContent = "Hmm... ye code nahi hai 🤍";
        }

        if (codeInput) {
            codeInput.classList.remove("wrong-code");

            // restart animation
            void codeInput.offsetWidth;

            codeInput.classList.add("wrong-code");
            codeInput.value = "";
            codeInput.focus();
        }
    }
}

if (unlockBtn) {
    unlockBtn.addEventListener("click", unlockUniverse);
}

if (codeInput) {
    codeInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            unlockUniverse();
        }
    });
}


// ---------- BACKGROUND MUSIC ----------
const music = document.getElementById("backgroundMusic");

function startMusic() {
    if (!music) return;

    music.volume = 0.35;

    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // Browser may block autoplay.
        });
    }
}


// ---------- BEGIN BUTTON ----------
const beginButton = document.getElementById("beginButton");
const introSection = document.getElementById("intro");

if (beginButton && introSection) {
    beginButton.addEventListener("click", function () {
        introSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        startMusic();
    });
}


// ---------- SCROLL REVEAL ----------
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});


// ---------- FLOATING HEARTS ----------
function createHeart() {
    if (!document.body.classList.contains("universe-open")) return;

    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.innerHTML = "♡";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (6 + Math.random() * 5) + "s";
    heart.style.fontSize = (10 + Math.random() * 14) + "px";
    heart.style.opacity = (0.2 + Math.random() * 0.5).toFixed(2);

    document.body.appendChild(heart);

    setTimeout(function () {
        heart.remove();
    }, 12000);
}

setInterval(createHeart, 1800);


// ---------- LITTLE STAR PARTICLES ----------
function createStarParticle() {
    if (!document.body.classList.contains("universe-open")) return;

    const star = document.createElement("span");

    star.className = "star-particle";

    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.animationDuration = (2 + Math.random() * 3) + "s";
    star.style.animationDelay = Math.random() * 2 + "s";

    document.body.appendChild(star);

    setTimeout(function () {
        star.remove();
    }, 6000);
}

setInterval(createStarParticle, 700);


// ---------- SOFT PARALLAX ----------
document.addEventListener("mousemove", function (event) {
    if (!document.body.classList.contains("universe-open")) return;

    const x = (event.clientX / window.innerWidth - 0.5);
    const y = (event.clientY / window.innerHeight - 0.5);

    const moon = document.querySelector(".moon");
    const clouds = document.querySelectorAll(".cloud");

    if (moon) {
        moon.style.transform =
            `translate(${x * 12}px, ${y * 12}px)`;
    }

    clouds.forEach(function (cloud, index) {
        const movement = (index + 1) * 5;

        cloud.style.transform =
            `translate(${x * movement}px, ${y * movement}px)`;
    });
});


// ---------- POLAROID TILT ----------
const photos = document.querySelectorAll(".polaroid");

photos.forEach(function (photo) {

    photo.addEventListener("mousemove", function (event) {

        const rect = photo.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        photo.style.transform =
            `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    photo.addEventListener("mouseleave", function () {
        photo.style.transform = "";
    });
});


// ---------- GENTLE HEART BURST ----------
document.addEventListener("click", function (event) {

    if (!document.body.classList.contains("universe-open")) return;

    // Don't create burst when clicking buttons/inputs
    if (
        event.target.closest("button") ||
        event.target.closest("input") ||
        event.target.closest("a")
    ) {
        return;
    }

    for (let i = 0; i < 5; i++) {

        const heart = document.createElement("span");

        heart.className = "click-heart";
        heart.innerHTML = "♡";

        heart.style.left = event.clientX + "px";
        heart.style.top = event.clientY + "px";

        heart.style.setProperty(
            "--x",
            (Math.random() * 100 - 50) + "px"
        );

        heart.style.setProperty(
            "--y",
            (Math.random() * 100 - 50) + "px"
        );

        document.body.appendChild(heart);

        setTimeout(function () {
            heart.remove();
        }, 1000);
    }
});


// ---------- SMOOTH IMAGE LOADING ----------
const allImages = document.querySelectorAll("img");

allImages.forEach(function (image) {

    image.addEventListener("load", function () {
        image.classList.add("loaded");
    });

    image.addEventListener("error", function () {
        image.classList.add("image-missing");
    });

});


// ---------- ACTIVE SECTION FEEL ----------
const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("section-active");
            }

        });
    },
    {
        threshold: 0.25
    }
);

sections.forEach(function (section) {
    sectionObserver.observe(section);
});


// ---------- PREVENT EMPTY CODE SUBMISSION ----------
if (codeInput) {

    codeInput.addEventListener("input", function () {

        if (errorMessage) {
            errorMessage.textContent = "";
        }

        // Only numbers
        this.value = this.value.replace(/\D/g, "");

        // Code length
        if (this.value.length > 8) {
            this.value = this.value.slice(0, 8);
        }
    });

}
