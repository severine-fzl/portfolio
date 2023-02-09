'use strict';

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
var x = document.getElementById("rocket");
let i = 10;
let chronoDom;
let firingButton;

let secondes = 11;
let check = true ;
let main = document.querySelector("main");

document.addEventListener('DOMContentLoaded', function(){
        star()
        firingButton = document.querySelector("#firing-button");
        firingButton.addEventListener('click', change);
         chronoDom = document.querySelector('span');
        
});



function change(event)
{ 
   if (check== true){
    console.log("click");
     firingButton.setAttribute("src", "images/cancel-button.png");
    
    window.setTimeout(updateChrono,1000);
    
    check=false;
   }
   

};

function star(){
    let nmbStar = 150;
    let x;
    let y;
    let size;
    let taille;
    while(nmbStar > 0){
        x = Math.floor(Math.random()*window.innerWidth);
        y = Math.floor(Math.random()*window.innerHeight);
        let div = document.createElement("div");
        console.log(div);
        size = Math.floor(Math.random()*3);
    
        switch(size){
            case 1:
                taille = "tiny";
                break;
            case 2:
                taille = "normal";
                break;
            case 3:
                taille = "big";
                break;
        }
        main.appendChild(div);
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.classList.add("star");
        div.classList.add(taille);
        
        --nmbStar; 
    }
}




/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/
/*if(timer=0){ */

function launcher(){
   
    if(i<4800)
    {
    
    x.style.bottom = `${i}px`;
    
    
    i = i+80;
    console.log(i);
    }
    if(i>4800){
        
        x.classList.add("tookOff");
         x.setAttribute("src", "images/rocket3.gif");
            x.style.bottom = `${i}px`;
         i = i+200;
    }
}


function updateChrono()
{
     // On arrête si on est à 0 secondes
    if (secondes == 0) {
        let  intervalID  =  window.setInterval(launcher,100);
         x.setAttribute("src", "images/rocket3.gif");
    
        return;
    }
    // Mofication des valeurs à afficher
    
    if ( secondes == 5){
        
        x.setAttribute("src", "images/rocket2.gif");
        
    }
    if(secondes <= 11) {
        secondes--;
         
    } 
  
    // on met à jour l'affichage
    
    secondes = secondes.toString().padStart(2, '0');
    chronoDom.innerText = `${secondes}`;

    //on relance la mise à jour dans 1 seconde 
    window.setTimeout(updateChrono, 1000);
}





 



/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/
