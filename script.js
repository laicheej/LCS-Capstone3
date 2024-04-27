const now = new Date();
const datetoday = now.toLocaleDateString();
document.getElementById("datetoday").innerHTML = datetoday;
const pulltarbtn = document.getElementById("pulltarbtn");
pulltarbtn.addEventListener("click", () => {
    fetch("https://tarotapi.dev/api/v1/cards/random?n=3")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(function (data) {
            const cards = data.cards;
            displayCards(cards);
            document.getElementById("tarot-about").classList.add("show");
        })
        .catch(function (error) {
            console.error("Error fetching tarot cards:", error);
        });
});
function displayCards(cards) {
    const tarotAbout = document.getElementById("tarot-about");
    tarotAbout.innerHTML = ""; 

    cards.forEach(card => {
        // Randomly determine if the card is reversed or upright. API does not support this.
        const isReversed = Math.random() < 0.5;
        const meaning = isReversed ? card.meaning_rev : card.meaning_up;
        const cardInfo = document.createElement("div");
        cardInfo.classList.add("card-animation");
        //Inputting Images
        const cardNameForImage = card.name.toLowerCase().replace(/\s/g, '_');
        const orientation = isReversed ? "reversed" : "upright";
        const imagePath = `resources/${orientation}/${cardNameForImage}.jpg`; 

        cardInfo.innerHTML = `
            <h2>${card.name}</h2>
            <p>${isReversed ? "REVERSED" : "UPRIGHT"}</p>
            <img src="${imagePath}" alt="${card.name} ${orientation}">
            <p>${card.desc}</p>
            <p>Keywords: ${isReversed ? card.meaning_rev : card.meaning_up}</p>
        `;
        tarotAbout.appendChild(cardInfo);
    });
}

