'use strict';

/* **************************************************** VARIABLE **************************************************** */
// On defini le terrain de jeu
let game = {
    background: new Image(),
    color: "#CFCFCF",
    gameOver: false,
    start: false,
    pause: false,
    level: 1,
    next: false,
    point: 0,
    meilleurScore: 0
};

// On defini les propriete du pad
let paddle = {
    img: new Image(),
    vie: 3,
    init: true,
    x: 0,
    y: 0,
    largeur: 100,
    hauteur: 20,
    vitesse: 10,
    direction: 0,
    color: "#000"
};

// On défini le propriété de notre cercle que l'on va dessiner dans un objet
let balle = {
    color: "#FF0000",
    radius:10,
    x: 0,
    y: 0,
    vitesse: 5,
    direction: {
        x: 0,
        y: 0
    }
};

let listBrique = [];
let briqueLargeur = 50;
let briqueHauteur = 20;

// Notre context et notre Canvas sont définis dans le Scope global pour un accès par nos fonctions
let canvasDom;
let ctx;




/* **************************************************** INIT **************************************************** */
// Dès que le DOM est chargé on commence
document.addEventListener('DOMContentLoaded', function () {

    // Recupere le canvas
    canvasDom = document.querySelector("#canvas");
    //canvasDom.style.backgroundImage = game.background;
    
    // Le context utilisé
    ctx = canvasDom.getContext("2d");
    
    // Game
    game.largeur = canvasDom.width;
    game.hauteur = canvasDom.height;

   
    // Lance le jeu
    game.background.src = '../img/Bricks/Conturing.png';
    paddle.img.src = '../img/Bricks/Racket.png';    
    game.background.addEventListener('load', function() { 
        
    }, false);
    initGame();
    playGame();
    // Reste apuier sur une flèche du clavier
    document.addEventListener("keydown", keyboardEvent);
    // Relache le bouton du clavier
    document.addEventListener("keyup", keyboardEvent);
    
    document.addEventListener("keypress", keyboardEvent);
});


function initGame() {
    game.point = 0;
    game.level = 1;
    paddle.vie = 3;
    initPositions();
    creerBrique();

}

function initPositions() {
    paddle.init = true;
    game.start = false;
    
    if (game.start === false) {
        let nb = Math.round(Math.random());
        if (nb === 0) {
            nb = -1;
        }
        
        if (paddle.init) {
            paddle.x = game.largeur/2;
            paddle.y = game.hauteur - (paddle.hauteur * 2);
            paddle.init = false;
        }
        
        balle.y = paddle.y - balle.radius;
        balle.x = paddle.x + paddle.largeur/2;
        
        balle.direction.y = -1;
        balle.direction.x = nb;
    }
}

function creerBrique() {
    
    switch (game.level) {
        case 1:
            game.ligne = 3;
            break;
        case 2:
            game.ligne = 5;
            break;
        case 3:
            game.ligne = 10;
            break;
    }
    
    game.colone = Math.round((game.largeur - 100) / (briqueLargeur + 2));
    
// Les brique
    let bX = 0;
    let bY = 0;
    
    for (let i = 0; i < game.ligne; ++i) {
        
        bX = 0;
        for (let j = 0; j < game.colone; ++j) {
            
            let brique = {
                visible: true,
                x: 50 + bX,
                y: 50 + bY,
                largeur: 50,
                hauteur: 20,
                nb: Math.round(Math.random()*4)
            }
            
            if (brique.nb === 1) {
                brique.color = new Image();
                brique.color.src = '../img/Bricks/Green_brick.png';
            } else if (brique.nb === 2) {
                brique.color = new Image();
                brique.color.src = '../img/Bricks/Blue_brick.png';
            } else if (brique.nb === 3) {
                brique.color = new Image();
                brique.color.src = '../img/Bricks/Orange_brick.png';
            } else {
                brique.color = new Image();
                brique.color.src = '../img/Bricks/Red_brick.png';
            }
            
            listBrique.push(brique);
            bX += briqueLargeur + 4;
        }
        bY += briqueHauteur + 5;
    }
}

