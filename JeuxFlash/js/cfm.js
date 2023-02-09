let canvasDom = document.querySelector("canvas");
canvasDom.width = 500;
canvasDom.height = 500;
canvasDom.style.backgroundColor = "#000";

let ctx = canvasDom.getContext('2d');

let step = 'choice';

let choices = document.querySelector(".choices");
let again = document.querySelector(".again");

let rock = document.querySelector("#rock");
let paper = document.querySelector("#paper");
let scissors = document.querySelector('#scissors');

let yes = document.querySelector("#yes");
let no = document.querySelector("#no");

let choice;


/*Gère l'affichage du jeu*/
function display(){
    ctx.clearRect(0,0,canvasDom.width,canvasDom.height);
    switch(step){
        case 'choice':
            choices.classList.add("active");
            break;
        case 'anim':
            choices.classList.remove("active");
            step = 'answer';
            display();
            break;
        case 'answer':
            console.log("answer");
            ctx.font = 'bold 18px Verdana';
            ctx.fillStyle = '#D125E6';
            let text = win(choice).toUpperCase();
            ctx.fillText(text,canvasDom.width/2 - text.length/2, 200);
            ctx.fillText("Rejouer?", canvasDom.width/2 - 4, 300);
            again.classList.add("active");
           
            break;
        case 'thank':
            ctx.font = 'bold 18px Verdana';
            ctx.fillStyle = '#D125E6';
            text = "Merci d'avoir joué à notre jeu!";
            ctx.fillText(text, canvasDom.width/2 - text/2, 250);
    }
}

function anim(){

}

/*Détermine si le joueur a gagné ou perdu */
function win(choice){
    let choiceCPU = Math.floor(Math.random()*3);
    switch(choice){
        case "rock":
            switch(choiceCPU){
                case 1:
                    return "perdu";
                case 2:
                    return "gagné";
                default:
                    return "égalité";
            }
        case "paper":
            switch(choiceCPU){
                case 0:
                    return "gagné";
                case 2:
                    return "perdu";
                default:
                    return "égalité";
            }
        case "scissors":
            switch(choiceCPU){
                case 0:
                    return "perdu";
                case 1:
                    return "gagné";
                default:
                    return "égalité";
            }
    }
}

function game(){
    
    step = "choice";
    display();
}

/* On lance le jeu au chargement de la page */
document.addEventListener('DOMContentLoaded',function(){
    /*On initialise les événements*/
    rock.addEventListener('click',function(){
        choice = 'rock';
        step = 'anim';
        display();
    });
    paper.addEventListener('click', function(){
        choice = "paper";
        step = 'anim';
        display();
    });
    scissors.addEventListener('click', function(){
        choice = "scissors";
        step = 'anim';
        display();
    });
    
    
    yes.addEventListener('click',function(){
        again.classList.remove("active");
        game();
    });
    no.addEventListener('click', function(){
        again.classList.remove("active");
        step = 'thank';
        display();
    });

    game()
})