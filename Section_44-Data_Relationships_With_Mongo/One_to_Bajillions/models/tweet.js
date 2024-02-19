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
const userSchema = new Schema({
    username: String,
    age: Number,
});

//Define A second Schema called: farmSchema
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    //create a key property to store the ObjectID reference its Parent  document: the user
    user: [{
        //The first thing to do is set the type of each user to be an ObjectID 
          // by using: mongoose.Schema.Types.ObjectId (this is prodivided by mongoose)
           // But put:mongoose.Schema into its own variable
              
        type: Schema.Types.ObjectId,
         //Then use: ref, and use it to set the name of the model that whose document belongs to
          //ObjectId will be referenced
            // ref option is what tells Mongoose which model to use duirng population
        ref: 'User'
    }]
})

//Make the User model
const User = mongoose.model('User', userSchema);
//Make the Tweet model
const Tweet = mongoose.model('Tweet',tweetSchema);

// //Create functiuon to create tweets
// const makeTweets = async () => {
//     //Make a user
//     // const user = new User({username: 'chickenfan99', age:61});

//      //Find a user
//      const user = await User.findOne({username: 'chickenfan99'});

//     //Create tweets
//     // const tweet1 = new Tweet({text: 'omg I love my chicken family', likes: 0})
//     //Create anothertweets
//     const tweet2 = new Tweet({text: 'bock bock bock my chickens make noises', likes: 1239})

//     //Pass the entire user object created to the user key in tweet1
//     //Mongoose will only store the ObjectId reference for the user in the array
//     tweet2.user = user;

//      //Then save the user and tweet created to the Database
//      tweet2.save();
// }

// makeTweets();

//Find a Tweet with associated user 
const findTweets = async () => {
    // const t = await Tweet.findOne({})
    // const t = await Tweet.findOne({}).populate('user')

    //With the populate method, you can get specific value in the referenced document by 
      // passing the key, as an second argument
    // const t = await Tweet.findOne({}).populate('user', 'username');

    //find all tweets
    const t = await Tweet.find({}).populate('user');
    console.log(t);
}
findTweets();