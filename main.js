
const cotizaciones = {
    USD: 1500,
    EUR: 1750,
    BRL: 280
};

let cantidadOperaciones = 0;

// calcular el cambio y devolver el resultado
function calcularCambio(monto, cotizacion) {
    return monto / cotizacion;
}

// funcion flecha para obtener la cotizacion
const obtenerCotizacion = (moneda) => cotizaciones[moneda];

//mostrar el resultado por consola y alert
function mostrarResultado(monto, moneda, cotizacion, dineroRecibido) {
    console.log("----- Resultado del cambio -----");
    console.log("Monto ingresado:", monto, "ARS");
    console.log("Moneda seleccionada:", moneda);
    console.log("Cotizacion:", cotizacion, "ARS por unidad");
    console.log("Dinero recibido:", dineroRecibido.toFixed(2), moneda);

    alert(
        `Con $${monto.toLocaleString("es-AR")} ARS recibis ` +
        `${dineroRecibido.toFixed(2)} ${moneda}.\n` +
        `Cotizacion: $${cotizacion} ARS por unidad.`
    );
}

//validar los datos ingresados
function validarDatos(monto, moneda) {
    if (!Number.isFinite(monto) || monto <= 0) {
        alert("El monto debe ser mayor que cero.");
        console.log("Error: monto invalido.");
        return false;
    }

    if (obtenerCotizacion(moneda) === undefined) {
        alert("La moneda seleccionada no esta disponible.");
        console.log("Error: moneda no disponible.");
        return false;
    }

    return true;
}

//funcion principal 
function iniciarSimulador() {
    let continuar = true;

    while (continuar) {
        const entradaMonto = prompt(
            "Ingresa el monto en pesos argentinos (ARS):"
        );

        if (entradaMonto === null) {
            break;
        }

        const monto = Number(entradaMonto);

        const monedaIngresada = prompt(
            "Que moneda queres comprar? Escribi USD, EUR o BRL."
        );

        if (monedaIngresada === null) {
            break;
        }

        const moneda = monedaIngresada.trim().toUpperCase();

        // Validar y procesar los datos
        if (validarDatos(monto, moneda)) {
            const cotizacion = obtenerCotizacion(moneda);
            const dineroRecibido = calcularCambio(monto, cotizacion);

            cantidadOperaciones++;

            mostrarResultado(
                monto,
                moneda,
                cotizacion,
                dineroRecibido
            );

            console.log("Numero de operacion:", cantidadOperaciones);
        }

        const respuesta = prompt(
            "Queres realizar otra operacion? Escribi SI o NO."
        );

        if (
            respuesta === null ||
            respuesta.trim().toUpperCase() === "NO"
        ) {
            continuar = false;
        } else if (
            respuesta.trim().toUpperCase() !== "SI"
        ) {
            alert("Respuesta no valida. El simulador finalizara.");
            continuar = false;
        }
    }

    console.log("Total de operaciones:", cantidadOperaciones);

    alert(
        "Simulador finalizado. Operaciones realizadas: " +
        cantidadOperaciones
    );
}

iniciarSimulador();
