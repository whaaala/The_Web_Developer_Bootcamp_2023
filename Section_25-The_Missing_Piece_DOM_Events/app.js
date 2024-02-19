const btn = document.querySelector('#v2');
const btn3 = document.querySelector('#v3');

btn.onclick = function(){
    console.log('YOU CLICKED ME');
    console.log('I HOPE IT WORKED');
}

btn3.addEventListener('dblclick', () => {
    alert('CLICKED')
})