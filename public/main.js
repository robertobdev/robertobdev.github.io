loadJSON().then(data => {
  //Criando variáves para facilitar os calculos da table
  let containerHeight = 300;
  let trHeight = 30;
  let totalRows = data.length;

  //fim
  let tbody = document.getElementById("tbody");
  let scrollDiv = document.getElementById("scroll");
  let containerDiv = document.getElementById("container");
  //Variáveis de inicialização do componente
  let lastScrolled = 0;
  let maxRows = (containerHeight / trHeight) * 20;
  //Criando tabela com os elementos permitidos
  createAllRows(tbody, maxRows);
  renderRows(tbody, 0, maxRows);
  let maxScroll = containerHeight;
  let lastScrollChange;
  //fim
  //Alterando tamanho do scroll compatível com o tamanho total das trs
  scrollDiv.style.height = (totalRows * trHeight) + "px";

  debug();

  //Função que observa o evento de scroll e monta novos valores
  containerDiv.addEventListener('scroll', scrolling);
  function scrolling(e) {
    e.preventDefault();
    let scroll = e.target.scrollTop;
    if (!lastScrollChange || Math.abs(scroll - lastScrollChange) > maxScroll) {
      let startAt = parseInt(scroll / trHeight) - (containerHeight / trHeight);

      renderRows(tbody, startAt < 0 ? 0 : startAt, maxRows);
      lastScrollChange = scroll;
    }
  }
  //Função que sobrescreve as trs 
  function renderRows(tbody, startAt, maxRows) {
    let finalItem = startAt + maxRows;

    if (finalItem > totalRows) {
      finalItem = totalRows;
    }

    let arrayData = [];

    for (let i = startAt; i < finalItem; i++) {
      arrayData.push({ data: data[i], startAt: i });
    }

    for (let i = 0; i < maxRows; i++) {
      let tr = document.getElementById(i);
      let td = tr.getElementsByTagName("td")[0];
      if (arrayData[i]) {
        td.innerHTML = arrayData[i].data.company;
        tr.style.top = (arrayData[i].startAt * trHeight) + 'px';
      }
    }
  }
  //Função que cria todas das tr uma unica vez
  function createAllRows(tbody, maxRows) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < maxRows; i++) {
      let tr = document.createElement('tr');
      let td = document.createElement('td');
      tr.appendChild(td);
      tr.style.position = 'absolute';
      tr.style.top = (i * trHeight) + 'px';
      tr.id = i;
      tr.style.width = "249px";
      fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
  }

  function debug() {
    let debug = document.getElementById('debug');
    let trLenght = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    debug.innerHTML = "";
    debug.append("Quantidades de rows no DOM: " + trLenght);
  }
});


function loadJSON() {
  return fetch("dados.json")
    .then(response => response.json());
}