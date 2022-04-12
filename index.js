require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const path = require('path');
const hbs = require('hbs');
//Traemos la librería para la conexión
const mysql = require('mysql2');

/* //Creamos la configuración de la conexión
    const conexion =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hakunamatata20",
    database: "proyectofinal",
}); 

//Conectamos a la DB
conexion.connect((error) =>{
    if(error) throw error;
    console.log('Conexión a la Data Base exitosa!!');
});   */

app.use(express.json());
app.use(express.urlencoded({extended:false}));
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'))

//Configuramos el Motor de Plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.get('/', (req, res) =>{
    res.render('index', {titulo: 'Bienvenidos a Alabama Beer'})
});

app.get('/formulario', (req, res) =>{
    res.render('formulario', {titulo: 'Haz tu pedido'})
});

app.post('/formulario', (req, res) =>{
    
    res.render('productos', {
        titulo: 'MENU',
    }); 
    //Desestructuración de las variables
    const { nombre, precio,} = req.body;
        
    if(nombre == "" || precio == ""){
        
        let validacion = 'Faltan datos para guardar el Pedido';
        
        res.render('formulario', {
            titulo: 'Haz tu pedido',
            validacion
        });

    }else{
        console.log(nombre);
        console.log(precio);
        
        //Insertar datos a la DB
        let data = {
            producto_nombre: nombre, 
            producto_precio: precio, 
        }

        let sql = 'Insert into productos set ?';

        conexion.query(sql, data, (error, results) =>{
            if(error) throw error;
            res.render('index', {
                titulo: 'Bienvenidos a Alabama Beer',
            }); 
        })
    }
});

app.get('/productos', (req, res) =>{
        res.render('productos', {titulo: 'MENU'})
});

app.get('/bebidas', (req, res) =>{
    res.render('bebidas', {titulo: 'Bebidas'})
});

//conexion.end();

app.listen(PORT, () => {
    console.log('el servidor es ' + PORT);
});

app.on('error', (err) =>{
    console.log(`Error en la ejecución del Servidor ${error}`);
})

