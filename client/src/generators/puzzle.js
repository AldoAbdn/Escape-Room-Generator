import CrosswordGenerator from 'cwg';
import riddles from './riddle.json';

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
                return {
                    type:'crossword',
                    output:"",
                    words:options.words,
                    hints:options.hints,
                    answers:options.answers,
                    crossword:CrosswordGenerator(options.words)
                }
            case 'hidden':
                return {
                    type:'hidden',
                    output:options.word,
                    word: options.word,
                    words: options.words,
                    hints: options.hints,
                    answers: options.answers,
                    hiddenWord: this.generateHiddenWord(options.word,options.words,options.hints,options.answers)
                }
            case 'riddle':
                let riddle = riddles[Math.floor(Math.random()*riddles.length)];
                return {type:'riddle',output:riddle.answer,riddle};
        }
    }

    generateColour(){
        let num1 = Math.floor(Math.random()*4)+1;
        let num2;
        while(num2!=num1){
            num2 = Math.floor(Math.random()*4)+1;
        }
        let num3 = num1 + num2;
        let num4 = Math.floor(Math.random()*4)+1;
        let numbers = [{number:num1,colour:'red'},{number:num2,colour:'blue'},{number:num3,colour:'purple'},{number:num4,colour:'green'}];
        return {
            answer: num1.toString() + num2.toString() + num3.toString() + num4.toString(),
            numbers
        }
    }

    generateHiddenWord(word,words){
        let matrix = [];
        for (let i=0;i<words.length;i++){
            matrix.push(words.indexOf(word[i]));
        }
    }
}

export default PuzzleGenerator;