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
  setLimitHigh()
}


function setLimitHigh() {
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
    await speciesFetch(pokemonData);    
  } catch (error) {
    console.error(error);      
  };
}


async function speciesFetch(pokemonData) {
  // let url = pokemonData.species.url
  let id = pokemonData.id
  try {
    let evolutionDetails = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);        
    let pokemonEvolution = await evolutionDetails.json();
    await evolutionFetch(pokemonData, pokemonEvolution);
  } catch (error) {
    console.error(error); 
  }  
}


async function evolutionFetch(pokemonData, pokemonEvolution) {
  // let evolutionUrl = pokemonEvolution.evolution_chain.url;
  let evolutionUrl = pokemonEvolution.chain.species.url;
  try {
    let chainDetails = await fetch(evolutionUrl);
    let evolution = await chainDetails.json();
    await pokemonDataUrl(pokemonData, evolution);
  } catch (error) {
    console.error(error);
  }
}


function pokemonDataUrl(pokemonData, evolution) {
  let pokemonRenderInfo = {
    name : pokemonData.name,
    image : pokemonData.sprites.other['official-artwork'].front_default,
    evolution: evolution.evolution_chain.url,
    // species: pokemonEvolution.map(speciesInfo => pokemonEvolution.chain.evolves_to[i].species.url),  
    types: pokemonData.types.map(typeInfo => typeInfo.type.name),
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
  document.getElementById('header').classList.add('d-none');
  document.getElementById('mainSection').classList.add('d-none');
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
  document.getElementById('header').classList.remove('d-none');
  document.getElementById('mainSection').classList.remove('d-none');
}


function openInfo(index, num) {
  if (num == 1) {
    openAboutContent();
  } if (num == 2) {
    openStatsContent();
  } if (num == 3) {
    openEvolutionContent();
  };
}


function openAboutContent() {
  document.getElementById('about').classList.remove('d-none');
  document.getElementById('about').classList.add('box-animation');
  document.getElementById('stats').classList.add('d-none');
  document.getElementById('evolution').classList.add('d-none');
}


function openStatsContent() {
  document.getElementById('about').classList.add('d-none');
  document.getElementById('stats').classList.remove('d-none');
  document.getElementById('stats').classList.add('box-animation');
  document.getElementById('evolution').classList.add('d-none');
}


function openEvolutionContent() {
  document.getElementById('about').classList.add('d-none');
  document.getElementById('stats').classList.add('d-none');
  document.getElementById('evolution').classList.remove('d-none');
  document.getElementById('evolution').classList.add('box-animation');
}