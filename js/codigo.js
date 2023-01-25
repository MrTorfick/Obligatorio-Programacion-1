//OBJETOS
class Empresa {
    constructor(id, nombre, usuario, contraseña) {
        this.id = id;
        this.nombre = nombre;
        this.usuario = usuario;
        this.contraseña = contraseña;
    }
}

class Buque {
    constructor(id, nombre, contenedoresMaximo, idEmpresa, fechaLlegada) {
        this.id = id;
        this.nombre = nombre;
        this.contenedoresMaximo = contenedoresMaximo;
        this.idEmpresa = idEmpresa;
        this.fechaLlegada = fechaLlegada;

    }
}

class Importadores {
    constructor(id, nombre, nombreU, contraseña, estado, foto, cantCargasCanceladas) {
        this.id = id;
        this.nombre = nombre
        this.nombreU = nombreU
        this.contraseña = contraseña;
        this.foto;
        this.estado = estado;
        this.cantCargasCanceladas = cantCargasCanceladas
        this.foto = foto
    }
}

class SolicitudDeCarga {
    constructor(idImportador, idSolicitud, tipoMercaderia, descripcion, puertoDeOrigen, cantContenedores, estado, numeroDeViaje, idBuqueAsignado) {
        this.idImportador = idImportador;
        this.idSolicitud = idSolicitud;
        this.tipoMercaderia = tipoMercaderia;
        this.descripcion = descripcion;
        this.puertoDeOrigen = puertoDeOrigen;
        this.cantContenedores = cantContenedores;
        this.estado = estado;
        this.numeroDeViaje = numeroDeViaje
        this.idBuqueAsignado = idBuqueAsignado
    }
}


//EVENTOS BOTONES
document.querySelector("#btnRegistrarse").addEventListener("click", registrarImportador);
document.querySelector("#btnIniciarSesion").addEventListener("click", loginGeneral);
document.querySelector("#btnSolicitudDeCarga").addEventListener("click", crearSolicitudDeCarga);
document.querySelector("#btnConsultarSolicitudDeCargaEmpresa").addEventListener("click", consultarSolicitudesPendientes)
document.querySelector("#btnConsultarSolicitudDeCargaImportador").addEventListener("click", consultarSolicitudesPendientes)
document.querySelector("#btnCrearViaje").addEventListener("click", crearViajeBuque);
document.querySelector("#btnRollearCarga").addEventListener("click", rolloverCarga);
document.querySelector("#btnListado").addEventListener("click", manifiestoDeCarga);
document.querySelector("#btnListarCargaPeligrosa").addEventListener("click", listarCargaPeligrosa)


//ARRAYS
let importadores = [
    new Importadores(1, "Importador1", "usuarioImportador1", "contraseñaImportador1", "Habilitado", "1.jpg", 0),
    new Importadores(2, "Importador2", "usuarioImportador2", "contraseñaImportador2", "Habilitado", "2.jpg", 0),
    new Importadores(3, "Importador3", "usuarioImportador3", "contraseñaImportador3", "Habilitado", "3.jpg", 0),
    new Importadores(4, "Importador4", "usuarioImportador4", "contraseñaImportador4", "Habilitado", "4.jpg", 1),
    new Importadores(5, "Importador5", "usuarioImportador5", "contraseñaImportador5", "Habilitado", "5.jpg", 0)
];

let empresas = [
    new Empresa(6, "LineaDeCarga1", "Empresa1", "Contraseña123"),
    new Empresa(7, "LineaDeCarga2", "Empresa2", "contraseña!$)$#"),
    new Empresa(8, "LineaDeCarga3", "Empresa3", "contraSeÑA!032"),
    new Empresa(9, "LineaDeCarga4", "Empresa4", "CONTRASEÑA123")
];

let tiposUsuario = ["Importador", "Empresa"];
let tiposDeCarga = ["CARGA_GENERAL", "REFRIGERADO", "CARGA_PELIGROSA"];

