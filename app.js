const game = document.getElementById("game")
const cards = document.querySelectorAll(".memory-card")
const frontFace = document.querySelectorAll(".front-face")
const backFace = document.querySelectorAll(".back-face")



let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let flipCount = 6;
let userFlips = 0;

function flipCard() {
    if (lockBoard) return;
    if (firstCard === this) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;

    checkForMatch()
}

function checkForMatch() {
    //  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    //  isMatch ? disableCards() : unflipCards();

    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards()
        userFlips++
        if (userFlips === flipCount) {
            //    document.body.style.backgroundColor = "white"
            game.classList.toggle("game__result")
            game.innerHTML = `  
            <div class="result">
                <h4>🥳🥳🥳</h4>
                <h4>You win the Game!</h4>
                <button class="start__btn">Start Game</button>
             </div>`
            //  button for result
             
            const startBtn = document.querySelector(".start__btn")
            console.log(startBtn);


            cards.forEach(card => {
                card.classList.toggle("card__shadow")
            });

            frontFace.forEach(face => {
                face.classList.toggle("card__faces")
            });

            backFace.forEach(face => {
                face.classList.toggle("card__faces")
            });

            startBtn.addEventListener("click", () => {
                document.location.reload();
            })

        


        }
    } else {
        unflipCards()
    }

}

function disableCards() {
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)

    resetBoard();
}

function unflipCards() {

    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")

        resetBoard()
    }, 1500)
}


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener("click", flipCard))