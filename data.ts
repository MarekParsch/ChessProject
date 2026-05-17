class Global{
    Pawn_Pieces: Pawns[] = [];
    Rook_Pieces: Rooks[] = [];
    Knight_Pieces: Knights[] = [];
    Bishop_Pieces: Bishops[] = [];
    King_Pieces: Kings[] = [];
    Queen_Pieces: Queens[] = [];

    num_pawns:number = 16;
    move:string = 'white';

    Change_Play(){
        if(this.King_Pieces.length != 2){
            this.move = 'none';
            
            let element = document.getElementById('status') as HTMLOutputElement;
            element.innerText = 'Game ended';

            return;
        }

        if(this.move == 'white'){
            this.move = 'black';
        }else{
            this.move = 'white';
        }
    }

    Get_Locations():number[]{
        let output:number[] = [];
        let index:number = 0;

        for(let i:number = 0; i < this.Pawn_Pieces.length; i++){
            output[index] = this.Pawn_Pieces[i].square;
            index++;
        }

        for(let i:number = 0; i < this.Rook_Pieces.length; i++){
            output[index] = this.Rook_Pieces[i].square;
            index++;
        }

        for(let i:number = 0; i < this.Knight_Pieces.length; i++){
            output[index] = this.Knight_Pieces[i].square;
            index++;
        }

        for(let i:number = 0; i < this.Bishop_Pieces.length; i++){
            output[index] = this.Bishop_Pieces[i].square;
            index++;
        }
        
        for(let i:number = 0; i < this.King_Pieces.length; i++){
            output[index] = this.King_Pieces[i].square;
            index++;
        }

        for(let i:number = 0; i < this.Queen_Pieces.length; i++){
            output[index] = this.Queen_Pieces[i].square;
            index++;
        }

        return output;
    }

    Remove_Piece(square:number, color_to_be_removed:string):boolean{//just as a reminder when you move, you need to remove the opposing piece first and only then can you move
        let output:boolean = false;

        for(let i:number = 0; i < this.Pawn_Pieces.length; i++){
            if(this.Pawn_Pieces[i].square == square && output == false && this.Pawn_Pieces[i].color == color_to_be_removed){
                this.Pawn_Pieces.splice(i, 1);
                output = true;
            }
        }

        for(let i:number = 0; i < this.Rook_Pieces.length; i++){
            if(this.Rook_Pieces[i].square == square && output == false && this.Rook_Pieces[i].color == color_to_be_removed){
                this.Rook_Pieces.splice(i, 1);
                output = true;
            }
        }

        for(let i:number = 0; i < this.Knight_Pieces.length; i++){
            if(this.Knight_Pieces[i].square == square && output == false && this.Knight_Pieces[i].color == color_to_be_removed){
                this.Knight_Pieces.splice(i, 1);
                output = true;
            }
        }

        for(let i:number = 0; i < this.Bishop_Pieces.length; i++){
            if(this.Bishop_Pieces[i].square == square && output == false && this.Bishop_Pieces[i].color == color_to_be_removed){
                this.Bishop_Pieces.splice(i, 1);
                output = true;
            }
        }

        for(let i:number = 0; i < this.King_Pieces.length; i++){
            if(this.King_Pieces[i].square == square && output == false && this.King_Pieces[i].color == color_to_be_removed){
                this.King_Pieces.splice(i, 1);
                output = true;
            }
        }

        for(let i:number = 0; i < this.Queen_Pieces.length; i++){
            if(this.Queen_Pieces[i].square == square && output == false && this.Queen_Pieces[i].color == color_to_be_removed){
                this.Queen_Pieces.splice(i, 1);
                output = true;
            }
        }

        return output;
    }

    Get_Type(square:number):string{
        let output:string = '';

        for(let i:number = 0; i < this.Pawn_Pieces.length; i++){
            if(this.Pawn_Pieces[i].square == square){
                return 'P';
            }
        }

        for(let i:number = 0; i < this.Rook_Pieces.length; i++){
            if(this.Rook_Pieces[i].square == square){
                return 'R';
            }
        }

        for(let i:number = 0; i < this.Knight_Pieces.length; i++){
            if(this.Knight_Pieces[i].square == square){
                return 'N';
            }
        }

        for(let i:number = 0; i < this.Bishop_Pieces.length; i++){
            if(this.Bishop_Pieces[i].square == square){
                return 'B';
            }
        }
        
        for(let i:number = 0; i < this.King_Pieces.length; i++){
            if(this.King_Pieces[i].square == square){
                return 'K';
            }
        }

        for(let i:number = 0; i < this.Queen_Pieces.length; i++){
            if(this.Queen_Pieces[i].square == square){
                return 'Q';
            }
        }

        return output;
    }

    Pawn_Promotion(piece:string, color:string, square:number){
        let removed:boolean = false;

        for(let i:number = 0; i < this.Pawn_Pieces.length; i++){
            if(this.Pawn_Pieces[i].square == square){
                this.Pawn_Pieces.splice(i, 1);
                removed = true;
                break
            }
        }
        //wont break because it will be called after all are loaded thus it will see it
        if(removed == false){
            return;
        }
        else if(piece == 'Q'){
            this.Queen_Pieces.push(new Queens(square, color))
        }else if(piece == 'B'){
            this.Bishop_Pieces.push(new Bishops(square, color))
        }else if(piece == 'R'){
            this.Rook_Pieces.push(new Rooks(square, color))
        }else if(piece == 'N'){
            this.Knight_Pieces.push(new Knights(square, color))
        }else{
            return;
        }
    }

    Castle(color:string, destination:number, square:number, rook_square:number):boolean{
        let output:boolean = false;

        for(let i:number = 0; i < this.Rook_Pieces.length; i++){
            if(this.Rook_Pieces[i].square == rook_square && this.Rook_Pieces[i].color == color){
                for(let c:number = 0; c < this.King_Pieces.length; c++){
                    if(this.King_Pieces[c].color == color){
                        if(destination > square){
                            this.Rook_Pieces[i].square = destination - 1;
                        }else{
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
    }
}

let World = new Global();

abstract class Pieces{
    square:number;
    color:string;
    highlight:boolean;

    constructor(a:number, b:string){
        this.square = a;
        this.color = b;
        this.highlight = false;
    }

    Change_State(state:boolean){
        this.highlight = state;
    }

    //the function is given a destination, it checks whether or not its valid(including taking) and then will output ots validity
    //then a different function will take that validity and either move or take a piece or not do anything of course
    abstract Movement(destination:number):boolean;

    Do_Movement(destination:number):boolean{
        let valid:boolean = this.Movement(destination);
        let output:boolean = false;
        let check:boolean = this.color == World.move;

        if(valid && check){
            let color_to_be_removed:string;

            if(this.color == 'white'){
                color_to_be_removed = 'black';
            }else{
                color_to_be_removed = 'white';
            }

            World.Remove_Piece(destination, color_to_be_removed);

            this.square = destination;

            World.Change_Play();
            output = true;

            return output
        }else{
            return output
        }
    }

    Valid_Move_Same_Color_Check(destination:number):boolean{
        for(let i:number = 0; i < World.Pawn_Pieces.length; i++){
            if(World.Pawn_Pieces[i].square == destination && World.Pawn_Pieces[i].color == this.color){
                return false;
            }
        }

        for(let i:number = 0; i <  World.Rook_Pieces.length; i++){
            if(World.Rook_Pieces[i].square == destination  && World.Rook_Pieces[i].color == this.color){
                return false;
            }
        }

        for(let i:number = 0; i <  World.Knight_Pieces.length; i++){
            if(World.Knight_Pieces[i].square == destination && World.Knight_Pieces[i].color == this.color){
                return false;
            }
        }

        for(let i:number = 0; i <  World.Bishop_Pieces.length; i++){
            if(World.Bishop_Pieces[i].square == destination  && World.Knight_Pieces[i].color == this.color){
                return false;
            }
        }
            
        for(let i:number = 0; i < World.King_Pieces.length; i++){
            if(World.King_Pieces[i].square == destination && World.King_Pieces[i].color == this.color){
                return false;
            }
        }

        for(let i:number = 0; i < World.Queen_Pieces.length; i++){
            if(World.Queen_Pieces[i].square == destination && World.Queen_Pieces[i].color == this.color){
                return false;
            }
        }

        return true;
    }
}

class Pawns extends Pieces{
    First_Move:boolean;
    EnPassant:boolean;
    EnPassant_Piece_Square:number = -1;

    Movement(destination:number):boolean {
        let piece_positions:number[] = World.Get_Locations();
        let possible_moves:number[] = []; //possible moves with taking
        let check_moves:number[];
        let check_take_moves:number[];
        let index:number = 0;
        let check_position = this.square - 8;
        let temp:boolean = true;
        let row:number = Math.floor(this.square / 8);
        let column:number = this.square - (Math.floor(this.square / 8) * 8);
        let output:boolean = false;
        let Enpassant_squares:number[] = [destination + 1, destination - 1]

        
        if(this.First_Move){
            if(this.color == 'white'){
                check_moves = [this.square - 8, this.square - 16];
                check_take_moves = [this.square - 8 - 1, this.square - 8 + 1];
            }else{
                check_moves = [this.square + 8, this.square + 16];
                check_take_moves = [this.square + 8 - 1, this.square + 8 + 1];
            }

            for(let i:number = 0; i < check_moves.length; i++){
                temp = true;

                for(let c:number = 0; c < piece_positions.length; c++){
                    if(check_moves[i] == piece_positions[c]){
                        temp = false;
                    }
                }

                if(temp){
                    possible_moves[index] = check_moves[i];
                    index++;
                }
            }

            for(let i:number = 0; i < check_take_moves.length; i++){
                temp = false;

                for(let c:number = 0; c < piece_positions.length; c++){
                    if(check_take_moves[i] == piece_positions[c]){
                        temp = true;
                    }
                }

                if(temp){
                    possible_moves[index] = check_take_moves[i];
                    index++;
                }
            }

            for(let i:number = 0; i < possible_moves.length; i++){
                if(possible_moves[i] == destination){
                    output = true;
                }
            }

            if(output){
                let color_to_be_removed:string;

                if(this.color == 'white'){
                    color_to_be_removed = 'black';
                }else{
                    color_to_be_removed = 'white';
                }

                for(let j:number = 0; j < Enpassant_squares.length; j++){
                    for(let i:number = 0; i < World.Pawn_Pieces.length; i++){
                        if(World.Pawn_Pieces[i].color == color_to_be_removed && World.Pawn_Pieces[i].square == Enpassant_squares[j]){
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
        }else if(this.EnPassant){ // on enpassant the next function will make the move and will automatically turn off or on enpassant
            if(this.color == 'white'){
                check_moves = [this.square - 8];
                check_take_moves = [this.square - 8 - 1, this.square - 8 + 1];
                possible_moves = [this.EnPassant_Piece_Square - 8];
                index++;
            }else{
                check_moves = [this.square + 8];
                check_take_moves = [this.square + 8 - 1, this.square + 8 + 1];
                possible_moves = [this.EnPassant_Piece_Square + 8];
                index++;
            }

            for(let i:number = 0; i < check_moves.length; i++){
                temp = true;

                for(let c:number = 0; c < piece_positions.length; c++){
                    if(check_moves[i] == piece_positions[c]){
                        temp = false;
                    }
                }

                if(temp){
                    possible_moves[index] = check_moves[i];
                    index++;
                }
            }

            for(let i:number = 0; i < check_take_moves.length; i++){
                temp = false;

                for(let c:number = 0; c < piece_positions.length; c++){
                    if(check_take_moves[i] == piece_positions[c]){
                        temp = true;
                    }
                }

                if(temp){
                    possible_moves[index] = check_take_moves[i];
                    index++;
                }
            }

            for(let i:number = 0; i < possible_moves.length; i++){
                if(possible_moves[i] == destination){
                    output = true;
                }
            }

            if(output){
                output = this.Valid_Move_Same_Color_Check(destination);
            }

            return output;
        }else{
            if(this.color == 'white'){
                check_moves = [this.square - 8];
                check_take_moves = [this.square - 8 - 1, this.square - 8 + 1];
            }else{
                check_moves = [this.square + 8];
                check_take_moves = [this.square + 8 - 1, this.square + 8 + 1];
            }

            for(let i:number = 0; i < check_moves.length; i++){
                temp = true;

                for(let c:number = 0; c < piece_positions.length; c++){
                    if(check_moves[i] == piece_positions[c]){
                        temp = false;
                    }
                }

                if(temp){
                    possible_moves[index] = check_moves[i];
                    index++;
                }
            }

            for(let i:number = 0; i < check_take_moves.length; i++){
                temp = false;

                for(let c:number = 0; c < piece_positions.length; c++){
                    if(check_take_moves[i] == piece_positions[c]){
                        temp = true;
                    }
                }

                if(temp){
                    possible_moves[index] = check_take_moves[i];
                    index++;
                }
            }

            for(let i:number = 0; i < possible_moves.length; i++){
                if(possible_moves[i] == destination){
                    output = true;
                }
            }

            if(output){
                output = this.Valid_Move_Same_Color_Check(destination);
            }

            return output;
        }
    }

    Promote(piece:string){
        World.Pawn_Promotion(piece, this.color, this.square);
    }

    Do_Pawn_Movement(destination:number):boolean{
        let valid:boolean = this.Movement(destination);
        let check:boolean = this.color == World.move;

        if(valid == true && this.EnPassant == true && Math.abs(destination - this.EnPassant_Piece_Square) == 8 && check == true){
            let color_to_be_removed:string;

            if(this.color == 'white'){
                color_to_be_removed = 'black';
            }else{
                color_to_be_removed = 'white';
            }

            World.Remove_Piece(this.EnPassant_Piece_Square, color_to_be_removed);

            this.square = destination;

            this.EnPassant_Piece_Square = -1;
            this.EnPassant = false;

            World.Change_Play();

            return true;
        }
        else if(valid && check){
            //Pawn promotion
            if(Math.floor(destination / 8) == 0 || Math.floor(destination / 8) == 7){
                let preference_element = document.getElementById('promote-preference') as HTMLSelectElement;
                let value:string = preference_element.value;
                let color_to_be_removed:string;

                if(this.color == 'white'){
                    color_to_be_removed = 'black';
                }else{
                    color_to_be_removed = 'white';
                }

                World.Remove_Piece(destination, color_to_be_removed);

                this.square = destination;
                this.Promote(value);

                World.Change_Play();
                return true;
            }else{
                let color_to_be_removed:string;

                if(this.color == 'white'){
                    color_to_be_removed = 'black';
                }else{
                    color_to_be_removed = 'white';
                }

                World.Remove_Piece(destination, color_to_be_removed);

                this.square = destination;

                World.Change_Play();
                return true;
            }
        }else{
            return false;
        }
    }

    constructor(a:number, b:string){
        super(a, b);
        this.First_Move = true;
        this.EnPassant = false;
    }
}

class Rooks extends Pieces{
    Movement(destination:number):boolean {
        let piece_positions:number[] = World.Get_Locations();
        let possible_moves:number[] = []; //possible moves with taking
        let index:number = 0;
        let check_position = this.square - 8;
        let temp:boolean = true;
        let row:number = Math.floor(this.square / 8);
        let output:boolean = false;

        while(check_position >= 0 && temp == true){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position - 8;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        temp = true;
        check_position = this.square + 8;

        while(check_position <= 63 && temp == true){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position + 8;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        temp = true;
        check_position = this.square - 1;

        while(check_position >= (row * 8)  && temp == true){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position - 1;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        temp = true;
        check_position = this.square + 1;

        while(check_position <= ((row * 8 + 7)) && temp == true){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position + 1;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        for(let i:number = 0; i < possible_moves.length; i++){
            if(possible_moves[i] == destination){
                output = true;
            }
        }

        if(output){
            output = this.Valid_Move_Same_Color_Check(destination);
        }

        return output;
    }

    constructor(a:number, b:string){
        super(a, b);
    }
}

class Knights extends Pieces{
    Movement(destination:number):boolean {
        let check_moves:number[] = [this.square - 16 - 1, this.square - 16 + 1, this.square + 16 - 1, this.square + 16 + 1, this.square - 8 - 2, this.square - 8 + 2, this.square + 8 - 2, this.square + 8 + 2];
        let possible_moves:number[] = [];
        let column:number = this.square - (Math.floor(this.square / 8) * 8);
        let output:boolean = false;
        let index:number = 0;
        let temp:boolean = true;

        for(let i:number = 0; i < check_moves.length; i++){
            temp = true;

            if((check_moves[i] - (Math.floor(check_moves[i] / 8) * 8)) != (column - 1) && (check_moves[i] - (Math.floor(check_moves[i] / 8) * 8)) != (column + 1) && (check_moves[i] - (Math.floor(check_moves[i] / 8) * 8)) != (column - 2) && (check_moves[i] - (Math.floor(check_moves[i] / 8) * 8)) != (column + 2)){
                temp = false;
            }

            if(check_moves[i] > 63 || check_moves[i] < 0){
                temp = false;
            }

            if(temp){
                possible_moves[index] = check_moves[i];
                index++;
            }
        }

        for(let i:number = 0; i < possible_moves.length; i++){
            if(possible_moves[i] == destination){
                output = true;
            }
        }

        if(output){
            output = this.Valid_Move_Same_Color_Check(destination);
        }

        return output;
    }

    constructor(a:number, b:string){
        super(a, b);
    }
}

class Bishops extends Pieces{
    Movement(destination:number):boolean {
        let piece_positions:number[] = World.Get_Locations();
        let possible_moves:number[] = []; //possible moves with taking
        let index:number = 0;
        let check_position = this.square - 8 - 1;
        let column:number = this.square - (Math.floor(this.square / 8) * 8);
        let temp:boolean = true;
        let output:boolean = false;

        while(check_position >= 0 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) < column){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position - 8 - 1;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        temp = true;
        check_position = this.square - 8 + 1;

        while(check_position >= 0 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) > column){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position - 8 + 1;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        temp = true;
        check_position = this.square + 8 - 1;

        while(check_position <= 63  && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) < column){
            for(let i:number = 0; i < piece_positions.length; i++ ){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position + 8 - 1;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        temp = true;
        check_position = this.square + 8 + 1;

        while(check_position <= 63 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) > column){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position + 8 + 1;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        for(let i:number = 0; i < possible_moves.length; i++){
            if(possible_moves[i] == destination){
                output = true;
            }
        }

        if(output){
            output = this.Valid_Move_Same_Color_Check(destination);
        }

        return output;
    }

    constructor(a:number, b:string){
        super(a, b);
    }
}

class Kings extends Pieces{
    castled:boolean;

    Movement(destination:number):boolean {
        let check_moves:number[] = [this.square - 8, this.square + 8, this.square - 1, this.square + 1, this.square - 8 - 1, this.square - 8 + 1, this.square + 8 - 1, this.square + 8 + 1];
        let possible_moves:number[] = [];
        let column:number = this.square - (Math.floor(this.square / 8) * 8);
        let output:boolean = false;
        let index:number = 0;
        let temp:boolean = true;

        for(let i:number = 0; i < check_moves.length; i++){
            temp = true;

            if(Math.abs((check_moves[i] - (Math.floor(check_moves[i] / 8) * 8) - column)) > 1){
                temp = false;
            }

            if(check_moves[i] > 63 || check_moves[i] < 0){
                temp = false;
            }

            if(temp){
                possible_moves[index] = check_moves[i];
                index++;
            }
        }

        if(this.castled == false){
            possible_moves.push(this.square - 2);
            possible_moves.push(this.square + 2);
        }

        for(let i:number = 0; i < possible_moves.length; i++){
            if(possible_moves[i] == destination){
                output = true;
            }
        }

        if(output){
            output = this.Valid_Move_Same_Color_Check(destination);
        }

        return output;
    }

    Do_King_Movement(destination:number):boolean{
        let valid:boolean = this.Movement(destination);
        let output:boolean = false;
        let check:boolean = this.color == World.move;
        let castle_check = destination == (this.square - 2) || destination == (this.square + 2);

        if(valid && check && castle_check == false){
            let color_to_be_removed:string;

            if(this.color == 'white'){
                color_to_be_removed = 'black';
            }else{
                color_to_be_removed = 'white';
            }

            World.Remove_Piece(destination, color_to_be_removed);

            this.square = destination;
            this.castled = true;

            World.Change_Play();
            output = true;

            return output;
        }else if(valid && check && castle_check){
            let locations:number[] = World.Get_Locations();
            let check_squares:number[];
            let rook_square:number;
            let rook_check:boolean;
            let empty_check:boolean = true;

            if(destination == (this.square - 2)){
                check_squares = [this.square - 1, this.square - 2, this.square - 3];
                rook_square = this.square - 4;
            }
            else{
                check_squares = [this.square + 1, this.square + 2];
                rook_square = this.square + 3;                
            }

            rook_check = World.Get_Type(rook_square) == 'R';

            if(!rook_check){
                return output;    
            }

            for(let i:number = 0; i < check_squares.length; i++){
                for(let c = 0; c < locations.length; c++){
                    if(check_squares[i] == locations[c]){
                        empty_check = false;
                    }
                }
            }

            if(!empty_check){
                return output;
            }

            let Castle_result = World.Castle(this.color, destination, this.square, rook_square);
            console.log(Castle_result);

            if(Castle_result){
                output = true;
                this.castled = true;
                World.Change_Play();
            }

            return output;
        }else{
            return output;
        }
    }

    constructor(a:number, b:string){
        super(a, b);
        this.castled = false;
    }
}

class Queens extends Pieces{
    Movement(destination:number):boolean {
        let piece_positions:number[] = World.Get_Locations();
        let possible_moves:number[] = []; //possible moves with taking
        let index:number = 0;
        let check_position = this.square - 8;
        let temp:boolean = true;
        let row:number = Math.floor(this.square / 8);
        let column:number = this.square - (Math.floor(this.square / 8) * 8);
        let output:boolean = false;

        while(check_position >= 0 && temp == true){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position - 8;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        temp = true;
        check_position = this.square + 8;

        while(check_position <= 63 && temp == true){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position + 8;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        temp = true;
        check_position = this.square - 1;

        while(check_position >= (row * 8)  && temp == true){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position - 1;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        temp = true;
        check_position = this.square + 1;

        while(check_position <= ((row * 8 + 7)) && temp == true){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position + 1;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        check_position = this.square - 8 - 1;
        temp = true;

        while(check_position >= 0 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) < column){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position - 8 - 1;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        temp = true;
        check_position = this.square - 8 + 1;

        while(check_position >= 0 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) > column){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position - 8 + 1;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        temp = true;
        check_position = this.square + 8 - 1;

        while(check_position <= 63  && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) < column){
            for(let i:number = 0; i < piece_positions.length; i++ ){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position + 8 - 1;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        temp = true;
        check_position = this.square + 8 + 1;

        while(check_position <= 63 && temp == true && (check_position - (Math.floor(check_position / 8) * 8)) > column){
            for(let i:number = 0; i < piece_positions.length; i++){
                if(piece_positions[i] == check_position){
                    temp = false;
                }
            }

            if(temp){
                possible_moves[index] = check_position;
                check_position = check_position + 8 + 1;
                index++;
            }else{
                possible_moves[index] = check_position;
                index++;
            }
        }

        for(let i:number = 0; i < possible_moves.length; i++){
            if(possible_moves[i] == destination){
                output = true;
            }
        }

        if(output){
            output = this.Valid_Move_Same_Color_Check(destination);
        }

        return output;
    }

    constructor(a:number, b:string){
        super(a, b);
    }
}

function Create_Pieces():void{
    World.Pawn_Pieces = [];
    World.Rook_Pieces = [];
    World.Knight_Pieces = [];
    World.Bishop_Pieces = [];
    World.King_Pieces = [];
    World.Queen_Pieces = [];

    //creating all pawns
    for(let i:number = 0; i < 16; i++){
        if(i < 8){
            World.Pawn_Pieces[i] = new Pawns(6*8 + i, 'white');
        }else{
            World.Pawn_Pieces[i] = new Pawns(0*8 + i, 'black');
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