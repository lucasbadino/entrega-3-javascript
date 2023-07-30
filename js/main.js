let usuarios = []
let autos = []
let prod = []
let carrito = []
let storagge_carrito = []
const clave = "carrito"


usuarios.push(new User("lucas", "lucas123", "badino", 26, "lucas@gmail.com"))


autos.push(new Auto(autos.length + 1, "Chevolet", "Prisma ltz manual", 2013, 3900000, "https://manasseroautos.com.ar/media/imagenes/getImagen/289/750/420/0"))
autos.push(new Auto(autos.length + 1, "Nissan", "Sentra Advance plus at", 2020, 4590000, "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/s/RT_V_fd3e089451614f89b41c9e2648c068ad.jpg"))
autos.push(new Auto(autos.length + 1, "Chevolet", "cruze ltz plus at", 2017, 2000000, "https://cdn.motor1.com/images/mgl/1bRAw/s1/lanzamiento-chevrolet-cruze-lt-2020.jpg"))
autos.push(new Auto(autos.length + 1, "Peugeot", "207 hdi allure", 2016, 1980000, "https://cdn.motor1.com/images/mgl/yMkRb/s1/lanzamiento-peugeot-207-compact-quiksilver.webp"))

let bot = document.querySelector("#button")

bot.addEventListener("click", () => {
    Swal.fire({
        title: 'Inicia Sesion',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Usuario">
        <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: 'Iniciar',
        focusConfirm: false,
        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#login').value
            const password = Swal.getPopup().querySelector('#password').value
            if (!login || !password) {
                Swal.showValidationMessage(`No has ingresado ningun valor`)
            }
            return { login: login, password: password }
        }
    }).then((result) => {
        if (result.value.login == usuarios[0].usuario && result.value.password == usuarios[0].contrasenia) {
            let contenido = document.querySelector("#main")
            let info = document.createElement("div")
            info.innerHTML = contenido_html()
            contenido.appendChild(info)
            let ocultar = document.querySelector("#ocultar")
            ocultar.innerHTML = ""
            mostrar_datos_usuario()
            mostrar_autos(autos)
            alert_storage()
            agregar_autos()
            buscar()

        } else {
            toasty("Error Usuario No Existente", 2000)
            
        
        }
    })
})






function agregar_autos() {
    let bot = document.querySelector("#btn-form")
    bot.addEventListener("click", (e) => {
        let prod = document.querySelector("#div")
        while (prod.firstChild) {
            prod.removeChild(prod.firstChild)
        }

        let marca = document.querySelector("#marca").value
        let modelo = document.querySelector("#modelo").value
        let anio = document.querySelector("#anio").value
        let precio = document.querySelector("#precio").value
        let imagen = document.querySelector("#imagen").value
        autos.push(new Auto(autos.length + 1, marca, modelo, anio, precio, imagen))
        toasty("Creacion Exitosa", 800)
        mostrar_autos(autos)
    })



}