let solicitudesDeCarga = [
    new SolicitudDeCarga(1, 1, "CARGA_GENERAL", "Mercaderia1", "PuertoOrigen 1", 5, "Pendiente"),
    new SolicitudDeCarga(2, 2, "REFRIGERADO", "Mercaderia2", "PuertoOrigen 2", 20, "Confirmada", 1, 4),
    new SolicitudDeCarga(3, 3, "CARGA_PELIGROSA", "Mercaderia3", "PuertoOrigen 3", 50, "Confirmada", 2, 3),
    new SolicitudDeCarga(4, 4, "CARGA_PELIGROSA", "Mercaderia4", "PuertoOrigen 4", 40, "Pendiente"),
    new SolicitudDeCarga(4, 5, "CARGA_GENERAL", "Mercaderia5", "PuertoOrigen 5", 100, "Cancelada")
]
let buques = [
    new Buque(1, "Buque1", 300, 6, "2022-10-30"),
    new Buque(2, "Buque2", 75, 7, "2022-12-12"),
    new Buque(3, "Buque3", 122, 8, "2022-11-25"),
    new Buque(4, "Buque4", 350, 8, "2022-12-18")
]


//VARIABLES AUX GLOBALES
let idNumeroViaje = 1;
let idImportador = 9;//Lo declaro en 9, ya que es la ultima id, de la empresa que esta precargada. Asi se generan IDs unicas
let idSolicitudCarga = 1;
let idLoginActual = 0;
let idViajeBuque = 1;
let fechaActual = new Date();
fechaActual = fechaActual.toLocaleDateString('zh-CN')//Este metodo me devuelve la fecha actual, con el formato de la zona horaria zh-CN(YYYY/MM/DD)
//FUNCIONES


//Registro de importador
function registrarImportador() {
    let nombre = document.querySelector("#txtNombre").value;
    let nombreUsuario = document.querySelector("#txtNombreUsuario").value
    let contraseña = document.querySelector("#txtContraseña").value;
    let foto = document.querySelector("#slcImagenes").value

    let verifContra = verificarContraseña(contraseña);
    let existe = existeElemento(importadores, "nombreU", nombreUsuario)//Verifica si el nombre ya esta en el array
    let existe2 = existeElemento(empresas, "usuario", nombreUsuario)
    if (existe === false && nombre !== "" && nombreUsuario !== "" && verifContra === true && existe2 === false && foto !== "") {
        importadores.push(new Importadores((importadores.length - 1) + idImportador + 1, nombre, nombreUsuario, contraseña, "Habilitado", foto))
        document.querySelector("#pRegistro").innerHTML = ``;
        document.querySelector("#pRegistro").innerHTML = `Importador registrado correctamente`;
    } else {
        document.querySelector("#pRegistro").innerHTML = ``;
        document.querySelector("#pRegistro").innerHTML = `¡Error al registrar al importador, verifique los datos ingresados!<br>Posibles motivos del error:<br>
        -Todos los datos son obligatorios<br>-La contraseña debe tener un minimo de 5 caracteres, contando con una mayuscula, una minuscula y un numero.<br>
        -El nombre de usuario ingresado, ya existe.`;
    }
}

//Listado de imagenes
listarImagenes();
function listarImagenes() {
    document.querySelector("#slcImagenes").innerHTML = `<option value="-1">Seleccione...</option>`
    for (let i = 1; i <= 8; i++) {//8 es la cantidad de imagenes que hay en la carpeta img
        document.querySelector("#slcImagenes").innerHTML += `<option value="${i + ".jpg"}">${"Imagen" + i}</option>`;
    }
}


//Login
function loginGeneral() {
    let usuario = document.querySelector("#txtUsuarioL").value;
    let contraseña = document.querySelector("#txtContraseñaL").value;
    let tipoUsuario = document.querySelector("#slcTipoUsuario").value;
    let datosCorrectos = verificarDatosIngresadosLogin(usuario, contraseña, tipoUsuario);

    if (datosCorrectos === true) {
        if (tipoUsuario === "Empresa") {
            armarViajesDeBuques(1);
            armarViajesDeBuques();
            armarViajesDeBuques(2);
            armarViajesDeBuques(3);
            listarSolicitudesConfirmadas();
        } else {
            armarTipoDeCarga();
        }
        mostrarBotones(tipoUsuario);
        document.querySelector("#pLogin").innerHTML = `Sesion iniciada como ${usuario}`;
    } else {
        document.querySelector("#pLogin").innerHTML = `Error, verifique los datos`;
    }
}

