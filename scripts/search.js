document.getElementById("searchPokemon").addEventListener("input", search);


function search() {
  let searchText = document.getElementById('searchPokemon').value;
  if (searchText.length >= 3) {
    searchPokemon = allPokemons.filter(element => element[0].name.includes(searchText));
    renderSearchPokemon();
  } if (searchText.length < 3) {
    inputValueMinize();
  }; 
  // document.getElementById('searchPokemon').value = '';
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


function inputValueMinize() {
  newSearchPokemon = [];
  document.getElementById('searchSection').classList.add('d-none');
  document.getElementById('mainSection').classList.remove('d-none');
  renderPokemon();
}