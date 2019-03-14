import { Area } from ".";
export default class EscapeRoom {
    constructor(userId){
        this.userId = userId;
        this.details = {
            name: "Unnamed",
            designers: "",
            theme: "",
            minPlayers: "",
            maxPlayers: "",
            targetTime: "",
            difficulty: "3",
            objective: "",
            description: "",
            estimatedCost: ""
        }
        this.accessibility = {
            protanomaly: false,
            protanopia: false,
            deuteranomaly: false,
            deuteranopia: false,
            tritanomaly: false,
            tritanopia: false,
            coneMonochromacy: false,
            rodMonochromacy: false,
            largeFonts: false,
            highContrast: false
        }
        this.components = [new Area()]
    }  

    static calculateCost(escapeRoom){
        let components = escapeRoom.components;
        let cost = 0;
        for (let component of components){
            let estimatedCost = component.estimatedCost;
            if(!isNaN(parseFloat(estimatedCost))){
                cost += parseFloat(estimatedCost);
            } else if (!isNaN(parseFloat(estimatedCost))){
                cost += parseInt(estimatedCost);
            }
        }
        return cost;
    }
}