function supBrique() {
    if (listBrique.length === 0) {
        game.next = true;
    }
    for (let i = 0; i < listBrique.length; ++i) {
        let brique = listBrique[i];
        if (brique.visible === false) {
            
            if (brique.nb === 1) {
                game.point += 10;
            } else if (brique.nb === 2) {
                game.point += 20;
            } else if (brique.nb === 3) {
                game.point += 50;;
            } else {
                game.point += 100;
            }
            
            listBrique.splice(i, 1);
        }
    }
}





/* **************************************************** UPDATE **************************************************** */

function playGame() {
    detectCollisions();
    
    
    movePad();
    moveBalle();
    
    // Dessine le jeu
    displayGame();
    
    // Relance l'animation
    requestAnimationFrame(playGame);
}

// Deplace la balle
function moveBalle() {
    if (game.start === false) {
        balle.y = paddle.y - balle.radius;
        balle.x = paddle.x + paddle.largeur/2;
    }
    
    if (game.pause) {
        balle.y = balle.y;
        balle.x = balle.x;
    } else {
        balle.y += balle.vitesse * balle.direction.y;
        balle.x += balle.vitesse * balle.direction.x;
    }
}

// Deplace le pad
function movePad() {
    if (game.pause) {
        paddle.x = paddle.x;
    } else {
        paddle.x += paddle.vitesse * paddle.direction;
    }
    if (paddle.x <= 0) {
        paddle.x = 0;
        paddle.direction = 0;
    } else if (paddle.x + paddle.largeur >= game.largeur) {
        paddle.x = game.largeur - paddle.largeur;
        paddle.direction = 0;
    }
}

// Gerer vie pad
function perdreVie() {
    
    if (paddle.vie === 1) {
        game.gameOver = true;
    } else if (paddle.vie === 2) {
        paddle.vie = 1;
        initPositions();
    } else if (paddle.vie === 3) {
        paddle.vie = 2;
        initPositions();
    }
}

