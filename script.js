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
    pokemonDataUrl(pokemonData);
    await speciesFetch(pokemonData);
    pushEvolution();
  } catch (error) {
    console.error(error);      
  };
}


async function pokemonDataUrl(pokemonData) {
  // let pokemonId = pokemonData.id
  let pokemonRenderInfo = {
    id: pokemonData.id,
    name : pokemonData.name,
    image : pokemonData.sprites.other['official-artwork'].front_default,
    types: pokemonData.types.map(typeInfo => typeInfo.type.name),
    stats: pokemonData.stats.map(statsInfo => statsInfo.stat.name),
    base_stat: pokemonData.stats.map(statsInfo => statsInfo.base_stat),
  };
  // pokemonInfos.push(pokemonId, pokemonRenderInfo);  
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
  if (chainData.chain.species.url) {
    let speciesUrl = chainData.chain.species.url;
    await fetchPokemonImage(speciesUrl);

    if (chainData.chain.evolves_to.length > 0) {
      let speciesUrl = chainData.chain.evolves_to[0].species.url;
      await fetchPokemonImage(speciesUrl);
    
      if (chainData.chain.evolves_to[0].evolves_to.length > 0) {
        let speciesUrl = chainData.chain.evolves_to[0].evolves_to[0].species.url;
        await fetchPokemonImage(speciesUrl);
      };
    };
  };
  } catch (error) {
    console.error(error);    
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
  }
}


function pushEvolution() {
  let evolution = evolutionImages
  pokemonInfos.push(evolution);  
  evolutionImages = [];  
  pokemonpush();
}


function pokemonpush() {
  let pokemon = pokemonInfos;
  allPokemons.push(pokemon)
  // searchPokemon.push(pokemon)
  pokemonInfos = [];
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
    searchPokemon = allPokemons.filter(element => element[0].name.includes(searchText));
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


function openOverlayCard(id) {
  let index = allPokemons.findIndex(pokemon => pokemon[0].id == id);
  let card = document.getElementById('overlayCard');
  document.getElementById('header').classList.add('d-none');
  document.getElementById('mainSection').classList.add('d-none');
  document.getElementById('searchSection').classList.add('d-none');
  document.getElementById('overlay').classList.remove('d-none');
  card.innerHTML = returnHTMLOverlayCard(index);  
}


function nextCard(id, num) {
  if (num === 2) { 
    if (id < allPokemons.length) {
      id++;
    } else {
      id = 1;
    }
  } else if (num === 1) {
    if (id <= 1) {
      id = allPokemons.length;
    } else {
      id--;
    }
  };  
  openOverlayCard(id)
}


function closeOverlay() {  
  document.getElementById('overlay').classList.add('d-none');
  document.getElementById('header').classList.remove('d-none');
  document.getElementById('mainSection').classList.remove('d-none');
}


function stopBubblingProtection(event) {
  event.stopPropagation();
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