function returnHTMLPokemon(index) {
  return /*html*/`
      <div class="card-animation bga_${allPokemons[index][0].types[0]}">
        <div onclick="openOverlayCard(${allPokemons[index][0].id})" class="card">
          <div class="card-content bgi_${allPokemons[index][0].types[0]}">
            <div class="card-head d-all-center width">
              <h3>${allPokemons[index][0].name}</h3>
              <span class="head-right">
                ${allPokemons[index][0].types.join(' ')}
              </span>
            </div>
            <div class="card-image d-flex">
              <img src="${allPokemons[index][0].image}"/>
            </div>
            <div class="card-info">
              <div class="pokemon-info d-flex height">
                <h5>Moves</h5>
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
            <div class="card-head d-all-center width">
              <h3>${searchPokemon[index][0].name}</h3>
              <span class="head-right">
                ${searchPokemon[index][0].types.join(' ')}
              </span>
            </div>
            <div class="card-image d-flex">
              <img src="${searchPokemon[index][0].image}"/>
            </div>
            <div class="card-info">
              <div class="pokemon-info d-flex height">
                <h5>Moves</h5>
                <h5>Stats</h5>
                <h5>Evolution</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}


function returnHTMLnoFoundPokemon() {
  return /*html*/ `
      <div class="no-found-info height d-flex">
        <div class="d-all-center">
          <img class="image" src="/assets/img/pokemon-title.png">
        </div>
        <div>
        <p>No Found</p>
        </div>
      </div>
      <div class="btn-container">
        <button onclick="backToStart()">Back To Start</button>
      </div>
  `;
}

function returnHTMLOverlayCard(index) {
  return /*html*/`
      <img class="arrow-left" onclick="nextCard(${allPokemons[index][0].id}, 1)" src="/assets/icons/left.png" />
        <div class="card-overlay">
          <div class="card-content-overlay bgi_${allPokemons[index][0].types[0]}">
            <div class="card-head-overlay d-flex width">
              <h2>${allPokemons[index][0].name}</h2>
              <span class="head-right">
                ${allPokemons[index][0].types.join(' ')}
              </span>
            </div>
            <div class="card-image-overlay">
              <img src="${allPokemons[index][0].image}"/>
            </div>
            <div class="card-weight-height d-flex width">
              <span>Weight: ${allPokemons[index][0].weight}</span>
              <span>Height: ${allPokemons[index][0].height}</span>
            </div>
            <div class="card-info-overlay height">
              <div class="info-menu d-flex">
                <h3 onclick="openInfo(${index}, 1)">Moves</h3>
                <h3 onclick="openInfo(${index}, 2)">Stats</h3>
                <h3 onclick="openInfo(${index}, 3)">Evolution</h3>
              </div>
              <div class="info-content">
                <div id="moveInfo" class="moves-content box-animation">
                </div>
                <div id="stats" class="d-none">
                  <div id="statsContent" class="d-all-center">                    
                  </div>
                </div>
                <div id="evolution" class="d-none">
                  <div class="d-all-center">
                    <img src="${allPokemons[index][1][0]}">
                    <img class="arrow-evo" src="/assets/icons/arrow.png">
                    <img src="${allPokemons[index][1][1]}">
                    <img class="arrow-evo" src="/assets/icons/arrow.png">
                    <img src="${allPokemons[index][1][2]}">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <img class="arrow-right" onclick="nextCard(${allPokemons[index][0].id}, 2)" src="/assets/icons/right.png" />
    `;
}


function returnHTMLrenderMoves(move) {
  return /*html*/ `
        <div class="move d-all-center">
          <p>${move}</p>
        </div>
  `;
}


function returnHTMLrenderStats(statsName, baseNum) {
  return /*html*/ `
      <div class="stats-div width d-flex">
        <div class="stats-name">                   
          <span>${statsName}</span>
        </div>
        <div class="progressbar-container width d-flex">
          <div class="progressbar" style="width: ${baseNum}%;">
            <span class="progress-text">${baseNum}</span>
          </div>
        </div>
      </div>
  `;
}