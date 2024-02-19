const mongoose = require('mongoose')    
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username cannot be blank'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Pasword cannot be blank']

    }

});

/**************************************************************
    Define a method that will be added to the user clsass model
      to authenticate each user login details 
         to check if the user can login or not 

    DO NOT USE AN ARROW FOUNCTION
***************************************************************/

userSchema.statics.findAndValidate = async function (username, password){
    //Find a user from the database
     // Use the: this key word to point the findOne method to the userSchema object
    const foundUser = await this.findOne({username});

    /************************************************************************************************************* 
     *    Use:  bcrypt.compare(<password the user input>, <Hash password that is saved in the DB for the user>) 
     *     to compare if the password the user entered is a correct one
    ***************************************************************************************************************/const isvalid = await bcrypt.compare(password, foundUser.password);

    //Then use tenary operator to return user if the user is found and the password is correct
     // return false if the user is not found
    return isvalid? foundUser : false;
}

//Add a middleware with: .pre to the userSchema, that will hash the password of user 
 // before saving the user details to the database
  //then call the next() function
   // the next() function will continue to the next action which will be the first argument of the .pre method 
userSchema.pre('save', async function(next){
    /******************************************
     * You do not want to re-hash the password 
     * everytime a can is made on the user
     *  (except  if the password itself is changed)
     * 
     * And the way to do this 
     *   is to use a method called: isModified()
     *   on the userSchema Object
     *    and then pass it the password field 
     *     as and arugment
     * 
     * this method will return true 
     *    if the password as been changed
     * and 
     *  false if the password as not been changed
    ******************************************/
   if(!this.isModified('password')){
     //call the next function
     next();
    }
   //Hash the password
   this.password = await bcrypt.hash(this.password, 12);

   //call the next function
   next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;