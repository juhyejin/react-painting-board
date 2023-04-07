const express = require('express');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);
const PORT = 3000;

app.get('/', (_,res)=>{
  res.send('Hi! This is my first express server');
})
app.get('/*', (_,res)=>{
  res.redirect('/')
})
httpServer.listen(PORT, () => {
  console.log('서버연결 성공!')
})
