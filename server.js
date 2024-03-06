const express = require('express');
const cors = require('cors')
const { Server} = require('socket.io');
const { createServer } = require('node:http');
const connectToMongo = require("./db");

connectToMongo();

const app = express();
const server = createServer(app);
const port = 8000;
const io = new Server(server)
app.use(cors())
app.use(express.json())

app.use('/api/auth', require("./routes/auth"));

io.on('connection' , (socket) =>{
    console.log("connected on socket    ")
})

server.listen(port,()=>{
    console.log(`app listening at port : ${port}`);
})

