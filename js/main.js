// let usuarios = []
let autos = []
let prod = []
let carrito = []


// usuarios.push(new User("lucas", "lucas123", "badino", 26, "lucas@gmail.com"))
// usuarios.push(new User("juan", "juan123", "perez", 31, "juan@gmail.com"))
// usuarios.push(new User("pedro", "pedro123", "zapata", 26, "pedro@gmail.com"))


autos.push(new Auto(autos.length + 1, "Chevolet", "Prisma ltz manual", 2013, 3900000, "https://manasseroautos.com.ar/media/imagenes/getImagen/289/750/420/0"))
autos.push(new Auto(autos.length + 1, "Nissan", "Sentra Advance plus at", 2020, 4590000, "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/s/RT_V_fd3e089451614f89b41c9e2648c068ad.jpg"))
autos.push(new Auto(autos.length + 1, "Chevolet", "cruze ltz plus at", 2017, 2000000, "https://cdn.motor1.com/images/mgl/1bRAw/s1/lanzamiento-chevrolet-cruze-lt-2020.jpg"))
autos.push(new Auto(autos.length + 1, "Peugeot", "207 hdi allure", 2016, 1980000, "https://cdn.motor1.com/images/mgl/yMkRb/s1/lanzamiento-peugeot-207-compact-quiksilver.webp"))




// let bot = document.querySelector("#button")
// let res = false
// bot.addEventListener("click", () => {
//     let user = document.querySelector("#user").value
//     let pass = document.querySelector("#pass").value

//     usuarios.forEach(e => {
//         if (e.usuario == user && e.contrasenia == pass) {
//             res = true;
//         }
//     })
// })


mostrar_autos(autos)
agregar_autos()
buscar()




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
        Toastify({
            text: "Creacion Exitosa",
            duration: 600,
        }).showToast();
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

function eliminar(id){
    let exist = carrito.some(p => p.id == id)
    carrito.forEach(e => {
        if (e.cantidad <= 1 ){
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
    recorrer_carrito()
}
function recorrer_carrito() {
    let cantidad = 0

    let div = document.querySelector("#carr")
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }
    console.log(div)
    carrito.forEach(e => {
        cantidad += e.cantidad
        let div = document.querySelector("#carr")
        let elem = document.createElement("div")
        elem.id = "prod"+e.id
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
            class="d-block ml-5 font-weight-bold">$${e.precio}</span><i
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
    while(total.firstChild){
        total.removeChild(total.firstChild)
    }
    elem1.innerHTML = `Total $ ${suma_total}`
    total.appendChild(elem1)

    document.querySelector("#can").innerHTML = `Tienes ${cantidad} productos en tu carrito`
    // let tex = document.createElement("span")
    // tex.innerHTML = `Tienes ${cantidad} productos en tu carrito`
    // canti.appendChild(tex)

    
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



