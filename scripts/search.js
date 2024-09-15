document.getElementById("searchPokemon").addEventListener("input", search);


function search() {
  let searchText = document.getElementById('searchPokemon').value;
  let result = searchText.toLowerCase()
  if (result.length >= 3) {
    foundPokemon(result);
  } else {
    inputValueMinize();
    };
}


function foundPokemon(result) {
  searchPokemon = allPokemons.filter(element => element[0].name.includes(result));  
  if (searchPokemon.length) {
    renderSearchPokemon();    
  } else { 
    if (searchPokemon.length == 0) {
      noFoundPokemon();
    };
  };
  document.getElementById('searchPokemon').value = '';
}



function noFoundPokemon() {
  let newSearchPokemon = document.getElementById('noFound');
  newSearchPokemon.innerHTML = '';
  document.getElementById('mainSection').classList.add('d-none');
  document.getElementById('searchSection').classList.remove('d-none');
  document.getElementById('searchList').classList.add('d-none');
  document.getElementById('backBtn').classList.add('d-none');
  document.getElementById('noFound').classList.remove('d-none');
  newSearchPokemon.innerHTML = returnHTMLnoFoundPokemon();
}


function inputValueMinize() {
  newSearchPokemon = [];
  document.getElementById('searchSection').classList.add('d-none');
  document.getElementById('mainSection').classList.remove('d-none');
  document.getElementById('searchList').classList.remove('d-none');
  document.getElementById('backBtn').classList.remove('d-none');
  document.getElementById('noFound').classList.add('d-none');
  renderPokemon();
}


function renderSearchPokemon() {
  let newSearchPokemon = document.getElementById('searchList');
  newSearchPokemon.innerHTML = '';
  for (let index = 0; index < searchPokemon.length; index++) {
    document.getElementById('mainSection').classList.add('d-none');
    document.getElementById('searchSection').classList.remove('d-none');
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