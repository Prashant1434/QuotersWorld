const express = require('express');
const config = require ('config');
const UsersRelatedRoutes = require ('./routes/users');
const QuotesRelatedRoutes = require ('./routes/quotes');
const LoginRelatedRoutes = require ('./routes/login');
const FavRelatedRoutes = require('./routes/favquotes');
const server = express();

server.use((request,response,next)=>{
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Headers',"*");
    response.setHeader('Access-Control-Allow-Methods',"*");
    next();
})

server.use(express.json());

server.use("/user",UsersRelatedRoutes);
server.use("/quotes",QuotesRelatedRoutes);
server.use("/login",LoginRelatedRoutes);
server.use("/fav",FavRelatedRoutes);

const portNo = config.get("port");
server.listen(portNo,()=>{console.log("Listening at port"+portNo)});



