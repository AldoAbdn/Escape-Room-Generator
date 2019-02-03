import uniqid from 'uniqid';

export default class Component {
    constructor(){
        this._id = uniqid();
        this.name = "";
        this.description = "";
        this.inputComponents = [];
        this.outputComponents = [];
        this.type = "Component";
    }
}