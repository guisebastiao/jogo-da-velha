const ceils = document.querySelectorAll('.ceils');
const empate = 'img/empate.png';
const imgX = 'img/imgX.png';
const imgO = 'img/imgO.png';
let ultimoJogado = 'x';
let jogadasX = [];
let jogadasO = [];

document.addEventListener('click', (e) => {
    if(e.target.className === 'ceils'){
        if(e.target.firstChild === null){
            game(e.target);
        }
    }
});

function game(target){
    const img = document.createElement('img');
    img.setAttribute('id', 'players')

    if(ultimoJogado === 'x'){
        img.src = imgX;
        target.appendChild(img);
        jogadasX.push(target.dataset.id);
        ultimoJogado = 'o';
        jogadasX.sort();
    } else {
        img.src = imgO;
        target.appendChild(img);
        jogadasO.push(target.dataset.id);
        ultimoJogado = 'x';
        jogadasO.sort();
    }

    check();
}

function check(){
    const wins = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
        ['1', '5', '9'],
        ['3', '5', '7']
    ];

    if(jogadasX.length >= 3){        
        for(let win of wins){
            if(win.every((index) => jogadasX.includes(index))){
                winner('X');
            }
        }
    }

    if(jogadasO.length >= 3){        
        for(let win of wins){
            if(win.every((index) => jogadasO.includes(index))){
                winner('O');
            }
        }
    }

    if(jogadasX.length + jogadasO.length === 9){
        winner('empate');
    }
}

function winner(player){
    const messageWinner = document.querySelector('#message-winner');
    const imgWinner = document.querySelector('#img-winner');
    const screen = document.querySelector('.screen');
    const gameDiv = document.querySelector('.game');
    const timeReload = 2000;
    const timeStart = 400;
    const timeClose = timeReload - 300;

    gameDiv.classList.add('hidden');

    
    if(player === 'X'){
        messageWinner.innerHTML = 'vencedor!';
        imgWinner.src = imgX; 
    }
    
    if(player === 'O'){
        messageWinner.innerHTML = 'vencedor!';
        imgWinner.src = imgO;
    }
    
    if(player === 'empate'){
        messageWinner.innerHTML = 'empate!';
        imgWinner.src = empate;
    }
    
    setTimeout(() => {screen.classList.add('active')}, timeStart);
    setTimeout(() => {screen.classList.add('hidden')}, timeClose);
    setInterval(() => {location.reload()}, timeReload);
}