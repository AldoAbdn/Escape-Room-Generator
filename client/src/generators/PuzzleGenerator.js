import {Crossword,HiddenWord,Riddle,Colour,Cipher} from '../puzzles/index';
class PuzzleGenerator {
    generateCipher(type="pigpen"){
        switch(type){
            case 'pigpen':
                return new Cipher();
            default:
                return new Cipher();
        }
    }

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

    generateColour(){
        return new Colour();
    }
}

export default PuzzleGenerator;