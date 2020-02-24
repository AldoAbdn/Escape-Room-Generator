import {Crossword,HiddenWord,Riddle,Colour,Cipher} from '../puzzles/index';

/**
 * Class for PuzzleGenerator
 * @author Alistair Quinn
 */
class PuzzleGenerator {
    /**
     * Generates a cipher by type
     * @param {String} type 
     * @returns {Cipher}
     */
    generateCipher(type="pigpen"){
        switch(type){
            case 'pigpen':
                return new Cipher();
            default:
                return new Cipher();
        }
    }

    /**
     * Generates a Word Puzzle by type
     * @param {String} type 
     * @param {?????} options 
     * @returns {Puzzle}
     */
    generateWord(type="crossword",options) {
        switch(type){
            case 'crossword':
                return new Crossword("",options.words,options.hints,options.answers);
            case 'hidden':
                return new HiddenWord(options.word,options.words,options.hints,options.answers);
            case 'riddle':
                return new Riddle();
            default:
                return new Riddle();
        }
    }

    /**
     * Generates a Colour Puzzle
     * @returns {Colour}
     */
    generateColour(){
        return new Colour();
    }
}

export default PuzzleGenerator;