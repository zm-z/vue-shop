var mysql=require('mysql');

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'19981230',
    database:'login'
});

module.exports=connection;