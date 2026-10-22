const cotizaciones = {
    USD: 1500,
    EUR: 1750,
    BRL: 280,
    CLP: 1.6,
    UYU: 37
};

// Coleccion de monedas que la casa de cambio tiene habilitadas para operar
const monedasDisponibles = ["USD", "EUR", "BRL", "CLP", "UYU"];

let cantidadOperaciones = 0;

function calcularCambio(monto, cotizacion) {
    return monto / cotizacion;
}
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
function validarDatos(monto, moneda, monedas) {
    if (!Number.isFinite(monto) || monto <= 0) {
        alert("El monto debe ser mayor que cero.");
        console.log("Error: monto invalido.");
        return false;
    }

    if (!monedas.includes(moneda)) {
        alert("La moneda seleccionada no esta disponible.");
        console.log("Error: moneda no disponible.");
        return false;
    }

    return true;
}

// ---------- GESTION DE LA LISTA DE MONEDAS ----------

function mostrarReporte(monedas, tasas) {
    console.log("----- Monedas disponibles -----");
    let texto = "Monedas disponibles:\n";
    let posicion = 1;

    for (const moneda of monedas) {
        const linea = `${posicion}) Moneda: ${moneda} - $${tasas[moneda]} ARS`;
        console.log(linea);
        texto += linea + "\n";
        posicion++;
    }

    alert(texto);
}

// busqueda
function buscarMoneda(monedas, codigo) {
    if (monedas.includes(codigo)) {
        return monedas.indexOf(codigo);
    }
    return -1;
}

// pide codigo y cotizacion de una moneda nueva
function solicitarNuevaMoneda(monedas) {
    const entrada = prompt("Ingresa el codigo de la nueva moneda (3 letras, ej: GBP):");

    if (entrada === null) {
        return null;
    }

    const codigo = entrada.trim().toUpperCase();

    if (codigo.length !== 3 || Number.isFinite(Number(codigo))) {
        alert("El codigo debe tener 3 letras.");
        return null;
    }

    if (monedas.includes(codigo)) {
        alert(`La moneda ${codigo} ya esta en la lista.`);
        return null;
    }

    const entradaCotizacion = prompt(`Cuantos pesos (ARS) vale 1 ${codigo}?`);

    if (entradaCotizacion === null) {
        return null;
    }

    const cotizacion = Number(entradaCotizacion.trim().replace(",", "."));

    if (entradaCotizacion.trim() === "" || !Number.isFinite(cotizacion) || cotizacion <= 0) {
        alert("La cotizacion debe ser un numero mayor que cero.");
        return null;
    }

    return { codigo, cotizacion };
}

// push: agrega una moneda al final de la lista
function agregarMoneda(monedas, tasas, alPrincipio) {
    const nueva = solicitarNuevaMoneda(monedas);

    if (nueva === null) {
        return;
    }

    if (alPrincipio) {
        monedas.unshift(nueva.codigo);
        alert(`Se agrego ${nueva.codigo} al principio de la lista.`);
    } else {
        monedas.push(nueva.codigo);
        alert(`Se agrego ${nueva.codigo} al final de la lista.`);
    }

    tasas[nueva.codigo] = nueva.cotizacion;
}

// pop: elimina la ultima moneda y la guarda 
function eliminarUltimaMoneda(monedas, tasas) {
    if (monedas.length <= 1) {
        alert("Tiene que quedar al menos una moneda disponible.");
        return;
    }

    const eliminada = monedas.pop();
    delete tasas[eliminada];

    console.log(`Se ha eliminado el elemento: ${eliminada}`);
    alert(`Se ha eliminado el elemento: ${eliminada}`);
}

// pide una moneda, la busca en la lista
function consultarMoneda(monedas) {
    const entrada = prompt("Que moneda queres buscar? (ej: EUR)");

    if (entrada === null) {
        return;
    }

    const codigo = entrada.trim().toUpperCase();
    const indice = buscarMoneda(monedas, codigo);

    if (indice === -1) {
        alert(`La moneda ${codigo} no esta en la lista.`);
    } else {
        alert(`La moneda ${codigo} esta disponible. Posicion: ${indice + 1} (indice ${indice}).`);
    }
}

//reemplaza la moneda de una posicion concreta por otra
function reemplazarMoneda(monedas, tasas) {
    mostrarReporte(monedas, tasas);

    const entrada = prompt(
        `Ingresa la posicion de la moneda a reemplazar (1 a ${monedas.length}):`
    );

    if (entrada === null) {
        return;
    }

    const indice = Number(entrada) - 1;

    if (!Number.isInteger(indice) || indice < 0 || indice >= monedas.length) {
        alert("Posicion no valida.");
        return;
    }

    const nueva = solicitarNuevaMoneda(monedas);

    if (nueva === null) {
        return;
    }

    const anterior = monedas[indice];
    monedas.splice(indice, 1, nueva.codigo);
    delete tasas[anterior];
    tasas[nueva.codigo] = nueva.cotizacion;

    alert(`Se reemplazo ${anterior} por ${nueva.codigo} en la posicion ${indice + 1}.`);
}

// menu de administracion de la lista de monedas
function administrarMonedas(monedas, tasas) {
    let seguir = true;

    while (seguir) {
        const opcion = prompt(
            "Administracion de monedas\n\n" +
            "1 - Agregar moneda al final\n" +
            "2 - Agregar moneda destacada al principio\n" +
            "3 - Eliminar la ultima moneda\n" +
            "4 - Buscar una moneda\n" +
            "5 - Reemplazar una moneda por posicion\n" +
            "6 - Ver listado\n" +
            "0 - Volver al simulador"
        );

        if (opcion === null) {
            break;
        }

        switch (opcion.trim()) {
            case "1":
                agregarMoneda(monedas, tasas, false);
                break;
            case "2":
                agregarMoneda(monedas, tasas, true);
                break;
            case "3":
                eliminarUltimaMoneda(monedas, tasas);
                break;
            case "4":
                consultarMoneda(monedas);
                break;
            case "5":
                reemplazarMoneda(monedas, tasas);
                break;
            case "6":
                mostrarReporte(monedas, tasas);
                break;
            case "0":
                seguir = false;
                break;
            default:
                alert("Opcion no valida.");
        }
    }
}

//funcion principal 
function iniciarSimulador() {
    let continuar = true;

    // Reporte
    mostrarReporte(monedasDisponibles, cotizaciones);

    const administrar = prompt("Queres administrar las monedas disponibles? Escribi SI o NO.");

    if (administrar !== null && administrar.trim().toUpperCase() === "SI") {
        administrarMonedas(monedasDisponibles, cotizaciones);
    }

    while (continuar) {
        const entradaMonto = prompt(
            "Ingresa el monto en pesos argentinos (ARS):"
        );

        if (entradaMonto === null) {
            break;
        }

        const monto = Number(entradaMonto);

        const monedaIngresada = prompt(
            "Que moneda queres comprar? Escribi " + monedasDisponibles.join(", ") + "."
        );

        if (monedaIngresada === null) {
            break;
        }

        const moneda = monedaIngresada.trim().toUpperCase();

        // Validar y procesar los datos
        if (validarDatos(monto, moneda, monedasDisponibles)) {
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