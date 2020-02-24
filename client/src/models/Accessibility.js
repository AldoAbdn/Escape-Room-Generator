import Visual from './Visual';
import Physical from './Physical';

/**
 * Class for Accessibility
 * @author Alistair Quinn
 */
class Accessibility {
    constructor(){
        this.visual = new Visual();
        this.physical = new Physical();
    }  
}

export default Accessibility;