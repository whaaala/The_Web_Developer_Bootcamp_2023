/***************************************************************************
   ***********               REQUIRE Mongoose                 ************
   *********************************************************************** 
****************************************************************************/
const mongoose = require('mongoose');
/***************************************************************************
   ***********               End of REQUIRE Mongoose          ************
   *********************************************************************** 
****************************************************************************/

//Require the module created for product, as it as been exported
const Review = require('./review');

/***************************************************************************
   *****      Create a Variable for the Mongoose Schema to use       *****
   *********************************************************************** 
****************************************************************************/
const Schema = mongoose.Schema; //THIS IS TO HAVE A REFERENCE TO THE SCHEMA
/***************************************************************************
   *****  End of Create a Variable for the Mongoose Schema to use    *****
   *********************************************************************** 
****************************************************************************/

/***************************************************************************
    ***********       Create the Mongoose Schema to use        ***********  
   *********************************************************************** 
****************************************************************************/
const campgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    //create a key property to store the ObjectID referenceing a document in the User model 
    author: {
       //The first thing to do is set the type of each campground to be an ObjectID 
        // by using: mongoose.Schema.Types.ObjectId (this is prodivided by mongoose)
         // But put:mongoose.Schema into its own variable
      type: Schema.Types.ObjectId,

       //Then use: ref, and use it to set the name of the model that whose document
        //ObjectId will be referenced
          // ref option is what tells Mongoose which model to use duirng population
      ref: 'User'
    },
     //create a key property to store the ObjectID referencing a document in the Reviews model
     reviews: [{
      //The first thing to do is set the type of each campground to be an ObjectID 
        // by using: mongoose.Schema.Types.ObjectId (this is prodivided by mongoose)
         // But put:mongoose.Schema into its own variable
      type: Schema.Types.ObjectId,
      
       //Then use: ref, and use it to set the name of the model that whose document
        //ObjectId will be referenced
          // ref option is what tells Mongoose which model to use duirng population
      ref: 'Review'
  }],
});
/***************************************************************************
    ***********   End of Create the Mongoose Schema to use     ***********  
   *********************************************************************** 
****************************************************************************/

/***************************************************************************
             Deleting all assicated Review for campground
                    when a campground is deleted 
****************************************************************************/
            /**********************************************************
             * Create a mongoose QUERY middleware for findOneAndDelete 
             *       to delete the associated references to for campground 
             *        instances object that is to be deleted
             *   
             *   FYI: THIS MUST BE DONE ON THE SCHAME 
             *              BEFORE THE MODEL IS COMPLIED
            ***********************************************************/
campgroundSchema.post('findOneAndDelete', async function (campground) {
     //check if a campground was removed 
     if(campground){
      //Take the Review model and use deleteMany on it 
         // to delete associated reviews
          // by selecting all the review id in the reviews attribute array 
           // and use: {$in:<attribute name>} -->{$in: campground.reviews}
           const res = await Review.deleteMany({
            _id: {
                  $in: campground.reviews
            }
         })
           console.log(res);
     }
})
/***************************************************************************
            End of Deleting all assicated Review for campground
                    when a campground is deleted 
****************************************************************************/

/***************************************************************************
    ***********     Create a Model with the Schema created     *********** 
                    AND export the Model 
   *********************************************************************** 
****************************************************************************/
module.exports = mongoose.model('CampgroundSchema', campgroundSchema);
/***************************************************************************
    *****       End of Create a Model with the Schema created       *****  
   *********************************************************************** 
****************************************************************************/