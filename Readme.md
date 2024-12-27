# Proyecto Final
# Simulador de Gestión de Servicios para matrimonios

**Autor:** Carlos Biénzobas

## Tecnologías Utilizadas
- **HTML5**: Estructura principal de la página web.
- **JavaScript (ES6)**: Lógica del simulador.
- **SweetAlert2**: Librería para notificaciones interactivas.
- **localStorage** y **sessionStorage**: Mantención de datos de carro de compras y filtros.

## Descripción del Proyecto

Este simulador desarrollado en JavaScript y HTML permite gestionar servicios relacionados con la celebración de Matrimonios. Permite a los usuarios la posibilidad de ver los servicios disponibles y seleccionarlos para un carro de compra, dando la visibilidad del precio de cada servicio, la posibilidad de aplicar filtros para la búsqueda de estos dentro de la página, la posibilidad de aplicar un código para cupón de descuento y la capacidad de agregar/eliminar servicios del carro de compras calculando el costo total de la selección. Todo lo anterior mediante funcionalidades como:

- **Visualización** de servicios para la celebración de matrimonios.
- **Filtrado** de búsqueda de servicios por precio máximo.
- **Gestión de carro de compra** agregar o remover servicios.
- **Aplicación de cupones** de descuento.
- **Cálculo** total carro de compra (con cupón aplicado).
- **Gestión de almacenamiento de datos** en carro de compras y filtros mediante uso de Local Storage y Session Storage.

Esta entrega corresponde a la cuarta simulación de una solución para la gestión de servicios de matrimonios, cubriendo los requisitos presentados para la entrega del proyecto final del curso de Javascript Comisión 63320, CoderHouse.

Nota: Para mayor información y evolución del presente proyecto, por favor referirse a entregas anteriores disponibles en los siguientes links:

https://github.com/cbienzobasf/js_preEntrega1_Bienzobas
https://github.com/cbienzobasf/js_preEntrega2_Bienzobas
https://github.com/cbienzobasf/js_preEntrega3_Bienzobas

## Conocimientos Aplicados

1. **Manipulación del DOM**:
   - Creación y actualización elementos con  `createElement` y `appendChild`.
   - Manejo de eventos `click` con botones.
2. **Fetch API y JSON**:
   - Carga de datos desde un archivo local `servicios.json`.
   - Renderizado de los datos en UI.
3. **Librería SweetAlert2**:
   - Notificaciones usuarias en principales acciones en Carro, cupones, errores o confirmaciones.
4. **Uso de Storage**:
   - Persistencia del carro de compras mediante `localStorage`.
   - Persistencia de filtros aplicados mediante `sessionStorage`.
5. **Uso lógica JavaScript**:
   - Uso de **funciones arrow**, **desestructuración** y **métodos de array** como `filter` y `reduce`.
   - Uso de **operadores lógicos** y **condicionales**.

## Estructura del Proyecto

1. **index.html**: Página donde se presenta simulador de gestión de servicios.
2. **script.js**: Lógica del simulador de gestión de servicios.
3. **servicios.json**: Archivo JSON con los datos de los servicios.

## Funcionalidades Principales

**1. Visualización de Servicios**
- Los servicios se cargan desde archivo `servicios.json` mediante `Fetch API`.
- Cada servicio registra: **Id, Nombre, Categoria y Precio**.
- Botón **Agregar al Carro**.

**2. Filtrado por Nombre y Precio**
- **Filtro** de usuario para servicios por nombre, precio mínimo y/o precio máximo.
- **Filtro** de usuario por selección de categorías de servicios.

**3. Carro de Compras**
- **Agregar y Eliminar**: Los usuarios pueden agregar o eliminar servicios seleccionados.
- **Cálculo del Total**: Se calcula el total en función de los servicios agregados.
- **Persistencia**: El estado del carro se guarda en `localStorage` y perduran registrados dentro del navegador.

**4. Aplicación de Cupones de Descuento**
- Códigos de descuento (por ejemplo: `matrimonio10` para un 10% de descuento) aplicado sobre el Costo Total del Carro de Compras.
- Actualización del total con el descuento aplicado.

**5. Botón Finalizar Compra**
- Mensaje de confirmación.
- Carro de compras vaciado automáticamente al hacer utilizar Botón.

**6. Persistencia de Filtros**
- Los filtros aplicados se guardan en `sessionStorage` y se restauran automáticamente al recargar la página.

## Ejemplo de Datos (servicios.json)
```json
[
    { "id": 1, "nombre": "Banquetería Básica", "categoria": "Banquetería", "precio": 500000 },
    { "id": 2, "nombre": "Música en Vivo", "categoria": "Entretenimiento", "precio": 1200000 },
    { "id": 3, "nombre": "Decoración Floral", "categoria": "Decoración", "precio": 1500000 },
    { "id": 4, "nombre": "Fotografía Profesional", "categoria": "Fotografía", "precio": 2000000 },
    { "id": 5, "nombre": "Alquiler de Carpas", "categoria": "Infraestructura", "precio": 3000000 }
]
```

## Cumplimiento de Criterios de Evaluación
**1. Funcionalidad**
- El proyecto cumple con flujo completo de aplicación funcional mediante:
  1. Carga de datos con **Fetch API**.
  2. Renderizado de datos en el **DOM** usando `createElement` y eventos `click`.
  3. Gestión del Carro de compras con métodos de array como `push` y `filter`.
  4. Mensaje confirmación de compra con **SweetAlert2**.

**2. Interactividad**
- La aplicación responde a las acciones del usuario mediante:
  1. Eventos del usuario: Filtrar, agregar y eliminar servicios.
  2. Actualización total del Carro.
  3. Cupones de descuento por registro en UI.

**3. Uso de Fetch y JSON**
- Datos de servicios cargados desde archivo **servicios.json**:
  1. Uso de `fetch()` para obtención de datos asíncronamente.
  2. Renderizado mediante `then` en página.

**4. Estructura**
  1. Interfaz estructurada en **HTML5**.

**5. Notificaciones**
  1. Notificaciones a usuario en UI mediante **SweetAlert2** para confirmación de acciones como agregar, eliminar y finalizar compras.

**6. Sintaxis JavaScript**
  1. **Funciones Arrow** para simplificar funciones.
  2. **Desestructuración** de objetos para manejar los datos de los JSONs.
  3. **Métodos de Array**: `filter`, `reduce` y `forEach` para modificación de datos.

**7. Escalabilidad, claridad y Legibilidad del Código**
  1. Proyecto presenta un código ordenado y legible con separación en funciones y comentarios explicativos en código para facilitar entendimiento.
