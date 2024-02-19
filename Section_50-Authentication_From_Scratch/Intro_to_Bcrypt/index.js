const bcrypt = require('bcrypt');
const { log } = require('console');

/************************************************************************
 *                   HASH A PASSWORD WITH SALT ADDED
*************************************************************************/
// const hashPassword = async (pw) => {
//     /***********************************************************
//      * gensalt: generate the salt 
//      *  that is added to each password
//      *   before hashing
//     *********************************************************************/
//     const salt = await bcrypt.genSalt(12)
//     console.log(salt);

//     /*********************************************************************
//      *  then use: .hash(<passsword>, <salt generated>) function       
//     **********************************************************************/
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(hash);
// }

  /***********************************************************
   *     You can combine the salt generation and hashing 
   *               in on code block
  ************************************************************/
 const hashPassword = async (pw) => {
    /***********************************************************
     *  Add the number of rounds to .hash method
     *   and the .hash method will do the salt generation
     *    add to the password and the hash it in one goal
    *********************************************************************/
    /*********************************************************************
     *  then use: .hash(<passsword>, <number of rounds>) function       
    **********************************************************************/
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
}

/************************************************************************
 *                  End of HASH A PASSWORD WITH SALT ADDED
*************************************************************************/

/************************************************************************
 *                   VERIFY A HASH A PASSWORD SALTED STORED 
 *                              WITH A USER'S DETAILS 
*************************************************************************/
      /*************************************************************
       *  Use the: .compare method to compare user details inputted
       *    against the details saved for the user in the DB
       * 
       * FYI: .compare takes in: 
       *       first argument as the plan password te
       *       second argument as the hash password
       * 
       *  the .compare method will return a boolean 
       *     true if the password matches
       *     false if the password does not match
      **************************************************************/
const login = async (pw, hashPw) => {
    //The .
    const result = await bcrypt.compare(pw, hashPw)
    if(result){
        console.log('LOGGED YOU IN! SUCCESSFUL MATCH!!');
    }else {
        console.log('INCORRECT MATCH!!');
    }
}

/************************************************************************
 *                  End of VERIFY A HASH A PASSWORD SALTED STORED 
 *                              WITH A USER'S DETAILS 
*************************************************************************/

// hashPassword('money');
login('money', '$2b$12$aOZhdoO1ZpPQN73zdcXam.6yZHiFE9J7ea33BgDpIRV9txo.0DGYO');