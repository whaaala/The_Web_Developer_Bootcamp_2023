const mongoose = require('mongoose');

// Connect to mongoDB
/*******************************************************************
 *  FYI: THE moviesApp at the end of the path is a new database
 *       that will be created (if it does not exist already)
 *********************************************************************/
const db = mongoose.connect('mongodb://127.0.0.1:27017/moviesApp')
.then(() => {
    console.log('COONECTION OPEN');
})
.catch(err =>{
    console.log('ERROR CONNECTING TO MONGODB');
    console.log(err)
})

