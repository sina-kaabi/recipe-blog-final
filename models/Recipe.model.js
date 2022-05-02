let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let recipes = new Schema({
   // imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type:String, 
        enum: ['Thai', 'American', 'Chinese', 'Mexican'], //these categories are just strings not objects
        required: 'this field is required'
    },
    ingredients: {type:String,
    enum: ['Chicken', 'Beef', 'Veg', 'Fish'],
    required: 'this field is required'
    },
    
});

const americanCheeseBurger = {
    imagePath: '',
    title:  '',
    description: 'fhfhf',
    price: 2.30,
    category: 'American'
   
}

const padThai = {
    imagePath: '',
    title:  '',
    description: 'fhfhf',
    price: 2.90,
    category: 'Thai'
   
}

module.exports = mongoose.model('Recipe', recipes);

