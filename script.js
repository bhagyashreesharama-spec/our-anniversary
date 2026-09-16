/* =========================
   SECRET CODE
========================= */

const SECRET_CODE = "30092024";


/* =========================
   GET ELEMENTS
========================= */

const secretScreen = document.getElementById("secretScreen");
const anniversaryScreen = document.getElementById("anniversaryScreen");
const diary = document.getElementById("diary");

const secretForm = document.getElementById("secretForm");
const secretInput = document.getElementById("secretCode");

const eyeButton = document.getElementById("eyeButton");
const errorMessage = document.getElementById("errorMessage");

const openDiaryButton = document.getElementById("openDiaryButton");


/* =========================
   SHOW / HIDE SECRET CODE
========================= */

eyeButton.addEventListener("click", function () {

    if (secretInput.type === "password") {

        secretInput.type = "text";

        eyeButton.textContent = "🙈";

        eyeButton.setAttribute(
            "aria-label",
            "Hide password"
        );

    } else {

        secretInput.type = "password";

        eyeButton.textContent = "👁";

        eyeButton.setAttribute(
            "aria-label",
            "Show password"
        );

    }

});


/* =========================
   CHECK SECRET CODE
========================= */

secretForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const enteredCode = secretInput.value.trim();


    /* CORRECT */

    if (enteredCode === SECRET_CODE) {

        errorMessage.classList.remove("show");

        secretScreen.classList.add("hidden");

        anniversaryScreen.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* WRONG */

    else {

        errorMessage.classList.add("show");

        secretInput.value = "";

        secretInput.focus();

    }

});


/* =========================
   REMOVE ERROR WHILE TYPING
========================= */

secretInput.addEventListener("input", function () {

    errorMessage.classList.remove("show");

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
   INITIAL STATE
========================= */

window.addEventListener("load", function () {

    secretScreen.classList.remove("hidden");

    anniversaryScreen.classList.add("hidden");

    diary.classList.add("hidden");

    secretInput.focus();

});