//Cerrar sesion
function cerrarSesion() {
    idLoginActual = 0;//Una vez que el importador cierra sesion, la variable vuelve al estado inicial que tenia al comienzo del programa
    document.querySelector("#pLogin").innerHTML = "Sesion cerrada";
    mostrarBotones("invitado");
    mostrarSeccion("seccionIniciarSesion")
    document.getElementById("logo").src = `https://p1.develotion.com/2022_08/logo.png`

}

//Crear solicitud de carga
function crearSolicitudDeCarga() {
    let tipodeCarga = document.querySelector("#slcTipoDeCarga").value;
    let descripcionMercaderia = document.querySelector("#txtDescripcionMercaderia").value;
    let puertoOrigen = document.querySelector("#txtPuertoOrigen").value;
    let cantidadContenedores = Number(document.querySelector("#txtCantidadContenedores").value);

    if (tipodeCarga !== "-1" && descripcionMercaderia !== "" && puertoOrigen !== "" && cantidadContenedores !== 0 && tipodeCarga !== -1) {
        solicitudesDeCarga.push(new SolicitudDeCarga(idLoginActual, (solicitudesDeCarga.length - 1) + idSolicitudCarga + 1, tipodeCarga, descripcionMercaderia, puertoOrigen, cantidadContenedores, "Pendiente"))
        alert("Solicitud de carga creada exitosamente")
    } else {
        alert("Error inesperado, verifique los datos ingresados.(Todos los datos son obligatorios)")
    }
}
//Se listan las tablas, para el perfil Empresa e Importador con sus correspondientes caracteristicas
function consultarSolicitudesPendientes() {
    document.querySelector("#tblDatos").innerHTML = "";
    let descripcionMercaderia = document.querySelector("#txtBusquedaPorDescripcion").value;
    document.querySelector("#tblDatos").innerHTML = "";
    for (let j = 0; j < solicitudesDeCarga.length; j++) {
        const carga = solicitudesDeCarga[j];
        if (carga.estado === "Pendiente" && carga.idImportador === idLoginActual) {
            let minus = carga.descripcion.toLowerCase()
            descripcionMercaderia = descripcionMercaderia.toLowerCase()
            if (descripcionMercaderia === minus) {
                document.querySelector("#tblDatos").innerHTML += `<tr>
            
            <td>${carga.idSolicitud}</td>
            <td>${carga.tipoMercaderia}</td>
            <td>${carga.descripcion}</td>
            <td>${carga.puertoDeOrigen}</td>
            <td>${carga.cantContenedores}</td>
            <td>${carga.idImportador}</td>
            <td>${carga.estado}</td>
            <td><input type="button" value="X" data-carga="${carga.idSolicitud}" class="eliminar"></td>
            </tr>`;



            }
            if (descripcionMercaderia === "") {


                document.querySelector("#tblDatos").innerHTML += `<tr>
            <td>${carga.idSolicitud}</td>
            <td>${carga.tipoMercaderia}</td>
            <td>${carga.descripcion}</td>
            <td>${carga.puertoDeOrigen}</td>
            <td>${carga.cantContenedores}</td>
            <td>${carga.idImportador}</td>
            <td>${carga.estado}</td>
            <td><input type="button" value="X" data-carga="${carga.idSolicitud}" class="eliminar"></td>
            </tr>`;
            }
        }
    }

    document.querySelector("#tblDatosAsignar").innerHTML = "";
    for (let i = 0; i < empresas.length; i++) {
        const empresa = empresas[i];
        if (empresa.id === idLoginActual) {
            for (let j = 0; j < solicitudesDeCarga.length; j++) {
                const carga = solicitudesDeCarga[j];
                if (carga.estado === "Pendiente") {
                    document.querySelector("#tblDatosAsignar").innerHTML += `<tr>
            
            <td>${carga.idSolicitud}</td>
            <td>${carga.tipoMercaderia}</td>
            <td>${carga.descripcion}</td>
            <td>${carga.puertoDeOrigen}</td>
            <td>${carga.cantContenedores}</td>
            <td>${carga.idImportador}</td>
            <td>${carga.estado}</td>
            <td><input type="button" value="X" data-carga="${carga.idSolicitud}" class="asignar"></td>
            </tr>`;
                }
            }
        }
    }

    let botonesAsignar = document.querySelectorAll(".asignar")
    let botonesElim = document.querySelectorAll(".eliminar");
    if (botonesElim != null) {
        for (let i = 0; i < botonesElim.length; i++) {
            const botonElim = botonesElim[i];
            botonElim.addEventListener("click", cancelarSolicitudDeCarga);
        }
    }
    if (botonesAsignar != null) {
        for (let i = 0; i < botonesAsignar.length; i++) {
            const botonAsig = botonesAsignar[i];
            botonAsig.addEventListener("click", asignarViajeObtenerDatos);
        }
    }
}
//Cancelar solicitud de carga
function cancelarSolicitudDeCarga() {
    let obtenerImportadorActual = obtenerImportador(idLoginActual)
    let idSolicitudCancelar = Number(this.getAttribute("data-carga"));
    let obtenerCarga = buscarElemento(solicitudesDeCarga, "idSolicitud", idSolicitudCancelar);
    let hacer = confirm(
        "¿Esta seguro/a que quiere cancelar la carga con ID: " + obtenerCarga.idSolicitud + "?"
    );
    if (hacer) {
        obtenerCarga.estado = "Cancelada";
        consultarSolicitudesPendientes();
        obtenerImportadorActual.cantCargasCanceladas++
        if (obtenerImportadorActual.cantCargasCanceladas >= 3) {
            obtenerImportadorActual.estado = "Deshabilitado"
            mostrarBotones("invitado")
            alert("Ha sido deshabilitado. Tienes tres o mas cargas canceladas.")
            mostrarSeccion("seccionIniciarSesion")
        }
    }
}


