// Esto es para cargar el array del localstorage y en caso de que no exista nada en el localstorage, creamos un nuevo array con el nombre productos
var productos = JSON.parse(localStorage.getItem("productos")) || [];

//Mostramos los productos nada mas cargar la pagina
mostrarProductos();

//Cuando hacemos click en el boton de agregar
document.getElementById("btn_agregar").addEventListener("click", () => {
  var producto = {
    id: document.getElementById("id").value,
    nombre: document.getElementById("nombre").value,
    descripcion: document.getElementById("descripcion").value,
    imagen: document.getElementById("imagen").value,
    precio: document.getElementById("precio").value,
    categoria_id: document.getElementById("categoria").value,
    stock: document.getElementById("stock").value,
  };

  // RESETEAMOS ERRORES
  resetearErrores();

  // VALIDACIONES

  if (validarCampos(producto)) {
    //Pintamos el producto
    pintarProducto(producto, productos.length);
    //Añadimos el producto al array
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
    alert("Producto agregado con exito");
    console.table(producto);
    limpiarCampos();
  }
});

// BOTON PARA LIMPIAR CAMPOS
document.getElementById("btn_limpiar").addEventListener("click", () => {
  limpiarCampos();
});

//Creamos una funcion para pintar los productos
function pintarProducto(producto, index) {
  var html = "";
  const contenedor_producto = document.getElementById("resultado");
  let div_producto = document.createElement("div");
  div_producto.classList.add("card", "m-4");
  div_producto.style.width = "18rem";

  // let div_img = document.createElement("div");
  // let img = document.createElement("img");
  // img.setAttribute("src", producto.imagen);
  // div_img.appendChild(img);
  html = `
            <img src="${producto.imagen}" class="card-img-top" alt="imagen">
              <div class="card-body">
                <h5 class="card-title"><b>ID:</b> ${producto.id}</h5>
                <p class="card-text"><b>Nombre:</b> ${producto.nombre}</p>
                <p class="card-text"><b>Descripcion:</b> ${producto.descripcion}</p>
                <p class="card-text"><b>Precio:</b> ${producto.precio}€</p>           
                <p class="card-text"><b>Categoria:</b> ${producto.categoria_id}</p>
                <p class="card-text"><b>Stock:</b> ${producto.stock}</p>
              </div>
            `;

  div_producto.innerHTML = html;
  // div_producto.appendChild(div_img);

  div_botones = document.createElement("div");
  div_botones.classList.add(
    "d-grid",
    "gap-2",
    "d-md-flex",
    "justify-content-md-end"
  );

  //Creamos el boton de eliminar
  let btn_eliminar = document.createElement("button");
  btn_eliminar.textContent = "Eliminar";
  btn_eliminar.classList.add("btn", "btn-danger");
  div_producto.appendChild(div_botones);
  div_botones.appendChild(btn_eliminar);
  //Cuando hacemos click en el boton de eliminar
  btn_eliminar.addEventListener("click", () => {
    //Funcion de eliminar producto
    eliminarProducto(producto.id);
    contenedor_producto.removeChild(div_producto);
  });

  let btn_editar = document.createElement("button");
  btn_editar.textContent = "Editar";
  btn_editar.classList.add("btn", "btn-warning");
  div_producto.appendChild(div_botones);
  div_botones.appendChild(btn_editar);
  //Cuando hacemos click en el boton de editar
  btn_editar.addEventListener("click", (event) => {
    event.preventDefault();
    //Funcion de editar producto
    if (validarCamposEditados(producto)) {
      editarProducto(producto);
    }
  });

  document.getElementById("btn_cancelar").addEventListener("click", () => {
    let contenedor1 = document.getElementById("container1");
    let contenedor2 = document.getElementById("container2");
    contenedor1.style.display = "block";
    contenedor2.style.display = "none";
  });

  contenedor_producto.appendChild(div_producto);
}

//Creamos una funcion para mostrar los productos
function mostrarProductos() {
  productos.forEach((producto, index) => {
    pintarProducto(producto, index);
  });
}

