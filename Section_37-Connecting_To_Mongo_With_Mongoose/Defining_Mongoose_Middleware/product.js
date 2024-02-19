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
 * Static methods are methods thatlives on the Model itself NOT on instances of the Model
 *  
 *   This methods won't act on individual instances of the Model
 *       therefore, the: .this keyword refers to the actual Model class itself
 * 
 * 
 *  The way this done is: 
 *        <A Schema created>.statics.<the name of the method to be created> = function(cb) {
              the functionalities needed
 *         }
         
         Example: 
            animalSchema.statics.findByName = function(name) {
                return this.find({ name: new RegExp(name, 'i') });
            };

    FYI: AN ARROW FUNCTION CANNOT BE USED FOR THIS
 *******************************************************************************************/
productSchema.statics.fireSale = function() {
    return this.updateMany({}, {onSale: true, price: 0});
}

/**************************************
 * create a model from the Schema
 **************************************/
const Product = mongoose.model('Product', productSchema);


Product.fireSale().then(res => {
    console.log(res);
})






