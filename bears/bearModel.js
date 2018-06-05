// Create a model for our bears. 
const mongoose = require('mongoose');
// Schema 

// {
//     species: 'Grizzly Bear', 
//     latinName: 'Urusas Americanas', 
//     createOn: Date.now()
// }

const BearSchema = new mongoose.Schema({
    // declare a schema. Your documents will 'look like this'
    species: {
        type: String, // There are many types in Mongoose that we'll learn about this week
        required: true, // required is a validator. It tells us that this field is required
        unique: true, // unique is also a validator. It tells us this field can only exist once
    },
    latinName: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
}); 

const bearsModel = mongoose.model('Bear', BearSchema); 

module.exports = bearsModel; 