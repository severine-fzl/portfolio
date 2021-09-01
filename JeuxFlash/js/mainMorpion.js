
let listBlock = [];
let playerO = "player O";
let playerX = "player X";
let tour = playerX;
let next = false;
let affiche;
let gagner = false;
let partieNull = false;
let start = false;
let jeu;
let game;

window.addEventListener("load", function() {
    console.log("La page est charger !");

    jeu = document.querySelector("#jeu");
    game = document.querySelector("#jeu");
    recupereBlock();
    game.addEventListener("click", clickEvent);
});

/* ****************  GERER LA LANCEMENT ET AFFICHAGE  **************** */
function playGame() {
    start = true;
    updateTour();
}
function replay() {
    gagner = false;
    partieNull = false;
    recupereBlock();
    console.log("game")
};

function affichage() {
    affiche = document.querySelector("#commande");
    if (gagner) {
        affiche.innerText = `${tour} à gagner !`;
    } else if (partieNull) {
        affiche.innerText = `Partie nul !`;
    } else {
        affiche.innerText = `C'est au tour de ${tour}`;
    }
}

/* ****************  CREER LES BLOCKS  **************** */
function recupereBlock() {
    listBlock = [];
    for(let i = 0; i < 9; ++i) {
        let block = listBlock[i];
        block = document.querySelector("#block" + i);
        block.innerText = "";
        block.morpion = false;
        listBlock.push(block);
    }
    console.log("Les BLOCK est charger !");
}
            
/* ****************  ECRITURE X / O  **************** */ 
function writeMorpion(cible) {
    if (tour === playerX) {
        cible.innerText = "x";
    } else if (tour === playerO) {
        cible.innerText = "o";
    }
    cible.morpion = true;
    updateTour();
}

/* Gerer les tour */
function updateTour() {
    condition();
    if (start && !gagner && !partieNull) {
        if (tour === playerX) {
            tour = playerO;
        } else if (tour === playerO) {
            tour = playerX;
        };
    }
    affichage();
}

/* Condition de victoire */
function condition() {
    let perdu = 0;
    // Ligne 1
    if (listBlock[0].innerText !== "" && 
        listBlock[0].innerText === listBlock[1].innerText && 
        listBlock[0].innerText === listBlock[2].innerText) {
            console.log("gagne ligne 1");
            gagner = true;
    } else
    // Ligne 2
    if (listBlock[3].innerText !== "" &&
        listBlock[3].innerText === listBlock[4].innerText &&
        listBlock[3].innerText === listBlock[5].innerText) {
        console.log("gagne ligne 2");
        gagner = true;
    } else
    // Ligne 3
    if (listBlock[6].innerText !== "" &&
        listBlock[6].innerText === listBlock[7].innerText &&
        listBlock[6].innerText === listBlock[8].innerText) {
            console.log("gagne ligne 3");
            gagner = true;
    } else
    // Colone 1
    if (listBlock[0].innerText !== "" &&
        listBlock[0].innerText === listBlock[3].innerText &&
        listBlock[0].innerText === listBlock[6].innerText) {
            console.log("gagne colone 1");
            gagner = true;
    } else
    // Colone 2
    if (listBlock[1].innerText !== "" &&
        listBlock[1].innerText === listBlock[4].innerText &&
        listBlock[1].innerText === listBlock[7].innerText) {
            console.log("gagne colone 2");
            gagner = true;
    } else
    // Colone 3
    if (listBlock[2].innerText !== "" &&
        listBlock[2].innerText === listBlock[5].innerText &&
        listBlock[2].innerText === listBlock[8].innerText) {
            console.log("gagne colone 3");
            gagner = true;
    } else
    // Diagonal 1
    if (listBlock[0].innerText !== "" &&
        listBlock[0].innerText === listBlock[4].innerText &&
        listBlock[0].innerText === listBlock[8].innerText) {
            console.log("gagne diag 1");
            gagner = true;
    } else
    // Diagonal 2
    if (listBlock[2].innerText !== "" &&
        listBlock[2].innerText === listBlock[4].innerText &&
        listBlock[2].innerText === listBlock[6].innerText) {
            console.log("gagne diag 2");
            gagner = true;
    } else {
        for (let i = 0; i < listBlock.length; ++i) {
            // PERDU
            if (listBlock[i].innerText !== "") {
                perdu++;
                if (perdu === 9) {
                    console.log("perdu");
                    partieNull = true;
                };
            };
        };
    };
};

/* ****************  CLICK  **************** */ 
function clickEvent(event) {
    console.log(event);
    event.preventDefault();
    let cible = event.target;
        for (let i = 0; i < listBlock.length; ++i) {
            if(cible.id === `block${i}`) {
                console.log(cible);
                if (!start) {
                console.log("play");
                playGame();
                } else if(gagner || partieNull) {
                    replay();
                    console.log("replay");
                } else {
                    if(!cible.morpion) {
                    writeMorpion(cible);
                    console.log("cible");
                    };
                };
            };
        };
    if (cible.id === "game") {
        if (!start) {
        console.log("play");
        playGame();
        } else if(gagner || partieNull) {
            replay();
            console.log("replay");
        }
    };
};
