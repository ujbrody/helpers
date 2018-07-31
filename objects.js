'use strict';

class StringBuilder {

    constructor(value, flex){
        this.parts = new Array();

        if (flex === true){
            this.appendAnything(value);
        }else{
            this.append(value);
        }
    }
    
    append(value){
        if (typeof value === typeof ""){
            this.parts.push(value);
        }
    }

    appendAnything(value){
        if (value){
            this.parts.push(value.toString());   
        }
    }

    clear(){
        this.parts = [];
    }

    toWords(divider){
        if (typeof divider === typeof ""){
            return this.parts.join(divider);
        }
        return this.parts.join(" ");
    }

    toString(){
        return this.parts.join("");
    }
}

module.exports = { StringBuilder };