//Listado de estadisticas
function listarEstadisticas() {
    let obtenerImportadorActual = obtenerImportador(idLoginActual)
    cantSolicitudesCanceladas = obtenerImportadorActual.cantCargasCanceladas
    totalSolicitudes = 0
    let porcentajeCancelaciones = 0;
    let porcentajeParticipacion = 0
    //Porcentaje de cancelaciones
    for (let i = 0; i < solicitudesDeCarga.length; i++) {
        const carga = solicitudesDeCarga[i];
        if (carga.idImportador === idLoginActual) {
            if (carga.estado === "Confirmada" || carga.estado === "Pendiente" || carga.estado === "Ignorada") {
                totalSolicitudes++;
            }
        }
    }

    porcentajeCancelaciones = (cantSolicitudesCanceladas * 100) / totalSolicitudes
    if (porcentajeCancelaciones >= 0) {
        document.querySelector("#tblEstadisticas1").innerHTML = "";
        document.querySelector("#tblEstadisticas1").innerHTML += `<tr>
            
            <td>${porcentajeCancelaciones + "%"}</td>
            </tr>`;
    }



    //Proximas llegadas

    buques.sort((a, b) => new Date(a.fechaLlegada).getTime() - new Date(b.fechaLlegada).getTime());//Ordena las fechas de llegada de menor a mayor
    document.querySelector("#tblEstadisticas2").innerHTML = "";
    for (let i = 0; i < buques.length; i++) {
        const buque = buques[i];

        for (let j = 0; j < solicitudesDeCarga.length; j++) {
            const carga = solicitudesDeCarga[j];
            if (carga.idBuqueAsignado === buque.id && carga.idImportador === idLoginActual) {
                document.querySelector("#tblEstadisticas2").innerHTML += `<tr>
            
            <td>${carga.idSolicitud}</td>
            <td>${buque.fechaLlegada}</td>
            </tr>`;
            }
        }
    }
    //Porcentaje de participacion de empresas
    document.querySelector("#tblEstadisticas3").innerHTML = "";
    for (let i = 0; i < buques.length; i++) {
        const buque = buques[i];
        porcentajeParticipacion = participacionLineasDeCarga(buque)
        let nombreEmpresa = empresaBuque(buque.idEmpresa)
        if (porcentajeParticipacion != undefined) {
            document.querySelector("#tblEstadisticas3").innerHTML += `<tr>
            
            <td>${nombreEmpresa}</td>
            <td>${porcentajeParticipacion + "%"}</td>
            </tr>`;
        }

    }

}

