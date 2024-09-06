const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//define class
class Field {
    constructor(hatAndHoles, field) {
        this._field = field;
        this._hatAndHoles = hatAndHoles;
    }
    //method of play
    playGame() {
        let y = 0;
        let x = 0;
        this.print(this._field);

        while (this._hatAndHoles[y][x] === pathCharacter || this._hatAndHoles[y][x] === fieldCharacter) {
            const direction = prompt('Which way would you like to go? Enter U for up, D for down, L for left, and R for right. \n');

            if (direction.toUpperCase() === 'U') {
                if (y === 0) {
                    console.log('You cannot go up, choose another direction.')
                } else {
                    y -= 1
                }
            } else if (direction.toUpperCase() === 'D') {
                if (y >= this._field.length) {
                    console.log('You cannot go down, choose another direction.')
                } else {
                    y += 1
                }
            } else if (direction.toUpperCase() === 'L') {
                if (x === 0) {
                    console.log('You cannot go left, choose another direction.')
                } else {
                    x -= 1
                }
            } else if (direction.toUpperCase() === 'R') {
                if (x >= this._field.length) {
                    console.log('You cannot go right, choose another direction.')
                } else {
                    x += 1
                }
            } else {
                console.log('Not a direction. Enter U, D, L, or R.')
            }
            if (this._hatAndHoles[y][x] === hat) {
                console.log('There is the hat woo.')
            } else if (this._hatAndHoles[x][y] === hole) {
                console.log('That is a hole, you lose.')
            } else {
                this._field[y][x] = pathCharacter;
                this.print(this._field)
            }

        }
    }

    //print method
    print() {
        for (let row of this._field){
            console.log(row.join(' '));
        }
    }

    //make field w hat and hole
    static generateField(height, width, holes) {
        let newField = [];
        for (let i = 0; i < height; i++) {
            newField.push([]);
            for (let j = 0; j < height; j++) {
                newField[i].push(fieldCharacter)
            };
        };
        newField[0][0] = pathCharacter;
        let hatX = Math.floor(Math.random() * width);
        let hatY = Math.floor(Math.random() * height);
        newField[hatY][hatX] = hat;

        for (let k = holes; k > 0; k--) {
            let holeX = hatX;
            let holeY = hatY;
            while (holeX === hatX) {
                holeX = Math.floor(Math.random() * width)
            };
            while (holeY === hatY) {
                holeY = Math.floor(Math.random() * height)
            };
            newField[holeX][holeY] = hole;
        }
        return newField;
    }

    //blank field
    static generateBlankField(height, width) {
        let newField = [];
        for (let i = 0; i < height; i++) {
            newField.push([]);
            for (let j = 0; j < height; j++) {
                newField[i].push(fieldCharacter)
            };
        };
        newField[0][0] = pathCharacter;
        return newField
    }
}

let myField

//create blank
const blankField = Field.generateBlankField(5, 5)

//create w hat and holes
const newField = Field.generateField(5, 5, 1);
console.log(blankField);

//field obj 
myField = new Field (newField, blankField);

// play
myField.playGame();