# TP2-ProyectoFinal
## PICADAS & BIRRAS

### Stack:
- NodeJS
- Express
- MongoDB

### Descripción

Picadas & Birras es una aplicación para que los usuarios puedan acceder a la compra de picadas y cervezas/bebidas de productores locales.
La aplicación ofrece la posibilidad de realizar compras por:
- unidad (un tipo de cerveza, una sola picada)
- combos (combos de distintos tipos de cerveza o cerveza + picada)
 
Los usuarios podrán navegar por el listado de productos, filtrar por tipo de producto, por precio descendente y ascendente, agregar los productos con su cantidad a un nuevo carrito y acceder a su historial de compras.

### Funcionalidades:

- Login/Registro
- ABM usuarios
- ABM productos
- Filtro por tipo de producto (combo/bebida/comida)
- Orden de productos por precio (ascendente/descendente y viceversa)
- Comprar productos
- Obtener el historial de compra

### Instrucciones de Uso:

El proyecto se encuentra deployado en Heroku con la siguiente URL:
[https://tp2-proyecto-final.herokuapp.com]


### Listado de endpoints:
#### Home Productos/ Historial de Compras

- Get All Productos
[https://tp2-proyecto-final.herokuapp.com/api/productos]

- Get producto por Id
[https://tp2-proyecto-final.herokuapp.com/api/productos/:id]

- Agregar un producto (con token de admin)
[https://tp2-proyecto-final.herokuapp.com/api/productos]
```
En body:
{
       "titulo": "[titulo]”,
       "descripcion": “[descripcion]”,
       "precio": [precio],
       "imagen": "[imagen]",
       "tipo": "[tipo]",
       "stock": [stock]
   }
```
- Modificar un producto (con token de admin)
​​[https://tp2-proyecto-final.herokuapp.com/api/productos]
```
En body:
{
       "_id": "[id]",
       "titulo": "[titulo]",
       "descripcion": "[descripcion]",
       "precio": [precio],
       "imagen": "[imagen]",
       "tipo": "[tipo]",
       "stock": [stock]
   }
```
- Eliminar un producto (con token de admin)
[https://tp2-proyecto-final.herokuapp.com/api/productos/:id]

- Comprar productos (con token de usuario)
[https://tp2-proyecto-final.herokuapp.com/api/productos/comprar]
```
En body:
{"productos": [{
       "_id": "[id]",
       "titulo": "[titulo]",
       "precio": [precio],
       "cantidad": [cantidad]
   },
   {
       "_id": "[id]",
       "titulo": "[titulo]",
       "precio": [precio],
       "cantidad": [cantidad]
   }],
   "_id": "[id]"
}
```
- Get historiales por Id de usuario
[https://tp2-proyecto-final.herokuapp.com/api/historial/:id]
- Filtrar productos por tipo
[https://tp2-proyecto-final.herokuapp.com/api/productos/filter?tipo=[tipo]]
- Get productos de menor a mayor precio
[http:https://tp2-proyecto-final.herokuapp.com/api/productos/menorPrecio]
- Get productos de mayor a menor precio
[https://tp2-proyecto-final.herokuapp.com/api/productos/menorPrecio]


#### Users
- Agregar usuario
[https://tp2-proyecto-final.herokuapp.com/api/users]
```
En body:
{
   "email":"[email]",
   "password":"[password]"
}
```
- Login
[https://tp2-proyecto-final.herokuapp.com/api/users/login]
```
En body:
{
   "email":"[email]",
   "password":"[password]"
}
```
- Agregar admin (con token de admin)
[https://tp2-proyecto-final.herokuapp.com/api/users/admin]
```
En body:
{
   "email":"[email]",
   "password":"[password]"
}
```
- Get All Users (con token de admin)
[https://tp2-proyecto-final.herokuapp.com/api/users]

- Borrar User (Desactivar/Baja Lógica)
[https://tp2-proyecto-final.herokuapp.com/api/users/:id]

