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

        return this;
    }

    appendAnything(value){
        if (value){
            this.parts.push(value.toString());   
        }

        return this;
    }

    prepend(value){
        if (typeof value === typeof ""){
            this.parts.unshift(value);
        }

        return this;
    }

    prependAnything(value){
        if (value) {
            this.parts.unshift(value.toString());
        }

        return this;
    }

    clear(){
        this.parts = [];

        return this;
    }

    isEmpty(){
        return this.parts.length === 0;
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