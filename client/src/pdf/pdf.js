import jsPDF from 'jspdf';

function escapeRoomToPDF(escapeRoom){
    let doc = jsPDF('p','mm','a4');
    let x = 35; let y = 25;
    doc.text("The Escape Room Generator",x,y);
    let convertedObject = convertObject(escapeRoom,doc,x,y);
    doc = convertedObject.doc;
    doc.save(escapeRoom.details.name+".pdf");
}

function convertObject(object,doc,x,y){
    for(let key of Object.keys(object)){
        if(key.includes('DATA')){
            //Add Images from DATA url
            doc.addPage();
            y=25;
            doc.text(key+": ",x,y);
            doc.addImage(object[key],'JPEG',x,y);
            y=275;
            continue;
        }else if(y >= 275){
            doc.addPage();
            y=25;
        } else {
            y+=10;
        }
        if(typeof object[key]==='object'&&object[key].constructor===Array){
            if(object[key].length > 0 && typeof object[key][0]==="string"){
                doc.text(key+": " + JSON.stringify(object[key]),x,y);
            } else if (object[key].length > 0 && typeof object[key][0]==="object"){
                doc.text(key,x,y);
                doc.line(x, y, x+120, y);
                for(let childObject of object[key]){
                    doc.line(x, y, x+120, y);
                    let convertedObject = convertObject(childObject,doc,x,y);
                    doc = convertedObject.doc;
                    x = convertedObject.x;
                    y = convertedObject.y;
                }
            }
        }
        else if(typeof object[key]==='object'){
            doc.text(key,x,y);
            doc.line(x, y, x+120, y);
            let convertedObject = convertObject(object[key],doc,x,y);
            doc = convertedObject.doc;
            x = convertedObject.x;
            y = convertedObject.y;
        }
        else{
            doc.text(key+": "+object[key],x,y);
        }   
    }
    return {doc,x,y};
}

export {escapeRoomToPDF};
