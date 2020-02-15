import Component from './Component';

/**
 * Class for Lock
 * @extends Component
 * @author Alistair Quinn
 */
class Lock extends Component {
    constructor(){
        super();
        this.lockType="Numeric";
        this.type="Lock";
    }   
}

export default Lock;