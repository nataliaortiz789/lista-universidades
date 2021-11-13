/**
 * Lista para los id de los items del acordeon
 */
var lista = [];

/**
 * funcion que lee un archivo json
 * @param {*} url 
 * @returns 
 */
async function leerJSON(url) {
    try {
        let response = await fetch(url);
        let user = await response.json();
        return user;
    } catch (error) {
        alert(error);
    }
}


/**
 * Funcion que lista los datos de las universidades
 */
function findAllUniversitiesTables() {
    let url = "https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?country=colombia";
    let acordeon = "";
    leerJSON(url).then(datos => {
        for (let i = 0; i < datos.length; i++) {
            acordeon += /*html*/ `
        <tr>
            <td>
                <div class="accordion-item">
                    <h4 class="accordion-header" id="flush-heading${i}">
                        <button class="accordion-button collapsed" type="button"
                            data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}"
                            aria-expanded="false" aria-controls="flush-collapse${i}" onclick="search(${i})">
                            ${datos[i].name}
                        </button>
                    </h4>
                    <div id="flush-collapse${i}" class="accordion-collapse collapse"
                        aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body" id="datos${i}"></div>
                    </div>
                </div>
            </td>
        </tr>
            `;
            document.getElementById("university").innerHTML = acordeon;
            $(document).ready(function () {
                $('#ListofUniversities').DataTable();
            });
        }
    });
}

/**
 * funcion que busca los datos de administrador de una universidad
 * @param {*} id 
 */
function getAdmin(id) {
    let url = "https://randomuser.me/api/";
    let contenido = "";
    leerJSON(url).then(datos => {
        datos.results.forEach(element => {
            contenido += /*html*/ `
            <div class="row">
                <div class="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                    <div class="">
                        <img src="${element.picture.large}" class="img-thumbnail" alt="img-thumbnail"
                            style="border-radius: 50%; object-fit:cover:cover;">
                    </div>
                </div>
                <div class="col">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <tbody>
                                <tr>
                                    <th>Nombre:</th>
                                    <td>${element.name.title + " " + element.name.first + " " + element.name.last}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>${element.email}</td>
                                </tr>
                                <tr>
                                    <th>Dirección:</th>
                                    <td>${element.location.street.name + " " + element.location.street.number}</td>
                                </tr>
                                <tr>
                                    <th>Pais:</th>
                                    <td>${element.location.country}</td>
                                </tr>
                                <tr>
                                    <th>Estado:</th>
                                    <td>${element.location.state}</td>
                                </tr>
                                <tr>
                                    <th>Ciudad:</th>
                                    <td>${element.location.city}</td>
                                </tr>
                                <tr>
                                    <th>Codigo Postal:</th>
                                    <td>${element.location.postcode}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            `;
            document.getElementById(`datos${id}`).innerHTML = contenido;
        });
    });
}

/**
 * funcion que controla el acordeon para mostrar los datos de un administrador
 * @param {*} id 
 */
function search(id) {
    if (!lista.find(element => element === id)) {
        lista.push(id);
        getAdmin(id);
    }
}

/**
 * Funcion que se ejecuta al cargar la pagina
 */
findAllUniversitiesTables();
