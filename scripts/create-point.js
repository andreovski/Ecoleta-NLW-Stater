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
  citiesSelect.innerHTML = "";

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
