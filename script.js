let playerRed = "R";

let playerYellow = "Y"

let currPlayer = playerRed;

let game_finish = false;


let board;
let gravity_factor = [];


let rows = 6;
let columns = 7;

let turn_count = 0;

for(let i = 0; i < columns; ++i) {
    gravity_factor.push(rows - 1);
}


window.onload = function() {
    setupgame();
}

function setupgame() {
    board = [];

    for(let r = 0; r < rows; r++) {
        let row = [];
        for(let c = 0; c < columns; c++) {
            row.push(' ');

            let tile=document.createElement("div");
            tile.setAttribute('id', r.toString() + '-' + c.toString());
            tile.setAttribute('class', 'tile');
            tile.addEventListener("click", place);
            document.querySelector('#board').append(tile);
        }
        board.push(row);
    }
    
}


function place() {
    if (game_finish) {
        return;
    }

    let tile = this; // function called with respect to a tile - this refers to a tile 

    let coords = tile.id.split("-");
    let c = parseInt(coords[1]);
    let r = gravity_factor[c];


    if (r < 0) {
        return;
    }

    
    board[r][c] = currPlayer;
    tile = document.getElementById(r.toString() + '-' + c.toString());
    
    if (currPlayer == playerRed) {
        tile.classList.add('red');
        currPlayer=playerYellow;
    } else {
        tile.classList.add('yellow');
        currPlayer=playerRed;
    }

    --(gravity_factor[c]);
    ++turn_count;

    check_wins();
}


function check_wins() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; ++c) {
            if(board[r][c] != ' ' && board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                winner(board[r][c]);
                return;
            }
        }
    }


    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if(board[r][c] != ' ' && board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                winner(board[r][c]);
                return;
            }
        }
    }


    for(let r = 3; r < rows; ++r) {
        for(let c = 0; c < columns - 3; ++c) {
            if(board[r][c] != ' ' && board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                winner(board[r][c]);
                return;
            }
        }
    }

    for(let r = 0; r < 3; ++r) {
        for(let c = 0; c < columns - 3; ++c) {
            if(board[r][c] != ' ' && board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                winner(board[r][c]);
                return;
            }
        }
    }



    if (turn_count == rows * columns) {
        winner('tie');
        
    }
}


function winner(string) {
    let win_decl = document.getElementById('winner');

    if (string == playerRed) {
        win_decl.textContent = 'RED WINS';
    } else if (string == playerYellow) {
        win_decl.textContent = 'YELLOW WINS!';
    } else {
        win_decl.textContent = 'TIE!';
    }
    
    game_finish = true;
    restart_option();
}


function restart_option() {
    const newbtn = document.createElement('button');
    newbtn.setAttribute('class', 'btn');
    newbtn.textContent = 'Click me to Restart';
    newbtn.addEventListener("click", reset);
    const add_button = document.querySelector('body');
    add_button.appendChild(newbtn);
    
}

function reset() {
    location.reload();
}


