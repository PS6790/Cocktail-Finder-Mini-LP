const searchtext = document.getElementById('searchtext');
const random = document.getElementById('random');
const search = document.getElementById('search');
const resultHeading = document.getElementById('result-heading');
const cocktaillist = document.getElementById('cocktail-list');
const singlecocktail = document.getElementById('single-cocktail');

// Search a Cocktail by Keyword
function searchCocktail(e) {
  e.preventDefault();
  cocktaillist.innerHTML = '';
  singlecocktail.innerHTML = '';
  const term = searchtext.value;
  if (term.trim()) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`)
      .then(response => response.json())
      .then(data => {
        resultHeading.innerHTML = `<h1 class="search-results">Your search results for '${term}':</h1>`;
        if (data.drinks === null) {
          resultHeading.innerHTML = `<h1 class="search-results">There are no search results. Try again!</h1>`;
          } else {
          cocktaillist.innerHTML = data.drinks
            .map(
              cocktail => `
              <div class="cocktail-container">
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink} class="cocktail-thumb" id="${cocktail.idDrink}">
                <div class="cocktail-descr">
                <h1 style="text-align: center">${cocktail.strDrink}<br>
                <button class="btn" id="${cocktail.idDrink}" onclick="getRecipe(${cocktail.idDrink})">Get Recipe</button>
                </h1>
                </div>
              </div>
              `
              )
            .join('');
        }
      });
      searchtext.value = '';
  } else {
    alert('Please enter a new Keyword');
  }
}

// Search a random Cocktail by Click
function getRandomCocktail() {
  searchtext.value = '';
  cocktaillist.innerHTML = '';
  singlecocktail.innerHTML = '';
  resultHeading.innerHTML = `<h1 class="search-results">Here comes your Cocktail of the Day, enjoy!</h1>`;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(response => response.json())
    .then(data => {
      const cocktail = data.drinks[0];
      cocktaillist.innerHTML = `
      <div class="cocktail-container">
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink} class="cocktail-thumb">
        <div class="cocktail-descr">
        <h1 style="text-align: center">${cocktail.strDrink}<br>
        <button class="btn" id="${cocktail.idDrink}" onclick="getRecipe(${cocktail.idDrink})">Get Recipe</button>
        </h1>
        </div>
      </div>
      `;
  });
}

// Get Recipe & Ingredients
function getRecipe(id) {
  const num = id;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${num}`)
    .then(response => response.json())
    .then(data => {
      const cocktail = data.drinks[0];
      resultHeading.innerHTML = '';
      cocktaillist.innerHTML = '';
      singlecocktail.innerHTML = `
      <h1>⬇️ Your Recipe for: ${cocktail.strDrink} ⬇️</h1>
      <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" class="cocktail-output">
      <h2><strong>🍹 How to serve:</strong></h2>
      <p>${cocktail.strGlass}</p><br>
      <h2><strong>📖 How to do:</strong></h2>
      <p>${cocktail.strInstructions}</p><br>
      <h2><strong>📅 Ingredients to use:</strong></h2>
      <ul>
        ${cocktail.strIngredient1 ? `<li>${cocktail.strIngredient1}</li>` : ``}
        ${cocktail.strIngredient2 ? `<li>${cocktail.strIngredient2}</li>` : ``}
        ${cocktail.strIngredient3 ? `<li>${cocktail.strIngredient3}</li>` : ``}
        ${cocktail.strIngredient4 ? `<li>${cocktail.strIngredient4}</li>` : ``}
        ${cocktail.strIngredient5 ? `<li>${cocktail.strIngredient5}</li>` : ``}
        ${cocktail.strIngredient6 ? `<li>${cocktail.strIngredient6}</li>` : ``}
      </ul>`;
})
}

// Event Listeners
search.addEventListener("click", searchCocktail);
random.addEventListener("click", getRandomCocktail);
searchtext.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    search.click();
  }}
)