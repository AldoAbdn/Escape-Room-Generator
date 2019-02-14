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
            description: ""
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
}