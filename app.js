const fetchPokemons = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`);
    if (!response.ok) {
        throw new Error('Error fetching all pokemons');
    }
    const data = await response.json();
    return data;
}

const fetchPokemon = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error fetching teh pokemon');
    }
    const data = await response.json();
    return data;
}

let pokemons

const selectPokemon = document.querySelector('#select-pokemon');

const addOptions = () => {
    pokemons.results.forEach(pokemon => {
        const option = document.createElement('option');
        const name = pokemon.name;
        const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1);
        option.value = name;
        option.innerHTML = capitalizeName;
        selectPokemon.appendChild(option);
    })
}

const pokemonName = document.querySelector('#pokemon-name');

window.addEventListener('load', async () => {
    try {
        pokemons = await fetchPokemons();
        addOptions();
    } catch (error) {
        pokemonName.textContent = "Ups! I can't find the pokemons! Please, try again later!"
        console.error(error);
    }
})


const pokemonImg = document.querySelector('#pokemon-img');

let pokemonFinded;
selectPokemon.addEventListener('change', async (event) => {
    if (pokemons) {
        shinyBtn.classList.remove('disabled')
    }


    const pokemonValue = event.target.value;
    pokemonName.textContent = pokemonValue;

    const pokemonToFind = pokemons.results.find(pokemon => pokemonValue === pokemon.name);

    try {
        pokemonFinded = await fetchPokemon(pokemonToFind.url)
    } catch (error) {
        pokemonName.textContent = "Ups! I can't find the pokemon you selected! Please, try again later!"
        console.error(error);
    }

    pokemonImg.src = pokemonFinded.sprites.front_default;
    pokemonImg.classList.remove('d-none');

})

const shinyBtn = document.querySelector('#pokemon-shiny')

shinyBtn.addEventListener('click', (event) => {
    shinyBtn.classList.toggle('active');
    if (event.target.classList.contains('active')) {
        pokemonImg.src = pokemonFinded.sprites.front_shiny;
    } else {
        pokemonImg.src = pokemonFinded.sprites.front_default;
    }
});