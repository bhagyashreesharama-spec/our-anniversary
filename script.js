/* =========================================
   SECRET CODE
========================================= */

const SECRET_CODE = "30092024";


/* =========================================
   UNLOCK STORY
========================================= */

function unlockStory() {

    const input = document.getElementById("secretCode");
    const error = document.getElementById("errorMessage");

    const enteredCode = input.value.trim();

    if (enteredCode === SECRET_CODE) {

        error.classList.remove("show");

        const secretScreen =
            document.getElementById("secretScreen");

        const anniversaryScreen =
            document.getElementById("anniversaryScreen");

        secretScreen.classList.add("hidden");

        anniversaryScreen.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        error.classList.add("show");

        input.value = "";

        input.focus();

    }
}


/* =========================================
   ENTER KEY ALSO WORKS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("secretCode");

    if (input) {

        input.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                unlockStory();

            }

        });

    }

});


/* =========================================
   OPEN DIARY
========================================= */

function openDiary() {

    const anniversaryScreen =
        document.getElementById("anniversaryScreen");

    const diary =
        document.getElementById("diary");

    anniversaryScreen.classList.add("hidden");

    diary.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   PHOTO FADE-IN EFFECT
========================================= */

const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


/* =========================================
   OBSERVE DIARY SECTIONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const sections =
        document.querySelectorAll(
            ".memory-section, " +
            ".goodbye-section, " +
            ".two-years-section, " +
            ".future-section, " +
            ".final-letter"
        );

    sections.forEach(function (section) {

        observer.observe(section);

    });

});