function detectCollisions() {
    
    // Collisions balle Y
    if (balle.y + balle.radius === paddle.y) {
        if (balle.x + balle.radius >= paddle.x && balle.x - balle.radius <= paddle.x + paddle.largeur) {
            balle.y = paddle.y - balle.radius;
            balle.direction.y = -1;
        }
    } else if (balle.y - balle.radius <= 0) {
        balle.y = 0 + balle.radius;
        balle.direction.y = 1;
    }
    if (balle.y >= game.hauteur) {
        balle.y = balle.y;
        balle.x = balle.x;
        perdreVie();
    };
    
    // Collisions balle X
    if (balle.x - balle.radius <= 0) {
        balle.x = 0 + balle.radius;
        balle.direction.x = 1;
    } else if (balle.x + balle.radius >= game.largeur) {
        balle.x = game.largeur - balle.radius;
        balle.direction.x = -1;
    };
    
    // Collisions brique
    for (let i = 0; i < listBrique.length; ++i) {
            
        let brique = listBrique[i];
        /*
        if (balle.x + balle.radius === brique.x) {
            if (balle.y + balle.radius > brique.y && balle.y - balle.radius < brique.y + brique.hauteur) {
                balle.x = brique.x - balle.radius;
                balle.direction.x = -1;
                listBrique.splice(i, 1);
            }
        } else if (balle.x - balle.radius === brique.x + brique.largeur) {
            if (balle.y + balle.radius > brique.y && balle.y - balle.radius < brique.y + brique.hauteur) {
                balle.x = brique.x + balle.radius;
                balle.direction.x = 1;
                listBrique.splice(i, 1);
        }
        
        // Collision bas
        if (balle.y - balle.radius === brique.y + brique.hauteur && balle.x + balle.radius > brique.x && balle.x - balle.radius < brique.x + brique.largeur) {
            balle.y = brique.y + brique.hauteur + balle.radius;
            balle.direction.y = 1;
            listBrique.splice(i, 1);
            
        }
        // Collision haut
        if (balle.y + balle.radius === brique.y && balle.x + balle.radius > brique.x && balle.x - balle.radius < brique.x + brique.largeur) {
            balle.y = brique.y - balle.radius;
            balle.direction.y = -1;
            listBrique.splice(i, 1);
        }*/
        
        // HAUT 
        if (balle.y + balle.radius === brique.y) {
            // HAUT Angle
            if (balle.x + balle.radius === brique.x) {
                balle.y = brique.y - balle.radius;
                balle.x = brique.x - balle.radius;
                balle.direction.y = -1;
                balle.direction.x = -1;
                //listBrique.splice(i, 1);
                brique.visible = false;
                
            } else if (balle.x + balle.radius > brique.x && balle.x - balle.radius < brique.x + brique.largeur) {
                balle.y = brique.y - balle.radius;
                balle.direction.y = -1;
                //listBrique.splice(i, 1);
                brique.visible = false;
                
            } else if (balle.x - balle.radius === brique.x + brique.largeur) {
                balle.y = brique.y - balle.radius;
                balle.x = brique.x + brique.largeur + balle.radius;
                balle.direction.y = -1;
                balle.direction.x = 1;
                //listBrique.splice(i, 1);
                brique.visible = false;
                
            }
        }
    
        
        // BAS
        else if (balle.y - balle.radius === brique.y + brique.hauteur) {
            // BAS Angle
            if (balle.x + balle.radius === brique.x) {
                balle.y = brique.y + brique.hauteur + balle.radius;
                balle.x = brique.x - balle.radius;
                balle.direction.y = 1;
                balle.direction.x = -1;
                //listBrique.splice(i, 1);
                brique.visible = false;
                
            } else if (balle.x + balle.radius > brique.x && balle.x - balle.radius < brique.x + brique.largeur) {
                balle.y = brique.y + brique.hauteur + balle.radius;
                balle.direction.y = 1;
                //listBrique.splice(i, 1);
                brique.visible = false;
                
            } else if (balle.x - balle.radius === brique.x + brique.largeur) {
                balle.y = brique.y + brique.hauteur + balle.radius;
                balle.x = brique.x + brique.largeur + balle.radius;
                balle.direction.y = 1;
                balle.direction.x = 1;
                //listBrique.splice(i, 1);
                brique.visible = false;
                
            }
        }
        
        // DROITE
        if (balle.x - balle.radius === brique.x + brique.largeur) {
            // DROITE Angle
            if (balle.y + balle.radius === brique.y) {
                balle.x = brique.x + balle.radius;
                balle.y = brique.y - balle.radius;
                balle.direction.x = 1;
                balle.direction.y = -1;
                //listBrique.splice(i, 1);
                brique.visible = false;
                
            } else if (balle.y + balle.radius > brique.y && balle.y - balle.radius < brique.y + brique.hauteur) {
                balle.x = brique.x + balle.radius;
                balle.direction.x = 1;
                //listBrique.splice(i, 1);
                brique.visible = false;
                
            } else if (balle.y - balle.radius === brique.y + brique.hauteur) {
                balle.x = brique.x + balle.radius;
                balle.y = brique.y + brique.hauteur + balle.radius;
                balle.direction.x = 1;
                balle.direction.y = 1;
                //listBrique.splice(i, 1);
                brique.visible = false;
                
            }
        }
        
        // GAUCHE
        else if (balle.x + balle.radius === brique.x) {
            // GAUCHE Angle
            if (balle.y + balle.radius === brique.y) {
                balle.x = brique.x - balle.radius;
                balle.y = brique.y - balle.radius;
                balle.direction.x = -1;
                balle.direction.y = -1;
                //listBrique.splice(i, 1);
                brique.visible = false;
                
            } else if (balle.y + balle.radius > brique.y && balle.y - balle.radius < brique.y + brique.hauteur) {
                balle.x = brique.x - balle.radius;
                balle.direction.x = -1;
                //listBrique.splice(i, 1);
                brique.visible = false;
                
            } else if (balle.y - balle.radius === brique.y + brique.hauteur) {
                balle.x = brique.x - balle.radius;
                balle.y = brique.y + brique.hauteur + balle.radius;
                balle.direction.x = -1;
                balle.direction.y = 1;
                //listBrique.splice(i, 1);
                brique.visible = false;
                
            }
        }
    }
    
    supBrique();
    
}


