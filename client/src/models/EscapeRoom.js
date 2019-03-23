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
            visual:{
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
            },
            physical:{
                wheelchairAccessible: false,
                motorAccessible: false
            } 
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

    static findComponent(escapeRoom,id){
        return escapeRoom.components.find((component)=>{return component._id===id})
    }

    static calculateComponentOutput(escapeRoom,id){
        let component = EscapeRoom.findComponent(escapeRoom,id);
        if(component!=null){
            let outputs = [];
            for(let id of component.inputComponents){
                let component = EscapeRoom.findComponent(escapeRoom,id);
                outputs.push(component.output);
            }
            let string = outputs.find((output)=>parseFloat(output));
            if(string!==null||string!==undefined){
                return outputs.join(" ");
            } else {
                if(outputs.length>1)
                    return outputs.reduce((sum,output)=>parseFloat(sum)+parseFloat(output));
                else 
                    return "";
            }
        }
    }
}