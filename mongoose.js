//require
const mongoose = require("mongoose");

//connect
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});

//schema
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your name"]
    },
    price: {
        type: Number,
        min: 1,
        max: 10
    }
});

//model
const Fruit = mongoose.model("Fruit", fruitSchema);

//Create
const fruit = new Fruit({
    name: "Apple",
    price: 70
});

// uncomment fruit.save(); only when added the data
// fruit.save();

//insert many

const kiwi = new Fruit({
    name: "Kiwi",
    price: 100
});

const orange = new Fruit({
    name: "Orange",
    price: 90
});

Fruit.insertMany([kiwi, orange], function(err){
    if (err){
        console.log(err);
    }
    else{
        console.log("Successfully saved all the ")
    }
});

//find
Fruit.find(function(err, fruits){
    if (err){
        console.log(err);
    }
    else{
        mongoose.connection.close();
        console.log(fruits);
    }
});

//update
Fruit.updateOne({_id: "5f977a11ffee5111bc02b641"}, {name: "Banana"}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Succesfully updated the document");
    }
});

//delete
Fruit.deleteOne({name: "Banana"}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("succesfully deleted");
    }
});

//deleteMany
Fruit.deleteMany({name: "Kiwi"}, function(err){
    if (err){
        console.log(err);
    }
    else{
        console.log("Deleted succesfully");
    }
});
