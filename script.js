"use strict";
class Utils {
    constructor() {
        this.boardsize = 8;
        this.selected = -1;
    }
    boardsize;
    selected;
    Generate_Board() {
        let board_element = document.getElementById('chessboard');
        Create_Pieces();
        board_element.innerHTML = '';
        board_element.style.display = 'grid';
        board_element.style.gridTemplateColumns = 'repeat(' + String(this.boardsize) + ',' + String(40 / this.boardsize) + 'vw)';
        for (let i = 0; i < this.boardsize; i++) {
            for (let c = 0; c < this.boardsize; c++) {
                if ((i % 2) == 0) {
                    if ((c % 2) == 0) { //dark-squared
                        board_element.innerHTML += '<div id="cell-' + String((i * 8) + c) + '" class="dark_square" style="height:' + String(40 / this.boardsize) + 'vw; width:' + String(40 / this.boardsize) + 'vw; font-size:' + String(20 / this.boardsize) + 'vw;" onclick="Utility.Selection(' + String(i * 8 + c) + ')"><img class="pieces" id="img-' + String((i * 8) + c) + '"></div>';
                    }
                    else if ((c % 2) == 1) { //light-squared
                        board_element.innerHTML += '<div id="cell-' + String((i * 8) + c) + '" class="light_square" style="height:' + String(40 / this.boardsize) + 'vw; width:' + String(40 / this.boardsize) + 'vw; font-size:' + String(20 / this.boardsize) + 'vw;" onclick="Utility.Selection(' + String(i * 8 + c) + ')"><img class="pieces" id="img-' + String((i * 8) + c) + '"><img></div>';
                    }
                }
                else if ((i % 2) == 1) {
                    if ((c % 2) == 1) { //dark-squared
                        board_element.innerHTML += '<div id="cell-' + String((i * 8) + c) + '" class="dark_square" style="height:' + String(40 / this.boardsize) + 'vw; width:' + String(40 / this.boardsize) + 'vw; font-size:' + String(20 / this.boardsize) + 'vw;" onclick="Utility.Selection(' + String(i * 8 + c) + ')"><img class="pieces" id="img-' + String((i * 8) + c) + '"></div>';
                    }
                    else if ((c % 2) == 0) { //light-squared
                        board_element.innerHTML += '<div id="cell-' + String((i * 8) + c) + '" class="light_square" style="height:' + String(40 / this.boardsize) + 'vw; width:' + String(40 / this.boardsize) + 'vw; font-size:' + String(20 / this.boardsize) + 'vw;" onclick="Utility.Selection(' + String(i * 8 + c) + ')"><img class="pieces" id="img-' + String((i * 8) + c) + '"></div>';
                    }
                }
            }
        }
        let element = document.getElementById('status');
        element.innerText = 'Game started';
    }
    Display_Board() {
        let locations = World.Get_Locations();
        let element;
        let image_element;
        let type;
        for (let c = 0; c < (this.boardsize * this.boardsize); c++) {
            image_element = document.getElementById('img-' + String(c));
            image_element.src = '';
            image_element.style.display = 'none';
        }
        for (let i = 0; i < World.Bishop_Pieces.length; i++) {
            image_element = document.getElementById('img-' + String(World.Bishop_Pieces[i].square));
            image_element.src = './pieces-basic-png/' + World.Bishop_Pieces[i].color + '-bishop.png';
            image_element.style.display = 'block';
        }
        for (let i = 0; i < World.Knight_Pieces.length; i++) {
            image_element = document.getElementById('img-' + String(World.Knight_Pieces[i].square));
            image_element.src = './pieces-basic-png/' + World.Knight_Pieces[i].color + '-knight.png';
            image_element.style.display = 'block';
        }
        for (let i = 0; i < World.Pawn_Pieces.length; i++) {
            image_element = document.getElementById('img-' + String(World.Pawn_Pieces[i].square));
            image_element.src = './pieces-basic-png/' + World.Pawn_Pieces[i].color + '-pawn.png';
            image_element.style.display = 'block';
        }
        for (let i = 0; i < World.Rook_Pieces.length; i++) {
            image_element = document.getElementById('img-' + String(World.Rook_Pieces[i].square));
            image_element.src = './pieces-basic-png/' + World.Rook_Pieces[i].color + '-rook.png';
            image_element.style.display = 'block';
        }
        for (let i = 0; i < World.King_Pieces.length; i++) {
            image_element = document.getElementById('img-' + String(World.King_Pieces[i].square));
            image_element.src = './pieces-basic-png/' + World.King_Pieces[i].color + '-king.png';
            image_element.style.display = 'block';
        }
        for (let i = 0; i < World.Queen_Pieces.length; i++) {
            image_element = document.getElementById('img-' + String(World.Queen_Pieces[i].square));
            image_element.src = './pieces-basic-png/' + World.Queen_Pieces[i].color + '-queen.png';
            image_element.style.display = 'block';
        }
    }
    Selection(square) {
        let type = '';
        //-1 in selected is our code for Nan
        if (this.selected == -1) {
            type = World.Get_Type(square);
            if (type == '') {
                return;
            }
            this.selected = square;
        }
        else {
            type = World.Get_Type(this.selected);
            if (type == '') {
                return;
            }
            if (type == 'Q') {
                for (let i = 0; i < World.Queen_Pieces.length; i++) {
                    if (this.selected == World.Queen_Pieces[i].square) {
                        World.Queen_Pieces[i].Do_Movement(square);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'K') {
                for (let i = 0; i < World.King_Pieces.length; i++) {
                    if (this.selected == World.King_Pieces[i].square) {
                        World.King_Pieces[i].Do_King_Movement(square);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'P') {
                for (let i = 0; i < World.Pawn_Pieces.length; i++) {
                    if (this.selected == World.Pawn_Pieces[i].square) {
                        World.Pawn_Pieces[i].Do_Pawn_Movement(square);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'R') {
                for (let i = 0; i < World.Rook_Pieces.length; i++) {
                    if (this.selected == World.Rook_Pieces[i].square) {
                        World.Rook_Pieces[i].Do_Movement(square);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'B') {
                for (let i = 0; i < World.Bishop_Pieces.length; i++) {
                    if (this.selected == World.Bishop_Pieces[i].square) {
                        World.Bishop_Pieces[i].Do_Movement(square);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'N') {
                for (let i = 0; i < World.Knight_Pieces.length; i++) {
                    if (this.selected == World.Knight_Pieces[i].square) {
                        World.Knight_Pieces[i].Do_Movement(square);
                        this.selected = -1;
                        return;
                    }
                }
            }
        }
    }
}
let Utility = new Utils();