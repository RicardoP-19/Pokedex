function returnHTMLPokemon(index) {
  return /*html*/`
      <div class="card-animation bga_${allPokemons[index].types[0]}">
        <div onclick="openOverlayCard(${index})" class="card">
          <div class="card-content bgi_${allPokemons[index].types[0]}">
            <div class="card-head">
              <h2>${allPokemons[index].name}</h2>
              <span class="head-right">
                ${allPokemons[index].types.join(' ')}
              </span>
            </div>
            <div class="card-image">
              <img src="${allPokemons[index].image}"/>
            </div>
          </div>
        </div>
      </div>
    `;
}


function returnSearchHTMLPokemon(index) {
  return /*html*/`
      <div class="card-animation bga_${searchPokemon[index].types[0]}">
        <div class="card">
          <div class="card-content bgi_${searchPokemon[index].types[0]}">
            <div class="card-head">
              <h3>${searchPokemon[index].name}</h3>
              <span class="head-right">
                ${searchPokemon[index].types.join(' ')}
              </span>
            </div>
            <div class="card-image">
              <img src="${searchPokemon[index].image}"/>
            </div>
          </div>
        </div>
      </div>
    `;
}


function returnHTMLOverlayCard(index) {
  return /*html*/`
      <div><img onclick="nextCard(${index}, 1)" src="/assets/icons/left.png" /></div>
        <div>
          <div class="card">
            <div class="card-content bgi_${allPokemons[index].types[0]}">
              <div class="card-head">
                <h2>${allPokemons[index].name}</h2>
                <span class="head-right">
                  ${allPokemons[index].types.join(' ')}
                </span>
              </div>
              <div class="card-image">
                <img src="${allPokemons[index].image}" />
              </div>
              <div class="card-infos">
     
              </div>
            </div>
          </div>
        </div>
        <div><img onclick="nextCard(${index}, 2)" src="/assets/icons/right.png" /></div>
      </div>
    `;
}