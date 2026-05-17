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
        board_element.innerHTML = '';
        board_element.style.display = 'grid';
        board_element.style.gridTemplateColumns = 'repeat(' + String(this.boardsize) + ',' + String(40 / this.boardsize) + 'vw)';
        for (let i = 0; i < this.boardsize; i++) {
            for (let c = 0; c < this.boardsize; c++) {
                if ((i % 2) == 0) {
                    if ((c % 2) == 0) { //dark-squared
                        board_element.innerHTML += '<div id="cell-' + String((i * 8) + c) + '" class="dark_square" style="height:' + String(40 / this.boardsize) + 'vw; width:' + String(40 / this.boardsize) + 'vw; font-size:' + String(20 / this.boardsize) + 'vw;" onclick="Utility.Selection(' + String(i * 8 + c) + ')"></div>';
                    }
                    else if ((c % 2) == 1) { //light-squared
                        board_element.innerHTML += '<div id="cell-' + String((i * 8) + c) + '" class="light_square" style="height:' + String(40 / this.boardsize) + 'vw; width:' + String(40 / this.boardsize) + 'vw; font-size:' + String(20 / this.boardsize) + 'vw;" onclick="Utility.Selection(' + String(i * 8 + c) + ')"></div>';
                    }
                }
                else if ((i % 2) == 1) {
                    if ((c % 2) == 1) { //dark-squared
                        board_element.innerHTML += '<div id="cell-' + String((i * 8) + c) + '" class="dark_square" style="height:' + String(40 / this.boardsize) + 'vw; width:' + String(40 / this.boardsize) + 'vw; font-size:' + String(20 / this.boardsize) + 'vw;" onclick="Utility.Selection(' + String(i * 8 + c) + ')"></div>';
                    }
                    else if ((c % 2) == 0) { //light-squared
                        board_element.innerHTML += '<div id="cell-' + String((i * 8) + c) + '" class="light_square" style="height:' + String(40 / this.boardsize) + 'vw; width:' + String(40 / this.boardsize) + 'vw; font-size:' + String(20 / this.boardsize) + 'vw;" onclick="Utility.Selection(' + String(i * 8 + c) + ')"></div>';
                    }
                }
            }
        }
    }
    Display_Board() {
        let locations = World.Get_Locations();
        let element;
        for (let c = 0; c < (this.boardsize * this.boardsize); c++) {
            element = document.getElementById('cell-' + String(c));
            element.innerText = '';
        }
        for (let i = 0; i < locations.length; i++) {
            element = document.getElementById('cell-' + String(locations[i]));
            element.innerText = World.Get_Type(locations[i]);
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
                    if (square == World.Queen_Pieces[i].square) {
                        World.Queen_Pieces[i].Do_Movement(this.selected);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'K') {
                for (let i = 0; i < World.King_Pieces.length; i++) {
                    if (square == World.King_Pieces[i].square) {
                        World.King_Pieces[i].Do_Movement(this.selected);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'P') {
                for (let i = 0; i < World.Pawn_Pieces.length; i++) {
                    if (square == World.Pawn_Pieces[i].square) {
                        World.Pawn_Pieces[i].Do_Movement(this.selected);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'R') {
                for (let i = 0; i < World.Rook_Pieces.length; i++) {
                    if (square == World.Rook_Pieces[i].square) {
                        World.Rook_Pieces[i].Do_Movement(this.selected);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'B') {
                for (let i = 0; i < World.Bishop_Pieces.length; i++) {
                    if (square == World.Bishop_Pieces[i].square) {
                        World.Bishop_Pieces[i].Do_Movement(this.selected);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'N') {
                console.log('Knight');
                for (let i = 0; i < World.Knight_Pieces.length; i++) {
                    if (square == World.Knight_Pieces[i].square) {
                        World.Knight_Pieces[i].Do_Movement(this.selected);
                        this.selected = -1;
                        return;
                    }
                }
            }
        }
    }
}
let Utility = new Utils();