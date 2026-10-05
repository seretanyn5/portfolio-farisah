/* =========================
   CURSOR CAMERA EFFECT
========================= */

const portfolio =
    document.querySelector(".portfolio");

const archiveOpening =
    document.querySelector("#archive-opening");

const openArchiveButton =
    document.querySelector("#openArchive");

openArchiveButton.addEventListener("click", function() {

    archiveOpening.classList.add("opening");

    window.setTimeout(function() {
        archiveOpening.hidden = true;
        document.body.classList.remove("archive-locked");
    }, 1200);

});

archiveOpening.addEventListener("animationend", function(event) {

    if (event.animationName === "archiveOpen") {
        archiveOpening.hidden = true;
        document.body.classList.remove("archive-locked");
    }

});

document.addEventListener("mousemove", function(event) {

    const x =
        event.clientX / window.innerWidth - 0.5;

    const y =
        event.clientY / window.innerHeight - 0.5;


    portfolio.style.transform = `
        perspective(1400px)
        rotateX(${y * -0.8}deg)
        rotateY(${x * 0.8}deg)
    `;

});


document.addEventListener("mouseleave", function() {

    portfolio.style.transform = "";

});


/* =========================
   TAROT CARDS
========================= */

const tarotCards =
    document.querySelectorAll(".tarot-card");

const tarotResult =
    document.querySelector("#tarot-result");


const tarotMessages = {

    "THE HIEROPHANT":
        "The Hierophant — tradition, knowledge, and the lessons passed down by others. A reminder to learn from what came before while deciding what deserves to be carried forward.",

    "JUSTICE":
        "Justice — balance, truth, and consequences. Seeing things clearly, taking responsibility, and making decisions based on what feels right rather than what feels easiest.",

    "THE CHARIOT":
        "The Chariot — determination, direction, and moving forward despite opposing forces. Keeping control of the reins and trusting yourself enough to keep going."

};


tarotCards.forEach(card => {

    card.addEventListener("click", function() {

        const cardName =
            card.querySelector("small").textContent;

        tarotResult.textContent =
            tarotMessages[cardName];


        tarotCards.forEach(c => {
            c.classList.remove("selected");
        });


        card.classList.add("selected");

    });

});


/* =========================
   ART COLLECTION POPUP
========================= */

const artItems =
    document.querySelectorAll(".art-item, .assignment-item");

const artPopup =
    document.querySelector("#art-popup");

const popupImage =
    document.querySelector("#popup-art-image");

const popupTitle =
    document.querySelector("#popup-title");

const popupDescription =
    document.querySelector("#popup-description");

const popupClose =
    document.querySelector(".popup-close");

const popupCategory =
    document.querySelector("#popup-category");

const popupStamp =
    document.querySelector("#popup-stamp");

let previouslyFocusedArt = null;

function openArtPopup(item) {

    const image = item.querySelector("img");

    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupTitle.textContent = item.dataset.title;
    popupDescription.textContent = item.dataset.description;
    const isAssignment = item.classList.contains("assignment-item");
    popupCategory.textContent = isAssignment
        ? "COMPLETED WORKS"
        : "PERSONAL ART COLLECTION";
    popupStamp.textContent = isAssignment
        ? "PERSONAL ARCHIVE / 06"
        : "ART ARCHIVE / 02";
    artPopup.classList.add("active");
    artPopup.setAttribute("aria-hidden", "false");
    previouslyFocusedArt = item;
    document.body.style.overflow = "hidden";
    popupClose.focus();
}

function closeArtPopup() {

    artPopup.classList.remove("active");
    artPopup.setAttribute("aria-hidden", "true");
    popupImage.removeAttribute("src");
    document.body.style.overflow = "";
    previouslyFocusedArt?.focus();
}

artItems.forEach(item => {

    item.addEventListener("click", function() {
        openArtPopup(item);
    });

    item.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openArtPopup(item);
        }
    });
});

popupClose.addEventListener("click", closeArtPopup);

artPopup.addEventListener("click", function(event) {
    if (event.target === artPopup) {
        closeArtPopup();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && artPopup.classList.contains("active")) {
        closeArtPopup();
    }
});