document.addEventListener('DOMContentLoaded', function() {
  const carrito = [];
  
  
  const carritoBtn = document.getElementById('carrito-btn');
  const carritoModal = document.getElementById('carrito-modal');
  const cerrarBtn = document.querySelector('.cerrar');
  const carritoItems = document.getElementById('carrito-items');
  const carritoTotal = document.getElementById('carrito-total');
  const carritoContador = document.getElementById('carrito-contador');
  const vaciarBtn = document.getElementById('vaciar-carrito');
  const pagarBtn = document.getElementById('pagar');
  
  
  carritoBtn.addEventListener('click', abrirCarrito);
  cerrarBtn.addEventListener('click', cerrarCarrito);
  vaciarBtn.addEventListener('click', vaciarCarrito);
  pagarBtn.addEventListener('click', pagar);
  
  
  document.querySelectorAll('.instrumento').forEach(instrumento => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-primario';
    btn.textContent = 'Añadir al carrito';
    btn.addEventListener('click', () => añadirAlCarrito(instrumento));
    instrumento.querySelector('.instrumento-info').appendChild(btn);
  });
  
  
  function abrirCarrito() {
    carritoModal.style.display = 'block';
    actualizarCarrito();
  }
  
  function cerrarCarrito() {
    carritoModal.style.display = 'none';
  }
  
  function añadirAlCarrito(instrumento) {
    const nombre = instrumento.querySelector('.instrumento-nombre').textContent;
    const precio = parseFloat(instrumento.querySelector('.instrumento-precio').textContent.replace(/[^0-9.]/g, ''));
    const imagen = instrumento.querySelector('.instrumento-img').src;
    
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({
        nombre,
        precio,
        imagen,
        cantidad: 1
      });
    }
    
    actualizarContador();
    mostrarNotificacion(`${nombre} añadido al carrito`);
  }
  
  function actualizarCarrito() {
    carritoItems.innerHTML = '';
    let total = 0;
    
    carrito.forEach((producto, index) => {
      total += producto.precio * producto.cantidad;
      
      const item = document.createElement('div');
      item.className = 'carrito-item';
      item.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
        <div>
          <p>${producto.nombre}</p>
          <p>$${producto.precio.toFixed(2)} x ${producto.cantidad}</p>
        </div>
        <button class="eliminar-item" data-index="${index}">×</button>
      `;
      
      carritoItems.appendChild(item);
    });
    
    carritoTotal.textContent = `$${total.toFixed(2)}`;
    
    
    document.querySelectorAll('.eliminar-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        carrito.splice(index, 1);
        actualizarCarrito();
        actualizarContador();
      });
    });
  }
  
  function actualizarContador() {
    const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    carritoContador.textContent = totalItems;
  }
  
  function vaciarCarrito() {
    carrito.length = 0;
    actualizarCarrito();
    actualizarContador();
  }
  
  function pagar() {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    
    alert(`Compra realizada por ${carritoTotal.textContent}\n¡Gracias por su compra!`);
    vaciarCarrito();
    cerrarCarrito();
  }
  
  function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
      notificacion.classList.add('mostrar');
      setTimeout(() => {
        notificacion.classList.remove('mostrar');
        setTimeout(() => {
          document.body.removeChild(notificacion);
        }, 300);
      }, 2000);
    }, 10);
  }
  
 
  window.addEventListener('click', (e) => {
    if (e.target === carritoModal) {
      cerrarCarrito();
    }
  });
});
