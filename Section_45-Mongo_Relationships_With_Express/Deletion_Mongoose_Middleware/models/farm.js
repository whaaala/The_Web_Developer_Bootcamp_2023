const mongoose = require('mongoose');

//Require the module created for product, as it as been exported
const Product = require('./product');

/************************************** */
//Destructure Schema 
const { Schema } = mongoose

/************************************** */
//Create a Schema
const farmSchema = new Schema({
    name: {
        type: String,
        required:[true, 'Farm must have a name']
    },
    city: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    //Add the reference of the products belonging to farm
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

});

/*************************************************************************
 *    Create a mongoose QUERY middleware for findOneAndDelete 
 *       to delete the associated references to for farm 
 *        instances object that is to be deleted
 *   
 *   FYI: THIS MUST BE DONE ON THE SCHAME 
 *              BEFORE THE MODEL IS COMPLIED
***************************************************************************/
//For mongoose the next functtion does not need to be called
 // when async/await function is used
// farmSchema.pre('findOneAndDelete', async (data) => {
//     console.log('PRE MIDDLEWARE');
//     console.log(data);
// })

// farmSchema.post('findOneAndDelete', async (data) => {
//     console.log('POST MIDDLEWARE');
//     console.log(data);
// })


farmSchema.post('findOneAndDelete', async function (farm) {
    //check if the products attribute array not empty
    if(farm.products.length){
        //Take the product model and use deleteMany on it 
         // to delete associated products
          // by selecting all the products id in the products attribute array 
           // and use: {$in:<attribute na,e>} -->{$in: farm.products}
        const res = await Product.deleteMany({_id: {$in: farm.products}})
        console.log(res);
    }
})


//Create a Model with the Schema created
const Farm = mongoose.model('Farm', farmSchema);

/****************************************************************** */
//Export the Model created so you can use it in another file 
module.exports = Farm;