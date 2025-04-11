const http = require('http');

let listaProductos = [];
const miServidor = http.createServer((peticion, respuesta) => {
    respuesta.writeHead(200, { 'Content-Type': 'application/json' });

    if (peticion.url == '/products' && peticion.method == 'GET') {
        respuesta.end(JSON.stringify(listaProductos));
    }
    else if (peticion.url == '/products' && peticion.method == 'POST') {
        let datos = '';
        peticion.on('data', pedazo => {
            datos += pedazo;
        });
        peticion.on('end', () => {
            let productoNuevo = JSON.parse(datos);
            let producto = {
                id: listaProductos.length + 1,
                nombre: productoNuevo.name,
                precio: productoNuevo.price
            };
            listaProductos.push(producto);
            respuesta.end(JSON.stringify(listaProductos));
        });
    }
    else {
        respuesta.end('{"mensaje":"No encontré eso"}');
    }
});

miServidor.listen(3000);

// Por qué es monolítica: Todo está en este archivo. No separé el código en partes, como la lista de productos o las funciones para agregar y listar. Es como un solo bloque grande.
// Desventajas:
// 1. Es difícil entenderlo si se hace más grande porque todo está junto.
// 2. No puedo hacer que una parte crezca sola, todo depende de este archivo.
// 3. Si cambio algo, puedo romper otra cosa sin darme cuenta.
// 4. Probar una parte sola es complicado porque no está separada.
