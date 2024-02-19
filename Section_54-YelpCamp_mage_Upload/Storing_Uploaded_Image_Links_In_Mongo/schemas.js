//Require JOY(joi)
const Joi = require('joi');

 /************************************************************************
    * Define a basic Schema Structure for Campground with JOY(joi)
    *      FYI:
    *           This is NOT A mongoose Schema 
    *            this is a JavaScript Schema that is going validate 
    *             the data before you even attempt to save it 
    *               with mongoose
    ************************************************************************/
 module.exports.campgroundSchema = Joi.object({
    //Pass in the different DATA attributes you want 
     //campground hold the data object and it is required
    campground: Joi.object({
       //Then pass in different Key that are nested in campground
       title: Joi.string().required(),
       price: Joi.number().required().min(0),
      //  image: Joi.string().required(),
       location: Joi.string().required(),
       description: Joi.string().required()
    }).required()
 });
 /************************************************************************
  * End of Define a basic Schema Structure for Campground with JOY(joi)
  *      FYI:
  *           This is NOT A mongoose Schema 
  *            this is a JavaScript Schema that is going validate 
  *             the data before you even attempt to save it 
  *               with mongoose
  ************************************************************************/

/************************************************************************
*       Define a basic Schema Structure for review with JOI
************************************************************************/
module.exports.reviewSchema = Joi.object({
     //Pass in the different DATA attributes you want 
     //review hold the data object and it is required
     review: Joi.object({
        //Then pass in different Key that are nested in review
        body: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
     })

}).required()
/************************************************************************
*     End of Define a basic Schema Structure for review with JOI
************************************************************************/