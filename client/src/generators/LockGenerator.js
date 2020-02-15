import RandomWords from 'random-words';

/**
 * Class for LockGenerator
 * @author Alistair Quinn
 */
class LockGenerator {
    /**
     * Generates a random numeric combination of a certain length
     * @param {int} length 
     * @returns {int}
     */
    generateNumericCombination(length){
        let number = "";
        for(let i = 0 ; i<length; i++){
            number += parseInt(Math.floor(Math.random()*9));
        }
        return number;
    }

    /**
     * Generates Random Work Strings
     * @param {int} amount 
     * @param {int} wordsPerString 
     * @returns {Array<String>}
     */
    generateWords(amount=1,wordsPerString=1){
        let words = RandomWords({min:amount,max:amount,exactly:amount,wordsPerString:wordsPerString});
        return words.slice(0,amount);
    }

    /**
     * Generates a Random Directional Sequence 
     * @param {int} length 
     * @returns {Array<String>}
     */
    generateDirectionSequence(length){
        let sequence = [];
        let directions = ["UP","DOWN","LEFT","RIGHT"];
        let number;
        for(let i = 0 ; i<length; i++){
            number = Math.floor(Math.random()*3);
            sequence.push(directions[number]);
        }
        return sequence.join(',');
    }
}

export default LockGenerator;