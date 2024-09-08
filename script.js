let allPokemons = [];
let searchPokemon = [];
let pokemonObjekt = [];
let evolutionUrls = [];
let evolutionImage = [];
let offset = 0;
let limit = 5;
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


async function pokemonFetchUrl(url) { //es wird jeder index gefetcht jedes mal enstehen 3 bilder
  try {
    let pokemonDetails = await fetch(url);
    let pokemonData = await pokemonDetails.json();
    pokemonObjekt.push(pokemonData);
    await speciesFetch(pokemonData); 
  } catch (error) {
    console.error(error);      
  }; 
}


async function speciesFetch(pokemonData) {
  let url = pokemonData.species.url;
  try {
    let evolutionDetails = await fetch(url);      
    let pokemonEvolutionUrl = await evolutionDetails.json();
    let chainUrl = await fetch(pokemonEvolutionUrl.evolution_chain.url)
    let pokemonEvolution = await chainUrl.json();
    evolutionUrlsPushToArray(pokemonEvolution)
  } catch (error) {
    console.error(error); 
  }  
}


function evolutionUrlsPushToArray(pokemonEvolution) {
  let firstEvolution = pokemonEvolution.chain.species.url;
  evolutionUrls.push(firstEvolution);
  if (pokemonEvolution.chain.evolves_to.length > 0) {
    let secondEvolution = pokemonEvolution.chain.evolves_to[0].species.url;
    evolutionUrls.push(secondEvolution);
    if (pokemonEvolution.chain.evolves_to[0].evolves_to.length > 0) {
      let lastEvolution = pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.url;
      evolutionUrls.push(lastEvolution);
    }
  }
  urlFetch();
}


async function urlFetch() {
  for (let index = 0; index < evolutionUrls.length; index++) {
    let url = evolutionUrls[index];
    try {
      response = await fetch(url);
      responseToJson = await response.json();
      let responseTwo = await fetch(responseToJson.varieties[0].pokemon.url);
      let responseTeJson = await responseTwo.json();
      let image = responseTeJson.sprites.other['official-artwork'].front_default;
      evolutionImage.push(image);
      } catch (error) {
        console.error(error);
    };    
  };
  pokemonDataUrl();
}


function pokemonDataUrl() {
  let pokemonInfo = pokemonObjekt;
  let pokemonRenderInfo = {
    name : pokemonInfo[0].name,
    image : pokemonInfo[0].sprites.other['official-artwork'].front_default,
    types: pokemonInfo[0].types.map(typeInfo => typeInfo.type.name),
    stats: pokemonInfo[0].stats.map(statsInfo => statsInfo.stat.name),
    base_stat: pokemonInfo[0].stats.map(statsInfo => statsInfo.base_stat)
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
  document.getElementById('searchSection').classList.add('d-none');
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