//Creamos una funcion para eliminar productos
function eliminarProducto(id) {
  //Con la funcion findIndex buscamos un producto para eliminarlo por su id
  let index = productos.findIndex((producto) => producto.id === id);

  let producto_eliminado = productos[index];
  //Con la funcion splice, buscamos el elemento index en el array y eliminas 1 elemento
  productos.splice(index, 1);

  //Una vez borramos el producto actualizamos el localStorage
  localStorage.setItem("productos", JSON.stringify(productos));
  alert(
    "El producto con el ID " +
      producto_eliminado.id +
      " ha sido eliminado correctamente"
  );
}
//Creamos una funcion para editar productos
function editarProducto(producto) {
  let contenedor1 = document.getElementById("container1");
  let contenedor2 = document.getElementById("container2");
  contenedor1.style.display = "none";
  contenedor2.style.display = "block";

  document.getElementById("id_editado").value = producto.id;
  document.getElementById("nombre_editado").value = producto.nombre;
  document.getElementById("descripcion_editada").value = producto.descripcion;
  document.getElementById("imagen_editada").value = producto.imagen;
  document.getElementById("precio_editado").value = producto.precio;
  document.getElementById("categoria_editada").value = producto.categoria_id;
  document.getElementById("stock_editado").value = producto.stock;
  window.scrollTo(0, 0);
  document.getElementById("btn_modificar").onclick = (event) => {
    event.preventDefault();

    producto.nombre = document.getElementById("nombre_editado").value;
    producto.descripcion = document.getElementById("descripcion_editada").value;
    producto.imagen = document.getElementById("imagen_editada").value;
    producto.precio = document.getElementById("precio_editado").value;
    producto.categoria_id = document.getElementById("categoria_editada").value;
    producto.stock = document.getElementById("stock_editado").value;

    resetearErroresEditados();
    if (validarCamposEditados(producto)) {
      alert("Producto editado con exito");
      localStorage.setItem("productos", JSON.stringify(productos));

      document.getElementById("resultado").innerHTML = "";
      mostrarProductos();
      contenedor1.style.display = "block";
      contenedor2.style.display = "none";
    }
  };
}

// FUNCION PARA VALIDAR LOS CAMPOS
function validarCampos(producto) {
  let campoValido = true;

  if (producto.id === "" || isNaN(producto.id)) {
    document.getElementById("id").style.border = "2px solid red";
    campoValido = false;
  }
  if (producto.nombre === "") {
    document.getElementById("nombre").style.border = "2px solid red";
    campoValido = false;
  }
  if (producto.descripcion === "") {
    document.getElementById("descripcion").style.border = "2px solid red";
    campoValido = false;
  }
  if (producto.imagen === "") {
    document.getElementById("imagen").style.border = "2px solid red";
    campoValido = false;
  }
  if (producto.precio === "" || isNaN(producto.precio)) {
    document.getElementById("precio").style.border = "2px solid red";
    campoValido = false;
  }
  if (producto.categoria_id === "") {
    document.getElementById("categoria").style.border = "2px solid red";
    campoValido = false;
  }
  if (producto.stock === "" || isNaN(producto.stock)) {
    document.getElementById("stock").style.border = "2px solid red";
    campoValido = false;
  }

  if (
    productos.find(
      (productoExistente) => productoExistente.id.toString() === producto.id
    )
  ) {
    alert("El ID introducido ya existe, por favor introduce otro ID");
    document.getElementById("id").style.border = "2px solid red";
    return false;
  }

  return campoValido;
}

// FUNCION PARA RESETAR LOS CAMPOS
function resetearErrores() {
  document.getElementById("id").style.border = "2px solid green";
  document.getElementById("nombre").style.border = "2px solid green";
  document.getElementById("descripcion").style.border = "2px solid green";
  document.getElementById("imagen").style.border = "2px solid green";
  document.getElementById("precio").style.border = "2px solid green";
  document.getElementById("categoria").style.border = "2px solid green";
  document.getElementById("stock").style.border = "2px solid green";
}

// FUNCION PARA LA VALIDACION EN LA EDICCION
function validarCamposEditados(producto) {
  let campoValido = true;

  if (producto.nombre === "") {
    document.getElementById("nombre_editado").style.border = "2px solid red";
    campoValido = false;
  }
  if (producto.descripcion === "") {
    document.getElementById("descripcion_editada").style.border =
      "2px solid red";
    campoValido = false;
  }
  if (producto.imagen === "") {
    document.getElementById("imagen_editada").style.border = "2px solid red";
    campoValido = false;
  }
  if (producto.precio === "" || isNaN(producto.precio)) {
    document.getElementById("precio_editado").style.border = "2px solid red";
    campoValido = false;
  }
  if (producto.categoria_id === "") {
    document.getElementById("categoria_editada").style.border = "2px solid red";
    campoValido = false;
  }
  if (producto.stock === "" || isNaN(producto.stock)) {
    document.getElementById("stock_editado").style.border = "2px solid red";
    campoValido = false;
  }

  return campoValido;
}

// RESETEAMOS LOS ERRORES EN LA EDICCION
function resetearErroresEditados() {
  document.getElementById("nombre_editado").style.border = "";
  document.getElementById("descripcion_editada").style.border = "";
  document.getElementById("imagen_editada").style.border = "";
  document.getElementById("precio_editado").style.border = "";
  document.getElementById("categoria_editada").style.border = "";
  document.getElementById("stock_editado").style.border = "";
}

// FUNCION PARA LIMPIAR LOS CAMPOS
function limpiarCampos() {
  document.getElementById("id").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("imagen").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("id").style.border = "";
  document.getElementById("nombre").style.border = "";
  document.getElementById("descripcion").style.border = "";
  document.getElementById("imagen").style.border = "";
  document.getElementById("precio").style.border = "";
  document.getElementById("categoria").style.border = "";
  document.getElementById("stock").style.border = "";
}

// Subir hacia arriba desde cualquier sitio de la pagina
document.getElementById("arriba").addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo(0, 0);
});
