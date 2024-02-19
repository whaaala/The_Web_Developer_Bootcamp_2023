/****************************REFACTOR CODE*************************** */
const p1 = {
    score: 0,
    button: document.querySelector('#p1btn'),
    display: document.querySelector('#p1Display'),
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2btn'),
    display: document.querySelector('#p2Display'),
}

const reset = document.querySelector('#reset');
const winningSocreSelect = document.querySelector('#playto');

let winningScore = 3;
let isGameOver = false;

function updateScore (player, opponent){
    if(!isGameOver) {
        player.score += 1;
        if(player.score === winningScore){
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
    }
    player.display.textContent = player.score; 
}

p1.button.addEventListener('click',function(){
     updateScore(p1, p2);
})

p2.button.addEventListener('click', function () {
    updateScore(p2, p1);
})

winningSocreSelect.addEventListener('change', function() {
    winningScore = parseInt(this.value);
    resetGame();
})

reset.addEventListener('click', resetGame)
function resetGame() {
    isGameOver = false;
    for(let p of[p1,p2]){
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}
// function resetGame() {
//     isGameOver = false;
//     p1.score = 0;
//     p2.score= 0;
//     p1.display.textContent = 0;
//     p2.display.textContent = 0;
//     p1.display.classList.remove('has-text-success', 'has-text-danger');
//     p2.display.classList.remove('has-text-success', 'has-text-danger');
//     p1.button.disabled = false;
//     p2.button.disabled = false;
// }
/*** */


/*******************************NORMAL CODE************************************* */
// // const p1Btn = document.querySelector('#p1btn');
// // const p2Btn = document.querySelector('#p2btn');
// const reset = document.querySelector('#reset');
// // const p1DisplaySocre = document.querySelector('#p1Display');
// // const p2DisplaySocre = document.querySelector('#p2Display');
// const winningSocreSelect = document.querySelector('#playto');

// // let p1Score = 0;
// // let p2Score = 0;
// let winningScore = 3;
// let isGameOver = false;

// p1Btn.addEventListener('click',function(){
//     if(!isGameOver) {
//         p1Score += 1;
//         if(p1Score === winningScore){
//             isGameOver = true;
//             // p1DisplaySocre.classList.add('winner');
//             // p2DisplaySocre.classList.add('loser');
//             p1DisplaySocre.classList.add('has-text-success');
//             p2DisplaySocre.classList.add('has-text-danger');
//             p1Btn.disabled = true;
//             p2Btn.disabled = true;
//         }
//     }
//     p1DisplaySocre.textContent = p1Score; 
// })

// p2Btn.addEventListener('click', function () {
//     if(!isGameOver) {
//         p2Score += 1;
//         if(p2Score === winningScore){
//             isGameOver = true;
//             // p2DisplaySocre.classList.add('winner');
//             // p1DisplaySocre.classList.add('loser');           
//             p2DisplaySocre.classList.add('has-text-success');
//             p1DisplaySocre.classList.add('has-text-danger');
//             p1Btn.disabled = true;
//             p2Btn.disabled = true;
//         }
//     }
//     p2DisplaySocre.textContent = p2Score; 
// })




// function resetGame() {
//     isGameOver = false;
//     p1Score = 0;
//     p2Score = 0;
//     p1DisplaySocre.textContent = 0;
//     p2DisplaySocre.textContent = 0;
//     //p1DisplaySocre.classList.remove('winner', 'loser');
//    // p2DisplaySocre.classList.remove('winner', 'loser');
//     p1DisplaySocre.classList.remove('has-text-success', 'has-text-danger');
//     p2DisplaySocre.classList.remove('has-text-success', 'has-text-danger');
//     p1Btn.disabled = false;
//     p2Btn.disabled = false;
// }


/************************************** */
//https://bulma.io/