//require the campground model of mongoose for the DB
const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    //use: .find({}) to get all the campground in the database
    // use: await on the ..find({}) method as it is like a promise (it a thenable), and it takes time to complete
    const campgrounds = await Campground.find({});

    //The render the campgrounds found
    /*********************************************************************
     * Pass the EJS html file to use for displaying all campgrounds
     *  in the: res.render() function
     *  and pass all the campground retrieved for the DB as a second argument
     *  so it can be used in the EJS file
     ***********************************************************************/
    res.render("../views/campgrounds/index", { campgrounds });
}

module.exports.renderNewForm =  (req, res) => {
    // /*****************************************************************************
    //  * PROTECT THIS ROUTE -> SO only LOGGED IN USERS CAN CREATE CAMPGROUND
    //  * 
    //  *   To do this: 
    //  *      passport provides an helper method called: isAuthenticated() 
    //  *         (passport still uses session to store is own details in there) 
    //  *   this method is automatically added to the request Object 
    // ******************************************************************************/
    // //create a condition to check if the user is NOT authenticated 
    //  // then the user should not be able to create campground
    //     //(if the user is authenticated the request object will contain: isAuthenticated() property)
    // if(!req.isAuthenticated()){
    //   //Display a flash message
    //   req.flash('error', 'You must be logged in');
  
    //   //then redirect the user to the login page
    //   return res.redirect('/login');
    // }
  
    //The render a form that can be used to created a campgrounds
    res.render("../views/campgrounds/new");
}

