import Component from './Component';

/**
 * Class for Music
 * @extends Component
 * @author Alistair Quinn
 */
class Music extends Component {
    constructor(){
        super();
        this.startTime="";
        this.endTime=""
        this.type="Music";
    }   
}

export default Music;