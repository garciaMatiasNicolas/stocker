// SETTING SERVER 

const express = require('express');
const {Server: HttpServer} = require('http');
const {Server : IOServer} = require('socket.io');
const app = express();
const http = new HttpServer(app);
const io = new IOServer (http);

app.use(express.urlencoded({extended: true}));
app.use(express.json())

// SETTING EJS 

app.set('views', './public/views');
app.set('view engine', 'ejs');

//ARRAYS

const products = [];
const messages = [];

//KNEX

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'messages'
    }
})

class Container {
    constructor(config){
        this.config = config
    }

    create(){
        return this.config.schema.createTable("mensajes", table =>{
            table.increments("id").primary();
            table.string("athor")
            table.string("message")
        })
        .then(()=>{console.log("table created")})
        .catch((e)=>{console.error(e)})
        .finally(()=>{this.config.destroy()})
    }

    insertData(data){
        this.config("mensajes").insert(data)
        .then(()=>{console.log("data inserted")})
        .catch((e)=>{console.error(e)})
        .finally(()=>{this.config.destroy()})
    }
}

const config = new Container(knex);
config.create()

// RENDERING INDEX

app.get('/', (req, res)=>{
    res.render('pages/index', {products})
});

// SOCKETS

io.on('connection', socket=>{
    console.log('New client connected');
    socket.on("client-data", data => {
        products.push(data)
        io.sockets.emit('render-products', products)
    });
    socket.on('client-message', data => {
        messages.push(data);
        console.log(messages);
        config.insertData(messages)
        io.sockets.emit('new mensaje', messages)
    })
})

//LISTEN SERVER

const PORT = 8080;

http.listen(PORT, ()=>{
    console.log('Server running');
})