function openOverlayCard(id) {
  let index = allPokemons.findIndex(pokemon => pokemon[0].id == id);
  let card = document.getElementById('overlayCard');
  document.getElementById('header').classList.add('d-none');
  document.getElementById('mainSection').classList.add('d-none');
  document.getElementById('searchSection').classList.add('d-none');
  document.getElementById('footer').classList.add('d-none');
  document.getElementById('overlay').classList.remove('d-none');
  card.innerHTML = returnHTMLOverlayCard(index);
  openMovesContent(index);  
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
  }; openOverlayCard(id);
}


function closeOverlay() {  
  document.getElementById('overlay').classList.add('d-none');
  document.getElementById('header').classList.remove('d-none');
  document.getElementById('mainSection').classList.remove('d-none');
  document.getElementById('footer').classList.remove('d-none');
}


function stopBubblingProtection(event) {
  event.stopPropagation();
}


function openInfo(index, num) {
  if (num == 1) {
    openMovesContent(index);
  } else if (num == 2) {
    openStatsContent(index);
  } else if (num == 3) {
    openEvolutionContent();
  };
}


function openMovesContent(index) {
  document.getElementById('moveInfo').classList.remove('d-none');
  document.getElementById('moveInfo').classList.add('box-animation');
  document.getElementById('stats').classList.add('d-none');
  document.getElementById('evolution').classList.add('d-none');
  renderMoves(index);
}


function renderMoves(index) {
  let movesContent = document.getElementById('moveInfo');
  movesContent.innerHTML = '';
  let movelist = allPokemons[index][0].moves; 
  if (movesContent) {
    for (let index = 0; index < movelist.length; index++) {
      let move = movelist[index];
      movesContent.innerHTML += returnHTMLrenderMoves(move);
    };
  };
}


function openStatsContent(index) {
  document.getElementById('moveInfo').classList.add('d-none');
  document.getElementById('evolution').classList.add('d-none');
  document.querySelector('.card-info-overlay').classList.remove('overflow');
  document.getElementById('stats').classList.remove('d-none');
  document.getElementById('stats').classList.add('box-animation');
  renderStats(index);
}


function renderStats(index) {  
  let statContent = document.getElementById('statsContent');
  statContent.innerHTML = '';
  let stats = allPokemons[index][0].stats;
  let base_stat = allPokemons[index][0].base_stat;
  let length = Math.min(stats.length, base_stat.length);
  if (statContent) {
    for (let i = 0; i < length; i++) {
      let statsName = stats[i];
      let baseNum = base_stat[i];
      statContent.innerHTML += returnHTMLrenderStats(statsName, baseNum);
    };
  };
} 


function openEvolutionContent() {
  document.getElementById('moveInfo').classList.add('d-none');
  document.getElementById('stats').classList.add('d-none');
  document.getElementById('evolution').classList.add('box-animation');
  document.getElementById('evolution').classList.remove('d-none');
}