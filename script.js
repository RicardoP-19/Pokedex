let allPokemons = [];

const BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`;


function init() {
  fetchPokemonApi();
}


async function fetchPokemonApi() {
  try {
    let response = await fetch(BASE_URL);
    if (response.ok) {
     let responseAsJson = await response.json();
     await iteratePokemonJson(responseAsJson);
    }
  } catch (error) {
    console.error(error);    
  }
}


async function iteratePokemonJson(responseAsJson) {
  let pokemonsArray = responseAsJson.results;
  for (let index = 0; index < pokemonsArray.length; index++) {
    if (allPokemons.length < pokemonsArray.length) {
      await pokemonFetchUrl(pokemonsArray[index].url);
    }
  };
  renderPokemon();
}


async function pokemonFetchUrl(url) {
  try {
    let pokemonDetails = await fetch(url);
    let pokemonData = await pokemonDetails.json();
    pokemonDataUrl(pokemonData);
  } catch (error) {
    console.log(error);      
  }
}


function pokemonDataUrl(pokemonData) {
  let pokemonRenderInfo = {
    name : pokemonData.name,
    image : pokemonData.sprites.other['official-artwork'].front_default,
    types: pokemonData.types.map(typeInfo => typeInfo.type.name),
    moves: pokemonData.moves.map(moveInfo => moveInfo.move.name),
  };
  pokemonAllInfos(pokemonRenderInfo);
}


function pokemonAllInfos(pokemonRenderInfo) {
  allPokemons.push(pokemonRenderInfo);
}


function renderPokemon() {
  let newPokemon = document.getElementById('pokemon');
  newPokemon.innerHTML = '';
  for (let index = 0; index < allPokemons.length; index++) {
    newPokemon.innerHTML += returnHTMLPokemon(index);
  }
}