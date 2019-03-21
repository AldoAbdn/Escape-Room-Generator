import CrosswordGenerator from 'cwg';
import Puzzle from './Puzzle';
class Crossword  {
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
export default CrosswordGenerator;