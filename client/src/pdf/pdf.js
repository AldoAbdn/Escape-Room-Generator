import jsPDF from 'jspdf';
import images from '../data/images.json';
/**
 * PDF Module
 * @module PDF
 */

 // Parameters 
 var blockedKeys = ["userId"];
 var startHeight = 25;
 var startIndent = 35;
 var endHeight = 275;
 var newLineHeight = 10;
 var indentWidth = 3;

/**
 * Converts an Escape Room to PDF
 * @param {EscapeRoom} escapeRoom 
 */
function escapeRoomToPDF(escapeRoom, components){
    let doc = jsPDF('p','mm','a4');
    let x = startIndent; let y = startHeight;
    doc.addImage(images.logo,'PNG',x + 55,y);
    let convertedObject = convertObject(escapeRoom,doc,x,y);
    doc.addPage();
    doc.addImage(components, 'PNG',0,0);
    convertedObject.doc.save(escapeRoom.details.name+".pdf");
}

/**
 * Converts a JS object to a PDF Document
 * @param {EscapeRoom} escapeRoom 
 * @param {jsPDF} doc 
 * @param {int} x 
 * @param {int} y 
 * @returns {jsPDF} doc
 */
function convertObject(escapeRoom,doc,x,y){
    for(let key of Object.keys(escapeRoom)){
        // Page Control 
        // Blocked Keys
        if(blockedKeys.includes(key)){
            continue;
        }
        else if(key.includes('DATA')){
            //Add Images from DATA url
            doc.addPage();
            y=startHeight;
            doc = drawTitle(doc, key, x, y);
            doc.addImage(escapeRoom[key],'JPEG',x,y);
            y=endHeight;
            continue;
        }else if(y >= 275){
            // Page height exceeded
            doc.addPage();
            y=startHeight;
        } else {
            // New Line
            y+=newLineHeight;
        }
        // Object Rendering 
        // Draw Array
        if(typeof escapeRoom[key]==='object'&&escapeRoom[key].constructor===Array){
            // Object Array 
            if (escapeRoom[key].length > 0 && typeof escapeRoom[key][0]==="object"){
                doc = drawTitle(doc, key, x, y);
                x+=indentWidth;
                for(let childObject of escapeRoom[key]){
                    y+=newLineHeight;
                    doc = drawTitle(doc, `${childObject.name} (${childObject._id})`, x, y);
                    x+=indentWidth;
                    ({doc, x, y} = convertObject(childObject,doc,x,y));
                    x-=indentWidth;
                }
                x-=indentWidth;
            } else if(escapeRoom[key].length > 0 && typeof escapeRoom[key][0]==="string"){
                doc.text(capitaliseFirstLetter(key)+":",x,y);
                for(let id of escapeRoom[key]){
                    y+=newLineHeight;
                    x+=indentWidth;
                    doc.text(id,x,y);
                    x-=indentWidth;
                }   
            } else if(escapeRoom[key].length === 0){
                doc.text(capitaliseFirstLetter(key)+":",x,y);
            }
        }
        // Draw Object
        else if(typeof escapeRoom[key]==='object'){
            doc = drawTitle(doc, key, x, y);
            x+=indentWidth;
            ({doc, x, y} = convertObject(escapeRoom[key],doc,x,y));
            x-=indentWidth;
        }
        // Draw Key
        else{
            doc.text(capitaliseFirstLetter(key)+": "+escapeRoom[key],x,y);
        }   
    }
    return {doc, x, y}
}

/**
 * Draws an underlined title
 * @param {jsPDF} doc 
 * @param {string} text 
 * @param {int} x 
 * @param {int} y 
 * @returns {jsPDF} doc
 */
function drawTitle(doc, text, x, y){
    text = capitaliseFirstLetter(text);
    doc.setTextColor(255,0,0);
    doc.text(text,x,y);
    doc.line(x, y + 3, x + 140, y + 3);
    doc.setTextColor(0,0,0);
    return doc;
}

/**
 * Capitalizes first character of a string
 * @param {string} text 
 */
function capitaliseFirstLetter(text){
    return text.replace(/^\w/, c => c.toUpperCase());
}

export {escapeRoomToPDF};
