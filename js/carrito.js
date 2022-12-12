//Esta funcion vacia el carrito del local storage
const vaciar = () => {
  localStorage.removeItem("carritoguardado");

  location.reload();
};

//Aca renderizamos los productos guardados en el local storage del carrito
let resumen = document.getElementById("resumen");
let carritoAlmacenado = JSON.parse(localStorage.getItem("carritoguardado"));
let cantidad = 1;
carritoAlmacenado.forEach((item) => {
  let tr = document.createElement("tr");
  tr.innerHTML = `
  <td class="shoping__cart__item">
      <img src=${item.imagen} alt="">
      <h5>${item.nombre}</h5>
  </td>
  <td class="shoping__cart__price">
      
  </td>
  <td class="shoping__cart__quantity">
      
  </td>
  <td class="shoping__cart__total">
      $ ${item.precio}
  </td>
  `;
  resumen.append(tr);
});

//Aca esperamos el evento correspondiente a vaciar el carrito
let borrar = document.getElementById("borrar");
borrar.addEventListener("click", () => {
  Swal.fire({
    title: "Borrar?",
    text: "Seguro quieres vaciar el carrito?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, dale!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Listo!", "Hemos vaciado el Carrito", "Gracias");
      setTimeout(() => {
        vaciar();
      }, 1500);
    }
  });
});

//Aca calculamos el importe total de los productos agregados y renderizamos el resultado
let subtotal = document.getElementById("subtotal");
let total = 0;
carritoAlmacenado.forEach((item) => {
  total += parseInt(item.precio);
});
let div = document.createElement("div");
div.innerHTML = `
<h5>Total Carrito</h5>
<ul>
    <li>Total <span>$ ${total}</span></li>
</ul>
<a href="#" id='compra' class="primary-btn">Comprar</a>
`;
div.className = "shoping__checkout";
subtotal.append(div);

//Aca esperamos la confirmacion de la compra. La funcion solamente vacia el local storage simulando la compra.
let compra = document.getElementById("compra");
compra.addEventListener("click", () => {
  // let result = confirm("Confirmas la compra de estos productos?");
  // if (result) {
  //   vaciar();
  // }
  // alert("Muchas gracias!");
  Swal.fire({
    title: "Comprar?",
    text: "Confirmas la compra de estos productos?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, dale!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Comprado!", "Muchas gracias por elegirnos!", "Vuelva pronto");
      setTimeout(() => {
        vaciar();
      }, 1500);
    }
  });
});
