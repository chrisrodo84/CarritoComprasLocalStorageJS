// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListener();

// Funciones
function cargarEventListener() {
    //Agregar curso
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Se vacía el arreglo
        limpiarHTML(); //Se elimina el HTML
    });
}

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        //Eliminar del arreglo el curso
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        carritoHTML();
    }
}

// Leer contenido y extraer información del curso
function leerDatosCurso(curso) {
    //Se crea objeto con contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Comprobar si el curso existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        //Se actualiza la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //Se agrega el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

//Mostrar carrito en el HTML
function carritoHTML() {
    //Limpiar el HTML
    limpiarHTML();
    //Generar el HTML con la información del carrito
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;
        //Se agrega el HTML al TBODY
        contenedorCarrito.appendChild(row);
    })
}

//Eliminar los cursos del TBODY
function limpiarHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML = '';

    //Forma rápida
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}