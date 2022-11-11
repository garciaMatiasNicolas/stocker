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

const products = []
app.get('/', (req, res)=>{
    res.render('pages/index', {products})
});


io.on('connection', ()=>{
    console.log('New client connected')
})

//LISTEN SERVER
const PORT = 8080;

http.listen(PORT, ()=>{
    console.log('Server running');
})