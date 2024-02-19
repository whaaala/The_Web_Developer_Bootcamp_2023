const mongoose = require('mongoose');

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

//Define a Schema for a User 
// const userSchema = new mongoose.Schema({
//     first: String,
//     last: String,
//     address: [
//         {
//             street: String,
//             city: String,
//             state: String,
//             country:{
//                 type: String,
//                 required: true

//             } 
//         }
//     ]
// });

//Define a Schema for a User and turn of the ID  for the document embedded in it
 // to turn of the ID use:  _id: {_id: false}
const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: {_id: false},
            street: String,
            city: String,
            state: String,
            country:{
                type: String,
                required: true

            } 
        }
    ]
});



const User = mongoose.model('User', userSchema)

//Create a new User
const makeUser = async () => {
    const u  = new User({
        first: 'Harry',
        last: 'Potter'
    });
    //Push an address in the object t
    u.addresses.push({
        street: '123 Sesame Street',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    });
    //then save the user to the database
    const res = await u.save();

    console.log(res);
}

//Add addresses to users
const addAddress = async (userId) => {
    //get the user 
    const user = await User.findById(userId);

    //then an address to the user found 
    user.addresses.push({
            street: '99 3rd St',
            city: 'New York',
            state: 'NY',
            country: 'USA'
        })
    //then save the user to the database
    const res = await user.save();

    console.log(res);
}


// makeUser()
addAddress('64f389e5af6ebcf600b2ed92')