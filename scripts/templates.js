function returnHTMLPokemon(index) {
  return /*html*/`
      <div class="card-animation bga_${allPokemons[index][0].types[0]}">
        <div onclick="openOverlayCard(${allPokemons[index][0].id})" class="card">
          <div class="card-content bgi_${allPokemons[index][0].types[0]}">
            <div class="card-head">
              <h2>${allPokemons[index][0].name}</h2>
              <span class="head-right">
                ${allPokemons[index][0].types.join(' ')}
              </span>
            </div>
            <div class="card-image">
              <img src="${allPokemons[index][0].image}"/>
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
      <div class="card-animation bga_${searchPokemon[index][0].types[0]}">
        <div onclick="openOverlayCard(${searchPokemon[index][0].id})" class="card">
          <div class="card-content bgi_${searchPokemon[index][0].types[0]}">
            <div class="card-head">
              <h3>${searchPokemon[index][0].name}</h3>
              <span class="head-right">
                ${searchPokemon[index][0].types.join(' ')}
              </span>
            </div>
            <div class="card-image">
              <img src="${searchPokemon[index][0].image}"/>
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
      <div><img onclick="nextCard(${allPokemons[index][0].id}, 1)" class="arrow d-flex" src="/assets/icons/left.png" /></div>
        <div class="card-overlay">
          <div class="card-content-overlay bgi_${allPokemons[index][0].types[0]}">
            <div class="card-head-overlay">
              <h2>${allPokemons[index][0].name}</h2>
              <span class="head-right">
                ${allPokemons[index][0].types.join(' ')}
              </span>
            </div>
            <div class="card-image-overlay">
              <img src="${allPokemons[index][0].image}"/>
            </div>
            <div class="card-weight-height d-flex width text-Color">
              <span>Weight: ${allPokemons[index][0].weight}</span>
              <span>Height: ${allPokemons[index][0].height}</span>
            </div>
            <div class="card-info-overlay">
              <div class="info-menu">
                <h3 onclick="openInfo(${index}, 1)">About</h3>
                <h3 onclick="openInfo(${index}, 2)">Stats</h3>
                <h3 onclick="openInfo(${index}, 3)">Evolution</h3>
              </div>
              <div class="info-content">
                <div id="about">
                  <div class="d-all-center">
                  test
                  </div>
                </div>
                <div id="stats" class="d-none">
                  <div class="d-all-center">
                    <div class="text-Color">
                      <div>
                       <span>${allPokemons[index][0].stats}</span>
                      </div>
                      <div class="progressbar-container">
                        <div class="progressbar">
                          <span class="percentage" >${allPokemons[index][0].base_stat}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="evolution" class="d-none">
                  <div class="d-all-center">
                    <img src="${allPokemons[index][1][0]}">
                    <img class="arrow-evo" src="/assets/icons/right.png">
                    <img src="${allPokemons[index][1][1]}">
                    <img class="arrow-evo" src="/assets/icons/right.png">
                    <img src="${allPokemons[index][1][2]}">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div><img onclick="nextCard(${allPokemons[index][0].id}, 2)" class="arrow d-flex" src="/assets/icons/right.png" /></div>
    `;
}