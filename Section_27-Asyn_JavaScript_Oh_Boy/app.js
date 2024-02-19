const multiply = (x, y) => x * y;

const square = x => multiply(x, x);

const isRightTrianagle = (a, b, c) => (
    square(a) + square(b) === square(c)
)

//isRightTrianagle(3, 4, 5);

console.log("Sending request to server!")
setTimeout(function() {
    console.log("Here is your data from the server...")
}, 3000)
console.log("I AM AT THE END OF THE FILE!")









//use this to see the call stack in action
//http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbXVsdGlwbHkgKHgsIHkpew0KICAgIHJldHVybiB4ICogeTsgICANCn0gDQoNCmZ1bmN0aW9uIHNxdWFyZSh4KSB7DQogICAgcmV0dXJuIG11bHRpcGx5KHgsIHgpOw0KfQ0KDQpmdW5jdGlvbiBpc1JpZ2h0VHJpYW5hZ2xlKGEsIGIsIGMpew0KIHJldHVybiAgc3F1YXJlKGEpICsgc3F1YXJlKGIpID09PSBzcXVhcmUoYykNCn0NCg0KaXNSaWdodFRyaWFuYWdsZSgzLCA0LCA1KQ%3D%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D


//See single threaded and web API in action
//http://latentflip.com/loupe/?code=Y29uc29sZS5sb2coIlNlbmRpbmcgcmVxdWVzdCB0byBzZXJ2ZXIhIikKc2V0VGltZW91dChmdW5jdGlvbigpIHsKICAgIGNvbnNvbGUubG9nKCJIZXJlIGlzIHlvdXIgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIuLi4iKQp9LCAzMDAwKQpjb25zb2xlLmxvZygiSSBBTSBBVCBUSEUgRU5EIE9GIFRIRSBGSUxFISIp!!!