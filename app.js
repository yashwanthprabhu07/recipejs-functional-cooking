const recipes = [
    { id: 1, title: "Garlic Butter Pasta", time: 25, difficulty: "easy", description: "Simple pasta tossed in garlic butter.", category: "pasta" },
    { id: 2, title: "Vegetable Stir Fry", time: 20, difficulty: "easy", description: "Quick stir-fried veggies.", category: "salad" },
    { id: 3, title: "Paneer Butter Masala", time: 45, difficulty: "medium", description: "Rich paneer curry.", category: "curry" },
    { id: 4, title: "Baked Lasagna", time: 75, difficulty: "medium", description: "Cheesy layered pasta.", category: "pasta" },
    { id: 5, title: "Chicken Biryani", time: 90, difficulty: "hard", description: "Spiced rice with chicken.", category: "curry" },
    { id: 6, title: "Beef Rendang", time: 120, difficulty: "hard", description: "Slow-cooked beef curry.", category: "curry" },
    { id: 7, title: "Caesar Salad", time: 15, difficulty: "easy", description: "Crisp salad with dressing.", category: "salad" },
    { id: 8, title: "Mushroom Risotto", time: 60, difficulty: "medium", description: "Creamy mushroom rice.", category: "pasta" }
];

const recipeContainer = document.querySelector("#recipe-container");

const createRecipeCard = (recipe) => `
    <div class="recipe-card" data-id="${recipe.id}">
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
            <span>⏱️ ${recipe.time} min</span>
            <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
        </div>
        <p>${recipe.description}</p>
    </div>
`;

const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = recipesToRender.map(createRecipeCard).join("");
};

renderRecipes(recipes);
