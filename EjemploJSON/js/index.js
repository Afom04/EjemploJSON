const buttonId = document.getElementById("filegGet");
const regionDropdown = document.getElementById("regionDropdown");
const departamentoDropdown = document.getElementById("departamentoDropdown");
const regionButton = document.getElementById("dropdownRegionButton");
const departamentoButton = document.getElementById("dropdownDeptButton");

let jsonData = []; // Variable para almacenar los datos

buttonId.addEventListener("change", (e) => {
  e.preventDefault();
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      jsonData = JSON.parse(e.target.result);
      // Llenar los filtros de región y departamento
      cargarFiltros(jsonData);
      // Cargar la tabla con todos los datos
      cargarTabla(jsonData);
    };
    reader.readAsText(file);
  }
});

const cargarFiltros = (datos) => {
  const regiones = [...new Set(datos.map((item) => item.region))]; //Obtener valores no repetidos por medio de un set
  const departamentos = [...new Set(datos.map((item) => item.departamento))];

  // Limpiar los dropdowns
  regionDropdown.innerHTML =
    '<li><a class="dropdown-item" href="#" data-value="">Todas</a></li>';
  departamentoDropdown.innerHTML =
    '<li><a class="dropdown-item" href="#" data-value="">Todos</a></li>';

  // Agregar opciones de región
  regiones.forEach((region) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.classList.add("dropdown-item");
    a.href = "#";
    a.textContent = region;
    a.dataset.value = region;
    li.appendChild(a);
    regionDropdown.appendChild(li);
  });

  // Agregar opciones de departamento
  departamentos.forEach((departamento) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.classList.add("dropdown-item");
    a.href = "#";
    a.textContent = departamento;
    a.dataset.value = departamento;
    li.appendChild(a);
    departamentoDropdown.appendChild(li);
  });

  // Agregar eventos de selección a los dropdowns
  agregarEventosDropdown();
};

const agregarEventosDropdown = () => {
  document
    .querySelectorAll("#regionDropdown .dropdown-item")
    .forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        regionButton.textContent = this.textContent; // Cambiar el texto del botón
        regionButton.dataset.value = this.dataset.value;
        cargarTabla(jsonData); // Recargar la tabla con el filtro
      });
    });

  document
    .querySelectorAll("#departamentoDropdown .dropdown-item")
    .forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        departamentoButton.textContent = this.textContent; // Cambiar el texto del botón
        departamentoButton.dataset.value = this.dataset.value;
        cargarTabla(jsonData); // Recargar la tabla con el filtro
      });
    });
};

const cargarTabla = (datos) => {
  const tableBody = document.querySelector("#jsonTable tbody");
  tableBody.innerHTML = ``;

  // Filtrar por región y departamento
  const regionSeleccionada = regionButton.dataset.value;
  const departamentoSeleccionado = departamentoButton.dataset.value;

  const datosFiltrados = datos.filter((item) => {
    const coincideRegion = regionSeleccionada
      ? item.region === regionSeleccionada
      : true;
    const coincideDepartamento = departamentoSeleccionado
      ? item.departamento === departamentoSeleccionado
      : true;
    return coincideRegion && coincideDepartamento;
  });

  // Mostrar los datos filtrados en la tabla
  datosFiltrados.forEach((item) => {
    const fila = document.createElement(`tr`);

    const region = document.createElement(`td`);
    region.textContent = item.region;
    fila.appendChild(region);

    const codigoDaneDept = document.createElement(`td`);
    codigoDaneDept.textContent = item.c_digo_dane_del_departamento;
    fila.appendChild(codigoDaneDept);

    const departamento = document.createElement(`td`);
    departamento.textContent = item.departamento;
    fila.appendChild(departamento);

    const codigoDaneMun = document.createElement(`td`);
    codigoDaneMun.textContent = item.c_digo_dane_del_municipio;
    fila.appendChild(codigoDaneMun);

    const municipio = document.createElement(`td`);
    municipio.textContent = item.municipio;
    fila.appendChild(municipio);

    tableBody.appendChild(fila);
  });
};
