// class Pet{
//     constructor(name, age)  {
//         this.name = name;
//         this.age = age;
//     }

//     eat(){
//         return `${this.name} is eating`
//     }
// }

////THE INSTANCE CREATED FROM THE Dog AND Cat OBJECT WILL BE EMPTY as THERE IS ON CONSTRUCTOR
// class Cat {
//     meow(){
//         return 'MEOWWWWW!!';
//     }
// }

// class Dog {

//     bark(){
//         return 'WOOF!!';
//     }
// }

// /*************** extends Pet from Cat and Dog ****/
// class Pet{
//     constructor(name, age)  {
//         this.name = name;
//         this.age = age;
//     }

//     eat(){
//         return `${this.name} is eating`
//     }
// }


// class Cat extends Pet{
//     meow(){
//         return 'MEOWWWWW!!';
//     }
// }

// class Dog extends Pet{

//     bark(){
//         return 'WOOF!!';
//     }
// }

/*************** Use super keyword in the consturctor for Cat and Dog class ****/
class Pet{
    constructor(name, age)  {
        console.log('IN PET CONSTRUCTOR');
        this.name = name;
        this.age = age;
    }

    eat(){
        return `${this.name} is eating`
    }
}


class Cat extends Pet{
    constructor(name, age, livesLeft = 9){
        console.log('IN CAT CONSTRUCTOR');
        super(name, age);
        this.livesLeft = livesLeft;
    }

    meow(){
        return 'MEOWWWWW!!';
    }
}

class Dog extends Pet{
    // constructor(name, age){
    //     console.log('IN DOG CONSTRUCTOR');
    //     super(name, age);
    // }

    bark(){
        return 'WOOF!!';
    }
}


const monty = new Cat('Monty', 2)
const wyatt = new Dog('Wyatt', 13)
