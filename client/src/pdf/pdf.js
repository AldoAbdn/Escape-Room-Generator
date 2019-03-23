import jsPDF from 'jspdf';

function escapeRoomToPDF(escapeRoom){
    let doc = jsPDF();
    doc.text("The Escape Room Generator");
    doc = convertObject(escapeRoom);
    doc.save(escapeRoom.details.name+".pdf");
}

function convertObject(object,doc){
    for(let key of Object.keys(object)){
        if(key.contains('DATA')){
            //Add Images from DATA url
            doc.text(key+": ");
            doc.addImage(object[key],'JPEG');
        }
        else if(typeof object[key]===object){
            doc.text(key);
            doc = convertObject(object[key],doc);
        }
        else if(typeof object[key]==="array")
            doc.text(key+": " + JSON.stringify(object[key]));
        else 
            doc.text(key+": "+object[key]);
    }
    return doc;
}

export {escapeRoomToPDF};
