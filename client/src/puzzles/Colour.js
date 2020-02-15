import Puzzle from './Puzzle';

/**
 * Class for Colour
 * @extends Puzzle
 * @author Alistair Quinn
 */
class Colour extends Puzzle{
    constructor(){
        super('Colour')
        let numbers = this.generateNumbers();
        this.output = numbers.num1.toString() + numbers.num2.toString() + numbers.num3.toString() + numbers.num4.toString();
        this.answer= numbers.num1.toString() + numbers.num2.toString() + numbers.num3.toString() + numbers.num4.toString();
        this.numbers = numbers.numbers;
    }

    generateNumbers(){
        let num1 = Math.floor(Math.random()*4)+1;
        let num2;
        while(num2!==num1){
            num2 = Math.floor(Math.random()*4)+1;
        }
        let num3 = num1 + num2;
        let num4 = Math.floor(Math.random()*4)+1;
        let numbers = [{number:num1,colour:'red'},{number:num2,colour:'blue'},{number:num3,colour:'purple'},{number:num4,colour:'green'}];
        return {num1,num2,num3,num4,numbers};
    }
}

export default Colour;