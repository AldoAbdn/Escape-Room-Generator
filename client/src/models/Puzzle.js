import Component from './Component';

/**
 * Class for Puzzle
 * @extends Component
 * @author Alistair Quinn
 */
class Puzzle extends Component {
    constructor(){
        super();
        this.puzzle = {};
        this.puzzleType="Cipher";
        this.type="Puzzle";
    }   
}

export default Puzzle;