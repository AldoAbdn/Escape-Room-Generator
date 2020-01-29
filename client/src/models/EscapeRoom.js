import { Area, Details, Accessibility } from ".";
export default class EscapeRoom {
    constructor(userId){
        this.userId = userId;
        this.details = new Details();
        this.accessibility = new Accessibility();
        this.components = [new Area()];
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