import RandomWords from 'random-words';

class LockGenerator {
    generateNumericCombination(length){
        let number = "";
        for(let i = 0 ; i<length; i++){
            number += parseInt(Math.floor(Math.random()*9));
        }
        return number;
    }

    generateWords(amount=1,wordsPerString=1){
        console.log(amount);
        let words = RandomWords({min:amount,max:amount,exactly:amount,wordsPerString:wordsPerString});
        return words.slice(0,amount);
    }

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