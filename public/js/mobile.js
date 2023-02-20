// --------------------
//Désactiver les liens sur tel et ipad
if (window.matchMedia("(min-width: 12px)").matches) {

  const tab = document.querySelectorAll(".sectionChimere__container__divRelative > a");
  tab.forEach(function (elem) {
    elem.classList.add('deadLink');
  })

  const tabDeadLink = document.querySelectorAll(".deadLink");
  tabDeadLink.forEach(function (elem) {
    elem.addEventListener('click', e => {
      e.preventDefault();
    })
  })

}


// --------------------
// Clic sur les img 

const chimere = document.querySelector(".sectionChimere");

if (chimere !== null) { watchChimere() };

function watchChimere() {
  const tabImg = document.querySelectorAll(".sectionChimere__container__divRelative > a > img ");
  console.log(tabImg);
  const tabP = document.querySelectorAll(".sectionChimere__container__resume");
  console.log(tabP);

  randInt = Math.floor(Math.random() * tabP.length);
  tabP[randInt].classList.add('show');

  for (let i = 0; i < 6; i++) {
    tabImg[i].addEventListener('click', e => {

      let display = document.querySelector(".show")

      display.classList.remove('show');
      tabP[i].classList.add('show');
    })

  }
}

// -------------------
// Liens navigation des articles

const articles = document.querySelectorAll("article");

const previousArticle = document.querySelectorAll("#previousArticle");
const nextArticle = document.querySelectorAll("#nextArticle");

for (let i = 0; i < articles.length; i++) {
  if (i !== 0 && i !== articles.length - 1) {
    previousArticle[i].href = '#' + articles[i - 1].id;
    nextArticle[i].href = '#' + articles[i + 1].id;
  }
  else if (i === 0 || i === articles.length) {
    if (articles.length === 1) {
      previousArticle[i].style.display = "none";
      nextArticle[i].style.display = "none";
    }
    else {
      previousArticle[i].style.display = "none";
      nextArticle[i].href = '#' + articles[i + 1].id;
    }
  }
}


// --------------
// Menu sidebar
const sideBarMenu = document.querySelector("#sideBarMenu");
const sideBarClose = document.querySelector("#closeSideBarMenu");
const sideBar = document.querySelector("#sideBar");

if (sideBarMenu !== null) {
  sideBarMenu.addEventListener("click", function (e) {
    sideBar.classList.add("sectionChimere__sidebar--show")
    sideBarMenu.style.cssText += "visibility : hidden ;";
  });
  sideBarClose.addEventListener("click", function (e) {
    sideBar.classList.remove("sectionChimere__sidebar--show")
    sideBarMenu.style.cssText += "visibility : visible ;";
  });
}

// --------------------
// Bar de progression
function progressBar(pb) {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  pb.style.width = scrolled + "%";
}