//Funcion que devuelve el nombre de la empresa dueña del buque
function empresaBuque(id) {
    for (let i = 0; i < empresas.length; i++) {
        const empresa = empresas[i];
        if (empresa.id === id) {
            return empresa.nombre
        }
    }
}
//Funcion que devuelve el porcentaje de participacion de un buque, del importador logueado
function participacionLineasDeCarga(buque) {
    let idBuque = buque.id
    let totalCargas = 0
    let totalParticipacion = 0
    let porcentajeParticipacion = 0;
    for (let i = 0; i < solicitudesDeCarga.length; i++) {
        const carga = solicitudesDeCarga[i];
        if (carga.idImportador === idLoginActual && carga.estado === "Confirmada" && carga.idBuqueAsignado === idBuque) {
            totalParticipacion++
            totalCargas++
        } else if (carga.idImportador === idLoginActual && carga.estado === "Confirmada") {
            totalCargas++
        }
    }
    porcentajeParticipacion = (totalParticipacion * 100) / totalCargas
    if (porcentajeParticipacion > 0) {
        return porcentajeParticipacion
    }
}

//Crear viaje
function crearViajeBuque() {
    let nombreBuque = document.querySelector("#txtNombreBuque").value;
    let cantMaxContenedores = Number(document.querySelector("#txtCantidadMaximaContenedores").value);
    let fechaLlegada = new Date();
    fechaLlegada = document.querySelector("#txtFechaLlegada").value;

    if (nombreBuque !== "" && cantMaxContenedores !== 0 && fechaLlegada !== "" && Date.parse(fechaLlegada) > Date.parse(fechaActual)) {
        buques.push(new Buque((buques.length - 1) + idViajeBuque + 1, nombreBuque, cantMaxContenedores, idLoginActual, fechaLlegada))
        alert("Viaje creado con exito")
        //El numero es una propiedad auxiliar de la funcion. Permite cambiar el valor del id de los diferentes combos desplegables que hay.
        armarViajesDeBuques(1);
        armarViajesDeBuques();
        armarViajesDeBuques(2);
        armarViajesDeBuques(3);
    } else {
        alert("Error al crear el viaje, verifique los datos")
    }


}

//Obtener datos para asignar una carga a un viaje
function asignarViajeObtenerDatos() {
    let buqueAsignado;
    let cargaPendiente;
    let viajeBuque = Number(document.querySelector("#slcViajes").value);
    if (viajeBuque != -1) {
        /* console.log(viajeBuque); */
        let idCarga = Number(this.getAttribute("data-carga"));
        for (let i = 0; i < solicitudesDeCarga.length; i++) {
            const carga = solicitudesDeCarga[i];
            if (carga.idSolicitud == idCarga) {
                cargaPendiente = carga;//Obtengo la carga seleccionada
                break;
            }
        }
        for (let i = 0; i < buques.length; i++) {
            const buque = buques[i];
            if (buque.id == viajeBuque) {
                buqueAsignado = buque;//Obtengo el buque seleccionado
                break;
            }
        }


        let hacer = confirm(
            "¿Esta seguro/a que quiere asignar el viaje con ID: " + cargaPendiente.idSolicitud + " al buque " + buqueAsignado.nombre + "?"
        );
        if (hacer) {
            asignarCarga(buqueAsignado, cargaPendiente, viajeBuque)
        }

    } else {
        alert("Debe seleccionar un viaje de un buque")
    }
}


