import uniqid from 'uniqid';

export default class Component {
    constructor(){
        this._id = uniqid();
        this.name = "";
        this.description = "";
        this.inputComponents = [];
        this.outputComponents = [];
        this.type = "Component";
        this.position = {top:0,left:0};
    }
}