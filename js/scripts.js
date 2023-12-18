let x = document.querySelector(".x");
let o = document.querySelector(".o");
let boxes = document.querySelectorAll(".box");
let buttons = document.querySelectorAll("#buttons-container button");
let messageContainer = document.querySelector("#message");
let messageText = document.querySelector("#message p");
let secondPlayer;

// Contador de jogadas

let player1 = 0;
let player2 = 0;

// click 

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {
        // 
        let el = checkEl(player1, player2)
        // verifica se ja tem x ou o
        if (this.childNodes.length == 0) {
            let cloneEl = el.cloneNode(true);
            this.appendChild(cloneEl)

            // computar jogada
            if (secondPlayer != 'ai-mode') {
                if (player1 == player2) {
                    player1++;
                } else {
                    player2++
                }
                checkWinCondition();
            }

            if (secondPlayer == 'ai-mode') {
                if (player1 == player2) {
                    player1++;
                    if (secondPlayer == 'ai-mode') {
                        computerPlay();
                        player2++
                    }
                } else {
                    player2++
                }
                checkWinCondition();
            }

            // checa quem venceu


        }
    })
}

// modo de jogo

for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener("click", function () {

        secondPlayer = this.getAttribute("id");

        for (let j = 0; j < buttons.length; j++) {
            buttons[j].style.display = 'none';
        }

        setTimeout(() => {
            let container = document.querySelector("#container");
            container.classList.remove("hide");
        }, 100);
    })
}

// define quem vai jogar

function checkEl(player1, player2) {
    if (player1 == player2) {
        el = x
    } else {
        el = o;
    }
    return el;
}

// checa quem vence 

function checkWinCondition() {
    let b1 = document.getElementById("block-1");
    let b2 = document.getElementById("block-2");
    let b3 = document.getElementById("block-3");
    let b4 = document.getElementById("block-4");
    let b5 = document.getElementById("block-5");
    let b6 = document.getElementById("block-6");
    let b7 = document.getElementById("block-7");
    let b8 = document.getElementById("block-8");
    let b9 = document.getElementById("block-9");

    // horizontal

    if (b1.childNodes.length > 0 && b2.childNodes.length > 0 && b3.childNodes.length > 0) {

        teste(b1, b2, b3);
    }

    if (b4.childNodes.length > 0 && b5.childNodes.length > 0 && b6.childNodes.length > 0) {

        teste(b4, b5, b6);
    }

    if (b7.childNodes.length > 0 && b8.childNodes.length > 0 && b9.childNodes.length > 0) {

        teste(b7, b8, b9);
    }

    // vertical

    if (b1.childNodes.length > 0 && b4.childNodes.length > 0 && b7.childNodes.length > 0) {

        teste(b1, b4, b7);
    }
    if (b2.childNodes.length > 0 && b5.childNodes.length > 0 && b8.childNodes.length > 0) {

        teste(b2, b5, b8);
    }
    if (b3.childNodes.length > 0 && b6.childNodes.length > 0 && b9.childNodes.length > 0) {

        teste(b3, b6, b9);
    }

    // diagonal

    if (b1.childNodes.length > 0 && b5.childNodes.length > 0 && b9.childNodes.length > 0) {

        teste(b1, b5, b9);
    }

    if (b3.childNodes.length > 0 && b5.childNodes.length > 0 && b7.childNodes.length > 0) {

        teste(b3, b5, b7);
    }

    // draw

    let counter = 0;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].childNodes[0] != undefined) {
            counter++;
        }
    }

    if (counter == 9) {
        declareWinner('Empate.');
    }

}

function teste(block1, block2, block3) {
    let b1Child = block1.childNodes[0].className;
    let b2Child = block2.childNodes[0].className;
    let b3Child = block3.childNodes[0].className;

    if (b1Child == 'x' && b2Child == 'x' && b3Child == 'x') {
        declareWinner('x');
    } else if (b1Child == 'o' && b2Child == 'o' && b3Child == 'o') {
        declareWinner('o');
    }
}

// reset

function declareWinner(winner) {
    let scoreboardX = document.querySelector('#scoreboard-1');
    let scoreboardO = document.querySelector('#scoreboard-2');
    let msg = '';

    if (winner == 'x') {
        scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
        msg = 'Jogador Roxo venceu.';
    } else if (winner == 'o') {
        scoreboardO.textContent = parseInt(scoreboardO.textContent) + 1;
        msg = 'Jogador Amarelo venceu.';
    } else {
        msg = 'Empate';
    }

    messageText.innerHTML = msg;
    messageContainer.classList.remove("hide");

    setTimeout(function () {
        messageContainer.classList.add("hide");
    }, 1000);

    player1 = 0;
    player2 = 0;

    let boxesToRemove = document.querySelectorAll(".box div");

    for (let i = 0; i < boxesToRemove.length; i++) {
        boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]);
    }

}

// jogada da ia

function computerPlay() {
    let cloneO = o.cloneNode(true);
    let counter = 0;
    let filled = 0;

    for (let i = 0; i < boxes.length; i++) {
        let randomNumber = Math.floor(Math.random() * 9);

        if (boxes[i].childNodes[0] == undefined) {
            if (randomNumber <= 1) {
                boxes[i].appendChild(cloneO);
                counter++;
                break;
            }
        } else {
            filled++;
        }
    }

    if (counter === 0 && filled < 9) {
        computerPlay();
    }
}