//Asigno carga a un viaje
function asignarCarga(buqueAsignado, cargaPendiente, viajeBuque) {
    let aux = 0
    let cantContenedoresMax = buqueAsignado.contenedoresMaximo
    if (cantContenedoresMax >= cargaPendiente.cantContenedores) {
        buqueAsignado.contenedoresMaximo = cantContenedoresMax - cargaPendiente.cantContenedores
        cargaPendiente.estado = "Confirmada";
        cargaPendiente.idBuqueAsignado = viajeBuque;
        for (let i = 0; i < solicitudesDeCarga.length; i++) {
            const confirmados = solicitudesDeCarga[i]
            if (confirmados.estado === "Confirmada") {
                aux++
            }
        }
        cargaPendiente.numeroDeViaje = (aux - 1) + idNumeroViaje + 1
        alert("Se completo la operacion")
    } else {
        alert("La cantidad de contenedores de la carga, supera a la cantidad restante del buque");
    }
    consultarSolicitudesPendientes();
    listarSolicitudesConfirmadas()
}
//Rollover de carga
function rolloverCarga() {
    let idCorrecta = false
    let idCarga = Number(document.querySelector("#txtIdCarga").value);
    for (let i = 0; i < solicitudesDeCarga.length; i++) {
        const carga = solicitudesDeCarga[i];
        if (carga.estado === "Confirmada" && carga.idSolicitud === idCarga) {
            idCorrecta = true
            break;
        }
    }
    if (idCorrecta === true) {

        let idBuque = Number(document.querySelector("#slcViajesDestino").value);
        armarViajesDeBuques();
        let obtenerCarga;
        let obtenerBuqueDestino;
        let obtenerBuqueActual;
        for (let i = 0; i < solicitudesDeCarga.length; i++) {
            const carga = solicitudesDeCarga[i];
            if (carga.idSolicitud === idCarga) {
                obtenerCarga = carga
                break;
            }
        }






        for (let i = 0; i < buques.length; i++) {
            const buque = buques[i];
            if (buque.id === idBuque) {
                obtenerBuqueDestino = buque;
            }
            if (buque.id === obtenerCarga.idBuqueAsignado) {
                obtenerBuqueActual = buque;
            }
        }
        obtenerBuqueActual.contenedoresMaximo = obtenerBuqueActual.contenedoresMaximo + obtenerCarga.cantContenedores

        asignarCarga(obtenerBuqueDestino, obtenerCarga, obtenerBuqueDestino.id)
    } else {
        alert("Error, debe ingresar un ID valido y seleccionar un viaje.")
    }

}


//Listado de las cargas confirmadas
function listarSolicitudesConfirmadas() {
    document.querySelector("#tblRollover").innerHTML = "";

    for (let h = 0; h < solicitudesDeCarga.length; h++) {
        const carga = solicitudesDeCarga[h];
        if (carga.estado === "Confirmada") {
            document.querySelector("#tblRollover").innerHTML += `<tr>
                <td>${carga.idSolicitud}</td>
                <td>${carga.tipoMercaderia}</td>
                <td>${carga.descripcion}</td>
                <td>${carga.puertoDeOrigen}</td>
                <td>${carga.cantContenedores}</td>
                <td>${carga.idImportador}</td>
                <td>${carga.estado}</td>
                <td>${carga.idBuqueAsignado}</td>
                </tr>`;
        }
    }

}
//Listado de la carga de un buque

function manifiestoDeCarga() {
    document.querySelector("#tblManifiestoDeCarga").innerHTML = "";
    let idViaje = Number(document.querySelector("#slcViajesManifiesto").value);
    for (let i = 0; i < solicitudesDeCarga.length; i++) {
        const carga = solicitudesDeCarga[i];
        if (carga.estado === "Confirmada" && carga.idBuqueAsignado === idViaje) {
            let importador = obtenerImportador(carga.idImportador)
            document.querySelector("#tblManifiestoDeCarga").innerHTML += `<tr>
                <td>${carga.puertoDeOrigen}</td>
                <td>${carga.cantContenedores}</td>
                <td>${importador.nombre}</td>
                <td>${carga.descripcion}</td>
                <td>${carga.tipoMercaderia}</td>
                </tr>`;
        }
    }
}
//Listado de importadores deshabilitados
function listarImportadoresDeshabilitados() {
    document.querySelector("#tblHabilitarImportadores").innerHTML = "";


    for (let i = 0; i < importadores.length; i++) {
        const importador = importadores[i];
        if (importador.estado === "Deshabilitado") {
            document.querySelector("#tblHabilitarImportadores").innerHTML += `<tr>
                <td>${importador.id}</td>
                <td>${importador.nombre}</td>
                <td><input type="button" value="X" data-carga="${importador.id}" class="habilitar"></td>
                </tr>`;
        }
    }

    let botonesHabilitar = document.querySelectorAll(".habilitar")
    if (botonesHabilitar != null) {
        for (let i = 0; i < botonesHabilitar.length; i++) {
            const botonElim = botonesHabilitar[i];
            botonElim.addEventListener("click", habilitarImportador);
        }
    }
}

