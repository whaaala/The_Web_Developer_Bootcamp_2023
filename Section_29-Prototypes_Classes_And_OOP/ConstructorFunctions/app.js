// //THIS CONVERTS rgb colors to HEXDECIMAL colors
// function hex(r, g, b){
//     return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// }
// //THIS CONVERTS THERE ARUGMENTS TO rgb color
// function rgb(r, g, b) {
//     return `rgb(${r}, ${g}, ${b})`
// }

// //CREATING A FACTORY FUNCTION
// function makeColor(r, g, b) {
//     const color = {};
//     //Adding properties of rgb to the color object
//     color.r = r;
//     color.g = g;
//     color.b = b;
    
//     //Adding methods for different color value types to the color object
//     color.rgb = function (){
//         const {r, g, b} = this;
//         return `rgb(${r}, ${g}, ${b})`;
//     }
//     color.hex = function(){
//         const {r, g, b} = this;
//         return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
//     }
//     return color;
// }

// const firstColor = makeColor(35, 255, 150);
// firstColor.hex();
// firstColor.rgb();

// const black = makeColor(0, 0, 0);
// black.rgb();
// black.hex();

//CREATING A cONSTRUCTOR FUNCTION
// ***************************
//  THE NEW OPERATOR
// ***************************

//1. Creates a blank, plain JavaScript object. For convenience, let's call it newInstance.
//2. Links (sets the constructor of) :this object to an anothr object
//3. Passes the newly created object from Step 1 as the :this context 
//4. Retruns :this if the function doesn't return its own object

function Color(r, g, b){
    this.r = r
    this.g = g
    this.b = b
}

//ADDING rgb method to the Prototype Object of Color --> The OBJECT TEMPLATE
Color.prototype.rgb = function (){
    const {r, g, b} = this;
    return `rgb(${r}, ${g}, ${b})`;
}

//ADDING rgba method to the Prototype Object of Color --> The OBJECT TEMPLATE
Color.prototype.rgba = function (a =1.0){
    const {r, g, b} = this;
    return `rgb(${r}, ${g}, ${b}, ${a})`;
}

//ADDING hex method to the Prototype Object of Color --> The OBJECT TEMPLATE
Color.prototype.hex = function(){
    const {r, g, b} = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const color1 = new Color(255, 40, 100); 
// color1.rgb() --> 'rgb(255, 40, 100)'
//color1.hex() --> '#ff2864'
const color2 = new Color(0, 255, 0);
// color2.rgb() --> 'rgb(0, 255, 0)'
//color2.hex() --> '#00ff00'