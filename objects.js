'use strict';

const colors = require('colors/safe');

class StringBuilder {

    constructor(){
        this.parts = new Array();

        let flex = false;

        if (arguments.length > 0){
            let length = arguments.length;
            if (typeof arguments[arguments.length -1] === typeof true){
                flex = arguments[arguments.length - 1];
                length = length - 1;
            }

            for (let i = 0; i < length; i++){
                if (flex === true){
                    this.appendAnything(arguments[i]);
                } else {
                    this.append(arguments[i]);
                }
            }
        }
    }
    
    append(value){
        if (typeof value === typeof ""){
            if (arguments.length > 1){
                let styles = arguments[1];
                if (typeof styles === typeof []){
                    value = makeStyledString(value, styles);
                }
            }

            this.parts.push(value);
        }

        if (value instanceof StringBuilder){
            this.parts = this.parts.concat(value.parts);
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

        if (value instanceof StringBuilder){
            this.parts = value.parts.concat(this.parts);
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

/**
 * Module Private Functions
 */
function makeStyledString(str, styles){

    if (typeof styles !== typeof []){
        return str;
    }

    for (let i = 0; i < styles.length; i++){
        let style = colors[styles[i].toString()];
        if (style){
            str = style(str);
        }
    }

    return str;
}

module.exports = { StringBuilder };