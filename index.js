import express from "express";

const app = express();
const port = 3000;

//MIDDLEWARE 1. logger de las llamadas al servidor
app.use((req,res,next)=>{
    //req.metodo te muestra el tipo de peticion get post ....
    //req.url desde que ruta se hizo la peticion
    console.log(`Ruta de la peticion: ${req.url}\nTipo de peticion: ${req.method}`);


    // next() → le indica a Express que este middleware ya terminó
    // y que puede continuar con el siguiente middleware o con la ruta.
    //
    // Si no ponemos next(), la petición se queda detenida aquí
    // y no continuará hacia lo que viene después.
    next();
});
/*¿Por qué lo necesitamos?
Por defecto, cuando un cliente (como un formulario en el Frontend o Postman)
te envía datos en el cuerpo de una petición (req.body) usando un formato JSON, 
Express no sabe cómo leerlo y lo recibe como undefined.

app.use(express.json()) intercepta la petición, lee el texto en formato JSON 
que viene en el cuerpo y lo transforma automáticamente en un objeto de 
JavaScript accesible desde req.body.
*/



//MIDDLEWARE 2. decirle a express qque utilice formato json para recirbir
//las peticciones.
app.use(express.json());


//MIDDLEWARE 3. verificacion de la peticion 
//en este caso que la req.query osea todo lo que se escriba despues de ?
//sea exactamente 12345
//http://localhost:3000/administrador?key=12345
const ValidarApiKey = (req,res,next) => {
    const {key} = req.query;

    if(key !== '12345'){
        return res.status(401).json({ok:false, message : "Acceso denegado: API key invalida"})
    }
    next();

};



//tipo get para la raiz muestra un hola mundo
app.get('/',(req,res)=>{
    res.send("<h1>HOLA MUNDO</h1>");
});


//get para probar el middleware en este caso en una ruta para administrador
app.get('/administrador',ValidarApiKey , (req,res,next) => {
    res.json({ok:true,message:"Bienvenido Administrador"});
});


app.listen(port, ()=> {
    console.log('server listen on PORT: ',port);
});