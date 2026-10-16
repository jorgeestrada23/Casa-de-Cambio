const cotizaciones = {
    USD: 1500,
    EUR: 1750,
    BRL: 280
};

const formulario = document.getElementById("formulario");
const campoMonto = document.getElementById("monto");
const campoMoneda = document.getElementById("moneda");
const resultado = document.getElementById("resultado");

let cantidadOperaciones = 0;

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let monto = Number(campoMonto.value);
    let moneda = campoMoneda.value;

    // Validamos el monto ingresado.
    if (monto <= 0 || !Number.isFinite(monto)) {
        alert("Por favor, ingresá un monto mayor que cero.");
        resultado.textContent = "El monto ingresado no es válido.";
    } else if (cotizaciones[moneda] === undefined) {
        alert("La moneda seleccionada no está disponible.");
    } else {
        const cotizacion = cotizaciones[moneda];
        const dineroRecibido = monto / cotizacion;

        cantidadOperaciones++;

        resultado.textContent =
            `Con $${monto.toLocaleString("es-AR")} ARS recibís ` +
            `${dineroRecibido.toFixed(2)} ${moneda}. ` +
            `Cotización: $${cotizacion} ARS por unidad.`;

        console.log("Operación número:", cantidadOperaciones);
        console.log("Monto ingresado:", monto);
        console.log("Moneda seleccionada:", moneda);
        console.log("Dinero recibido:", dineroRecibido.toFixed(2));

        alert("¡Cambio calculado!");
    }
});

// Bucle para permitir realizar varias operaciones.
let continuar = true;

while (continuar) {
    const respuesta = prompt(
        "Simulador de cambio Jorge Estrada: ¿querés conocer las monedas disponibles? " +
        "Escribí SI o NO."
    );

    if (respuesta === null || respuesta.trim().toUpperCase() === "NO") {
        continuar = false;
    } else if (respuesta.trim().toUpperCase() === "SI") {
        alert(
            "Monedas disponibles:\n" +
            "USD: $1500 ARS\n" +
            "EUR: $1750 ARS\n" +
            "BRL: $280 ARS"
        );
        continuar = false;
    } else {
        alert("Respuesta no válida. Escribí SI o NO.");
    }
}