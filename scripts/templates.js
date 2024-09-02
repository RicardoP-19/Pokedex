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