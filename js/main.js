// let usuarios = []
let autos = []


// usuarios.push(new User("lucas", "lucas123", "badino", 26, "lucas@gmail.com"))
// usuarios.push(new User("juan", "juan123", "perez", 31, "juan@gmail.com"))
// usuarios.push(new User("pedro", "pedro123", "zapata", 26, "pedro@gmail.com"))


autos.push(new Auto("Chevolet", "Prisma ltz manual", 2013, 3900000, "https://manasseroautos.com.ar/media/imagenes/getImagen/289/750/420/0"))
autos.push(new Auto("Nissan", "Sentra Advance plus at", 2020, 4590000, "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/s/RT_V_fd3e089451614f89b41c9e2648c068ad.jpg"))
autos.push(new Auto("Chevolet", "cruze ltz plus at", 2017, 2000000, "https://cdn.motor1.com/images/mgl/1bRAw/s1/lanzamiento-chevrolet-cruze-lt-2020.jpg"))
autos.push(new Auto("Peugeot", "207 hdi allure", 2016, 1980000, "https://cdn.motor1.com/images/mgl/yMkRb/s1/lanzamiento-peugeot-207-compact-quiksilver.webp"))




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


mostrar_autos()
agregar_autos()



function agregar_autos(){
    let bot = document.querySelector("#btn-form")

    

    bot.addEventListener("click", (e) =>{
        let prod = document.querySelector("#div")
        while(prod.firstChild){
            prod.removeChild(prod.firstChild)
        }
        
        let marca = document.querySelector("#marca").value
        let modelo = document.querySelector("#modelo").value
        let anio = document.querySelector("#anio").value
        let precio = document.querySelector("#precio").value
        let imagen = document.querySelector("#imagen").value
        autos.push(new Auto(marca, modelo, anio, precio, imagen ))
        mostrar_autos()
    } )
    


}

function mostrar_autos() {

    autos.forEach(e => {
        let prod = document.querySelector("#div")
        let auto = document.createElement("div")
        auto.id = "div-car"
        
        auto.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${e.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${e.marca}</h5>
        <p class="card-text">${e.modelo}  ${e.anio}</p>
        <p class="card-text">$ ${e.precio}</p>
        <a href="#" class="btn btn-primary">Comprar</a>
    </div>
    </div>
    
                    `
        prod.appendChild(auto)
    });


}