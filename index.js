let topicos = []
let idActual = null;

let idSiguiente = 1;

const formulario = document.querySelector("#form-topicos")
const listaTabla = document.querySelector("#listaTopicos")

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.querySelector("#titulo").value
    const autor = document.querySelector("#autor").value
    const curso = document.querySelector("#curso").value
    const contenido = document.querySelector("#contenido").value
    const divform = document.querySelector("#contenedor-page");
    const borderColor = getComputedStyle(divform).borderColor;

    if (borderColor === "rgb(255, 255, 0)") {
        divform.style.borderColor = "#E0FBFC";
    }

    if (idActual === null) {
        //Crear un topico
        const topico = {
            id: idSiguiente,
            titulo: titulo,
            autor: autor,
            curso: curso,
            contenido: contenido
        }
        topicos.push(topico)
        idSiguiente++;
    } else {
        const topico = topicos.find(e => e.id === idActual)
        topico.titulo = titulo;
        topico.autor = autor;
        topico.curso = curso;
        topico.contenido = contenido;
        idActual = null;
    }
    formulario.reset();
    mostrarTopicos();
})

const mostrarTopicos = () => {
    listaTabla.innerHTML = "";
    topicos.forEach( topico => {
        const fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${topico.id}</td>
            <td>${topico.titulo}</td>
            <td>${topico.autor}</td>
            <td>${topico.curso}</td>
            <td><p class="texto-contenido">${topico.contenido}</p></td>
            <td>
                <div class="contenedor-botones">
                    <button class="boton-table" onclick="eliminarTopico(${topico.id})">Eliminar</button>
                    <button class="boton-table" onclick="actualizarTopico(${topico.id})">Editar</button>
                </div>
            </td>
        `;
        listaTabla.appendChild(fila)
    })
}

window.eliminarTopico = (id) => {
    topicos = topicos.filter(topico => topico.id !== id)
    mostrarTopicos();
    formulario.reset();
}

window.actualizarTopico = (id) => {
    const div = document.getElementById("contenedor-page");
    div.style.borderColor = "yellow";
    const topico = topicos.find(topico => topico.id === id)
    document.querySelector("#titulo").value = topico.titulo
    document.querySelector("#autor").value = topico.autor
    document.querySelector("#curso").value = topico.curso
    document.querySelector("#contenido").value = topico.contenido
    idActual = topico.id
}