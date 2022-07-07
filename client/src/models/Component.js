import uniqid from 'uniqid';

/**
 * Base Class for Component
 * @author Alistair Quinn
 */
class Component {
    constructor(){
        this._id = uniqid();
        this.name = "";
        this.description = "";
        this.output = "";
        this.inputComponents = [];
        this.outputComponents = [];
        this.type = "Component";
        this.position = {top:0,left:0};
        this.estimatedCost = 0;
        this.images = [];
    }
}

export default Component;