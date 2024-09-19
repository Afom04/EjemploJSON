const buttonId = document.getElementById("filegGet");

buttonId.addEventListener("change", (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const jsonData = JSON.parse(e.target.result);
            console.log(jsonData);
            //Cargando data al HTML
            cargarTabla(jsonData);
        };
        reader.readAsText(file);
    }
});

const cargarTabla = (datos) => {
    const tableBody = document.querySelector("#jsonTable tbody");
    tableBody.innerHTML = ``;
    datos.forEach((item) => {
        const fila = document.createElement(`tr`);

        const datoNombre = document.createElement(`td`);
        datoNombre.textContent = item.nombre;
        fila.appendChild(datoNombre);

        const datoEdad = document.createElement(`td`);
        datoEdad.textContent = item.edad;
        fila.appendChild(datoEdad);

        const datoEmail = document.createElement(`td`);
        datoEmail.textContent = item.email;
        fila.appendChild(datoEmail);

        tableBody.appendChild(fila);
    })
};