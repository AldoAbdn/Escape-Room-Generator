import CrosswordGenerator from 'cwg';
import Puzzle from './Puzzle';

/**
 * Class for Crossword
 * @extends Puzzle
 * @author Alistair Quinn
 */
class Crossword extends Puzzle {
    constructor(output="",words,hints,answers){
        super('Crossword');
        this.type="crossword";
        this.output="";
        this.words=words;
        this.hints=hints;
        this.answers=answers;
        this.crossword=CrosswordGenerator(words);
    }
}

export default Crossword;