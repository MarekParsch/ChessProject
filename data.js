"use strict";
class Global {
    Pawn_Pieces = [];
    Rook_Pieces = [];
    Knight_Pieces = [];
    Bishop_Pieces = [];
    King_Pieces = [];
    Queen_Pieces = [];
    num_pawns = 16;
    Get_Locations() {
        let output = [];
        let index = 0;
        for (let i = 0; i < this.Pawn_Pieces.length; i++) {
            output[index] = this.Pawn_Pieces[i].square;
            index++;
        }
        for (let i = 0; i < this.Rook_Pieces.length; i++) {
            output[index] = this.Rook_Pieces[i].square;
            index++;
        }
        for (let i = 0; i < this.Knight_Pieces.length; i++) {
            output[index] = this.Knight_Pieces[i].square;
            index++;
        }
        for (let i = 0; i < this.Bishop_Pieces.length; i++) {
            output[index] = this.Bishop_Pieces[i].square;
            index++;
        }
        for (let i = 0; i < this.King_Pieces.length; i++) {
            output[index] = this.King_Pieces[i].square;
            index++;
        }
        for (let i = 0; i < this.Queen_Pieces.length; i++) {
            output[index] = this.Queen_Pieces[i].square;
            index++;
        }
        return output;
    }
    Remove_Piece(square, color_to_be_removed) {
        let output = false;
        for (let i = 0; i < this.Pawn_Pieces.length; i++) {
            if (this.Pawn_Pieces[i].square == square && output == false && this.Pawn_Pieces[i].color == color_to_be_removed) {
                this.Pawn_Pieces.splice(i, 1);
                output = true;
            }
        }
        for (let i = 0; i < this.Rook_Pieces.length; i++) {
            if (this.Rook_Pieces[i].square == square && output == false && this.Rook_Pieces[i].color == color_to_be_removed) {
                this.Rook_Pieces.splice(i, 1);
                output = true;
            }
        }
        for (let i = 0; i < this.Knight_Pieces.length; i++) {
            if (this.Knight_Pieces[i].square == square && output == false && this.Knight_Pieces[i].color == color_to_be_removed) {
                this.Knight_Pieces.splice(i, 1);
                output = true;
            }
        }
        for (let i = 0; i < this.Bishop_Pieces.length; i++) {
            if (this.Bishop_Pieces[i].square == square && output == false && this.Bishop_Pieces[i].color == color_to_be_removed) {
                this.Bishop_Pieces.splice(i, 1);
                output = true;
            }
        }
        for (let i = 0; i < this.King_Pieces.length; i++) {
            if (this.King_Pieces[i].square == square && output == false && this.King_Pieces[i].color == color_to_be_removed) {
                this.King_Pieces.splice(i, 1);
                output = true;
            }
        }
        for (let i = 0; i < this.Queen_Pieces.length; i++) {
            if (this.Queen_Pieces[i].square == square && output == false && this.Queen_Pieces[i].color == color_to_be_removed) {
                this.Queen_Pieces.splice(i, 1);
                output = true;
            }
        }
        return output;
    }
    Get_Type(square) {
        let output = '';
        for (let i = 0; i < this.Pawn_Pieces.length; i++) {
            if (this.Pawn_Pieces[i].square == square) {
                return 'P';
            }
        }
        for (let i = 0; i < this.Rook_Pieces.length; i++) {
            if (this.Rook_Pieces[i].square == square) {
                return 'R';
            }
        }
        for (let i = 0; i < this.Knight_Pieces.length; i++) {
            if (this.Knight_Pieces[i].square == square) {
                return 'N';
            }
        }
        for (let i = 0; i < this.Bishop_Pieces.length; i++) {
            if (this.Bishop_Pieces[i].square == square) {
                return 'B';
            }
        }
        for (let i = 0; i < this.King_Pieces.length; i++) {
            if (this.King_Pieces[i].square == square) {
                return 'K';
            }
        }
        for (let i = 0; i < this.Queen_Pieces.length; i++) {
            if (this.Queen_Pieces[i].square == square) {
                return 'Q';
            }
        }
        return output;
    }
    Pawn_Promotion(piece, color, square) {
        let removed = false;
        for (let i = 0; i < this.Pawn_Pieces.length; i++) {
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
    }
}
let World = new Global();
class Pieces {
    square;
    color;
    highlight;
    constructor(a, b) {
        this.square = a;
        this.color = b;
        this.highlight = false;
    }
    Change_State() {
        this.highlight = true;
    }
    Do_Movement(destination) {
        let valid = this.Movement(destination);
        let output = false;
        if (valid) {
            let color_to_be_removed;
            if (this.color == 'white') {
                color_to_be_removed = 'black';
            }
            else {
                color_to_be_removed = 'white';
            }
            World.Remove_Piece(destination, color_to_be_removed);
            this.square = destination;
            return output;
        }
        else {
            return output;
        }
    }
}
class Pawns extends Pieces {
    //change IsQueen functionality(completely delete it and create a better system)
    Is_Queen;
    First_Move;
    EnPassant;
    EnPassant_Piece_Square = -1000;
    Movement(destination) {
        let piece_positions = World.Get_Locations();
        let possible_moves = []; //possible moves with taking
        let check_moves;
        let check_take_moves;
        let index = 0;
        let check_position = this.square - 8;
        let temp = true;
        let row = Math.floor(this.square / 8);
        let column = this.square - (Math.floor(this.square / 8) * 8);
        let output = false;
        if (this.First_Move) {
            if (this.color == 'white') {
                check_moves = [this.square - 8, this.square - 16];
                check_take_moves = [this.square - 8 - 1, this.square - 8 + 1];
            }
            else {
                check_moves = [this.square + 8, this.square + 16];
                check_take_moves = [this.square + 8 - 1, this.square + 8 + 1];
            }
            for (let i = 0; i < check_moves.length; i++) {
                temp = true;
                for (let c = 0; c < piece_positions.length; c++) {
                    if (check_moves[i] == piece_positions[c]) {
                        temp = false;
                    }
                }
                if (temp) {
                    possible_moves[index] = check_moves[i];
                    index++;
                }
            }
            for (let i = 0; i < check_take_moves.length; i++) {
                temp = false;
                for (let c = 0; c < piece_positions.length; c++) {
                    if (check_take_moves[i] == piece_positions[c]) {
                        temp = true;
                    }
                }
                if (temp) {
                    possible_moves[index] = check_moves[i];
                    index++;
                }
            }
            for (let i = 0; i < possible_moves.length; i++) {
                if (possible_moves[i] == destination) {
                    output = true;
                }
            }
            return output;
        }
        else if (this.EnPassant) { // on enpassant the next function will make the move and will automatically turn off or on enpassant
            if (this.color == 'white') {
                check_moves = [this.square - 8];
                check_take_moves = [this.square - 8 - 1, this.square - 8 + 1];
            }
            else {
                check_moves = [this.square + 8];
                check_take_moves = [this.square + 8 - 1, this.square + 8 + 1];
            }
            possible_moves = [this.EnPassant_Piece_Square - 8];
            index++;
            for (let i = 0; i < check_moves.length; i++) {
                temp = true;
                for (let c = 0; c < piece_positions.length; c++) {
                    if (check_moves[i] == piece_positions[c]) {
                        temp = false;
                    }
                }
                if (temp) {
                    possible_moves[index] = check_moves[i];
                    index++;
                }
            }
            for (let i = 0; i < check_take_moves.length; i++) {
                temp = false;
                for (let c = 0; c < piece_positions.length; c++) {
                    if (check_take_moves[i] == piece_positions[c]) {
                        temp = true;
                    }
                }
                if (temp) {
                    possible_moves[index] = check_moves[i];
                    index++;
                }
            }
            for (let i = 0; i < possible_moves.length; i++) {
                if (possible_moves[i] == destination) {
                    output = true;
                }
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
            for (let i = 0; i < check_moves.length; i++) {
                temp = true;
                for (let c = 0; c < piece_positions.length; c++) {
                    if (check_moves[i] == piece_positions[c]) {
                        temp = false;
                    }
                }
                if (temp) {
                    possible_moves[index] = check_moves[i];
                    index++;
                }
            }
            for (let i = 0; i < check_take_moves.length; i++) {
                temp = false;
                for (let c = 0; c < piece_positions.length; c++) {
                    if (check_take_moves[i] == piece_positions[c]) {
                        temp = true;
                    }
                }
                if (temp) {
                    possible_moves[index] = check_moves[i];
                    index++;
                }
            }
            for (let i = 0; i < possible_moves.length; i++) {
                if (possible_moves[i] == destination) {
                    output = true;
                }
            }
            return output;
        }
    }
    Promote(piece) {
        World.Pawn_Promotion(piece, this.color, this.square);
    }
    Do_Pawn_Movement(destination, EnPassant) {
        let valid = this.Movement(destination);
        let output = false;
        let enpassant_destination = destination;
        if (valid == true && destination == this.EnPassant_Piece_Square) {
            let color_to_be_removed;
            if (this.color == 'white') {
                enpassant_destination = enpassant_destination - 8;
                color_to_be_removed = 'black';
            }
            else {
                enpassant_destination = enpassant_destination + 8;
                color_to_be_removed = 'white';
            }
            World.Remove_Piece(destination, color_to_be_removed);
            this.square = enpassant_destination;
            return output;
        }
        else if (valid) {
            //Pawn promotion
            if (Math.floor(destination / 8) == 0 || Math.floor(destination / 8) == 7) {
                let preference_element = document.getElementById('promote-preference');
                let value = preference_element.value;
                this.square = destination;
                this.Promote(value);
            }
            else {
                let color_to_be_removed;
                if (this.color == 'white') {
                    color_to_be_removed = 'black';
                }
                else {
                    color_to_be_removed = 'white';
                }
                World.Remove_Piece(destination, color_to_be_removed);
                this.square = destination;
                return output;
            }
        }
        else {
            return output;
        }
    }
    constructor(a, b) {
        super(a, b);
        this.Is_Queen = false;
        this.First_Move = true;
        this.EnPassant = false;
    }
}
class Rooks extends Pieces {
    Movement(destination) {
        let piece_positions = World.Get_Locations();
        let possible_moves = []; //possible moves with taking
        let index = 0;
        let check_position = this.square - 8;
        let temp = true;
        let row = Math.floor(this.square / 8);
        let output = false;
        while (check_position >= 0 && temp == true) {
            for (let i = 0; i < piece_positions.length; i++) {
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
            for (let i = 0; i < piece_positions.length; i++) {
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
            for (let i = 0; i < piece_positions.length; i++) {
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
            for (let i = 0; i < piece_positions.length; i++) {
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
        for (let i = 0; i < possible_moves.length; i++) {
            if (possible_moves[i] == destination) {
                output = true;
            }
        }
        return output;
    }
    constructor(a, b) {
        super(a, b);
    }
}
class Knights extends Pieces {
    Movement(destination) {
        let check_moves = [this.square - 16 - 1, this.square - 16 + 1, this.square + 16 - 1, this.square + 16 + 1, this.square - 8 - 2, this.square - 8 + 2, this.square + 8 - 2, this.square + 8 + 2];
        let possible_moves = [];
        let column = this.square - (Math.floor(this.square / 8) * 8);
        let output = false;
        let index = 0;
        let temp = true;
        for (let i = 0; i < check_moves.length; i++) {
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
        for (let i = 0; i < possible_moves.length; i++) {
            if (possible_moves[i] == destination) {
                output = true;
            }
        }
        return output;
    }
    constructor(a, b) {
        super(a, b);
    }
}
class Bishops extends Pieces {
    Movement(destination) {
        let piece_positions = World.Get_Locations();
        let possible_moves = []; //possible moves with taking
        let index = 0;
        let check_position = this.square - 8 - 1;
        let column = this.square - (Math.floor(this.square / 8) * 8);
        let temp = true;
        let output = false;
        while (check_position >= 0 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) < column) {
            for (let i = 0; i < piece_positions.length; i++) {
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
            for (let i = 0; i < piece_positions.length; i++) {
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
            for (let i = 0; i < piece_positions.length; i++) {
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
        while (check_position <= 63 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) < column) {
            for (let i = 0; i < piece_positions.length; i++) {
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
        for (let i = 0; i < possible_moves.length; i++) {
            if (possible_moves[i] == destination) {
                output = true;
            }
        }
        return output;
    }
    constructor(a, b) {
        super(a, b);
    }
}
class Kings extends Pieces {
    Movement(destination) {
        let check_moves = [this.square - 8, this.square + 8, this.square - 1, this.square + 1, this.square - 8 - 1, this.square - 8 + 1, this.square + 8 - 1, this.square + 8 + 1];
        let possible_moves = [];
        let column = this.square - (Math.floor(this.square / 8) * 8);
        let output = false;
        let index = 0;
        let temp = true;
        for (let i = 0; i < check_moves.length; i++) {
            temp = true;
            if ((check_moves[i] - (Math.floor(check_moves[i] / 8) * 8)) != (column - 1) && (check_moves[i] - (Math.floor(check_moves[i] / 8) * 8)) != (column + 1)) {
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
        for (let i = 0; i < possible_moves.length; i++) {
            if (possible_moves[i] == destination) {
                output = true;
            }
        }
        return output;
    }
    constructor(a, b) {
        super(a, b);
    }
}
class Queens extends Pieces {
    Movement(destination) {
        let piece_positions = World.Get_Locations();
        let possible_moves = []; //possible moves with taking
        let index = 0;
        let check_position = this.square - 8;
        let temp = true;
        let row = Math.floor(this.square / 8);
        let column = this.square - (Math.floor(this.square / 8) * 8);
        let output = false;
        while (check_position >= 0 && temp == true) {
            for (let i = 0; i < piece_positions.length; i++) {
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
            for (let i = 0; i < piece_positions.length; i++) {
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
            for (let i = 0; i < piece_positions.length; i++) {
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
            for (let i = 0; i < piece_positions.length; i++) {
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
            for (let i = 0; i < piece_positions.length; i++) {
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
            for (let i = 0; i < piece_positions.length; i++) {
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
            for (let i = 0; i < piece_positions.length; i++) {
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
        while (check_position <= 63 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) < column) {
            for (let i = 0; i < piece_positions.length; i++) {
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
        for (let i = 0; i < possible_moves.length; i++) {
            if (possible_moves[i] == destination) {
                output = true;
            }
        }
        return output;
    }
    constructor(a, b) {
        super(a, b);
    }
}
function Create_Pieces() {
    World.Pawn_Pieces = [];
    World.Rook_Pieces = [];
    World.Knight_Pieces = [];
    World.Bishop_Pieces = [];
    World.King_Pieces = [];
    World.Queen_Pieces = [];
    //creating all pawns
    for (let i = 0; i < 16; i++) {
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
Create_Pieces();
//TO-DO LIST:
//-Moving Pieces through the GUI
//-Piece Display Update
//-Actual Pieces rather than stand-ins(letters)