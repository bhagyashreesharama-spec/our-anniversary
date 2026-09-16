/* =========================
   OUR SECRET
========================= */

const SECRET_CODE = "30092024";


/* =========================
   ELEMENTS
========================= */

const secretScreen = document.getElementById("secretScreen");
const anniversaryScreen = document.getElementById("anniversaryScreen");
const diary = document.getElementById("diary");

const secretForm = document.getElementById("secretForm");
const secretInput = document.getElementById("secretCode");
const errorMessage = document.getElementById("errorMessage");

const openDiaryButton = document.getElementById("openDiaryButton");


/* =========================
   SECRET CODE
========================= */

secretForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const enteredCode = secretInput.value.trim();

    /* CORRECT CODE */

    if (enteredCode === SECRET_CODE) {

        errorMessage.classList.remove("show");

        secretScreen.classList.add("hidden");

        anniversaryScreen.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    /* WRONG CODE */

    else {

        errorMessage.classList.add("show");

        secretInput.value = "";

        secretInput.focus();

    }

});


/* =========================
   OPEN DIARY
========================= */

openDiaryButton.addEventListener("click", function () {

    anniversaryScreen.classList.add("hidden");

    diary.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   REMOVE ERROR WHILE TYPING
========================= */

secretInput.addEventListener("input", function () {

    errorMessage.classList.remove("show");

});


/* =========================
   START WITH SECRET SCREEN
========================= */

window.addEventListener("load", function () {

    secretScreen.classList.remove("hidden");

    anniversaryScreen.classList.add("hidden");

    diary.classList.add("hidden");

    secretInput.focus();

});
