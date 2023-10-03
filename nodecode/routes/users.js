const express = require('express');
const config = require ('config');

const mysql = require('mysql');

var connection = mysql.createConnection({
    host : config.get("host"),
    user : config.get("user"),
    password : config.get("password"),
    database : config.get("database")
})

const appForUsers = express.Router();

appForUsers.get("/",(request,response)=>{
    connection.query("select * from users",(error,result)=>{
        if(error == null)
        {
            var data = JSON.stringify(result)
            response.setHeader("Content-Type","application/json")
            response.write(data)
        }
        else
        {
            console.log(error)
            response.setHeader("Content-Type","application/json")
            response.write(error)

        }
        response.end();
    })
})

appForUsers.post("/",(request,response)=>{
    var query = `insert into users (first_name,last_name,email,password,mobile) values ('${request.body.first_name}','${request.body.last_name}','${request.body.email}','${request.body.password}' ,'${request.body.mobile}')`;
    connection.query(query,(error,result)=>{
        if(error == null)
        {
            var data = JSON.stringify(result)
            response.setHeader("Content-Type","application/json")
            response.write(data)
        }
        else
        {
            console.log(error)
            response.setHeader("Content-Type","application/json")
            response.write(error)

        }
        response.end();
    })
})

appForUsers.put("/update/:id",(request,response)=>{
    var query = `update users set first_name = '${request.body.first_name}',
                                last_name = '${request.body.last_name}',
                                mobile = '${request.body.mobile}'
                                where id = ${request.params.id}`;
    connection.query(query,(error,result)=>{
        if(error == null)
        {
            var data = JSON.stringify(result)
            response.setHeader("Content-Type","application/json")
            response.write(data)
        }
        else
        {
            console.log(error)
            response.setHeader("Content-Type","application/json")
            response.write(error)

        }
        response.end();
    })
})

appForUsers.delete("/:id",(request,response)=>{
    var query = `delete from users where id = ${request.params.id}`;
    connection.query(query,(error,result)=>{
        if(error == null)
        {
            var data = JSON.stringify(result)
            response.setHeader("Content-Type","application/json")
            response.write(data)
        }
        else
        {
            console.log(error)
            response.setHeader("Content-Type","application/json")
            response.write(error)

        }
        response.end();
    })
})


// Show only User Added Quotes
appForUsers.get("/showquote/:id",(request,response)=>{
    var query = ` select * from quotes where user_id = ${request.params.id}`;
    connection.query(query,(error,result)=>{
        if(error == null)
        {
            var data = JSON.stringify(result)
            response.setHeader("Content-Type","application/json")
            response.write(data)
        }
        else
        {
            console.log(error)
            response.setHeader("Content-Type","application/json")
            response.write(error)

        }
        response.end();
    })
})

appForUsers.get("/getUser/:user_id",(request,response)=>{
    var query = `select * from users where id = ${request.params.user_id}`
    connection.query(query,(error,result)=>{
        if(error == null){
            var data = JSON.stringify(result)
            response.setHeader("Content-Type","application/json")
            response.write(data)
        }
        else{
            console.log(error)
            response.setHeader("Content-Type","application/json")
            response.write(error)
        }
        response.end();
    })
})

module.exports = appForUsers;