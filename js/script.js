

const $newGameScreenPickPlayerIcons = document.querySelectorAll(".new-game-screen-pick-player-icon")
const $startGameVsPlayerButtons = document.querySelector('.new-game-screen-new-game-buttons__button--secondary')
const $startingScreen = document.querySelector('.new-game-screen')
const $gameScreen = document.querySelector('.game-screen')
const $gameCells = document.querySelectorAll('.game-screen-grid__cell')
const $resetButton = document.querySelector('.game-screen-header-restart-btn')
const $turnIndicator = document.querySelector('.game-screen-header-turn-indicator')
const $endModal = document.querySelector('.game-screen-end-game-modal')
const $player2Score = document.querySelector('.player2Score')
const $player1Score = document.querySelector('.player1Score')

const player1 = `<svg width="32" height="32" viewBox="0 0 32 32" fill="#ffc860" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.9704 15.8706C31.9704 7.10551 24.8649 0 16.0998 0C7.33476 0 0.229248 7.10551 0.229248 15.8706C0.229248 24.6357 7.33476 31.7412 16.0998 31.7412C24.8649 31.7412 31.9704 24.6357 31.9704 15.8706ZM9.63405 15.8706C9.63405 12.2996 12.5289 9.4048 16.0998 9.4048C19.6708 9.4048 22.5656 12.2996 22.5656 15.8706C22.5656 19.4416 19.6708 22.3364 16.0998 22.3364C12.5289 22.3364 9.63405 19.4416 9.63405 15.8706Z" fill="#F2B137"/>
</svg>
`

const player2 = `<svg width="32" height="32" viewBox="0 0 32 32" fill="#40e0d0" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.681 1.63437C26.5094 0.462798 24.6099 0.4628 23.4383 1.63437L16 9.07271L8.56166 1.63437C7.39009 0.462798 5.49059 0.4628 4.31902 1.63437L1.63437 4.31902C0.462799 5.49059 0.462801 7.39009 1.63437 8.56166L9.07271 16L1.63437 23.4383C0.462798 24.6099 0.4628 26.5094 1.63437 27.681L4.31902 30.3656C5.49059 31.5372 7.39009 31.5372 8.56166 30.3656L16 22.9273L23.4383 30.3656C24.6099 31.5372 26.5094 31.5372 27.681 30.3656L30.3656 27.681C31.5372 26.5094 31.5372 24.6099 30.3656 23.4383L22.9273 16L30.3656 8.56166C31.5372 7.39009 31.5372 5.49059 30.3656 4.31902L27.681 1.63437Z" />
</svg>
`
const turnIndicatorText = `<span class="game-screen-header-turn-indicator__title">turn</span>`
let currentPlayer = "x"
let round = 0
let player1Score = []
let player2Score = []
let player1GScore = 0
let player2GScore = 0

$resetButton.addEventListener('click', () => gameStart())

$newGameScreenPickPlayerIcons.forEach(function ($newGameScreenPickPlayerIcon) {
    $newGameScreenPickPlayerIcon.addEventListener("click", function () {
        for (let i = 0; i < $newGameScreenPickPlayerIcons.length; i++) {
            $newGameScreenPickPlayerIcons[i].classList.remove("new-game-screen-pick-player-icon--selected")
        }
        $newGameScreenPickPlayerIcon.classList.add("new-game-screen-pick-player-icon--selected")

    })
})

function gameStart() {
    player1Score = []
    player2Score = []
    currentPlayer = "x"
    $turnIndicator.innerHTML = player2 + turnIndicatorText
    $gameCells.forEach(function ($gameCell) {
        $gameCell.innerHTML = ""
    })
}

$gameCells.forEach(function ($gameCell) {
    $gameCell.addEventListener('click', function () {
        if ($gameCell.innerHTML === "") {
            if (currentPlayer === "o") {
                $gameCell.innerHTML = player1
                player1Score.push(parseInt($gameCell.getAttribute('data-value')))
                console.log('new score ' + player1Score)
                if (isWin(player1Score)) {
                    setTimeout(() => {
                        document.querySelector('.game-screen-end-game-modal__title').innerHTML = player1 + "takes the round"
                        document.querySelector('.game-screen-end-game-modal__title').style.color = "#ffc860"
                        player1GScore += 1
                        $player1Score.innerHTML = player1GScore
                        $endModal.style.display = "flex"
                    }, 500);
                   
                } else {
                    countRound()
                }
            } else {
                $gameCell.innerHTML = player2
                player2Score.push(parseInt($gameCell.getAttribute('data-value')))
                if (isWin(player2Score)) {
                    setTimeout(() => {
                        document.querySelector('.game-screen-end-game-modal__title').innerHTML = player2 + "takes the round"
                        document.querySelector('.game-screen-end-game-modal__title').style.color = "#40e0d0"
                        player2GScore += 1
                        $player2Score.innerHTML = player2GScore
                        
                        $endModal.style.display = "flex"
                    }, 500);
                    
                } else {
                    countRound()
                }
            }
        } else (alert("non non non, c'est pas vide : )"))
    })
})

function isWin(playerScore) {
    for (let i = 0; i < playerScore.length; i++) {
        for (let j = i + 1; j < playerScore.length; j++) {
            for (let k = j + 1; k < playerScore.length; k++) {
                console.log(`Testing combination: ${playerScore[i]} + ${playerScore[j]} + ${playerScore[k]} = ${playerScore[i] + playerScore[j] + playerScore[k]}`);
                if (playerScore[i] + playerScore[j] + playerScore[k] === 15) {
                    return true
                }
            }
        }
    }
}



function countRound() {
    round++
    currentPlayer  = currentPlayer === "o" ? "x" : "o"
    console.log('round ' + round)
    console.log('player ' + currentPlayer)
    if (currentPlayer === "o") {
        $turnIndicator.innerHTML = player1 + turnIndicatorText
    } else {
        $turnIndicator.innerHTML = player2 + turnIndicatorText
    }
}

$startGameVsPlayerButtons.addEventListener('click', function (e) {
    $startingScreen.style.display = "none"
    $gameScreen.style.display = "initial"
    gameStart()
})

document.querySelector('.game-screen-end-game-modal-buttons__button--secondary').addEventListener('click', () =>{
    $endModal.style.display = "none"
    gameStart()
})

document.querySelector('.game-screen-end-game-modal-buttons__button').addEventListener('click', () =>{
    window.location.reload();
})
