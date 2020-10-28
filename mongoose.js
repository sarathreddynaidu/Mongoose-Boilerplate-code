//require
const mongoose = require("mongoose");

//connect
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});

//schema
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a fruit name"]
    },
    price: Number,
    rating: {
        type: Number,
        min: 1,
        max: 10
    }
});

//model
const Fruit = mongoose.model("Fruit", fruitSchema);

//create
const fruit = new Fruit({
    name: "Apple",
    price: 80,
    rating: 7
});

//save (save only once)
fruit.save();

//person schema
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema //embedding fruit document into this property
});

//person model
const Person = mongoose.model("Person", personSchema);

const pear = new Fruit({
    name: "Pear",
    price: 60,
    rating: 5
});

pear.save();

const berry = new Fruit({
    name: "Berry",
    price: 50,
    rating: 4
});

// berry.save();

Person.updateOne({name: "Sarath"}, {favoriteFruit: berry}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Succesfully updated the document");
    }
});

// create person
const person = new Person({
    name: "Prudhvi",
    age: 20,
    favoriteFruit: pear
}); 

// save person to DB
person.save();


const kiwi = new Fruit({
    name: "Kiwi",
    price: 100,
    rating: 9
});

const orange = new Fruit({
    name: "Orange",
    price: 70,
    rating: 10
});

const banana = new Fruit({
    name: "Banana",
    price: 90,
    rating: 6
});

// insert many
// commit this out after inserting
Fruit.insertMany([kiwi, orange, banana], function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Succesfully saved all the fruits to fruitsDB");
    }
});

//find
Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }
    else{
        mongoose.connection.close(); //closes mongo connection
        console.log("FRUITS LIST:");
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
});

// update
Fruit.updateOne({_id: "5f98a60d397f31162401248b"}, {name: "Mango"}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Succesfully updated the document");
    }
});

//delete
Fruit.deleteOne({name: "Mango"}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Succesfully deleted the document");
    }
});

// delete many
Person.deleteMany({name: "Sarath"}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Succesfully deleted all the documents");
    }
});

