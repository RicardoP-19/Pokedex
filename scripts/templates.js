function returnHTMLPokemon(index) {
  return /*html*/`
      <div class="card-animation">
        <div class="card">
          <div class="card-content">
            <div class="card-head">
              <h3>${allPokemons[index].name}</h3>
              <span class="head-right">
                ${allPokemons[index].types}
              </span>
            </div>
            <div class="card-image">
              <img src="${allPokemons[index].image}"/>
            </div>
            <div class="card-infos">
              <div class="card-typ">
                <span>Types</span>
              </div>
              <!-- ${allPokemons[index].moves} -->
              <!-- ${allPokemons[index].specis} -->
            </div>
          </div>
        </div>
      </div>
    `;
}


function returnSearchHTMLPokemon(index) {
  return /*html*/`
      <div class="card-animation">
        <div class="card">
          <div class="card-content">
            <div class="card-head">
              <h3>${searchPokemon[index].name}</h3>
              <span class="head-right">
                ${searchPokemon[index].types}
              </span>
            </div>
            <div class="card-image">
              <img src="${searchPokemon[index].image}"/>
            </div>
            <div class="card-infos">
              <div class="card-typ">
                <span>Types</span>
              </div>
              <!-- ${searchPokemon[index].moves} -->
              <!-- ${searchPokemon[index].specis} -->
            </div>
          </div>
        </div>
      </div>
    `;
}