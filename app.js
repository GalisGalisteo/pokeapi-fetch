const fetchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) {
        throw new Error('Error fetching data');
    }
    const data = await response.json();
    return data;
}

document.querySelector('#select-pokemon').addEventListener('change', async (event) => {
    let pokemon;
    const pokemonName = document.querySelector('#pokemon-name');
    try {
        pokemon = await fetchPokemon(event.target.value);
    } catch (error) {
        pokemonName.textContent = "Ups! I can't find the pokemon! Please, try again later!"
        console.error(error);
    }
    pokemonName.textContent = pokemon.name;
    const pokemonImg = document.querySelector('#pokemon-img');
    pokemonImg.src = pokemon.sprites.front_default;
    pokemonImg.classList.remove('d-none');
    
    document.querySelector('#pokemon-shiny').addEventListener('click', () => {
        pokemonImg.src = pokemon.sprites.front_shiny;
    })
})