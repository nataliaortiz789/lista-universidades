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
        let data = await response.json();
        return data;
    } catch (error) {
        alert(error);
    }
}


/**
 * Funcion que lista los datos de las universidades
 */
function findAllUniversitiesTables() {
    let url="https://programacion-web---i-sem-2019.gitlab.io/persistencia/json_web/json/universidades.json";
    let acordeon = "";
    leerJSON(url).then(data => {
        const ids = data.map(o => o.name);
        const filtered = data.filter(({name}, index) => !ids.includes(name, index + 1))
        for (let i = 0; i < filtered.length; i++) {
            acordeon += /*html*/ `
        <tr>
            <td>
                <div class="accordion-item">
                    <h4 class="accordion-header" id="flush-heading${i}">
                        <button class="accordion-button collapsed" type="button"
                            data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}"
                            aria-expanded="false" aria-controls="flush-collapse${i}" onclick="search('${i}', '${filtered[i].web_pages}')">
                            ${filtered[i].name}
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
 * @param {*} site
 */
function getAdmin(id, site) {
    let url = "https://randomuser.me/api/";
    let contenido = "";
    leerJSON(url).then(datos => {
        datos.results.forEach(element => {
            contenido += /*html*/ `
            <div class="row">
                <div class="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                    <div class="">
                        <img src="${element.picture.large}" class="img-thumbnail profile" alt="img-thumbnail">
                    </div>
                </div>
                <div class="col">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <tbody>
                                <tr>
                                    <th>Dirección Web:</th>
                                    <td>${site}</td>
                                </tr>
                                <tr>
                                    <th>Código QR:</th>
                                    <td><img src="https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${site}" alt=""></td>
                                </tr>
                                <tr>
                                    <th>Nombre Administrador:</th>
                                    <td>${element.name.title + " " + element.name.first + " " + element.name.last}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>${element.email}</td>
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
function search(id, site) {
    if (!lista.find(element => element === id)) {
        lista.push(id);
        getAdmin(id, site);
    }
}

/**
 * Funcion que se ejecuta al cargar la pagina
 */
findAllUniversitiesTables();
