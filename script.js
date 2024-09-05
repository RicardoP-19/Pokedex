let allPokemons = [];
let searchPokemon = [];
let offset = 0;
let limit = 30;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;


function init() {
  fetchPokemonApi();
}


async function fetchPokemonApi() {
  try {
    let response = await fetch(BASE_URL);
    if (response.ok) {
     let responseAsJson = await response.json();
     await iteratePokemonJson(responseAsJson);
    };
  } catch (error) {
    console.error(error);    
  };
  offset += limit;
  BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
}


async function iteratePokemonJson(responseAsJson) {
  let pokemonsArray = responseAsJson.results;
  for (let index = 0; index < pokemonsArray.length; index++) {
    await pokemonFetchUrl(pokemonsArray[index].url);
  };
  renderPokemon();
}


async function pokemonFetchUrl(url) {
  try {
    let pokemonDetails = await fetch(url);
    let pokemonData = await pokemonDetails.json();
    pokemonDataUrl(pokemonData);
  } catch (error) {
    console.error(error);      
  };
}


function pokemonDataUrl(pokemonData) {
  let pokemonRenderInfo = {
    name : pokemonData.name,
    image : pokemonData.sprites.other['official-artwork'].front_default,
    types: pokemonData.types.map(typeInfo => typeInfo.type.name),
    // moves: pokemonData.moves.map(moveInfo => moveInfo.move.name),
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
  };
}


document.getElementById("searchPokemon").addEventListener("input", search);


function search() {
  let searchText = document.getElementById('searchPokemon').value;
  if (searchText.length >= 3) {
    searchPokemon = allPokemons.filter(element => element.name.includes(searchText));
    renderSearchPokemon();
  } if (searchText.length < 3) {
    inputValueMinize();
  }
}


function renderSearchPokemon() {
  let newSearchPokemon = document.getElementById('searchList');
  newSearchPokemon.innerHTML = '';
  for (let index = 0; index < searchPokemon.length; index++) {
    document.getElementById('mainSection').classList.add('d-none')
    document.getElementById('searchSection').classList.remove('d-none')
    newSearchPokemon.innerHTML += returnSearchHTMLPokemon(index);
  };
}


function backToStart() {
  newSearchPokemon = [];
  document.getElementById('searchPokemon').value = '';
  document.getElementById('searchSection').classList.add('d-none');
  document.getElementById('mainSection').classList.remove('d-none');
  renderPokemon();
}


function inputValueMinize() {
  newSearchPokemon = [];
  document.getElementById('searchSection').classList.add('d-none');
  document.getElementById('mainSection').classList.remove('d-none');
  renderPokemon();
}


function openOverlayCard(index) {
  let card = document.getElementById('overlayCard');
  document.getElementById('overlay').classList.remove('d-none');
  card.innerHTML = returnHTMLOverlayCard(index);
}


function nextCard(index, num) {
  if (num === 2) { 
    if (index < allPokemons.length - 1) {
      index++;
    } else {
      index = 0;
    }
  } else if (num === 1) {
    if (index <= 0) {
      index = allPokemons.length - 1;
    } else {
      index--;
    }
  }
  openOverlayCard(index)
}


function closeOverlay() {
  document.getElementById('overlay').classList.add('d-none');
}