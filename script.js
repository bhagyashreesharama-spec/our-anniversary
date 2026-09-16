function startStory() {
    const openingScreen = document.getElementById("openingScreen");
    const storyScreen = document.getElementById("storyScreen");

    openingScreen.classList.add("hidden");
    storyScreen.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function nextChapter() {
    const storyScreen = document.getElementById("storyScreen");
    const chapterTwo = document.getElementById("chapterTwo");

    storyScreen.classList.add("hidden");
    chapterTwo.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showFinal() {
    const chapterTwo = document.getElementById("chapterTwo");
    const finalScreen = document.getElementById("finalScreen");

    chapterTwo.classList.add("hidden");
    finalScreen.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
