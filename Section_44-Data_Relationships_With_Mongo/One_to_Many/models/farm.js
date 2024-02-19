const mongoose = require('mongoose');

//create a variable for: mongoose.Schema
// const schema = mongoose.Schema
//OR you can just destructure mongoose to get Schema out it
const { Schema } = mongoose
//Then reference it everywhere you using: mongoose.Schema

/********************************************************** */
// Connect to mongoDB
const db = mongoose.connect('mongodb://127.0.0.1:27017/relationshipDB')
    .then(() => {
        console.log('MONGO CONECTION OPEN');
    })
    .catch(err =>{
        console.log('ERROR CONNECTING TO MONGODB');
        console.log(err)
    })
/**********************************************************************/

//Define the Product Schema
const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

//Define A second Schema called: farmSchema
const farmSchema = new Schema({
    name: String,
    city: String,
    //create a key property to store the ObjectID reference a document in the Product 
    products: [{
        //The first thing to do is set the type of each product to be an ObjectID 
          // by using: mongoose.Schema.Types.ObjectId (this is prodivided by mongoose)
           // But put:mongoose.Schema into its own variable
              
        type: Schema.Types.ObjectId,
         //Then use: ref, and use it to set the name of the model that whose document
          //ObjectId will be referenced
            // ref option is what tells Mongoose which model to use duirng population
        ref: 'Product'
    }]
})

//Make the product model
const Product = mongoose.model('Product', productSchema);
//Make the farm model
const Farm = mongoose.model('Fram',farmSchema);

//Create products with insertMany
// Product.insertMany([
//     {name: 'Goddess Melon', price: 4.99, season: 'Summer'},
//     {name: 'Suger Baby Watermelon', price: 4.99, season: 'Summer'},
//     {name: 'Asparagus', price: 3.99, season: 'Spring'},
// ]);

// //Create a farm in an Async function
// const makeFram = async () => {
//     const farm = new Farm({name: 'Full Belly Frams', city: 'Guinda, CA'})

//     //find a product from the Product collection 
//     const melon = await Product.findOne({name:'Goddess Melon'});

//     //Then add the product find to the property: products of farm created
//     farm.products.push(melon);

//     //Then save the farm created to the Database
//     await farm.save();

//     console.log(farm);
// }

// makeFram();

//Create an Async function to add products to farm
const AddProduct = async () => {
    //Find a farm
    const farm = await Farm.findOne({name:'Full Belly Frams'});

     //find a product from the Product collection 
    const waterMelon = await Product.findOne({name:'Suger Baby Watermelon'});

    //Then add the product find to the property: products of farm 
    farm.products.push(waterMelon);

    //Then save the farm created to the Database
    await farm.save();

//     console.log(farm);

}

AddProduct();