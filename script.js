// Array para almacenar servicios JSON
let servicios = []; 

// Array carro de compras
let carro = []; 

// Porcentaje de descuento
let descuento = 0;

// Elementos del DOM
const tablaServicios = document.querySelector("#tabla-servicios tbody");
const listaCarro = document.querySelector("#lista-carro");
const totalCarro = document.querySelector("#total");
const filtroNombre = document.querySelector("#filtro-nombre");
const filtroPrecioMin = document.querySelector("#filtro-precio-min");
const filtroPrecioMax = document.querySelector("#filtro-precio-max");
const filtrosCategoria = document.querySelectorAll("input[type=checkbox]");
const btnFiltrar = document.querySelector("#aplicar-filtros");
const inputCupon = document.querySelector("#input-cupon");
const btnAplicarCupon = document.querySelector("#aplicar-cupon");

// Renderizar servicios en la tabla
function renderizarServicios(lista = servicios) {
    tablaServicios.innerHTML = ""; // Limpia la tabla
    lista.forEach((servicio, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${servicio.nombre}</td>
            <td>${servicio.categoria}</td>
            <td>$${servicio.precio}</td>
            <td><button data-index="${index}" class="btn-agregar">Agregar</button></td>
        `;
        tablaServicios.appendChild(row);
    });

    // Agrega eventos a los botones "Agregar"
    document.querySelectorAll(".btn-agregar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            agregarAlCarro(index);
        });
    });
}

// Renderiza carro de compras
function renderizarCarro() {
    listaCarro.innerHTML = ""; // Limpiar carro de compras
    carro.forEach((servicio, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${servicio.nombre} - $${servicio.precio}
            <button data-index="${index}" class="btn-eliminar">Eliminar</button>
        `;
        listaCarro.appendChild(li);
    });

    // Agrega eventos para eliminar servicios del carro
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            eliminarDelCarro(index);
        });
    });

    // Actualización total del carro con descuento aplicado
    const totalSinDescuento = carro.reduce((sum, servicio) => sum + servicio.precio, 0);
    const totalConDescuento = totalSinDescuento - (totalSinDescuento * (descuento / 100));
    totalCarro.textContent = totalConDescuento.toFixed(2);
}

// Agrega servicios al carro de compras
function agregarAlCarro(index) {
    const servicio = servicios[index];
    carro.push(servicio);
    renderizarCarro();

    // Notificación de servicio agregado
    Swal.fire({
        title: '¡Servicio Agregado!',
        text: `${servicio.nombre} ha sido añadido al carro de compras.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
}

// Elimina un servicio del carro
function eliminarDelCarro(index) {
    const servicio = carro[index];
    carro.splice(index, 1);
    renderizarCarro();

    //Notificación eliminación de servicio
    Swal.fire({
        title: 'Servicio Eliminado',
        text: `${servicio.nombre} ha sido eliminado del carro de compras.`,
        icon: 'info',
        timer: 1500,
        showConfirmButton: false
    });
}

// Aplicación de filtros Nombre, precio min y/o precio max
function aplicarFiltros() {
    const nombre = filtroNombre.value.toLowerCase();
    const precioMin = parseInt(filtroPrecioMin.value) || 0;
    const precioMax = parseInt(filtroPrecioMax.value) || Infinity;
    const categoriasSeleccionadas = Array.from(filtrosCategoria)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const serviciosFiltrados = servicios.filter(servicio =>
        servicio.nombre.toLowerCase().includes(nombre) &&
        servicio.precio >= precioMin &&
        servicio.precio <= precioMax &&
        (categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(servicio.categoria))
    );

    renderizarServicios(serviciosFiltrados);
}

// Aplicación cupón de descuento
function aplicarCupon() {
    const cupon = inputCupon.value.trim().toUpperCase();
    if (cupon === "MATRIMONIO10") {
        descuento = 10;

        // Notificación cupón aplicado
        Swal.fire({
            title: '¡Cupón Aplicado!',
            text: 'Se ha aplicado un 10% de descuento a tu compra.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    } else {
        descuento = 0;

        // Notificación error cupón inválido
        Swal.fire({
            title: 'Cupón Inválido',
            text: 'El código ingresado no es válido.',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false
        });
    }
    renderizarCarro();
}

// Confirmación compra
function finalizarCompra() {
    if (carro.length === 0) {
        // Notificación Carro de compra vacío
        Swal.fire({
            title: 'Carro Vacío',
            text: 'Agrega servicio para finalizar la compra.',
            icon: 'warning',
            timer: 1500,
            showConfirmButton: false
        });
    } else {
        // Notificación Compra finalizada
        Swal.fire({
            title: '¡Compra Confirmada!',
            text: 'Gracias por preferirnos',
            icon: 'success'
        });

        // Vacia carro de compra
        carro = [];
        descuento = 0;
        renderizarCarro();
    }
}

// Botón finalizar compra
const btnFinalizarCompra = document.createElement("button");
btnFinalizarCompra.textContent = "Finalizar Compra";
btnFinalizarCompra.addEventListener("click", finalizarCompra);
document.getElementById("carro-compra").appendChild(btnFinalizarCompra);

// Carga de servicios desde JSON
fetch("servicios.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar los servicios");
        }
        return response.json();
    })
    .then(data => {
        servicios = data; // Guardar servicios
        renderizarServicios(); // Renderiza servicios
    })
    .catch(error => {
        console.error("Error al cargar los datos:", error);
    });

// Inicialización filtros y eventos
btnFiltrar.addEventListener("click", aplicarFiltros);
btnAplicarCupon.addEventListener("click", aplicarCupon);
