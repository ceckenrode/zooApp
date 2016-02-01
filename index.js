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
  welcome: function() {
    console.log('Welcome to the Zoo and Friends App~!');
  },
  menu: function() {
    console.log('Enter (A) ----- to Add a new Animal to the Zoo!');
    console.log('Enter (U) ----- to Update info on an animal in the Zoo!');
    console.log('Enter (V) ----- to Visit the animals in the Zoo!');
    console.log('Enter (D) ----- to Adopt an animal from the Zoo!');
    console.log('');
    console.log('Enter (Q) ----- to Quit/Exit the Zoo');
  },
  add: function(input_scope) {
    var currentScope = input_scope;
    console.log("To add an animal to the zoo please fill out the following form for us!");
    prompt.get(['caretaker_id', 'name', 'type', 'age'], function(err, result) {
      var query = 'INSERT INTO animals (caretaker_id,name,type,age) VALUES (?,?,?,?)';
      var toAdd = [result.caretaker_id, result.name, result.type, result.age];
      connection.query(query, toAdd, function(err, results) {
        if (err) throw err;

        console.log('Added ' + result.name + ' to the database!');
        connection.end();
      });
    });
  },
  visit: function() {
    console.log("Enter (I): ----- do you know the animal by it's id? We will visit that animal!");
    console.log("Enter (N): ----- do you know the animal by it's name? We will visit that animal!");
    console.log("Enter (A): ----- here's the count for all animals in all locations!");
    console.log("Enter (C): ----- here's the count for all animals in this one city!");
    console.log("Enter (O): ----- here's the count for all the animals in all locations by the type you specified!");
    console.log("Enter (Q): ----- Quits to the main menu!");
    this.view(this);
  },
  view: function(input_scope) {
    var currentScope = input_scope;
    prompt.get(['visit'], function(err, result) {
      switch (result.visit) {
        case "Q":
          currentScope.menu();
          currentScope.promptUser();
          break;
        case "O":
          currentScope.type(currentScope);
          break;
        case "I":
          currentScope.animId(currentScope);
          break;
        case "N":
          currentScope.name(currentScope);
          break;
        case "A":
          currentScope.all(currentScope);
          break;
        case "C":
          currentScope.care(currentScope);
          break;
        default:
          console.log("Sorry, I didn't get that");
          currentScope.view();
      }
    });
  }
};
zoo.visit();