//Habilitar importador
function habilitarImportador() {
    let idImportador = Number(this.getAttribute("data-carga"));
    let importador = obtenerImportador(idImportador);
    let cantCargasCanceladas = 0
    let hacer = confirm(
        "¿Esta seguro/a que quiere habilitar al importador con ID: " + idImportador + "?"
    );
    if (hacer) {
        for (let i = 0; i < solicitudesDeCarga.length; i++) {
            const carga = solicitudesDeCarga[i];
            if (carga.idImportador === idImportador && carga.estado === "Cancelada") {
                cantCargasCanceladas++
                carga.estado = "Ignorada"
            }

        }
        importador.cantCargasCanceladas = importador.cantCargasCanceladas - cantCargasCanceladas
        importador.estado = "Habilitado"
        alert("Importador habilitado correctamente")
        listarImportadoresDeshabilitados();
    }

}
//Obtengo a un importador, mediante la propiedad id del mismo
function obtenerImportador(id) {
    for (let i = 0; i < importadores.length; i++) {
        const importador = importadores[i];
        if (importador.id === id) {
            return importador
        }
    }
}
//Listado de carga peligrosa
function listarCargaPeligrosa() {
    let idBuque = Number(document.querySelector("#slcViajesPeligrosos").value);
    /* console.log(idBuque); */
    let aux = false//Variable auxiliar, para verificar que se haya ingresado al menos una vez.
    document.querySelector("#tblListadoCargaPeligrosa").innerHTML = ""
    for (let i = 0; i < solicitudesDeCarga.length; i++) {
        const carga = solicitudesDeCarga[i];
        if (carga.idBuqueAsignado === idBuque && carga.tipoMercaderia === "CARGA_PELIGROSA") {
            aux = true
            document.querySelector("#tblListadoCargaPeligrosa").innerHTML += `<tr>
                <td>${carga.idImportador}</td>
                <td>${carga.cantContenedores}</td>
                <td>${carga.descripcion}</td>
                </tr>`;
        } else if (idBuque === -1) {
            alert("Debe seleccionar un viaje")
            aux = true//La declaro true, para evitar que muestre el mensaje de "No se encontro carga peligrosa.."
            break
        }
    }
    if (aux === false) {
        alert("No se encontro carga peligrosa para el buque seleccionado")
    }

}

//Verificacion de datos ingresados en el login
function verificarDatosIngresadosLogin(usuario, contraseña, tipo) {
    let loginCorrecto = false;
    usuario = usuario.toLowerCase()
    if (tipo === "Importador") {
        for (let i = 0; i < importadores.length; i++) {
            const importador = importadores[i]
            let obtenerUser = importador.nombreU
            obtenerUser = obtenerUser.toLowerCase()
            let obtenerContraseña = importadores[i].contraseña
            if (obtenerContraseña === contraseña && usuario === obtenerUser && importador.estado === "Habilitado") {
                idLoginActual = importadores[i].id//A la variable de idLoginActual, se le asigna el id, del importador que inicio sesion
                loginCorrecto = true;
                document.getElementById("logo").src = `img/` + importador.foto
                break;

            }
        }

    } else if (tipo === "Empresa") {
        for (let i = 0; i < empresas.length; i++) {
            const element = empresas[i]
            let obtenerUser = element.usuario
            obtenerUser = obtenerUser.toLowerCase()
            let obtenerContraseña = empresas[i].contraseña
            if (obtenerContraseña === contraseña && usuario === obtenerUser) {
                idLoginActual = empresas[i].id//A la variable de idLoginActual, se le asigna el id, de la empresa que inicio sesion
                loginCorrecto = true;
                break;
            }
        }
    }

    return loginCorrecto;
}




//Busca un valor en la propiedad de un array
function buscarElemento(arr, prop, valor) {
    let elementoBuscado = null;
    for (let i = 0; i < arr.length; i++) {
        const elem = arr[i];
        if (elem[prop] === valor) {
            elementoBuscado = elem;
            break;
        }
    }
    return elementoBuscado;
}





//Verifica la contraseña
function verificarContraseña(txt) {
    let verifMayuscula = false;
    let verifMinuscula = false
    let verifNumero = false;

    if (txt.length > 5) {
        for (let i = 0; i < txt.length; i++) {

            if (verifMayuscula === false) {
                let mayuscula = txt.charAt(i)
                let mayusculaMinus = mayuscula.toLowerCase()

                if (mayuscula !== mayusculaMinus) {
                    verifMayuscula = true
                }
            }
            if (verifMinuscula === false) {
                let minuscula = txt.charAt(i)
                let mayusculaMayus = minuscula.toUpperCase();

                if (minuscula !== mayusculaMayus) {
                    verifMinuscula = true;
                }
            }
            if (verifNumero === false) {
                let num = txt.charAt(i)
                if (isNaN(num) === false) {
                    verifNumero = true
                }
            }
        }
    }



    if (verifMayuscula === true && verifMinuscula === true && verifNumero === true) {
        return true
    } else {
        return false
    }
}

