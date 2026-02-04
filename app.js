(() => {
  const recipes = [
    { id: 1, title: "Pasta", difficulty: "easy", time: 20, ingredients: ["pasta", "cheese"] },
    { id: 2, title: "Biryani", difficulty: "hard", time: 60, ingredients: ["rice", "chicken"] },
    { id: 3, title: "Sandwich", difficulty: "easy", time: 10, ingredients: ["bread", "vegetables"] },
    { id: 4, title: "Soup", difficulty: "medium", time: 30, ingredients: ["water", "vegetables"] }
  ];

  const recipeList = document.getElementById("recipeList");
  const searchInput = document.getElementById("searchInput");
  const counter = document.getElementById("counter");
  const favoritesOnlyBtn = document.getElementById("favoritesOnly");

  let currentFilter = "all";
  let currentSort = null;
  let showFavoritesOnly = false;
  let searchTerm = "";
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const saveFavorites = () =>
    localStorage.setItem("favorites", JSON.stringify(favorites));

  const isFavorite = id => favorites.includes(id);

  const renderRecipes = () => {
    let filtered = recipes.filter(r =>
      (currentFilter === "all" || r.difficulty === currentFilter) &&
      (!showFavoritesOnly || isFavorite(r.id)) &&
      (r.title.toLowerCase().includes(searchTerm) ||
       r.ingredients.join(" ").toLowerCase().includes(searchTerm))
    );

    if (currentSort === "name") filtered.sort((a,b)=>a.title.localeCompare(b.title));
    if (currentSort === "time") filtered.sort((a,b)=>a.time-b.time);

    recipeList.innerHTML = "";
    filtered.forEach(r => {
      const div = document.createElement("div");
      div.className = "recipe";
      div.innerHTML = `
        <h3>${r.title}
          <span class="favorite">${isFavorite(r.id) ? "❤️" : "🤍"}</span>
        </h3>
        <p>Difficulty: ${r.difficulty}</p>
        <p>Time: ${r.time} mins</p>
        <details>
          <summary>Ingredients</summary>
          <p>${r.ingredients.join(", ")}</p>
        </details>
      `;
      div.querySelector(".favorite").onclick = () => {
        favorites = isFavorite(r.id)
          ? favorites.filter(id => id !== r.id)
          : [...favorites, r.id];
        saveFavorites();
        renderRecipes();
      };
      recipeList.appendChild(div);
    });

    counter.textContent = `Showing ${filtered.length} of ${recipes.length} recipes`;
  };

  document.querySelectorAll("[data-filter]").forEach(btn =>
    btn.onclick = () => { currentFilter = btn.dataset.filter; renderRecipes(); }
  );

  document.querySelectorAll("[data-sort]").forEach(btn =>
    btn.onclick = () => { currentSort = btn.dataset.sort; renderRecipes(); }
  );

  favoritesOnlyBtn.onclick = () => {
    showFavoritesOnly = !showFavoritesOnly;
    renderRecipes();
  };

  searchInput.addEventListener("input",
    debounce(e => {
      searchTerm = e.target.value.toLowerCase();
      renderRecipes();
    }, 300)
  );

  renderRecipes();
})();