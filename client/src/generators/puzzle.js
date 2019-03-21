
import riddles from './riddle.json';
import {Crossword,HiddenWord,Riddle,Colour} from '../puzzles/index';
class PuzzleGenerator {
    generateCipher(type="pigpen"){
        switch(type){
            case 'pigpen':
                return {cipher:"/images/ciphers/pigpen/cipher.jpg",decoder:"/images/ciphers/pigpen/cipher.jpg"}
        }
    }

    generateWord(type="crossword",options) {
        switch(type){
            case 'crossword':
                return new Crossword("",options.words,options.hints,options.answers);
            case 'hidden':
                return new HiddenWord(word,words,hints,answers);
            case 'riddle':
                return new Riddle();
        }
    }

    generateColour(){
        return new Colour();
    }
}

export default PuzzleGenerator;