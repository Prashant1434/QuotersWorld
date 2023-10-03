const express = require('express');
const config = require ('config');

const mysql = require('mysql');

var connection = mysql.createConnection({
    host : config.get("host"),
    user : config.get("user"),
    password : config.get("password"),
    database : config.get("database")
})

const appForQuotes = express.Router();



appForQuotes.get("/",(request,response)=>{
    connection.query("select * from quotes",(error,result)=>{
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

appForQuotes.post("/:id",(request,response)=>{
    var query = `insert into quotes(text,author,user_id) values ('${request.body.text}','${request.body.author}',${request.params.id})`;
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

appForQuotes.put("/:id",(request,response)=>{
    var query = `update quotes set author = '${request.body.author}',
                                    text = '${request.body.text}'
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

appForQuotes.delete("/:quote_id",(request,response)=>{
    var query = `delete from quotes where id = ${request.params.quote_id} `;
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


module.exports = appForQuotes;