require("dotenv/config");
const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = `mongodb+srv://${process.env.MG_USERNAME}:${process.env.MG_PWD}@cluster0.sttei.mongodb.net/recipe-app?retryWrites=true&w=majority`;

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Recipe.create(data[0],console.log(data[0].title))
    Recipe.insertMany(data)
      .then(() => {
        Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 500 }, { new: true })
          .then((response) => console.log(response))
      })
      .then(() => {
        Recipe.deleteOne({ title: "Carrot Cake" })
        .then(()=>mongoose.connection.close())

      })
    })

 
  //.finally(() => mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