let botones = document.querySelectorAll(".btn");
for (let i = 0; i < botones.length; i++) {
    const boton = botones[i];
    boton.addEventListener("click", cambiarSeccion);
}


function ocultarBotones() {
    let botones = document.querySelectorAll(".btn");
    for (let i = 0; i < botones.length; i++) {
        const boton = botones[i];
        boton.style.display = "none";
    }
}
mostrarBotones("invitado");
mostrarSeccion("seccionIniciarSesion");
function mostrarBotones(perfil) {
    ocultarBotones();
    let botones = document.querySelectorAll("." + perfil);
    for (let i = 0; i < botones.length; i++) {
        const boton = botones[i];
        boton.style.display = "block";
    }
}

function ocultarSecciones() {
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
        const unaSeccion = secciones[i];
        unaSeccion.style.display = "none";
    }
}
function mostrarSeccion(seccion) {
    ocultarSecciones();

    document.querySelector("#" + seccion).style.display = "block";
    switch (seccion) {
        case "seccionListarSolicitudesDeCargaEmpresa":
            consultarSolicitudesPendientes();
            break;
        case "seccionListarEstadisticas":
            listarEstadisticas();
            break;
        case "seccionListarSolicitudesDeCargaImportador":
            consultarSolicitudesPendientes();
            break;
        case "seccionHabilitarImportadores":
            listarImportadoresDeshabilitados();
            break;
        case "seccionCerrarSesion":
            cerrarSesion();
    }
}

function cambiarSeccion() {
    let idBoton = this.getAttribute("id"); //"btnSeccionAgregar"
    let idSeccion = idBoton.charAt(3).toLowerCase() + idBoton.substring(4); //"s"+"eccionAgregar"
    mostrarSeccion(idSeccion);
}



armarTipoDeUsuario();
function armarTipoDeCarga() {
    document.querySelector("#slcTipoDeCarga").innerHTML = `<option value="-1">Seleccione...</option>`;
    for (let i = 0; i < tiposDeCarga.length; i++) {
        const tipoCarga = tiposDeCarga[i];
        document.querySelector("#slcTipoDeCarga").innerHTML += `<option value="${tipoCarga}">${tipoCarga}</option>`;
    }
}

function armarTipoDeUsuario() {
    document.querySelector("#slcTipoUsuario").innerHTML = `<option value="-1">Seleccione...</option>`;
    for (let i = 0; i < tiposUsuario.length; i++) {
        const tipoUsuario = tiposUsuario[i];
        document.querySelector("#slcTipoUsuario").innerHTML += `<option value="${tipoUsuario}">${tipoUsuario}</option>`;
    }
}

function armarViajesDeBuques(aux) {//Dependiendo del valor de la variable aux, el id cambia

    let id;
    if (aux === 1) {
        id = "#slcViajes"

    } else if (aux === 2) {
        id = "#slcViajesManifiesto"
    } else if (aux === 3) {
        id = "#slcViajesPeligrosos"
    } else {
        id = "#slcViajesDestino"
    }
    document.querySelector(id).innerHTML = `<option value="-1">Seleccione...</option>`
    for (let i = 0; i < buques.length; i++) {
        const buque = buques[i];
        if (id === "#slcViajes" || id === "#slcViajesDestino") {
            if (Date.parse(buque.fechaLlegada) > Date.parse(fechaActual))/*Me devuelve la fecha en milisegundos*/ {
                document.querySelector(id).innerHTML += `<option value="${buque.id}">${buque.nombre}(ID:${buque.id})</option>`;
            }
        } else {
            document.querySelector(id).innerHTML += `<option value="${buque.id}">${buque.nombre}(ID:${buque.id})</option>`;
        }


    }

}



function existeElemento(arr, prop, valor) {
    let existe = false;
    for (let i = 0; i < arr.length; i++) {
        const elem = arr[i];
        if (elem[prop] === valor) {
            existe = true;
            break;
        }
    }
    return existe;
}