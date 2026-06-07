var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Global = /** @class */ (function () {
    function Global() {
        this.Pawn_Pieces = [];
        this.Rook_Pieces = [];
        this.Knight_Pieces = [];
        this.Bishop_Pieces = [];
        this.King_Pieces = [];
        this.Queen_Pieces = [];
        this.num_pawns = 16;
        this.move = 'white';
    }
    Object.defineProperty(Global.prototype, "Get_Move", {
        get: function () {
            return this.move;
        },
        enumerable: false,
        configurable: true
    });
    Global.prototype.Change_Play = function () {
        if (this.King_Pieces.length != 2) {
            this.move = 'none';
            var element = document.getElementById('status');
            element.innerText = 'Game ended';
            return;
        }
        if (this.move == 'white') {
            this.move = 'black';
        }
        else {
            this.move = 'white';
        }
    };
    Global.prototype.Get_Locations = function () {
        var output = [];
        var index = 0;
        for (var i = 0; i < this.Pawn_Pieces.length; i++) {
            output[index] = this.Pawn_Pieces[i].square;
            index++;
        }
        for (var i = 0; i < this.Rook_Pieces.length; i++) {
            output[index] = this.Rook_Pieces[i].square;
            index++;
        }
        for (var i = 0; i < this.Knight_Pieces.length; i++) {
            output[index] = this.Knight_Pieces[i].square;
            index++;
        }
        for (var i = 0; i < this.Bishop_Pieces.length; i++) {
            output[index] = this.Bishop_Pieces[i].square;
            index++;
        }
        for (var i = 0; i < this.King_Pieces.length; i++) {
            output[index] = this.King_Pieces[i].square;
            index++;
        }
        for (var i = 0; i < this.Queen_Pieces.length; i++) {
            output[index] = this.Queen_Pieces[i].square;
            index++;
        }
        return output;
    };
    Global.prototype.Remove_Piece = function (square, color_to_be_removed) {
        var output = false;
        for (var i = 0; i < this.Pawn_Pieces.length; i++) {
            if (this.Pawn_Pieces[i].square == square && output == false && this.Pawn_Pieces[i].color == color_to_be_removed) {
                this.Pawn_Pieces.splice(i, 1);
                output = true;
            }
        }
        for (var i = 0; i < this.Rook_Pieces.length; i++) {
            if (this.Rook_Pieces[i].square == square && output == false && this.Rook_Pieces[i].color == color_to_be_removed) {
                this.Rook_Pieces.splice(i, 1);
                output = true;
            }
        }
        for (var i = 0; i < this.Knight_Pieces.length; i++) {
            if (this.Knight_Pieces[i].square == square && output == false && this.Knight_Pieces[i].color == color_to_be_removed) {
                this.Knight_Pieces.splice(i, 1);
                output = true;
            }
        }
        for (var i = 0; i < this.Bishop_Pieces.length; i++) {
            if (this.Bishop_Pieces[i].square == square && output == false && this.Bishop_Pieces[i].color == color_to_be_removed) {
                this.Bishop_Pieces.splice(i, 1);
                output = true;
            }
        }
        for (var i = 0; i < this.King_Pieces.length; i++) {
            if (this.King_Pieces[i].square == square && output == false && this.King_Pieces[i].color == color_to_be_removed) {
                this.King_Pieces.splice(i, 1);
                output = true;
            }
        }
        for (var i = 0; i < this.Queen_Pieces.length; i++) {
            if (this.Queen_Pieces[i].square == square && output == false && this.Queen_Pieces[i].color == color_to_be_removed) {
                this.Queen_Pieces.splice(i, 1);
                output = true;
            }
        }
        return output;
    };
    Global.prototype.Get_Type = function (square) {
        var output = '';
        for (var i = 0; i < this.Pawn_Pieces.length; i++) {
            if (this.Pawn_Pieces[i].square == square) {
                return 'P';
            }
        }
        for (var i = 0; i < this.Rook_Pieces.length; i++) {
            if (this.Rook_Pieces[i].square == square) {
                return 'R';
            }
        }
        for (var i = 0; i < this.Knight_Pieces.length; i++) {
            if (this.Knight_Pieces[i].square == square) {
                return 'N';
            }
        }
        for (var i = 0; i < this.Bishop_Pieces.length; i++) {
            if (this.Bishop_Pieces[i].square == square) {
                return 'B';
            }
        }
        for (var i = 0; i < this.King_Pieces.length; i++) {
            if (this.King_Pieces[i].square == square) {
                return 'K';
            }
        }
        for (var i = 0; i < this.Queen_Pieces.length; i++) {
            if (this.Queen_Pieces[i].square == square) {
                return 'Q';
            }
        }
        return output;
    };
    Global.prototype.Pawn_Promotion = function (piece, color, square) {
        var removed = false;
        for (var i = 0; i < this.Pawn_Pieces.length; i++) {
            if (this.Pawn_Pieces[i].square == square) {
                this.Pawn_Pieces.splice(i, 1);
                removed = true;
                break;
            }
        }
        //wont break because it will be called after all are loaded thus it will see it
        if (removed == false) {
            return;
        }
        else if (piece == 'Q') {
            this.Queen_Pieces.push(new Queens(square, color));
        }
        else if (piece == 'B') {
            this.Bishop_Pieces.push(new Bishops(square, color));
        }
        else if (piece == 'R') {
            this.Rook_Pieces.push(new Rooks(square, color));
        }
        else if (piece == 'N') {
            this.Knight_Pieces.push(new Knights(square, color));
        }
        else {
            return;
        }
    };
    Global.prototype.Castle = function (color, destination, square, rook_square) {
        var output = false;
        for (var i = 0; i < this.Rook_Pieces.length; i++) {
            if (this.Rook_Pieces[i].square == rook_square && this.Rook_Pieces[i].color == color) {
                for (var c = 0; c < this.King_Pieces.length; c++) {
                    if (this.King_Pieces[c].color == color) {
                        if (destination > square) {
                            this.Rook_Pieces[i].square = destination - 1;
                        }
                        else {
                            this.Rook_Pieces[i].square = destination + 1;
                        }
                        this.King_Pieces[c].square = destination;
                        output = true;
                        break;
                    }
                }
                break;
            }
        }
        return output;
    };
    return Global;
}());
var World = new Global();
var Pieces = /** @class */ (function () {
    function Pieces(a, b) {
        this.square = a;
        this.color = b;
        this.highlight = false;
    }
    Pieces.prototype.Change_State = function (state) {
        this.highlight = state;
    };
    Pieces.prototype.Do_Movement = function (destination) {
        var valid = this.Movement(destination);
        var output = false;
        var check = this.color == World.Get_Move;
        if (valid && check) {
            var color_to_be_removed = void 0;
            if (this.color == 'white') {
                color_to_be_removed = 'black';
            }
            else {
                color_to_be_removed = 'white';
            }
            World.Remove_Piece(destination, color_to_be_removed);
            this.square = destination;
            World.Change_Play();
            output = true;
            return output;
        }
        else {
            return output;
        }
    };
    Pieces.prototype.Valid_Move_Same_Color_Check = function (destination) {
        for (var i = 0; i < World.Pawn_Pieces.length; i++) {
            if (World.Pawn_Pieces[i].square == destination && World.Pawn_Pieces[i].color == this.color) {
                return false;
            }
        }
        for (var i = 0; i < World.Rook_Pieces.length; i++) {
            if (World.Rook_Pieces[i].square == destination && World.Rook_Pieces[i].color == this.color) {
                return false;
            }
        }
        for (var i = 0; i < World.Knight_Pieces.length; i++) {
            if (World.Knight_Pieces[i].square == destination && World.Knight_Pieces[i].color == this.color) {
                return false;
            }
        }
        for (var i = 0; i < World.Bishop_Pieces.length; i++) {
            if (World.Bishop_Pieces[i].square == destination && World.Knight_Pieces[i].color == this.color) {
                return false;
            }
        }
        for (var i = 0; i < World.King_Pieces.length; i++) {
            if (World.King_Pieces[i].square == destination && World.King_Pieces[i].color == this.color) {
                return false;
            }
        }
        for (var i = 0; i < World.Queen_Pieces.length; i++) {
            if (World.Queen_Pieces[i].square == destination && World.Queen_Pieces[i].color == this.color) {
                return false;
            }
        }
        return true;
    };
    return Pieces;
}());
var Pawns = /** @class */ (function (_super) {
    __extends(Pawns, _super);
    function Pawns(a, b) {
        var _this = _super.call(this, a, b) || this;
        _this.EnPassant_Piece_Square = -1;
        _this.First_Move = true;
        _this.EnPassant = false;
        return _this;
    }
    Pawns.prototype.Movement = function (destination) {
        var piece_positions = World.Get_Locations();
        var possible_moves = []; //possible moves with taking
        var check_moves;
        var check_take_moves;
        var index = 0;
        var check_position = this.square - 8;
        var temp = true;
        var row = Math.floor(this.square / 8);
        var column = this.square - (Math.floor(this.square / 8) * 8);
        var output = false;
        var Enpassant_squares = [destination + 1, destination - 1];
        if (this.First_Move) {
            if (this.color == 'white') {
                check_moves = [this.square - 8, this.square - 16];
                check_take_moves = [this.square - 8 - 1, this.square - 8 + 1];
            }
            else {
                check_moves = [this.square + 8, this.square + 16];
                check_take_moves = [this.square + 8 - 1, this.square + 8 + 1];
            }
            for (var i = 0; i < check_moves.length; i++) {
                temp = true;
                for (var c = 0; c < piece_positions.length; c++) {
                    if (check_moves[i] == piece_positions[c]) {
                        temp = false;
                    }
                }
                if (temp) {
                    possible_moves[index] = check_moves[i];
                    index++;
                }
            }
            for (var i = 0; i < check_take_moves.length; i++) {
                temp = false;
                for (var c = 0; c < piece_positions.length; c++) {
                    if (check_take_moves[i] == piece_positions[c]) {
                        temp = true;
                    }
                }
                if (temp) {
                    possible_moves[index] = check_take_moves[i];
                    index++;
                }
            }
            for (var i = 0; i < possible_moves.length; i++) {
                if (possible_moves[i] == destination) {
                    output = true;
                }
            }
            if (output) {
                var color_to_be_removed = void 0;
                if (this.color == 'white') {
                    color_to_be_removed = 'black';
                }
                else {
                    color_to_be_removed = 'white';
                }
                for (var j = 0; j < Enpassant_squares.length; j++) {
                    for (var i = 0; i < World.Pawn_Pieces.length; i++) {
                        if (World.Pawn_Pieces[i].color == color_to_be_removed && World.Pawn_Pieces[i].square == Enpassant_squares[j]) {
                            World.Pawn_Pieces[i].EnPassant = true;
                            World.Pawn_Pieces[i].EnPassant_Piece_Square = destination;
                            break;
                        }
                    }
                }
                this.First_Move = false;
                output = this.Valid_Move_Same_Color_Check(destination);
            }
            return output;
        }
        else if (this.EnPassant) { // on enpassant the next function will make the move and will automatically turn off or on enpassant
            if (this.color == 'white') {
                check_moves = [this.square - 8];
                check_take_moves = [this.square - 8 - 1, this.square - 8 + 1];
                possible_moves = [this.EnPassant_Piece_Square - 8];
                index++;
            }
            else {
                check_moves = [this.square + 8];
                check_take_moves = [this.square + 8 - 1, this.square + 8 + 1];
                possible_moves = [this.EnPassant_Piece_Square + 8];
                index++;
            }
            for (var i = 0; i < check_moves.length; i++) {
                temp = true;
                for (var c = 0; c < piece_positions.length; c++) {
                    if (check_moves[i] == piece_positions[c]) {
                        temp = false;
                    }
                }
                if (temp) {
                    possible_moves[index] = check_moves[i];
                    index++;
                }
            }
            for (var i = 0; i < check_take_moves.length; i++) {
                temp = false;
                for (var c = 0; c < piece_positions.length; c++) {
                    if (check_take_moves[i] == piece_positions[c]) {
                        temp = true;
                    }
                }
                if (temp) {
                    possible_moves[index] = check_take_moves[i];
                    index++;
                }
            }
            for (var i = 0; i < possible_moves.length; i++) {
                if (possible_moves[i] == destination) {
                    output = true;
                }
            }
            if (output) {
                output = this.Valid_Move_Same_Color_Check(destination);
            }
            return output;
        }
        else {
            if (this.color == 'white') {
                check_moves = [this.square - 8];
                check_take_moves = [this.square - 8 - 1, this.square - 8 + 1];
            }
            else {
                check_moves = [this.square + 8];
                check_take_moves = [this.square + 8 - 1, this.square + 8 + 1];
            }
            for (var i = 0; i < check_moves.length; i++) {
                temp = true;
                for (var c = 0; c < piece_positions.length; c++) {
                    if (check_moves[i] == piece_positions[c]) {
                        temp = false;
                    }
                }
                if (temp) {
                    possible_moves[index] = check_moves[i];
                    index++;
                }
            }
            for (var i = 0; i < check_take_moves.length; i++) {
                temp = false;
                for (var c = 0; c < piece_positions.length; c++) {
                    if (check_take_moves[i] == piece_positions[c]) {
                        temp = true;
                    }
                }
                if (temp) {
                    possible_moves[index] = check_take_moves[i];
                    index++;
                }
            }
            for (var i = 0; i < possible_moves.length; i++) {
                if (possible_moves[i] == destination) {
                    output = true;
                }
            }
            if (output) {
                output = this.Valid_Move_Same_Color_Check(destination);
            }
            return output;
        }
    };
    Pawns.prototype.Promote = function (piece) {
        World.Pawn_Promotion(piece, this.color, this.square);
    };
    Pawns.prototype.Do_Pawn_Movement = function (destination) {
        var valid = this.Movement(destination);
        var check = this.color == World.Get_Move;
        if (valid == true && this.EnPassant == true && Math.abs(destination - this.EnPassant_Piece_Square) == 8 && check == true) {
            var color_to_be_removed = void 0;
            if (this.color == 'white') {
                color_to_be_removed = 'black';
            }
            else {
                color_to_be_removed = 'white';
            }
            World.Remove_Piece(this.EnPassant_Piece_Square, color_to_be_removed);
            this.square = destination;
            this.EnPassant_Piece_Square = -1;
            this.EnPassant = false;
            World.Change_Play();
            return true;
        }
        else if (valid && check) {
            //Pawn promotion
            if (Math.floor(destination / 8) == 0 || Math.floor(destination / 8) == 7) {
                var preference_element = document.getElementById('promote-preference');
                var value = preference_element.value;
                var color_to_be_removed = void 0;
                if (this.color == 'white') {
                    color_to_be_removed = 'black';
                }
                else {
                    color_to_be_removed = 'white';
                }
                World.Remove_Piece(destination, color_to_be_removed);
                this.square = destination;
                this.Promote(value);
                World.Change_Play();
                return true;
            }
            else {
                var color_to_be_removed = void 0;
                if (this.color == 'white') {
                    color_to_be_removed = 'black';
                }
                else {
                    color_to_be_removed = 'white';
                }
                World.Remove_Piece(destination, color_to_be_removed);
                this.square = destination;
                World.Change_Play();
                return true;
            }
        }
        else {
            return false;
        }
    };
    return Pawns;
}(Pieces));
var Rooks = /** @class */ (function (_super) {
    __extends(Rooks, _super);
    function Rooks(a, b) {
        return _super.call(this, a, b) || this;
    }
    Rooks.prototype.Movement = function (destination) {
        var piece_positions = World.Get_Locations();
        var possible_moves = []; //possible moves with taking
        var index = 0;
        var check_position = this.square - 8;
        var temp = true;
        var row = Math.floor(this.square / 8);
        var output = false;
        while (check_position >= 0 && temp == true) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position - 8;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        temp = true;
        check_position = this.square + 8;
        while (check_position <= 63 && temp == true) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position + 8;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        temp = true;
        check_position = this.square - 1;
        while (check_position >= (row * 8) && temp == true) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position - 1;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        temp = true;
        check_position = this.square + 1;
        while (check_position <= ((row * 8 + 7)) && temp == true) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position + 1;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        for (var i = 0; i < possible_moves.length; i++) {
            if (possible_moves[i] == destination) {
                output = true;
            }
        }
        if (output) {
            output = this.Valid_Move_Same_Color_Check(destination);
        }
        return output;
    };
    return Rooks;
}(Pieces));
var Knights = /** @class */ (function (_super) {
    __extends(Knights, _super);
    function Knights(a, b) {
        return _super.call(this, a, b) || this;
    }
    Knights.prototype.Movement = function (destination) {
        var check_moves = [this.square - 16 - 1, this.square - 16 + 1, this.square + 16 - 1, this.square + 16 + 1, this.square - 8 - 2, this.square - 8 + 2, this.square + 8 - 2, this.square + 8 + 2];
        var possible_moves = [];
        var column = this.square - (Math.floor(this.square / 8) * 8);
        var output = false;
        var index = 0;
        var temp = true;
        for (var i = 0; i < check_moves.length; i++) {
            temp = true;
            if ((check_moves[i] - (Math.floor(check_moves[i] / 8) * 8)) != (column - 1) && (check_moves[i] - (Math.floor(check_moves[i] / 8) * 8)) != (column + 1) && (check_moves[i] - (Math.floor(check_moves[i] / 8) * 8)) != (column - 2) && (check_moves[i] - (Math.floor(check_moves[i] / 8) * 8)) != (column + 2)) {
                temp = false;
            }
            if (check_moves[i] > 63 || check_moves[i] < 0) {
                temp = false;
            }
            if (temp) {
                possible_moves[index] = check_moves[i];
                index++;
            }
        }
        for (var i = 0; i < possible_moves.length; i++) {
            if (possible_moves[i] == destination) {
                output = true;
            }
        }
        if (output) {
            output = this.Valid_Move_Same_Color_Check(destination);
        }
        return output;
    };
    return Knights;
}(Pieces));
var Bishops = /** @class */ (function (_super) {
    __extends(Bishops, _super);
    function Bishops(a, b) {
        return _super.call(this, a, b) || this;
    }
    Bishops.prototype.Movement = function (destination) {
        var piece_positions = World.Get_Locations();
        var possible_moves = []; //possible moves with taking
        var index = 0;
        var check_position = this.square - 8 - 1;
        var column = this.square - (Math.floor(this.square / 8) * 8);
        var temp = true;
        var output = false;
        while (check_position >= 0 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) < column) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position - 8 - 1;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        temp = true;
        check_position = this.square - 8 + 1;
        while (check_position >= 0 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) > column) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position - 8 + 1;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        temp = true;
        check_position = this.square + 8 - 1;
        while (check_position <= 63 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) < column) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position + 8 - 1;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        temp = true;
        check_position = this.square + 8 + 1;
        while (check_position <= 63 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) > column) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position + 8 + 1;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        for (var i = 0; i < possible_moves.length; i++) {
            if (possible_moves[i] == destination) {
                output = true;
            }
        }
        if (output) {
            output = this.Valid_Move_Same_Color_Check(destination);
        }
        return output;
    };
    return Bishops;
}(Pieces));
var Kings = /** @class */ (function (_super) {
    __extends(Kings, _super);
    function Kings(a, b) {
        var _this = _super.call(this, a, b) || this;
        _this.castled = false;
        return _this;
    }
    Kings.prototype.Movement = function (destination) {
        var check_moves = [this.square - 8, this.square + 8, this.square - 1, this.square + 1, this.square - 8 - 1, this.square - 8 + 1, this.square + 8 - 1, this.square + 8 + 1];
        var possible_moves = [];
        var column = this.square - (Math.floor(this.square / 8) * 8);
        var output = false;
        var index = 0;
        var temp = true;
        for (var i = 0; i < check_moves.length; i++) {
            temp = true;
            if (Math.abs((check_moves[i] - (Math.floor(check_moves[i] / 8) * 8) - column)) > 1) {
                temp = false;
            }
            if (check_moves[i] > 63 || check_moves[i] < 0) {
                temp = false;
            }
            if (temp) {
                possible_moves[index] = check_moves[i];
                index++;
            }
        }
        if (this.castled == false) {
            possible_moves.push(this.square - 2);
            possible_moves.push(this.square + 2);
        }
        for (var i = 0; i < possible_moves.length; i++) {
            if (possible_moves[i] == destination) {
                output = true;
            }
        }
        if (output) {
            output = this.Valid_Move_Same_Color_Check(destination);
        }
        return output;
    };
    Kings.prototype.Do_King_Movement = function (destination) {
        var valid = this.Movement(destination);
        var output = false;
        var check = this.color == World.Get_Move;
        var castle_check = destination == (this.square - 2) || destination == (this.square + 2);
        if (valid && check && castle_check == false) {
            var color_to_be_removed = void 0;
            if (this.color == 'white') {
                color_to_be_removed = 'black';
            }
            else {
                color_to_be_removed = 'white';
            }
            World.Remove_Piece(destination, color_to_be_removed);
            this.square = destination;
            this.castled = true;
            World.Change_Play();
            output = true;
            return output;
        }
        else if (valid && check && castle_check) {
            var locations = World.Get_Locations();
            var check_squares = void 0;
            var rook_square = void 0;
            var rook_check = void 0;
            var empty_check = true;
            if (destination == (this.square - 2)) {
                check_squares = [this.square - 1, this.square - 2, this.square - 3];
                rook_square = this.square - 4;
            }
            else {
                check_squares = [this.square + 1, this.square + 2];
                rook_square = this.square + 3;
            }
            rook_check = World.Get_Type(rook_square) == 'R';
            if (!rook_check) {
                return output;
            }
            for (var i = 0; i < check_squares.length; i++) {
                for (var c = 0; c < locations.length; c++) {
                    if (check_squares[i] == locations[c]) {
                        empty_check = false;
                    }
                }
            }
            if (!empty_check) {
                return output;
            }
            var Castle_result = World.Castle(this.color, destination, this.square, rook_square);
            console.log(Castle_result);
            if (Castle_result) {
                output = true;
                this.castled = true;
                World.Change_Play();
            }
            return output;
        }
        else {
            return output;
        }
    };
    return Kings;
}(Pieces));
var Queens = /** @class */ (function (_super) {
    __extends(Queens, _super);
    function Queens(a, b) {
        return _super.call(this, a, b) || this;
    }
    Queens.prototype.Movement = function (destination) {
        var piece_positions = World.Get_Locations();
        var possible_moves = []; //possible moves with taking
        var index = 0;
        var check_position = this.square - 8;
        var temp = true;
        var row = Math.floor(this.square / 8);
        var column = this.square - (Math.floor(this.square / 8) * 8);
        var output = false;
        while (check_position >= 0 && temp == true) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position - 8;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        temp = true;
        check_position = this.square + 8;
        while (check_position <= 63 && temp == true) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position + 8;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        temp = true;
        check_position = this.square - 1;
        while (check_position >= (row * 8) && temp == true) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position - 1;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        temp = true;
        check_position = this.square + 1;
        while (check_position <= ((row * 8 + 7)) && temp == true) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position + 1;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        check_position = this.square - 8 - 1;
        temp = true;
        while (check_position >= 0 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) < column) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position - 8 - 1;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        temp = true;
        check_position = this.square - 8 + 1;
        while (check_position >= 0 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) > column) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position - 8 + 1;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        temp = true;
        check_position = this.square + 8 - 1;
        while (check_position <= 63 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) < column) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position + 8 - 1;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        temp = true;
        check_position = this.square + 8 + 1;
        while (check_position <= 63 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) > column) {
            for (var i = 0; i < piece_positions.length; i++) {
                if (piece_positions[i] == check_position) {
                    temp = false;
                }
            }
            if (temp) {
                possible_moves[index] = check_position;
                check_position = check_position + 8 + 1;
                index++;
            }
            else {
                possible_moves[index] = check_position;
                index++;
            }
        }
        for (var i = 0; i < possible_moves.length; i++) {
            if (possible_moves[i] == destination) {
                output = true;
            }
        }
        if (output) {
            output = this.Valid_Move_Same_Color_Check(destination);
        }
        return output;
    };
    return Queens;
}(Pieces));
function Create_Pieces() {
    World.Pawn_Pieces = [];
    World.Rook_Pieces = [];
    World.Knight_Pieces = [];
    World.Bishop_Pieces = [];
    World.King_Pieces = [];
    World.Queen_Pieces = [];
    //creating all pawns
    for (var i = 0; i < 16; i++) {
        if (i < 8) {
            World.Pawn_Pieces[i] = new Pawns(6 * 8 + i, 'white');
        }
        else {
            World.Pawn_Pieces[i] = new Pawns(0 * 8 + i, 'black');
        }
    }
    //creating all rooks
    World.Rook_Pieces[0] = new Rooks(56, 'white');
    World.Rook_Pieces[1] = new Rooks(63, 'white');
    World.Rook_Pieces[2] = new Rooks(0, 'black');
    World.Rook_Pieces[3] = new Rooks(7, 'black');
    //creating all knights
    World.Knight_Pieces[0] = new Knights(57, 'white');
    World.Knight_Pieces[1] = new Knights(62, 'white');
    World.Knight_Pieces[2] = new Knights(1, 'black');
    World.Knight_Pieces[3] = new Knights(6, 'black');
    //creating all bishops
    World.Bishop_Pieces[0] = new Bishops(58, 'white');
    World.Bishop_Pieces[1] = new Bishops(61, 'white');
    World.Bishop_Pieces[2] = new Bishops(2, 'black');
    World.Bishop_Pieces[3] = new Bishops(5, 'black');
    //creating all kings
    World.King_Pieces[0] = new Kings(60, 'white');
    World.King_Pieces[1] = new Kings(4, 'black');
    //creating all queens
    World.Queen_Pieces[0] = new Queens(59, 'white');
    World.Queen_Pieces[1] = new Queens(3, 'black');
}
