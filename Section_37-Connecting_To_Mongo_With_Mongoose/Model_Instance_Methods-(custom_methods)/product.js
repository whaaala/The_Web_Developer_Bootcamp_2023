const mongoose = require('mongoose');

// Connect to mongoDB
const db = mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(() => {
    console.log('COONECTION OPEN');
})
.catch(err =>{
    console.log('ERROR CONNECTING TO MONGODB');
    console.log(err)
})

const productSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        maxlength: 20,
    },
    price: {
        type: 'number',
        required: true,
        min: [0, 'Price must be positive'],
    },
    onSale: {
        type: 'boolean',
        default: false,
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0 
        },
        inStore: {
            type: Number,
            default: 0
        }
    }, 
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

/***************************************************************************************
 * Adding your own CUSTOM METHOD TO THE SCHEMA 
 *    this defining or adding functionality to the schema
 *      in addtion to whatever mongoose already provides
 * 
 *  The way this done is: 
 *        <A Schema created>.methods.<the name if the method to be created> = function(cb) {
              the functionalities needed
 *         }
         
         Example: 
              animalSchema.methods.findSimilarTypes = function(cb) {
                  return mongoose.model('Animal').find({ type: this.type }, cb);
             };

    FYI: AN ARROW FUNCTION CANNOT BE USED FOR THIS
 *******************************************************************************************/
// productSchema.methods.greet = function() {
//     console.log("Hello!!!!!");
// }

// productSchema.methods.greet = function() {
//     console.log("Hello!!!!!");
//     console.log(` - from: ${this.name}`);
// }
   
/*********************************************************************
 * This methods is to turn sales on or off for a given product
 *  Added to the schema
 ********************************************************************/
productSchema.methods.toggleOnSale = function() {
    //Take the value of onSale and set to the oppsite value
    this.onSale = !this.onSale;
    //the: .this keyword here refers to the particular instance of a product
       // And it MUST BE USED TO SAVE 
    //FYI: The: .save() method does take time
      //It an asynchronous operation, therefore return the promise not really a promise: its a thenable promise)
      //And await it in the function that is using this function
    return this.save();
}

/*********************************************************************
 * This methods is to add a new category for a given product
 *  Added to the schema
 ********************************************************************/
productSchema.methods.addCategory = function(newCat) {
    this.categories.push(newCat);
    return this.save();
}

/**************************************
 * create a model from the Schema
 **************************************/
const Product = mongoose.model('Product', productSchema);



/******************************
 * Create a method to find a Product
 * and use the CUSTOM method on it 
 *****************************/
// const findProduct = async () => {
//     const foundProduct = await Product.findOne({name:'Bike Helmet'});
//     foundProduct.greet()
// }
// findProduct();

/******************************
 * Create a method to find a Product
 * and use the CUSTOM method toggleOnSale on it
 *****************************/
const findProduct = async () => {
    const foundProduct = await Product.findOne({name:'Bike Helmet'});
    console.log(foundProduct);
    await foundProduct.toggleOnSale()
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct);
}
findProduct();


/*****************************************************
 * create an Instance (an item (OBJECT)) from the Model
 *****************************************************/
// const  bike = new Product({name:'Cycling Jersey', price: 28.50, categories: ['Cycling'], size: 'XS'}) 

/*********************************************************
 * Save the Instance (an item (OBJECT)) create to mongoDB
 *********************************************************/
// bike.save()
//     .then(data => {
//         console.log("IT WORKED!!!");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!!!");
//         console.log(err.errors);
//         // console.log(err.errors.name.properties.message);
//     });


