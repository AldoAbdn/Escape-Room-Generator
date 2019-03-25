class Modal {
    constructor(header,body,confirmText,confirmCallback,cancelText,cancelCallback,isOpen=true){
        this.header = header;
        this.body = body;
        this.confirm = {text:confirmText,action:confirmCallback}; //Converts callback to a string, because redux can't store funcs
        this.cancel = {text:cancelText,action:cancelCallback};
        this.isOpen = isOpen;
    }
}

export default Modal