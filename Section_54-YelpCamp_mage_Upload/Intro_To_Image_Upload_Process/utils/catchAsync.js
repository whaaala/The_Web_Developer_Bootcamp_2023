
module.exports = func => {
  //func refers to the async callback function that is passed in 
    //this function NEEDS to return a function 
      // And the function returned will have a parameter of req, res, next
       //has that is been passed an arguments to the func function: 
             //the async callback function in the request
       //Then a .catch is chained to func function
         // this will catch any errors that occurs in of fn function
          // And then pass it as an argument to the next function
    return (req, res, next) => {
        func(req, res, next).catch(err =>  next(err))
    }
}