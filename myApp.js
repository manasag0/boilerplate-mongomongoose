require('dotenv').config();
const mongoose = require('mongoose');

const {Schema, model} = mongoose;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },()=>{
  console.log("conneced with MongoDB")
});

const personSchama = new Schema({
  name: {type: String,require: true},
  age:Number,
  favoriteFoods: [String]
})

let Person = model("Person",personSchama);

const createAndSavePerson = (done) => {

  const person = new Person({
    name:"manasa",
    age:29,
    favoriteFoods:["pizza","biryani"]
  })
  person.save(function(err,data){
    done(null, data);
  })

 
};

let arrayOfPeople = [
  {name:"hello",age:"4",favoriteFoods:["rice","sambar"]}
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,data)=>{
    if(err){
      return(err)
    }
    done(null, data);
  })
 
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err,data)=>{
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
Person.findOne({favoriteFoods:food},(err,data)=>{
  if(err) return console.log(err);
  done(null, data)
})
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err,data)=>{
    if(err) return console.log(err);
    done(null,data);
  })

};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // Person.findById(personId,(err,data)=>{
  //   if(err) return console.log(err)
  //   data.favoriteFoods.push(foodToAdd)
  //   data.save((error,updateData)=>{
  //     if(error)return console.log(err)
  //     done(null, updateData)
  //   });
  // })

  Person.findById(personId, (err, data) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    data.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    data.save((err, updatedData) => {
      if(err) return console.log(err);
      done(null, updatedData)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,data)=>{
  if(err)return console.log(err)
  done(null ,data);
})
 
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,data)=>{
    if(err)return console.log(err)
    done(null,data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(err,data)=>{
    if(err)return console.log(err)
    done(null,data)
  })
  };
//.find(), .sort(), .limit(), .select(), and then .exec(). Pass the done(err, data) callback to exec().
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
  .sort({name:1})
  .limit(2)
  .select({age:0})
  .exec((err,data)=>{
    if(err)return console.log(err)
    done(null,data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
