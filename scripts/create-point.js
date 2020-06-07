function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  const apiStates = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome";

  fetch(apiStates)
    .then(response => response.json())
    .then(states => {
      for(state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUFs();


function getCities(event) {
  const citiesSelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  citiesSelect.disabled = true;
  citiesSelect.innerHTML = "<option value='0'>Selecionar a cidade</option>`";

  const apiMunicipios = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`;

  fetch(apiMunicipios)
  .then(response => response.json())
  .then(cities => {
    for(city of cities) {
      citiesSelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
    }

    citiesSelect.disabled = false;
  })

}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities);


const itemsToCollect = document.querySelectorAll(".items-grid li");
const collectedItems = document.querySelector('input[name=items]');

var selectedItems = [];

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

//
function handleSelectedItem(event) {
  const itemLi = event.target

  // Adicionando ou removendo class selected
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex(item => item === itemId);

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item => {
      const itemIsDiferent = item != itemId;

      return itemIsDiferent
    })

    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }

  collectedItems.value = selectedItems;
}