const express = require('express');
const { Server} = require('socket.io');
const { createServer } = require('node:http');


const app = express();
const server = createServer(app);
const port = 8000;
const io = new Server(server)

app.use(express.json())

app.use('/', require("./routes/chat"));

io.on('connection' , (socket) =>{
    console.log("connected on socket    ")
})

server.listen(port,()=>{
    console.log(`app listening at port : ${port}`);
})

