'use strict';

var StringBuilder = require('./objects').StringBuilder;

const outputHelpers = {

    /**
     * create a string representation of the object for output
     */
    stringify: function(obj, indent, prefix, suffix) {

        const INDENT = 4;

        var outputString = new StringBuilder();
        var str = new StringBuilder();
        var tabIndent = ""; // The actual indentation (based on the number)

        // Checking if indentation is needed
        if (!indent || typeof indent !== typeof 1){
            indent = 0;
        }
        for (let i=0; i < indent; i++){
            tabIndent = tabIndent + " ";
        }

        // Checking prefix
        if (!prefix){
            prefix = "";
        } else {
            prefix = prefix.toString();
        }

        // Checking for suffix
        if (!suffix){
            suffix = "";
        } else {
            suffix = suffix.toString();
        }

        // utility function that makes sure that proper indent is always provided before output
        var populateStr = function(value){
            str.append(tabIndent).str.append(value);
        }

        // Printing out objects that are simply cast to string

        if (typeof obj === typeof "string"){
            str.append('\"' + obj + '\"');
        }

        if (typeof obj === typeof 1){
            str.append(obj.toString());
        }

        if (typeof obj === typeof true){
            let bool = new Boolean(obj);
            str.append(bool.toString());
        }

        // obj is an array
        if (Array.isArray(obj)) {
            if (obj.length === 0){
                // Empty Array
                str.append('[]');
            } else if (obj.length === 1 && (typeof obj[0] === typeof 'string' || typeof obj[0] === typeof 1 || typeof obj[0] == typeof true)){
                // Array with a single, simple, item
                str.append("[ ").append(this.stringify(obj[0])).append(" ]");
            } else {
                // All other cases
                str.append("[\n");
                for (let i=0; i < obj.length; i++){
                    str.append(this.stringify(obj[i], INDENT + indent));
                    if (i !== obj.length-1){
                        str.append(",");
                    }
                    str.append("\n");
                }
                str.append(tabIndent).append("]");
            }
        } else if (typeof obj === typeof {}){

            // input is object
            if (obj === null){
                str.append(tabIndent).append("null");
            } else {
                let keys = Object.keys(obj);

                if (keys.length === 0){
                    // Empty object
                    str.append("{}");
                } else if (keys.length === 1 && (typeof obj[keys[0]] === typeof "" || typeof obj[keys[0]] === typeof 1 || typeof obj[keys[0]] === typeof true)){
                    str.append("{ ").append(keys[0]).append(': ').append(this.stringify(obj[keys[0]])).append(" }");
                } else {
                    str.append("{\n");
                    for (let i=0; i < keys.length; i++){
                        let key = keys[i];
                        let ending = i === keys.length - 1 ? "\n" : ",\n";
                        str.append(this.stringify(obj[key], INDENT + indent, key + ": ", ending));
                    }
                    str.append(tabIndent).append("}");
                }
            }
        }

        if ({}.toString.call(obj) === '[object function]') {
            str.append("function(...) {...}");
        }

        // all other possible types that haven't been covered here an empty object symbol is returned
        if (str.isEmpty()){
            str.append("/* UNKNOWN */");
        }

        outputString.append(tabIndent).append(prefix).append(str.toString()).append(suffix);
        return outputString.toString();
    }
};

module.exports = {
    outputHelpers
}