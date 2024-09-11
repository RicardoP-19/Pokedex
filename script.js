let allPokemons = [];
let searchPokemon = [];
let pokemonInfos = [];
let evolutionImages = [];
let offset = 0;
let limit = 30;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;


function init() {
  fetchPokemonApi();
}


async function fetchPokemonApi() {
  startLoader();
  try {
    let response = await fetch(BASE_URL);
    if (response.ok) {
     let responseAsJson = await response.json();
     await iteratePokemonJson(responseAsJson);
    };
  } catch (error) {
    console.error(error);    
  };
  setLimitHigh();
  loaderEnd();
  renderPokemon();
}


function startLoader() {
  document.getElementById('loading').classList.remove('d-none');
  document.body.style.display = 'flex';
  document.getElementById('mainSection').classList.add('d-none');
}


function loaderEnd() {
  document.getElementById('loading').classList.add('d-none');
  document.body.style.display = 'block';
  document.getElementById('mainSection').classList.remove('d-none');
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
}


async function pokemonFetchUrl(url) {
  try {
    let pokemonDetails = await fetch(url);
    let pokemonData = await pokemonDetails.json();
    pokemonDataUrl(pokemonData);
    await speciesFetch(pokemonData);
    pushEvolution();
  } catch (error) {
    console.error(error);      
  };
}


async function pokemonDataUrl(pokemonData) {
  let pokemonRenderInfo = {
    id: pokemonData.id,
    name : pokemonData.name,
    image : pokemonData.sprites.other['official-artwork'].front_default,
    types: pokemonData.types.map(typeInfo => typeInfo.type.name),
    stats: pokemonData.stats.map(statsInfo => statsInfo.stat.name),
    base_stat: pokemonData.stats.map(statsInfo => statsInfo.base_stat),
  };
  pokemonInfos.push(pokemonRenderInfo); 
}


async function speciesFetch(pokemonData) {
  let url = pokemonData.species.url;
  try {
    let evolutionDetails = await fetch(url);      
    let pokemonEvolutionUrl = await evolutionDetails.json();
    await chainFetchUrls(pokemonEvolutionUrl);
  } catch (error) {
    console.error(error); 
  }  
}


async function chainFetchUrls(pokemonEvolutionUrl) {
  try {
    let chainResponse = await fetch(pokemonEvolutionUrl.evolution_chain.url);
    let chainData = await chainResponse.json();
    await evolutionUrls(chainData);
  } catch (error) {
    console.error(error);    
  };
}


async function evolutionUrls(chainData) {
  try {
    await firstSpeciesUrl(chainData);
    await secondSpeciesUrl(chainData);
    await lastSpeciesUrl(chainData);
    } catch (error) {
    console.error(error);    
  };
}


async function firstSpeciesUrl(chainData) {
  if (chainData.chain.species.url) {
    let speciesUrl = chainData.chain.species.url;
    await fetchPokemonImage(speciesUrl);
  };
}


async function secondSpeciesUrl(chainData) {
  if (chainData.chain.evolves_to.length > 0) {
    let speciesUrl = chainData.chain.evolves_to[0].species.url;
    await fetchPokemonImage(speciesUrl);
  };
}


async function lastSpeciesUrl(chainData) {
  if (chainData.chain.evolves_to[0].evolves_to.length > 0) {
    let speciesUrl = chainData.chain.evolves_to[0].evolves_to[0].species.url;
    await fetchPokemonImage(speciesUrl);
  };
}


async function fetchPokemonImage(speciesUrl) {
  try {
    let speciesResponse = await fetch(speciesUrl);
    let speciesData = await speciesResponse.json();
    let pokemonId = speciesData.id;
    let pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
    let pokemonData = await pokemonResponse.json();
    let pokemonImage = pokemonData.sprites.other['official-artwork'].front_default;
    evolutionImages.push(pokemonImage);
  } catch (error) {
    console.error(error);
  };
}


function pushEvolution() {
  let evolution = evolutionImages
  pokemonInfos.push(evolution);  
  evolutionImages = [];  
  pokemonpush();
}


function pokemonpush() {
  let pokemon = pokemonInfos;
  allPokemons.push(pokemon);
  pokemonInfos = [];
}


function renderPokemon() {
  let newPokemon = document.getElementById('pokemon');
  newPokemon.innerHTML = '';
  for (let index = 0; index < allPokemons.length; index++) {
    newPokemon.innerHTML += returnHTMLPokemon(index);
  };
}