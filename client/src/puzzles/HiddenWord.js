import Puzzle from './Puzzle';

/**
 * Class for HiddenWord
 * @extends Puzzle
 * @author Alistair Quinn
 */
class HiddenWord extends Puzzle{
    constructor(word,words,hints,answers){
        super('HiddenWord');
        this.output=word;
        this.word=word;
        this.words=words;
        this.hints=hints;
        this.answers=answers;
        this.hiddenWord=this.generateHiddenWord(word,words);
    }

    generateHiddenWord(word,words){
        let matrix = [];
        for (let i=0;i<words.length;i++){
            matrix.push(words[i].indexOf(word[i]));
        }

        return matrix;
    }
}

export default HiddenWord;