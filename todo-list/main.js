let button = document.querySelector("button");
let input = document.getElementById("champ")
let liste = document.getElementById("liste")

// AJOUTER UNE NOUVELLE TACHE 
button.addEventListener("click", ajouterTache);

function ajouterTache() {
    //JE REMETS L'INPUT DANS L'ETAT NORMAL
        if(input.value.length > 0) {
            if(input.classList.contains("replacePlaceHolder")){
                input.classList.remove("replacePlaceHolder")
                input.placeholder = "Ajouter une nouvelle tâche"
            }
    //ON CREE LA BALISE LI ET DIV
        let li = document.createElement("li")
        let texte = document.createElement("span")
        li.appendChild(texte)
        texte.classList.add("texte")
        texte.textContent = input.value
    // ON CREE L'ICONE POUR SUPPRIMER LA TACHE
        let icone = document.createElement("i");
    //ON AJOUTE A L'ICONE ET LA DIV SA CLASSE
        icone.classList.add("fas", "fa-trash-alt", "poubelle");
    //ON AJOUTE LA BALISE ICONE, LI ET SON TEXTE DANS UNE BALISE OL PRESENT DANS LE DOM
        liste.appendChild(li)
        li.appendChild(icone)
        input.value ="";
    //ON AJOUTE DU STYLE A L'ICONE
        icone.style.fontSize="20px"
        icone.style.color = "white";
        icone.style.fontSize="25px"
        icone.style.backgroundColor = "red"; 
        icone.style.padding = "10px 10px 10px 10px";
        texte.style.fontSize="18px"

    //SUPPRIMER UNE TACHE
        icone.addEventListener('click', suppr)
        function suppr(e) {
            e.target.parentElement.remove()
        }
    } else {
        input.placeholder = "Merci de renseigner une tâche"
        input.classList.add("replacePlaceHolder")
    }
}