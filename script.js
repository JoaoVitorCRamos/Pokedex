const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const pokemonNumber = document.getElementById("pokemonNumber");
const pokemonName = document.getElementById("pokemonName");
const pokemonImage = document.getElementById("pokemonImage");

let currentPokemonId = 1;

async function fetchPokemonData(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

async function updatePokemonInfo(id) {
  const pokemon = await fetchPokemonData(id);
  pokemonNumber.textContent = `#${pokemon.id.toString().padStart(3, "0")}`;
  pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  pokemonImage.src = pokemon.sprites.front_default;
}

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      currentPokemonId = data.id;
      updatePokemonInfo(currentPokemonId);
      searchInput.value = "";
    })
    .catch(() => {
      alert("Pokémon not found!");
    });
});

prevButton.addEventListener("click", () => {
  if (currentPokemonId > 1) {
    currentPokemonId--;
    updatePokemonInfo(currentPokemonId);
  }
});

nextButton.addEventListener("click", () => {
  if (currentPokemonId < 1010) {
    currentPokemonId++;
    updatePokemonInfo(currentPokemonId);
  }
});

updatePokemonInfo(currentPokemonId);
