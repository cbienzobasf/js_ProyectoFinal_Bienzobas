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

// Renderizar carro de compras
function renderizarCarro() {
    listaCarro.innerHTML = "";
    carro.forEach((servicio, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${servicio.nombre} - $${servicio.precio}
            <button data-index="${index}" class="btn-eliminar">Eliminar</button>
        `;
        listaCarro.appendChild(li);
    });

    // Agregar eventos para eliminar servicios
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            eliminarDelCarro(index);
        });
    });

    // Actualizar el total del carrito
    const totalSinDescuento = carro.reduce((sum, servicio) => sum + servicio.precio, 0);
    const totalConDescuento = totalSinDescuento - (totalSinDescuento * (descuento / 100));
    totalCarro.textContent = totalConDescuento.toFixed(2);

    // Guardar el estado del carrito
    guardarCarroEnStorage();
}

// Agregar servicios al carro de compras
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

// Eliminar un servicio del carro
function eliminarDelCarro(index) {
    const servicio = carro[index];
    carro.splice(index, 1);
    renderizarCarro();

    // Notificación eliminación de servicio
    Swal.fire({
        title: 'Servicio Eliminado',
        text: `${servicio.nombre} ha sido eliminado del carro de compras.`,
        icon: 'info',
        timer: 1500,
        showConfirmButton: false
    });
}

// Aplicación de filtros
function aplicarFiltros() {
    const nombre = filtroNombre.value.toLowerCase();
    const precioMin = parseInt(filtroPrecioMin.value) || 0;
    const precioMax = parseInt(filtroPrecioMax.value) || Infinity;
    const categoriasSeleccionadas = Array.from(filtrosCategoria)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    guardarFiltrosEnStorage(nombre, precioMin, precioMax, categoriasSeleccionadas);

    const serviciosFiltrados = servicios.filter(servicio =>
        servicio.nombre.toLowerCase().includes(nombre) &&
        servicio.precio >= precioMin &&
        servicio.precio <= precioMax &&
        (categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(servicio.categoria))
    );

    renderizarServicios(serviciosFiltrados);
}

// Aplicación de cupones
function aplicarCupon() {
    const cupon = inputCupon.value.trim().toUpperCase();
    if (cupon === "MATRIMONIO10") {
        descuento = 10;

        Swal.fire({
            title: '¡Cupón Aplicado!',
            text: 'Se ha aplicado un 10% de descuento a tu compra.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    } else {
        descuento = 0;

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

// Guardar carrito en localStorage
function guardarCarroEnStorage() {
    try {
        localStorage.setItem("carro", JSON.stringify(carro));
    } catch (error) {
        console.warn("No se pudo guardar el carrito en localStorage", error);
    }
}

// Cargar carrito desde localStorage
function cargarCarroDesdeStorage() {
    try {
        const carroGuardado = localStorage.getItem("carro");
        if (carroGuardado) {
            carro = JSON.parse(carroGuardado);
            renderizarCarro();
        }
    } catch (error) {
        console.warn("No se pudo cargar el carrito desde localStorage", error);
    }
}

// Guardar filtros en sessionStorage
function guardarFiltrosEnStorage(nombre, precioMin, precioMax, categoriasSeleccionadas) {
    try {
        const filtros = { nombre, precioMin, precioMax, categoriasSeleccionadas };
        sessionStorage.setItem("filtros", JSON.stringify(filtros));
    } catch (error) {
        console.warn("No se pudo guardar los filtros en sessionStorage", error);
    }
}

// Cargar filtros desde sessionStorage
function cargarFiltrosDesdeStorage() {
    try {
        const filtrosGuardados = sessionStorage.getItem("filtros");
        if (filtrosGuardados) {
            const { nombre, precioMin, precioMax, categoriasSeleccionadas } = JSON.parse(filtrosGuardados);

            filtroNombre.value = nombre || "";
            filtroPrecioMin.value = precioMin || "";
            filtroPrecioMax.value = precioMax || "";

            filtrosCategoria.forEach(checkbox => {
                checkbox.checked = categoriasSeleccionadas.includes(checkbox.value);
            });

            aplicarFiltros();
        }
    } catch (error) {
        console.warn("No se pudo cargar los filtros desde sessionStorage", error);
    }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    cargarCarroDesdeStorage();
    cargarFiltrosDesdeStorage();
});

// Eventos
btnFiltrar.addEventListener("click", aplicarFiltros);
btnAplicarCupon.addEventListener("click", aplicarCupon);

// Carga de servicios desde JSON
fetch("servicios.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar los servicios");
        }
        return response.json();
    })
    .then(data => {
        servicios = data;
        renderizarServicios();
    })
    .catch(error => {
        console.error("Error al cargar los datos:", error);
    });
