var Utils = /** @class */ (function () {
    function Utils() {
        this.boardsize = 8;
        this.selected = -1;
    }
    Utils.prototype.Generate_Board = function () {
        var board_element = document.getElementById('chessboard');
        Create_Pieces();
        board_element.innerHTML = '';
        board_element.style.display = 'grid';
        board_element.style.gridTemplateColumns = 'repeat(' + String(this.boardsize) + ',' + String(40 / this.boardsize) + 'vw)';
        for (var i = 0; i < this.boardsize; i++) {
            for (var c = 0; c < this.boardsize; c++) {
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
        var element = document.getElementById('status');
        element.innerText = 'Game started';
    };
    Utils.prototype.Display_Board = function () {
        var locations = World.Get_Locations();
        var element;
        for (var c = 0; c < (this.boardsize * this.boardsize); c++) {
            element = document.getElementById('cell-' + String(c));
            element.innerText = '';
        }
        for (var i = 0; i < locations.length; i++) {
            element = document.getElementById('cell-' + String(locations[i]));
            element.innerText = World.Get_Type(locations[i]);
        }
    };
    Utils.prototype.Selection = function (square) {
        var type = '';
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
                for (var i = 0; i < World.Queen_Pieces.length; i++) {
                    if (this.selected == World.Queen_Pieces[i].square) {
                        World.Queen_Pieces[i].Do_Movement(square);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'K') {
                for (var i = 0; i < World.King_Pieces.length; i++) {
                    if (this.selected == World.King_Pieces[i].square) {
                        World.King_Pieces[i].Do_King_Movement(square);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'P') {
                for (var i = 0; i < World.Pawn_Pieces.length; i++) {
                    if (this.selected == World.Pawn_Pieces[i].square) {
                        World.Pawn_Pieces[i].Do_Pawn_Movement(square);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'R') {
                for (var i = 0; i < World.Rook_Pieces.length; i++) {
                    if (this.selected == World.Rook_Pieces[i].square) {
                        World.Rook_Pieces[i].Do_Movement(square);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'B') {
                for (var i = 0; i < World.Bishop_Pieces.length; i++) {
                    if (this.selected == World.Bishop_Pieces[i].square) {
                        World.Bishop_Pieces[i].Do_Movement(square);
                        this.selected = -1;
                        return;
                    }
                }
            }
            else if (type == 'N') {
                for (var i = 0; i < World.Knight_Pieces.length; i++) {
                    if (this.selected == World.Knight_Pieces[i].square) {
                        World.Knight_Pieces[i].Do_Movement(square);
                        this.selected = -1;
                        return;
                    }
                }
            }
        }
    };
    return Utils;
}());
var Utility = new Utils();