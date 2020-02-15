import jsPDF from 'jspdf';
/**
 * PDF Module
 * @module PDF
 */

/**
 * Converts an Escape Room to PDF
 * @param {EscapeRoom} escapeRoom 
 */
function escapeRoomToPDF(escapeRoom){
    let doc = jsPDF('p','mm','a4');
    let x = 35; let y = 25;
    doc.text("The Escape Room Generator",x,y);
    doc = convertEscapRoom(escapeRoom,doc,x,y);
    doc.save(escapeRoom.details.name+".pdf");
}

/**
 * Converts a JS object to a PDF Document
 * @param {EscapeRoom} escapeRoom 
 * @param {jsPDF} doc 
 * @param {int} x 
 * @param {int} y 
 * @returns {jsPDF}
 */
function convertEscapRoom(escapeRoom,doc,x,y){
    for(let key of Object.keys(escapeRoom)){
        if(key.includes('DATA')){
            //Add Images from DATA url
            doc.addPage();
            y=25;
            doc.text(key+": ",x,y);
            doc.addImage(escapeRoom[key],'JPEG',x,y);
            y=275;
            continue;
        }else if(y >= 275){
            doc.addPage();
            y=25;
        } else {
            y+=10;
        }
        if(typeof escapeRoom[key]==='object'&&escapeRoom[key].constructor===Array){
            if(escapeRoom[key].length > 0 && typeof escapeRoom[key][0]==="string"){
                doc.text(key+": " + JSON.stringify(escapeRoom[key]),x,y);
            } else if (escapeRoom[key].length > 0 && typeof escapeRoom[key][0]==="object"){
                doc.text(key,x,y);
                doc.line(x, y, x+120, y);
                for(let childObject of escapeRoom[key]){
                    doc.line(x, y, x+120, y);
                    let convertedObject = convertEscapRoom(childObject,doc,x,y);
                    doc = convertedObject.doc;
                    x = convertedObject.x;
                    y = convertedObject.y;
                }
            }
        }
        else if(typeof escapeRoom[key]==='object'){
            doc.text(key,x,y);
            doc.line(x, y, x+120, y);
            let convertedObject = convertEscapRoom(escapeRoom[key],doc,x,y);
            doc = convertedObject.doc;
            x = convertedObject.x;
            y = convertedObject.y;
        }
        else{
            doc.text(key+": "+escapeRoom[key],x,y);
        }   
    }
    return doc;
}

export {escapeRoomToPDF};
