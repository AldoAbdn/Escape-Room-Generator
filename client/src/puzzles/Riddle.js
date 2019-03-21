import riddles from '../generators/riddle.json';
import Puzzle from './Puzzle';
class Riddle extends Puzzle {
    constructor(){
        super('Riddle');
        let riddle = this.generateRandomRiddle();
        this.output=riddle.answer;
        this.riddle=riddle;
    }
    generateRandomRiddle(){
        return riddles[Math.floor(Math.random()*riddles.length)];
    }
}
export default Riddle;