/* **************************************************** DRAW **************************************************** */
// Dessine le jeu
function displayGame()
{
    
	let score = game.point.toString();
	let meilleurScore = game.meilleurScore.toString();
	
    ctx.font = "32px Arial";
    
    if (game.gameOver === true) {
        if (game.meilleurScore < game.point) {
            game.meilleurScore = game.point;
        }
        ctx.fillText("Game Over", game.largeur/2 - ctx.measureText("Game Over").width/2, game.hauteur/2);
        ctx.fillText("Votre score : " + score + " !", game.largeur/2 - ctx.measureText("Votre score : " + score).width/2, game.hauteur/2 + 30);
        return;
    } else if (game.next) {
        ctx.fillText("Bravo ! Niveau " + (game.level) + " terminer !", game.largeur/2 - ctx.measureText("Bravo ! Niveaux " + (game.level - 1) + " terminer !").width/2, game.hauteur/2);
        ctx.fillText("Votre score : " + score + " !", game.largeur/2 - ctx.measureText("Votre score : " + score).width/2, game.hauteur/2 + 30);
        ctx.fillText("Press espace pour continuer au niveau" + (game.level + 1) , game.largeur/2 - ctx.measureText("Press espace pour continuer au niveau" + (game.level + 1)).width/2, game.hauteur/2 + 60);
    } else {
        if (game.pause === true) {
            ctx.fillText("Pause", game.largeur/2 - ctx.measureText("Pause").width/2, game.hauteur/2);
        } else {
            // On vide le Canvas avant de redessiner
            ctx.clearRect(0, 0, game.largeur, game.hauteur);
        
            // On dit au contexte que la couleur de remplissage est gris
            ctx.fillStyle = game.color;
            // On rempli le Canvas de gris
            ctx.fillRect(0, 0, game.largeur, game.hauteur);
            
            // Background Image
            ctx.drawImage(game.background, 0, 30, game.largeur, game.hauteur);
        
            // On dit au contexte que la couleur de remplissage est rouge
            ctx.fillStyle = balle.color;
        
            // On trace un nouveau cercle rempli (fill) avec cette couleur
            ctx.beginPath();
            ctx.arc(balle.x, balle.y, balle.radius, 0, 2 * Math.PI); 
            ctx.fill();
            
            // On trace le pad
            ctx.drawImage(paddle.img, paddle.x, paddle.y, paddle.largeur, paddle.hauteur);
            
            // La vie
            let x = 10;
            for (let i = 0; i < paddle.vie; ++i) {
                ctx.fillRect(x, 10, 10, 5);
                x += 20;
            }
            
            // Les brique
            for (let i = 0; i < listBrique.length; ++i) {
                
                let brique = listBrique[i];
               // ctx.fillStyle = brique.color;
                //ctx.fillRect(brique.x, brique.y, brique.largeur, brique.hauteur);
                ctx.drawImage(brique.color, brique.x, brique.y, brique.largeur, brique.hauteur);
            }
            
            
            ctx.font = "18px Arial";
            ctx.fillText("Score : ", game.largeur - 150, 20);
            ctx.fillText(score, game.largeur - 150 + ctx.measureText("Score : ").width + 10, 20);
            
            
            ctx.fillText("Meilleur score : ", game.largeur/2 - ctx.measureText("Meilleur score : ").width, 20);
            ctx.fillText(meilleurScore, game.largeur/2 + ctx.measureText(meilleurScore).width/2 + 10, 20);
        }
        
        
    }
    
}



/* **************************************************** KEYBOARD **************************************************** */
function keyboardEvent(e) {
    e.preventDefault();
    if (e.key == 'ArrowRight') {
        if (e.type == "keydown") {
            paddle.direction = 1;
        } else {
            paddle.direction = 0;
        }
    } else if (e.key == 'ArrowLeft') {
        if (e.type == "keydown") {
            paddle.direction = -1;
        } else {
            paddle.direction = 0;
        }
    };
    console.log(e);
    
    // Apuie sur le bouton du clavier
    if (e.key == "Enter" && e.type == "keydown") {
        if (game.gameOver) {
            game.gameOver = false;
            game.start = false;
            initGame();
        } else if (game.next) {
            game.next = false;
            initPositions();
            game.level++;
            creerBrique();
        } else {
            if (game.start === false) {
            game.start = true;
            } else {
                if (game.pause) {
                    game.pause = false;
                } else {
                    game.pause = true;
                }
                
            }
        }
        
    };
    
};