module.exports.createCampground = async (req, res, next) => {
    //Get req.body.campground for the Request
    //And create a new Campground with it with campground Model
    //And save the new campground created to the database
    const campground = new Campground(req.body.campground);

    console.log(campground);
    console.log(req.user._id);
    
    /****************************************************************
     * Once the campground is created, you can then assicate the user
     *  that created the campground to the created campground
     * 
     * By:
     *   passing the req.user._id to the campground.author attribute 
     *   in the campground model
    ******************************************************************/
   campground.author = req.user._id;

    //Then use: .save() method to save the camp create to database
    // use: await on the .save() method as it is like a promise (it a thenable), and it takes time to complete
    await campground.save();

     /******************************************************
     * Before redirecting to the campground page 
     *  use req.flash() to set a success message 
     *  that the campground has been successfully created 
     * 
     * the first arugment is the Key 
     * the second arugment is the the message 
     * 
     * FYI:
     *    THIS SHOULD BE DONE AFTER campground HAS BEEN 
     *    SUCCESSFUL SAVED TO THE DB
    ********************************************************/
     req.flash('success', 'Campground created successfully');

    //THEN REDIRECT to the newly created campground page
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async (req, res) => {
    //Get the Id of the campground through req.params.id and pass it in findById(id)
    //Then use: findById(id) to get the campground from the database

    //And populate the reviews
    //.populate('<new of the attribute that is referencing the documents with .ref>') to get the reviews
    //And it associted campground from the database
    //And also use:.populate('<new of the attribute that is referencing the documents with .ref>') to get the user
    //And it associted campground from the database
           /************************************************************************************************
            * To get the author that created a review for a campground 
            *  you need to do a nested populate
            *   
            * Nested populate:
            *    The way to do this is:
            *      In the populate you already have, pass in an Object, and create a key attribute pair 
            *       with the key name as: path 
            *       and  then pass in another Object with populate as the key attribute name
            *      
            *              populate({path:'<name of the key>', populate:{path: '<name of the key>'}})
           ***************************************************************************************************/
    const campground = await Campground.findById(req.params.id).populate({
            path:'reviews',
            populate: {
              path: 'author'
            }
          }).populate('author');
    // const campground = await Campground.findById(req.params.id).populate('reviews');
    console.log(campground);
    //check If campground does not exist then use flash to display the error message
    if(!campground){
           /******************************************************
     * Before redirecting to the campground page 
     *  use req.flash() to set a success message 
     *  that the campground has been successfully created 
     * 
     * the first arugment is the Key 
     * the second arugment is the the message 
     * 
     * FYI:
     *    THIS SHOULD BE DONE AFTER campground HAS BEEN 
     *    SUCCESSFUL SAVED TO THE DB
    ********************************************************/
     req.flash('error', 'Cannot find that Campground');
     
     //THEN REDIRECT to the campground page
     return res.redirect(`/campgrounds`);
    }

            //The render the campground found
            /*********************************************************************
             * Pass the EJS html file to use for displaying one campground
             *  in the: res.render() function
             *  and pass the campground retrieved for the DB as a second argument
             *  so it can be used in the EJS file
             ***********************************************************************/
            // res.render('campgrounds/index', {campground});
    res.render("../views/campgrounds/show", { campground });
}

module.exports.renderEditForm = async (req, res) => {
    //Get the Id of the can=mpground through req.params
  // and use desturturing to create an id variable to save it to
  const { id } = req.params;

//Get the Id of the campground through req.params.id and pass it in findById(id)
//Then use: findById(id) to get the campground from the database
const campground = await Campground.findById(id);

  //check If campground does not exist then use flash to display the error message
  if(!campground){
        /******************************************************
        * Before redirecting to the campground page 
        *  use req.flash() to set a success message 
        *  that the campground has been successfully created 
        * 
        * the first arugment is the Key 
        * the second arugment is the the message 
        * 
        * FYI:
        *    THIS SHOULD BE DONE AFTER campground HAS BEEN 
        *    SUCCESSFUL SAVED TO THE DB
        ********************************************************/
    req.flash('error', 'Cannot find that Campground');
    
    //THEN REDIRECT to the campground page
    return res.redirect(`/campgrounds`);
  }

  //   /*************************************************************
  //   *  In other to make sure the user that created the campground 
  //   *  is the only one that can update the campground 
  //   *  
  //   *  you will need to :
  //   *   - first fined the campground in the database
  //   *   - then compare the campground.author id reference
  //   *   - to the req.user.id of the user currently logged in
  //   *   
  // ****************************************************************/
  // //then compare the campground.author id reference to the req.user._id
  //   // if they are not equals then show the user a flash error message
  //   // and redirect to the user to the show page of the campground
  // if(!campground.author.equals(req.user._id)) {
  //   req.flash('error','You do not have permission to do that')
  //   return res.redirect(`/campgrounds/${id}`)
  // }
          //The render the campground found to editted form
          /*********************************************************************
           * Pass the EJS html file to use for displaying one campground
           *  in the: res.render() function
           *  and pass the campground retrieved for the DB as a second argument
           *  so it can be used in the EJS file
           ***********************************************************************/
  // res.render('campgrounds/index', {campground});
  res.render("../views/campgrounds/edit", { campground });
}

module.exports.updateCampground =  async (req, res) => {
    //Get the Id of the can=mpground through req.params
    // and use desturturing to create an id variable to save it to
    const { id } = req.params;
    // /*************************************************************
    //  *  In other to make sure the user that created the campground 
    //  *  is the only one that can update the campground 
    //  *  
    //  *  you will need to :
    //  *   - first fined the campground in the database
    //  *   - then compare the campground.author id reference
    //  *   - to the req.user.id of the user currently logged in
    //  *   
    // ****************************************************************/
    // //find the campground
    // const campground = await Campground.findById(id)
    
    // //then compare the campground.author id reference to the req.user._id
    //  // if they are not equals then show the user a flash error message
    //   // and redirect to the user to the show page of the campground
    // if(!campground.author.equals(req.user._id)) {
    //   req.flash('error','You do not have permission to do that')
    //   return res.redirect(`/campgrounds/${id}`)
    // }

    // // Then use: .findByIdAndUpdate(<id>, <data to be updated>) method
    // // To update the camp in the database
    // // use: await on the .findByIdAndUpdate() method
    // // as it is like a promise (it a thenable), and it takes time to complete
    // // Use: ...Object Name to spread the properites into single key value pairs
    // // Pass {runValidators: true} as a third argument in other to make that
    // // findByIdAndUpdate() validation is enabled (as it is disabled by default)
    // // The:  new: true, is to return the product updated NOT the old product
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });

    
     /******************************************************
     * Before redirecting to the campground page 
     *  use req.flash() to set a success message 
     *  that the campground has been successfully created 
     * 
     * the first arugment is the Key 
     * the second arugment is the the message 
     * 
     * FYI:
     *    THIS SHOULD BE DONE AFTER campground HAS BEEN 
     *    SUCCESSFUL SAVED TO THE DB
    ********************************************************/
     req.flash('success', 'Campground updated successfully');

    //THEN REDIRECT TO the page of the campgrund that just been updated
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    //Get the Id of the campground through req.params
    // and use desturturing to create an id variable to store it
    const { id } = req.params;

    //Then use: findByIdAndDelete(id) to get and Delete the product in the database
    // await the findByIdAndDelete(id), as ti takes long to return (it is a thenable)
    const deleteCampground = await Campground.findByIdAndDelete(id);

    /******************************************************
     * Before redirecting to the campground page 
     *  use req.flash() to set a success message 
     *  that the campground has been successfully created 
     * 
     * the first arugment is the Key 
     * the second arugment is the the message 
     * 
     * FYI:
     *    THIS SHOULD BE DONE AFTER campground HAS BEEN 
     *    SUCCESSFUL SAVED TO THE DB
    ********************************************************/
    req.flash('success', 'Camoground is deleted successfully');
 

    //THEN REDIRECT TO the index page that show all the campgrounds
    res.redirect("/campgrounds");
}