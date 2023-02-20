if (document.documentElement.clientWidth < 740) { throw new Error("Pas de JS sur mobile !") }
// ------------------------------
// Formulaires dynamiques :
const dynamicForm = {
  "img": {
    "contenu": true,
    "sous_contenu": false,
    "href": false,
  },
  "video": {
    "contenu": true,
    "sous_contenu": true,
    "href": false
  },
  "audio": {
    "contenu": true,
    "sous_contenu": true,
    "href": false
  },
  "img-background": {
    "contenu": true,
    "sous_contenu": true,
    "href": false
  },
  "p": {
    "contenu": true,
    "sous_contenu": false,
    "href": false
  },
  "a": {
    "contenu": true,
    "sous_contenu": false,
    "href": true
  },
  "blockquote": {
    "contenu": true,
    "sous_contenu": false,
    "href": false
  },
  "h2": {
    "contenu": true,
    "sous_contenu": false,
    "href": false
  },
  "h3": {
    "contenu": true,
    "sous_contenu": false,
    "href": false
  },
  "h4": {
    "contenu": true,
    "sous_contenu": false,
    "href": false
  },
  "bloc": {
    "contenu": true,
    "sous_contenu": true,
    "href": false
  },
  "img-portrait": {
    "contenu": true,
    "sous_contenu": true,
    "href": true
  }
};

if (document.querySelector("#dynamicForm") !== null) {
  initDynamicForm(dynamicForm);
}

function initDynamicForm(dynamicForm) {
  const dynamicElement = document.querySelector("#dynamicElement");
  const selectBalise = document.querySelector("#balise-select");
  const selectClass = document.querySelector("#class-select");
  const textInput = document.querySelector('textarea[name=contenu]');
  const toAnalyseInputs = document.querySelectorAll("#toAnalyseInput");


  // Code pour l'attribution des classes
  let tempClass = null;

  selectClass.addEventListener("change", () => {
    if (tempClass !== undefined) { dynamicElement.classList.remove(tempClass); }

    if (selectClass.options[selectClass.selectedIndex].dataset.classname !== undefined) {
      dynamicElement.classList.add(selectClass.options[selectClass.selectedIndex].dataset.classname);
    }

    tempClass = selectClass.options[selectClass.selectedIndex].dataset.classname;
  });



  //On ajoute la classe de l'option par défaut
  dynamicElement.classList.add('pre-visual__item--' + selectBalise.value);


  //On fait comme dans la boucle mais pour mettre les valeurs par défaut
  for (let i = 0; i < toAnalyseInputs.length; i++) {

    let inputElem = toAnalyseInputs[i];
    console.log(toAnalyseInputs[i]);

    if (dynamicForm[selectBalise.value][toAnalyseInputs[i].name] === true) {
      inputElem.style.cssText = 'display : block;';
    }
    else {
      inputElem.style.cssText = 'display : none;';
    }
  }
  selectBalise.addEventListener("change", () => {
    dynamicElement.classList.remove(...dynamicElement.classList);
    dynamicElement.classList.add('pre-visual__item');
    dynamicElement.classList.add('pre-visual__item--' + selectBalise.value);

    // On affiche que les input souhaité
    for (let i = 0; i < toAnalyseInputs.length; i++) {
      let inputElem = toAnalyseInputs[i];
      // console.log(dynamicForm[selectBalise.value][toAnalyseInputs[i].name]);

      if (dynamicForm[selectBalise.value][toAnalyseInputs[i].name] === true) {
        inputElem.style.cssText = 'display : block;';
      }
      else {
        inputElem.value = "";
        inputElem.style.cssText = 'display : none;';
      }
    }

    // dynamicElement[selectBalise.value].forEach(function(elem) {
    //     console.log(elem);
    // });
  });

  dynamicElement.textContent = textInput.value;

  // On cache le contenu si l utilisateur n'a pas rentré de texte
  if (textInput.value.length === 0) {
    dynamicElement.style.cssText = "visibility: hidden";
  }
  else {
    dynamicElement.style.cssText = "visibility: visible";
  }
  textInput.addEventListener("input", () => {
    dynamicElement.textContent = textInput.value;

    // On cache le contenu si l utilisateur n'a pas rentré de texte
    if (textInput.value.length === 0) {
      dynamicElement.style.cssText = "visibility: hidden";
    }
    else {
      dynamicElement.style.cssText = "visibility: visible";
    }
    // console.log(textInput.value.length);
  });
}

