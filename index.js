var mysql = require('mysql');
var prompt = require('prompt');
prompt.start();
prompt.message = '';
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zoo_db'
});

prompt.start();
connection.connect();
prompt.message = "";

var zoo = {
  welcome: function(){
    console.log('Welcome to the Zoo and Friends App~!');
  },
  menu: function(){
    console.log('Enter (A) ----- to Add a new Animal to the Zoo!');
    console.log('Enter (U) ----- to Update info on an animal in the Zoo!');
    console.log('Enter (V) ----- to Visit the animals in the Zoo!');
    console.log('Enter (D) ----- to Adopt an animal from the Zoo!');
    console.log('');
    console.log('Enter (Q) ----- to Quit/Exit the Zoo');
  },
  add: function(input_scope){
    var currentScope = input_scope;
    console.log("To add an animal to the zoo please fill out the following form for us!");
    prompt.get(['caretaker_id','name','type', 'age'],function(err, result){
      var query = 'INSERT INTO animals (caretaker_id,name,type,age) VALUES (?,?,?,?)';
      var toAdd = [result.caretaker_id,result.name,result.type,result.age];
      connection.query(query, toAdd, function(err, results) {
        if(err) throw err;

        console.log('Added ' + result.name + ' to the database!');
        connection.end();
      });
    });
  }
  };
zoo.add();
  