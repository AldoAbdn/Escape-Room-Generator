import RandomWords from 'random-words';

class LockGenerator {
    generatorNumericCombination(length){
        let number = "";
        for(let i = 0 ; i<length; i++){
            number += parseInt(Math.floor(Math.random()*9));
        }
        return number;
    }

    generateWords(amount=1,wordsPerString=1,separator='',formatter=(word)=>{return word}){
        return RandomWords({exactly:amount,wordsPerString,separator,formatter})
    }

    generatorDirectionSequence(length){
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