class DatosMunicipios {
    constructor() {
        this.datos = [];
    }

    cargarDatos(jsonData) {
        this.datos = jsonData;
    }

    obtenerRegiones() {
        return [...new Set(this.datos.map(item => item.region))];
    }

    obtenerDepartamentos() {
        return [...new Set(this.datos.map(item => item.departamento))];
    }

    filtrarDatos(region, departamento) {
        return this.datos.filter(item => {
            const regionMatch = region ? item.region === region : true;
            const departamentoMatch = departamento ? item.departamento === departamento : true;
            return regionMatch && departamentoMatch;
        });
    }
}
