const enviarForm = document.getElementById('enviar-form')

const nombre = document.getElementById('nombre')
const email = document.getElementById('email')
const telefono = document.getElementById('telefono')
const consulta = document.getElementById('consulta')


const errorNombre = document.getElementById('error-nombre')
const errorEmail = document.getElementById('error-email')
const errorTelefono = document.getElementById('error-telefono')
const errorConsulta = document.getElementById('error-consulta')

let botonesSeguro = document.getElementsByClassName('boton-seguro')
let img_btn_seguro_cerrado = document.getElementsByClassName('img-botones-seguro')
let img_btn_seguro_abierto = document.getElementsByClassName('img-botones-seguro-abierto')

// for (let index = 0; index < botonesSeguro.length; index++) {
//     img_btn_seguro_abierto[index].setAttribute("style", 'display:none')
//     img_btn_seguro_cerrado[index].style.display = 'block';

// }
function changeStateBtn(index) {
    // console.log(botonesSeguro);

    for (let i = 0; i < botonesSeguro.length; i++) {
        img_btn_seguro_abierto[i].style.display = "none";
        img_btn_seguro_cerrado[i].style.display = 'block';
    }

    let boton = botonesSeguro[index]
    if (boton.ariaExpanded == 'true') {
        // console.log('boton abierto');
        img_btn_seguro_abierto[index].style.display = 'block';
        img_btn_seguro_cerrado[index].style.display = 'none';
    } else {
        // console.log('boton cerrado');
        img_btn_seguro_abierto[index].style.display = 'none';
        img_btn_seguro_cerrado[index].style.display = 'block';
    }

}
let cedulafrente = document.getElementById('input-cedula-frente')
let toinsert = document.getElementById('insertfile')
function mostrarimg() {
    alert(cedulafrente);
}

function validarConsulta() {


    if (nombre.value === null || nombre.value === '') {
        errorNombre.innerHTML = `ingresa tu nombre`
    } else {
        errorNombre.innerHTML = ""
    }

    if (email.value === null || email.value === '') {
        errorEmail.innerHTML = `ingresa tu email`
    } else {
        errorEmail.innerHTML = ""
    }

    if (telefono.value === null || telefono.value === '') {
        errorTelefono.innerHTML = `ingresa tu telefono`
    } else {
        errorTelefono.innerHTML = ""
    }

    if (consulta.value === null || consulta.value === '') {
        errorConsulta.innerHTML = `ingresa tu consulta`
    } else {
        errorConsulta.innerHTML = ""
    }
    if (nombre.value == '' || email.value == '' || telefono.value == '' || consulta.value == '') {
        alert('por favor, complete todos los campos')
        return (false)
    } else {
        alert('consulta enviada')
        axios({
            method: 'post',
            url: '/send-email',
            data: {
                nombre: nombre.value,
                email: email.value,
                telefono: telefono.value,
                consulta: consulta.value
            }
        });
    }

}

