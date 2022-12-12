//Esta funcion vacia el local storage de los favortiros
const vaciar = () => {
  Swal.fire({
    title: "Borrar?",
    text: "Confirmas que borraras todos tus favoritos?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, dale!",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("favguardado");
      Swal.fire("Listo!", "Hemos vaciado tus favoritos", "Gracias");
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  });
};

//Aca renderizamos los productos que estan guardados en el local storage de favoritos
let resumen = document.getElementById("resumen");
let carritoAlmacenado = JSON.parse(localStorage.getItem("favguardado"));
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

//Aca esperamos el evento que llame a la funcion de vaciar los favs
let borrar = document.getElementById("borrar");
borrar.addEventListener("click", () => {
  vaciar();
});
