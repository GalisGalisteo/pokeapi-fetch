const P = new Pokedex.Pokedex();

const interval = {
    offset: 0,
    limit: 10
}

const fetchPokemons = async () => {
    const response = await P.getPokemonsList(interval);
    if (!response) {
        throw new Error('Error fetching all pokemons');
    }
    return response;
}

const fetchPokemon = async (name) => {
    const response = await P.getPokemonByName(name);
    if (!response) {
        throw new Error('Error fetching the pokemon');
    }
    return response;
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

let pokemonFinded;

const pokemonImg = document.querySelector('#pokemon-img');
const shinyBtn = document.querySelector('#pokemon-shiny')

selectPokemon.addEventListener('change', async (event) => {
    if (pokemons) {
        shinyBtn.classList.remove('disabled')
    }

    const pokemonValue = event.target.value;
    pokemonName.textContent = pokemonValue;

    try {
        pokemonFinded = await fetchPokemon(pokemonValue)
    } catch (error) {
        pokemonName.textContent = "Ups! I can't find the pokemon you selected! Please, try again later!"
        console.error(error);
    }

    pokemonImg.src = pokemonFinded.sprites.front_default;
    pokemonImg.classList.remove('d-none');

})

shinyBtn.addEventListener('click', (event) => {
    shinyBtn.classList.toggle('active');
    if (event.target.classList.contains('active')) {
        pokemonImg.src = pokemonFinded.sprites.front_shiny;
    } else {
        pokemonImg.src = pokemonFinded.sprites.front_default;
    }
});