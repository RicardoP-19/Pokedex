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
            <div class="card-info">
              <div class="pokemon-info">
                <h5>About</h5>
                <h5>Stats</h5>
                <h5>Evolution</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}


function returnSearchHTMLPokemon(index) {
  return /*html*/`
      <div class="card-animation bga_${searchPokemon[index].types[0]}">
        <div onclick="openOverlayCard(${index})" class="card">
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
            <div class="card-info">
              <div class="pokemon-info">
                <h5>About</h5>
                <h5>Stats</h5>
                <h5>Evolution</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}


function returnHTMLOverlayCard(index) {
  return /*html*/`
      <div><img onclick="nextCard(${index}, 1)" class="arrow" src="/assets/icons/left.png" /></div>
        <div class="card-overlay">
          <div class="card-content-overlay bgi_${allPokemons[index].types[0]}">
            <div class="card-head-overlay">
              <h2>${allPokemons[index].name}</h2>
              <span class="head-right">
                ${allPokemons[index].types.join(' ')}
              </span>
            </div>
            <div class="card-image-overlay">
              <img src="${allPokemons[index].image}" />
            </div>
            <div class="card-info-overlay">
              <div class="info-menu">
                <h3 onclick="openInfo(${index}, 1)">About</h3>
                <h3 onclick="openInfo(${index}, 2)">Stats</h3>
                <h3 onclick="openInfo(${index}, 3)">Evolution</h3>
              </div>
              <div class="info-content">
                <div id="about">
                  test
                </div>
                <div id="stats" class="d-none">
                  test2
                </div>
                <div id="evolution" class="d-none">
                  <img src="${allPokemons[index].firstEvolution}"/>
                  <img src="${allPokemons[index].secondEvolution}"/>
                  <img src="${allPokemons[index].lastEvolution}"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div><img onclick="nextCard(${index}, 2)" class="arrow" src="/assets/icons/right.png" /></div>
    `;
}