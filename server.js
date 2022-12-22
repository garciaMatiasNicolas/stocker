// SETTING SERVER 
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import MessagesSchema from './src/MessageSchema.js';
import productRoute from './src/Routes.js';

const app = express();
const http = new createServer(app);
const io = new Server (http);

app.use('/products-test', productRoute)
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// SETTING EJS 

app.set('views', './public/views');
app.set('view engine', 'ejs');

// RENDERING INDEX

app.get('/', (_, res)=>{
    res.render('pages/index')
});

// SOCKETS

const products = [];
const messages = [];

io.on('connection', socket=>{
    console.log('New client connected');
    socket.on("client-data", data => {
        products.push(data);
        io.sockets.emit('render-products', products);
    });
    socket.on('client-message', data => {
        MessagesSchema.create(data);
        messages.push(data);
        io.sockets.emit('new mensaje', messages);
    })
})

//LISTEN SERVER

const PORT = 8080;

mongoose.connect('mongodb+srv://matigarcia:1708@test.0vglzka.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('Database connected');
    http.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err)=>{
    console.error(err)
})


