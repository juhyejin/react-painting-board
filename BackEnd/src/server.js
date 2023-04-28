import socketMain from "./socketController";

const express = require('express');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);
const { Server } = require('socket.io');
const socketServer = new Server(httpServer, {
  cors:{
    origin: ['http://localhost:5173'],
    methods:["GET","POST"],
    credentials: true
  }
});
const PORT = 3000;

socketServer.on('connection', socket => socketMain(socket, socketServer))

httpServer.listen(PORT, () => {
  console.log('서버연결 성공!')
})
