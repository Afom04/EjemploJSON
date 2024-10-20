class ControladorMunicipios {
  constructor() {
      // Variables del DOM
      this.buttonId = document.getElementById("filegGet");
      this.regionDropdown = document.getElementById("regionDropdown");
      this.departamentoDropdown = document.getElementById("departamentoDropdown");
      this.regionButton = document.getElementById("dropdownRegionButton");
      this.departamentoButton = document.getElementById("dropdownDeptButton");
      this.tableBody = document.querySelector("#jsonTable tbody");

      this.datosMunicipios = new DatosMunicipios(); // Instancia del modelo

      this.init();
  }

  init() {
      // Cargar datos desde el archivo JSON
      this.buttonId.addEventListener("change", (e) => this.cargarDatosDesdeArchivo(e));
  }

  cargarDatosDesdeArchivo(e) {
      e.preventDefault();
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
              try {
                  const jsonData = JSON.parse(e.target.result);
                  this.datosMunicipios.cargarDatos(jsonData); // Cargar datos en el modelo
                  this.cargarFiltros();
                  this.cargarTabla(); // Cargar la tabla inicialmente con todos los datos
              } catch (error) {
                  console.error("Error al procesar el archivo JSON:", error);
                  alert("El archivo no es un JSON válido.");
              }
          };
          reader.readAsText(file);
      }
  }

  cargarFiltros() {
      const regiones = this.datosMunicipios.obtenerRegiones();
      const departamentos = this.datosMunicipios.obtenerDepartamentos();

      // Limpiar dropdowns
      this.regionDropdown.innerHTML = '<li><a class="dropdown-item" href="#" data-value="">Todas</a></li>';
      this.departamentoDropdown.innerHTML = '<li><a class="dropdown-item" href="#" data-value="">Todos</a></li>';

      // Agregar regiones
      regiones.forEach((region) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.classList.add("dropdown-item");
          a.href = "#";
          a.textContent = region;
          a.dataset.value = region;
          li.appendChild(a);
          this.regionDropdown.appendChild(li);
      });

      // Agregar departamentos
      departamentos.forEach((departamento) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.classList.add("dropdown-item");
          a.href = "#";
          a.textContent = departamento;
          a.dataset.value = departamento;
          li.appendChild(a);
          this.departamentoDropdown.appendChild(li);
      });

      // Agregar eventos
      this.agregarEventosDropdown();
  }

  agregarEventosDropdown() {
      this.regionDropdown.querySelectorAll(".dropdown-item").forEach((item) => {
          item.addEventListener("click", (e) => {
              e.preventDefault();
              this.regionButton.textContent = item.textContent;
              this.regionButton.dataset.value = item.dataset.value;
              this.cargarTabla();
          });
      });

      this.departamentoDropdown.querySelectorAll(".dropdown-item").forEach((item) => {
          item.addEventListener("click", (e) => {
              e.preventDefault();
              this.departamentoButton.textContent = item.textContent;
              this.departamentoButton.dataset.value = item.dataset.value;
              this.cargarTabla();
          });
      });
  }

  cargarTabla() {
      const regionSeleccionada = this.regionButton.dataset.value;
      const departamentoSeleccionado = this.departamentoButton.dataset.value;

      const datosFiltrados = this.datosMunicipios.filtrarDatos(
          regionSeleccionada,
          departamentoSeleccionado
      );

      this.tableBody.innerHTML = ""; // Limpiar tabla

      datosFiltrados.forEach((item) => {
          const fila = document.createElement("tr");

          fila.innerHTML = `
              <td>${item.region}</td>
              <td>${item.c_digo_dane_del_departamento}</td>
              <td>${item.departamento}</td>
              <td>${item.c_digo_dane_del_municipio}</td>
              <td>${item.municipio}</td>
          `;

          this.tableBody.appendChild(fila);
      });
  }
}

// Instanciar el controlador al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const controlador = new ControladorMunicipios();
});