// ------------------------------
// Dynamic effect sur le bg de la main page :
function scrollChurchWatch(sectionChurch) {

  let windowHeight = sectionChurch.clientHeight;
  let windowScroll = window.scrollY;

  if (windowScroll >= windowHeight) {
    if (isMoving) {
      sectionChurch.style.cssText = "background-attachment : unset;";
      isMoving = false;
    }
  }
  else if (windowScroll <= windowHeight && !isMoving) {
    sectionChurch.style.cssText = "background-attachment: fixed, scroll;";
    isMoving = true;
  }
}

// ------------------------------
// // Carré dynamique
function dynamicSquareWatch(square, squareBorder) {

  document.addEventListener('mousemove', (e) => {
    let scroll = window.scrollY;


    let mousePosX = e.clientX;
    let mousePosY = e.clientY + scroll;

    // Plus cette valeur est élevée, plus le carré est lent
    let movementSpeed = 10;
    let movementSpeedBorder = 20;

    let squareCenterX = square.offsetLeft + square.clientWidth / 2;
    let squareCenterY = square.offsetTop;

    let squareX = mousePosX - squareCenterX;
    let squareY = mousePosY - squareCenterY;

    if (squareY < document.documentElement.clientHeight) {
      square.style.cssText = `transform: translate(${squareX / movementSpeed}px, ${squareY / movementSpeed}px);`;
      squareBorder.style.cssText = `transform: translate(${squareX / movementSpeedBorder}px, ${squareY / movementSpeedBorder}px);`;
    }
  });
}

function animSunWatch(sectionChurch, isVisible) {
  let animPos = document.documentElement.clientHeight / 2;
  let scroll = window.scrollY * 2;

  if (scroll >= animPos && !isVisible) {
    isVisible = true;

    // sectionChurch.style.cssText = "background-size : 40%, 25% ";
  }

  return isVisible;
}

// ----------------------
// Radio button coloré :
const checkmark = document.querySelectorAll(".checkmark");
const checkInput = document.querySelectorAll("[name=id_couleur]");
const colorRadio = document.querySelector("[data-color]");

function formColor(checkInput, checkmark) {
  let i = 0;

  checkInput.forEach((elem) => {
    let colorRadio = document.querySelectorAll("[data-color]")[i].dataset.color;
    let checkBox = checkmark[i];

    checkBox.style.background = "#" + colorRadio;

    elem.addEventListener("change", function (e) {
      console.log(elem.dataset.checked);
      if (elem.dataset.checked == "0") {
        elem.style.cssText = "border : 4px solid blue";
      } else {
        elem.style.border = "4px solid blue";
      }
    });

    i++;
  });
}

formColor(checkInput, checkmark);


const sectionChurch = document.querySelector('#sectionEdito');
const dynamicSquare = document.querySelector('#floatingSquare');
const dynamicSquareBorder = document.querySelector('#floatingSquareBorder');
const progressBarElem = document.querySelector('#progressBar');

let isMoving = true;
let isSunVisible = false;
var scroll = 0;

window.onscroll = function () {
  if (progressBarElem !== null) { progressBar(progressBarElem) }

  if (sectionChurch !== null) { scrollChurchWatch(sectionChurch); isSunVisible = animSunWatch(sectionChurch, isSunVisible); };
};

if (dynamicSquare !== null && window.scrollY < document.documentElement.clientHeight) { dynamicSquareWatch(dynamicSquare, dynamicSquareBorder) };


////// DIRE AU MENU BURGER DE DEVENIR NOIR SUR FOND BLANC

// const idpage = querySelector(header > id );
// console.log(idpage);
// const burger = querySelector("sectionChimere__burger");
// console.log(burger);
// const background = querySelector("body");
// console.log(background);
// const header = querySelector("header");
// console.log(header);

// if (idpage !==0 ) {
//   if (background.style.backgroundColor = '#fff') {
//   const burgerBlack = document.createElement("svg");
// svg.src="./public/svg/burger_menu_black.svg";
//   header.appendChild(burgerBlack);
// }
// }

