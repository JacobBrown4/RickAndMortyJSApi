const container = document.getElementById("char-wrapper");
var currentPage = 1;
var maxPage = 42;

document.addEventListener("click", function (e) {
  if (e.target.id == "char-img" || e.target.id == "char-name") {
    characterDetail(e.target.alt);
  }
});

document.addEventListener("click", function (e) {
    if (e.target.id == "back-button" || e.target.id == "char-imgDetail") {
      changePage(currentPage);
    }
  });

function renderCharacters() {
  fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((character) => {
        const charDiv = document.createElement("div");
        const charName = document.createElement("h2");
        const charStatus = document.createElement("p");
        const charImg = document.createElement("img");
        charDiv.id = "char-container";
        charName.id = "char-name";
        charName.alt = `${character.id}`;
        charImg.alt = `${character.id}`;
        charImg.id = "char-img";
        charImg.title = `${character.name}`;
        charStatus.className = "char-status";
        charStatus.id = character.status;
        charName.textContent = character.name;
        charStatus.textContent = character.status;
        charImg.src = character.image;

        charDiv.append(charName, charImg, charStatus);

        container.appendChild(charDiv);
      });
    });
}

function characterDetail(id) {
  container.innerHTML = "";
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => response.json())
    .then((character) => {
      const charDiv = document.createElement("div");
      const charName = document.createElement("h2");
      const charStatus = document.createElement("p");
      const charImg = document.createElement("img");
      const charDeets = document.createElement("p");
      charDiv.id = "char-container";
      charName.id = "char-nameDetail";
      charImg.alt = character.id;
      charImg.id = "char-imgDetail";
      charImg.title = character.name;
      charStatus.className = "char-status";
      charName.textContent = character.name;
      charDeets.innerHTML =
        `Located on: ${character.location.name}` +
        "<br>" +
        `Species: ${character.species}` +
        "<br>" +
        `Episode Count: ${character.episode.length}`;
      charStatus.textContent = character.status;
      charImg.src = character.image;

      const backButton = document.createElement("button");
      backButton.innerHTML="Go back";
      backButton.id = "back-button";
      charDiv.append(charName, charImg, charName, charStatus, charDeets,backButton);
      container.appendChild(charDiv);
    });
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    changePage(currentPage);
  }
}

function nextPage() {
  if (currentPage < maxPage) {
    currentPage++;
    changePage(currentPage);
  }
}

function jumpPage(page){
    currentPage = page;
    changePage(page);

}
function changePage(page) {
  const btnNext = document.getElementById("btnNext");
  const btnPrev = document.getElementById("btnPrev");
  if (page < 1) page = 1;
  if (page > maxPage) page = maxPage;

  container.innerHTML = "";
  if (page == 1) {
    btnPrev.style.visibility = "hidden";
  } else {
    btnPrev.style.visibility = "visible";
  }

  if (page == maxPage) {
    btnNext.style.visibility = "hidden";
  } else {
    btnPrev.style.visibility = "visible";
  }

  renderCharacters();
}

window.onload = function () {
  changePage(1);
};
