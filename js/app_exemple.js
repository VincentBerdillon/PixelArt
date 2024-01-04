// ###############################################
// ################# Invader v 1.0 ###############
// #############################################
//
//
// ### Plan d'action ###
/**
 * 1 - Créer la grille
 *      - 
 *      - 
 *      - 
 * 
 * 2 - Gérer le clic sur un pixel
 *      - 
 *      - 
 * 
 * 3 - Créer le formulaire
 *      - 
 *      - 
 *      - 
 *      -
 */

// ####################
// --- Variables Globales ---
// ####################

const GRID_SIZE = 8;
const PIXEL_SIZE = 30;
const divInvader = document.querySelector('#invader');
const formElement = document.querySelector('.configuration');


// ####################
// --- Processus ---
// ####################

console.log("Démarrage de l'application...");
console.groupCollapsed("Génération de la grille...")
generateGrid(GRID_SIZE, PIXEL_SIZE);

console.groupCollapsed("Création du formulaire");
fillForm();

console.log("En attente d'évènements...");

// ####################
// --- Fonctions ---
// ####################

// La fonction qui génère une ligne
function generateRow(parent) {
    console.log("Création d'une ligne...")    
    const row = document.createElement('div');                                  // On créé l'élément div qui sera notre ligne
    row.className = "row";                                                     // On donne une classe à notre ligne
    parent.appendChild(row);                                                    // On greffe l'élément "row" à une div parente fournie en paramètre de la fonction
    return row;                                                                 // On return la row pour l'utiliser dans la fonction generatePixel plus tard
}

// La fonction qui génère un Pixel
function generatePixel(parent, pixelSize){
    console.log("Création d'un pixel...")
    const pixel = document.createElement('div');                                // On créé l'élément div qui sera notre pixel
    pixel.className = "pixel";                                                  // On donne une classe à notre pixel
    pixel.style.width = pixelSize+"px";                                         // On donne une hauteur et une largeur à notre pixel
    pixel.style.height = pixelSize+"px"; 
    pixel.addEventListener('click', handlePixelClick);                          // On branche un écouteur d'évent sur le pixel créé, qui executera la fonction handlePixelClick
    parent.appendChild(pixel);                                                  // On greffe ce pixel sur la ligne parente
}

// La fonction qui génère la grille
function generateGrid(gridSize, pixelSize) {
    console.log("Génération de la grille en cours...");
    for(let rowCounter = 0; rowCounter < gridSize; rowCounter++){               // On répète cette boucle "gridSize" fois
        const row = generateRow(divInvader);                                    // Pour chaque tour de boucle, on créé une ligne
        for(let pixelCounter = 0; pixelCounter < gridSize; pixelCounter++){     // Pour chaque ligne, on créé "gridSize" fois de pixel
            generatePixel(row, pixelSize);                                         
        }
    }
    console.groupEnd();
    console.log("Grille générée avec succès !")
}

// La fonction qui gère le clic sur un pixel
function handlePixelClick(event) {
    console.groupCollapsed("Evenement détecté : Clic sur le pixel : ", event.target)
    const targetPixel = event.target;
    if (targetPixel.classList.contains("pixel--black")) {                        // Si le pixel cible contient la classe "pixel--empty"
        console.log("On retire le modifier 'pixel--black'")
        targetPixel.classList.remove("pixel--black");                            // On enlève la classe "pixel--plain"
    }
    else {                                                                       // Sinon
        console.log("On ajoute le modifier 'pixel--black'")
        targetPixel.classList.add("pixel--black")                                // On donne la classe "pixel--plain"
    }
    console.groupEnd();
}

// La fonction qui génère un input
function generateInput(placeholder) {
    console.log(`Génération de l'input : ${placeholder}`);
    const input = document.createElement('input');                               // On créé un élément de type input
    input.placeholder = placeholder;                                             // On lui donne un placeholder
    input.type = 'number';                                                       // On détermine le type d'input
    formElement.appendChild(input);                                              // On le greffe au formulaire
    console.log("Input généré !")
}

// La fonction qui génère le formulaire en intégralité
function fillForm() {
    console.log("Génération du formulaire en cours...");
    generateInput("Taille de la grille");                                        // On crée l'input "taille de la grille"
    generateInput("Taille des pixels");                                          // On crée l'input "Taille des pixels"

    const button = document.createElement("button");                             // On crée le bouton "Valider" du formulaire
    button.textContent = "Valider";                                              // On lui donne un contenu textuel
    formElement.appendChild(button);                                             // On greffe le bouton au formulaire
    formElement.addEventListener('submit', handleSubmit);                        // On branche un écouteur d'évenements au formulaire
    console.log("Formulaire généré avec succès !")
    console.groupEnd();
}

// La fonction qui gère l'évènement 'submit' du formulaire
function handleSubmit(event) {
    console.groupCollapsed("Evenement détecté : Soumission du formulaire");
    event.preventDefault();                                                      // On empêche le comportement par défaut du formulaire (rechargement de la page)
    console.log(event);
    divInvader.textContent = "";                                                // On efface la grille déjà existante dans le DOM
    const gridSizeInput = event.target.childNodes[0];                            // On sélectionne l'input concernant la taille de la grille
    const pixelSizeInput = event.target.childNodes[1];                           // On sélectionne l'input concernant la taille des pixels
    const gridSize = Number(gridSizeInput.value);                                // On récupère la valeur de l'input
    const pixelSize = Number(pixelSizeInput.value);                              // On récupère la valeur de l'input
    console.log("Génération de la nouvelle grille...")
    generateGrid(gridSize, pixelSize);                                           // On construit une nouvelle grille avec les valeurs des inputs
    console.groupEnd();
}
