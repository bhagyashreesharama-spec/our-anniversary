```javascript
/* =========================================
   KUNNU & BHAGYA
   OUR LITTLE DIARY
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const secretScreen = document.getElementById("secretScreen");
const anniversaryScreen = document.getElementById("anniversaryScreen");
const diary = document.getElementById("diary");

const secretForm = document.getElementById("secretForm");
const secretCode = document.getElementById("secretCode");
const eyeButton = document.getElementById("eyeButton");
const errorMessage = document.getElementById("errorMessage");

const openDiaryButton = document.getElementById("openDiaryButton");


/* =========================================
   SECRET CODE
========================================= */

const SECRET_CODE = "30092024";


/* =========================================
   EYE BUTTON
========================================= */

if (eyeButton && secretCode) {

    eyeButton.addEventListener("click", function () {

        if (secretCode.type === "password") {

            secretCode.type = "text";

            eyeButton.setAttribute(
                "aria-label",
                "Hide secret code"
            );

            eyeButton.classList.add("eye-open");

        } else {

            secretCode.type = "password";

            eyeButton.setAttribute(
                "aria-label",
                "Show secret code"
            );

            eyeButton.classList.remove("eye-open");

        }

    });

}


/* =========================================
   HIDE ERROR WHEN TYPING
========================================= */

if (secretCode) {

    secretCode.addEventListener("input", function () {

        errorMessage.classList.remove("show");

        secretCode.style.borderColor =
            "rgba(214, 174, 192, 0.28)";

    });

}


/* =========================================
   SECRET FORM
========================================= */

if (secretForm) {

    secretForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const enteredCode =
            secretCode.value.trim();


        /* ==============================
           EMPTY CODE
        ============================== */

        if (enteredCode === "") {

            showError(
                "Enter our secret code first."
            );

            return;
        }


        /* ==============================
           CORRECT CODE
        ============================== */

        if (enteredCode === SECRET_CODE) {

            errorMessage.classList.remove("show");

            secretCode.style.borderColor =
                "rgb
```
