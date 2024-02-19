//THIS CONVERTS rgb colors to HEXDECIMAL colors
function hex(r, g, b){
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
//THIS CONVERTS THERE ARUGMENTS TO rgb color
function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`
}

//CREATING A FACTORY FUNCTION
function makeColor(r, g, b) {
    const color = {};
    //Adding properties of rgb to the color object
    color.r = r;
    color.g = g;
    color.b = b;
    
    //Adding methods for different color value types to the color object
    color.rgb = function (){
        const {r, g, b} = this;
        return `rgb(${r}, ${g}, ${b})`;
    }
    color.hex = function(){
        const {r, g, b} = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return color;
}

const firstColor = makeColor(14, 70, 235)