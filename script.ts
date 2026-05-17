class Utils{
    constructor(){
        this.boardsize = 8;
    }

    boardsize:number;

    Generate_Board(){
        let board_element = document.getElementById('chessboard') as HTMLOutputElement;

        board_element.innerHTML = '';
        board_element.style.display = 'grid';
        board_element.style.gridTemplateColumns = 'repeat(' + String(this.boardsize) + ',' + String(40 / this.boardsize) + 'vw)';

        for (let i = 0; i < this.boardsize; i++) {
            for(let c = 0; c < this.boardsize; c++){
                if((i % 2) == 0){
                    if((c % 2) == 0){//dark-squared
                        board_element.innerHTML += '<div id="cell-' + String((i*8) + c) + '" class="dark_square" style="height:' + String(40 / this.boardsize) + 'vw; width:' + String(40 / this.boardsize) + 'vw; font-size:' + String(20 / this.boardsize) + 'vw;" onclick=""></div>';
                    }else if((c % 2) == 1){//light-squared
                        board_element.innerHTML += '<div id="cell-' + String((i*8) + c) + '" class="light_square" style="height:' + String(40 / this.boardsize) + 'vw; width:' + String(40 / this.boardsize) + 'vw; font-size:' + String(20 / this.boardsize) + 'vw;" onclick=""></div>';
                    }
                }else if((i % 2) == 1){
                    if((c % 2) == 1){//dark-squared
                        board_element.innerHTML += '<div id="cell-' + String((i*8) + c) + '" class="dark_square" style="height:' + String(40 / this.boardsize) + 'vw; width:' + String(40 / this.boardsize) + 'vw; font-size:' + String(20 / this.boardsize) + 'vw;" onclick=""></div>';
                    }else if((c % 2) == 0){//light-squared
                        board_element.innerHTML += '<div id="cell-' + String((i*8) + c) + '" class="light_square" style="height:' + String(40 / this.boardsize) + 'vw; width:' + String(40 / this.boardsize) + 'vw; font-size:' + String(20 / this.boardsize) + 'vw;" onclick=""></div>';
                    }
                }
            }
        }
    }
}   

let Utility = new Utils();