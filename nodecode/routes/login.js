const express = require('express');
const config = require ('config');

const mysql = require('mysql');

var connection = mysql.createConnection({
    host : config.get("host"),
    user : config.get("user"),
    password : config.get("password"),
    database : config.get("database")
})

const appForLogin = express.Router();



appForLogin.get("/",(request,response)=>{
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


module.exports = appForLogin;