function mostrar_autos(valor) {
    let prod = document.querySelector("#div")
    while (prod.firstChild) {
        prod.removeChild(prod.firstChild)
    }
    valor.forEach(e => {
        let prod = document.querySelector("#div")
        let auto = document.createElement("div")
        auto.id = `prod-${e.id}`
        auto.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${e.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
        <h4 class="card-title">${e.marca}</h5>
        <h5 class="card-text">${e.modelo}  ${e.anio}</h5>
        <h6 class="card-text">$ ${e.precio}</h6>
        <a id=""href="javascript:traer_item(${e.id})" class="btn btn-primary">Agregar al carrito</a>
    </div>
    </div>
                    `
        prod.appendChild(auto)
    });


}

function traer_item(id) {
    let prod = document.querySelector("#prod-" + id)

    let marca = prod.querySelector("h4").textContent;
    let modelo = prod.querySelector("h5").textContent;
    let img = prod.querySelector("img").src;
    let precio = prod.querySelector("h6").textContent.substring(1, prod.querySelector("h6").textContent.length);
    let n_prod = new Carrito(id, marca, modelo, precio, img)
    agregar(n_prod)

}

function agregar(auto) {
    let exist = carrito.some(p => p.id == auto.id)
    if (exist) {
        let art = carrito.map(p => {
            if (p.id == auto.id) {
                p.cantidad++
                return p;
            } else {
                return p;
            }
        })

    } else {

        carrito.push(auto)
    }
    toasty("Agregado Exitosamente", 1000)
    recorrer_carrito()
}
function eliminar(id) {
    let con = false
    swal({
        title: "Estas seguro?",
        text: "Vas a eliminar el vehiculo del carrito",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Eliminaste el vehiculo del carrito", {
                    icon: "success",

                });
                let exist = carrito.some(p => p.id == id)
                carrito.forEach(e => {
                    if (e.cantidad <= 1) {
                        carrito = carrito.filter(e => e.id != id)
                    }
                })

                if (exist) {
                    carrito.map(p => {
                        if (p.id == id) {
                            p.cantidad--
                            return p;
                        } else {
                            return p;
                        }
                    })

                }
                recorrer_carrito()


            } else {
                swal("Conservaste el vehiculo");
            }
            con = false
        });

}

function recorrer_carrito() {
    let cantidad = 0
    if (carrito.length == 0) {
        localStorage.clear(clave)
    }
    let div = document.querySelector("#carr")
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }
    storagge_carrito = []
    carrito.forEach(e => {
        cantidad += e.cantidad
        let div = document.querySelector("#carr")
        let elem = document.createElement("div")
        elem.id = "prod" + e.id

        storagge_carrito.push(e)
        add_storagge(clave, storagge_carrito)
        elem.innerHTML = `
            <div class="d-flex flex-row align-items-center"><span class="text-black-50"></span>
            <div class="price ml-2"><span class="mr-1"></span><i class="fa fa-angle-down"></i>
            </div>
            </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
            <div class="d-flex flex-row"><img class="rounded" src="${e.imagen}"
            width="300">
            <div class="ml-2"><span class="font-weight-bold d-block">${e.marca}</span><span
                class="spec">${e.modelo}</span></div>
            </div>
            <a href="javascript:eliminar(${e.id})">-</a><a href="#" class="border">${e.cantidad}</a><a href="javascript:traer_item(${e.id})">+</a>
            <div class="d-flex flex-row align-items-center"><span
            class="d-block ml-5 font-weight-bold">$${e.precio * e.cantidad}</span><i
            class="fa fa-trash-o ml-3 text-black-50"></i></div>
            </div>
                        `
        div.appendChild(elem)
    })
    suma_totales()



}
function suma_totales() {
    let cantidad = 0
    let suma_total = 0
    carrito.forEach(e => {
        cantidad += e.cantidad;
        if (e.cantidad > 1) {
            suma_total += parseInt((e.precio * e.cantidad))
        } else {
            suma_total += parseInt(e.precio)
        }
    })

    let total = document.querySelector("#total")
    let elem1 = document.createElement("p")
    while (total.firstChild) {
        total.removeChild(total.firstChild)
    }
    elem1.innerHTML = `Total $ ${suma_total}`
    total.appendChild(elem1)

    document.querySelector("#can").innerHTML = `Tienes ${cantidad} productos en tu carrito`

}

function buscar() {
    document.querySelector("#buscar").addEventListener("keyup", () => {
        let buscar = document.querySelector("#buscar").value
        let prod = []
        prod = autos.filter(e =>
            e.marca.toLowerCase().includes(buscar.toLowerCase()) ||
            e.modelo.toLowerCase().includes(buscar.toLowerCase())
        )
        mostrar_autos(prod)
    })
}

function add_storagge(clave, item) {
    localStorage.clear(clave)
    let json = JSON.stringify(item)
    localStorage.setItem(clave, json)
}

function toasty(text, time) {
    Toastify({
        text: text,
        duration: time,
    }).showToast();
}
function alert_storage() {
    let cant = 0
    let local = []
    if (localStorage.length) {
        local = localStorage.getItem(clave)
        local = JSON.parse(local)
        local.forEach(e => {
            cant += e.cantidad
            console.log(local)
        })
        swal({
            title: "Tienes Articulos En El Carrito",
            text: `Dejaste ${cant} productos sin comprar, deseas recuperarlo?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    local.forEach(e => {
                        carrito.push(e)
                        recorrer_carrito()
                    })
                }
            })
    }

}
function contenido_html() {
    return `<div id="div" class="d-flex">

    </div>
    <h1 class="text-center"> Agregar un vehiculo</h1>
    <div class="div-form">
        <div class="input-group mb-3 ">
            <input id="marca" type="text" class="form-control" placeholder="Marca" aria-label="Username"
                aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3 ">
            <input id="modelo" type="text" class="form-control" placeholder="Modelo" aria-label="Username"
                aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3 ">
            <input id="anio" type="number" class="form-control" placeholder="año" aria-label="Username"
                aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3 ">
            <input id="precio" type="number" class="form-control" placeholder="precio" aria-label="Username"
                aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3 ">
            <input id="imagen" type="text" class="form-control" placeholder="imagen (colocar url)"
                aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <button id="btn-form" type="submit" class="btn btn-primary">Crear</button>
    </div>
    <div class="container mt-5 p-3 rounded cart1">
        <div class="col-md-15">
            <h6 class="mb-0">Carrito</h6>
            <div class="d-flex justify-content-between"><span>
                    <div id="can"> </div>
                </span></div>
            <div id="carr" class="product-details mr-2">
                <div class="d-flex flex-row align-items-center"><i class="fa fa-long-arrow-left"></i><span
                        class="ml-2">Continuar Compra</span></div>
                <hr>
            </div>
            <div id="total" class="text-center">
            </div>
        </div>
    </div>`;

}
function mostrar_datos_usuario(){
    let datos = document.querySelector("#usuario")
    datos.innerHTML = `
    Bienvenido ${usuarios[0].apellido.toUpperCase()} ${usuarios[0].usuario.toUpperCase()}
    `
}