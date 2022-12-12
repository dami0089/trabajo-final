//Esta funcion esta hecha para que cuando el usuario seleccione una categoria, le muestre los productos de tal categoria
const mostreoProductos = (categoria) => {
  let tarjetaProducto = document.getElementById("producto");

  fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        if (categoria === item.categoria || categoria === "todos") {
          let div = document.createElement("div");
          div.innerHTML = `
    <div class="product__item">
    <div class="product__item__pic set-bg">
          <img src=${item.imagen}><img>
          <ul class="product__item__pic__hover">
          <li><a id='favorito${item.id}'><i class="fa fa-heart"></i></a></li>
          <li><a id='carrito${item.id}' ><i class="fa fa-shopping-cart"></i></a></li>
          </ul>
    </div>
    <div class="product__item__text">
          <h6><a href="#">${item.nombre}</a></h6>
          <h5>$ ${item.precio}</h5>
    </div>
    </div>
    `;
          tarjetaProducto.insertAdjacentElement("beforebegin", div);
          div.className = "col-lg-4 col-md-6 col-sm-6";
          let fav = document.getElementById(`favorito${item.id}`);
          let car = document.getElementById(`carrito${item.id}`);

          //aca esperamos los eventos y llamamos a la funcion correspondiente (agregar a fav o al carrito)
          fav.addEventListener("click", () => {
            agregarFav(item.id);
          });

          car.addEventListener("click", () => {
            agregarCarrito(item.id);
          });
        }
      });

      //Esta funcion agrega productos a los favoritos

      const agregarFav = (id) => {
        let favoritosAlmacenados = JSON.parse(
          localStorage.getItem("favguardado")
        );
        let agregado = data.find((item) => item.id === id);
        let compruevo = false;

        if (favoritosAlmacenados) {
          favoritosAlmacenados.find((item) => {
            if (item.id === id) {
              compruevo = true;
            } else {
              compruevo = false;
            }
          });
          if (compruevo) {
            Toastify({
              text: "Este producto ya fue agregado a favoritos antes",
              duration: 1000,
              style: {
                background: "linear-gradient(to left, #f83d5c, #fd4b2f)",
              },
            }).showToast();
          } else {
            let nuevosFavs = favoritosAlmacenados;
            nuevosFavs.push(agregado);
            localStorage.setItem("favguardado", JSON.stringify(nuevosFavs));

            Toastify({
              text: "Se agrego un nuevo favorito!",
              duration: 1000,
              style: {
                background: "linear-gradient(to left, #5da92f, #9bd46a)",
              },
            }).showToast();
          }
        } else {
          let favorito = [agregado];
          localStorage.setItem("favguardado", JSON.stringify(favorito));
          Toastify({
            text: "Se agrego un nuevo favorito!",
            duration: 1000,
            style: {
              background: "linear-gradient(to left, #5da92f, #9bd46a)",
            },
          }).showToast();
        }
      };
      //Esta funcion agrega productos al carrito
      const agregarCarrito = (id) => {
        let carritoAlmacenado = JSON.parse(
          localStorage.getItem("carritoguardado")
        );
        let carrito = data.find((item) => item.id === id);
        let carrinuevo = false;

        // Almaceno el carrito
        if (carritoAlmacenado) {
          carritoAlmacenado.find((item) => {
            if (item.id === id) {
              carrinuevo = true;
            } else {
              carrinuevo = false;
            }
          });
          if (carrinuevo) {
            Toastify({
              text: "Este producto ya esta en el carrito",
              duration: 1000,
              style: {
                background: "linear-gradient(to left, #f83d5c, #fd4b2f)",
              },
            }).showToast();
          } else {
            let nuevocarri = carritoAlmacenado;
            nuevocarri.push(carrito);
            localStorage.setItem("carritoguardado", JSON.stringify(nuevocarri));
            Toastify({
              text: "Agregado al Carrito",
              duration: 1000,
              style: {
                background: "linear-gradient(to left, #5da92f, #9bd46a)",
              },
            }).showToast();
          }
        } else {
          let carri = [carrito];
          localStorage.setItem("carritoguardado", JSON.stringify(carri));
          Toastify({
            text: "Agregado al Carrito",
            duration: 1000,
            style: {
              background: "linear-gradient(to left, #5da92f, #9bd46a)",
            },
          }).showToast();
        }
      };
    });
};
//Aca verificamos en que pagina se encuentra el usuario, para pasarle esa info a la funcion mostreo de Productos y asi mostrar los productos correspondientes
let pathname = window.location.pathname;
switch (pathname) {
  case "/index.html":
    mostreoProductos("todos");
    break;
  case "/verduleria.html":
    mostreoProductos("verduleria");
    break;
  case "/supermercado.html":
    mostreoProductos("supermercado");
    break;
  case "/comida-rapida.html":
    mostreoProductos("comida-rapida");
    break;
  case "/bazar.html":
    mostreoProductos("bazar");
    break;
  case "/libreria.html":
    mostreoProductos("libreria");
    break;
  case "/bebidas.html":
    mostreoProductos("bebidas");
    break;
  default:
    mostreoProductos("todos");
    break;
}
