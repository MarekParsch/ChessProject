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
        for (let i = 0; i < this.num_pawns; i++) {
            output[i] = this.Pawn_Pieces[i].square;
        }
        for (let i = this.num_pawns; i < (this.num_pawns + 4); i++) {
            output[i] = this.Rook_Pieces[i - this.num_pawns].square;
        }
        for (let i = (this.num_pawns + 4); i < (this.num_pawns + 8); i++) {
            output[i] = this.Knight_Pieces[i - this.num_pawns - 4].square;
        }
        for (let i = (this.num_pawns + 8); i < (this.num_pawns + 12); i++) {
            output[i] = this.Bishop_Pieces[i - this.num_pawns - 8].square;
        }
        for (let i = (this.num_pawns + 12); i < (this.num_pawns + 14); i++) {
            output[i] = this.King_Pieces[i - this.num_pawns - 12].square;
        }
        for (let i = (this.num_pawns + 14); i < (this.num_pawns + 16); i++) {
            output[i] = this.Queen_Pieces[i - this.num_pawns - 14].square;
        }
        return output;
    }
}
let World = new Global();
class Pieces {
    square;
    alive;
    color;
    constructor(a, b) {
        this.square = a;
        this.alive = true;
        this.color = b;
    }
    Change_State() {
        this.alive = false;
    }
}
class Pawns extends Pieces {
    Is_Queen;
    First_Move;
    EnPassant;
    Movement(destination) {
        return true;
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
        let possible_moves = [];
        let index = 0;
        let check_position = this.square - 8;
        let temp = true;
        let row = Math.floor(this.square / 8);
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
        }
        return true;
    }
    constructor(a, b) {
        super(a, b);
    }
}
class Knights extends Pieces {
    Movement(destination) {
        return true;
    }
    constructor(a, b) {
        super(a, b);
    }
}
class Bishops extends Pieces {
    Movement(destination) {
        return true;
    }
    constructor(a, b) {
        super(a, b);
    }
}
class Kings extends Pieces {
    Movement(destination) {
        return true;
    }
    constructor(a, b) {
        super(a, b);
    }
}
class Queens extends Pieces {
    Movement(destination) {
        return true;
    }
    constructor(a, b) {
        super(a, b);
    }
}
function Create_Pieces() {
    //creating all pawns
    for (let i = 0; i < 16; i++) {
        if (i < 8) {
            World.Pawn_Pieces[i] = new Pawns(6 * 8 + i, 'white');
        }
        else {
            World.Pawn_Pieces[i] = new Pawns(1 * 8 + i, 'black');
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
    World.Bishop_Pieces[3] = new Bishops(7, 'black');
    //creating all kings
    World.King_Pieces[0] = new Kings(60, 'white');
    World.King_Pieces[1] = new Kings(4, 'black');
    //creating all queens
    World.Queen_Pieces[0] = new Queens(59, 'white');
    World.Queen_Pieces[1] = new Queens(3, 'black');
}
Create_Pieces();
