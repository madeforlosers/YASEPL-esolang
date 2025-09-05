// YASEPL language (yet another stupid esoteric programming language)
const fs = require("fs");
var prompt = require('prompt-sync')();
const ansi = require("m.easyansi");
var file = fs.readFileSync(process.argv[2] ? process.argv[2] : "test.aepl", "utf8")
var current_command = "";
var isAcceptingStr = false;
var acceptingStrBelt = "";

function throwError(error) {
    console.error(ansi.colorTextMode(31) + "ERROR " + error + (ansi.resetModes()) + " " + [
        "string is messed up",
        "needed an argument but got nothing",
        "label name is messed up",
        "ambiguous error",
        "no variables declared, cant use first",
        "no variable is loaded",
        "was told to go to a label that doesnt exist",
        "variable doesnt exist",
        "divide by 0",
        "cant support numbers less than 0",
        "variable/type mismatch",
        "choice not in range",
    ][error] + ":(")

    console.log("\nlocated at " + current_command)
    process.exit()
}

var vars = {
    "nothing": "",
    "space": " ",
    "comma": ",",
    "hashtag": "#",
    "greater": ">",
    "lesser": "<",
    "questionmark": "?",
    "exclamation": "!",
    "multiply": "*",
    "divide": "/",
    "apostrophe": "'",
    "equals": "=",
    "plus": "+",
    "dollar": "$",
    "colon": ":",
    "semicolon": ";",
    "minus": "-",
    "period": ".",
    "openparenthesis": "(",
    "closedparenthesis": ")",
    "openbracket": "[",
    "closedbracket": "]",
    "backtick": "`",
    "pipe": "|",
    "quote": "\"",
    "undef": undefined,
    "screenheight": process.stdout.rows,
    "screenwidth": process.stdout.columns,
}
var labels = {}
var firstvar = ""
var loaded = ""

var commands = {
    " ": function () { },
    "#": function (t) {
        if (t == undefined) {
            throwError(1)
        }
        process.stdout.write(t.toString());

    },
    ">": function (t) {
        if (t == undefined) {
            throwError(1);
        }
        console.log(t);
    },
    "\<": function () {
        if (loaded == "") throwError(5)
        console.log(vars[loaded]);
    },
    "!": function (b = firstvar) { //load variable
        if (b == "") throwError(4)
        loaded = b
    },
    "'": function () { //prompt
        if (loaded == "") throwError(5)
        vars[loaded] = prompt(">");
    },
    "=": function (v) { //declare
        if (v == undefined) throwError(1);
        if (firstvar == "") firstvar = v
        vars[v] = 0
        loaded = v
    },
    "$": function (n = 1) { //set 
        if (loaded == "") throwError(5)
        vars[loaded] = typeof vars[loaded]=="bigint"?BigInt(n):parseFloat(n);
    },
    ")": function (n) { //set 
        if (loaded == "") throwError(5)
        if (n == undefined) throwError(1)
        vars[loaded] = n
    },
    ";": function (string, rep) {
        vars[loaded] = string.repeat(rep)
    },
    "+": function (n = 1) { //add
        if (loaded == "") throwError(5)
        vars[loaded] += typeof vars[loaded]=="bigint"?BigInt(n):parseFloat(n);
        
    },
    "-": function (n = 1) { //subtract
        if (loaded == "") throwError(5)
        vars[loaded] -= typeof vars[loaded]=="bigint"?BigInt(n):parseFloat(n);
    },
    "/": function (n = 2) { //divide
        if (loaded == "") throwError(5)
        if (parseFloat(n) == 0) throwError(8)
        vars[loaded] /= typeof vars[loaded]=="bigint"?BigInt(n):parseFloat(n);
    },
    "*": function (n = 2) { //multiply
        if (loaded == "") throwError(5)
        vars[loaded] *= typeof vars[loaded]=="bigint"?BigInt(n):parseFloat(n);
    },
    "^": function (n = 2) { //square
        if (loaded == "") throwError(5)
        vars[loaded] **= typeof vars[loaded]=="bigint"?BigInt(n):parseFloat(n);
    },
    "&": function () { //sqrt
        if (loaded == "") throwError(5);
        if(typeof vars[loaded]=="bigint") throwError(10);
        vars[loaded] = Math.sqrt(vars[loaded])
    },
    "%": function (n = 2) { //modulo
        if (loaded == "") throwError(5)
        if (n == 0) throwError(8)
        vars[loaded] = vars[loaded] % (typeof vars[loaded]=="bigint"?BigInt(n):parseFloat(n));
    },
    "~": function () {
        if (loaded == "") throwError(5)
        process.stdout.write(vars[loaded].toString())
    },
    "(": function () {
        if (loaded == "") throwError(5)
        vars[loaded] = parseInt(vars[loaded])
    },
    ":": function (num) {
        if (loaded == "") throwError(5)
        vars[loaded] = (typeof vars[loaded]=="bigint"?BigInt(n):parseFloat(n)) - vars[loaded]
    },
    "?": function (n) {
        if (n == undefined) throwError(1)
        return parseFloat(n)
    },
    "@": function (label = 1, el = null) {
        if (loaded == "") throwError(5)
        if (vars[loaded] == 1) {
            return [label]
        } else {
            if (el != null) {
                return [el]
            }
        }
    },
    "[": function (label = 1, el = null) {
        if (loaded == "") throwError(5)
        if (vars[loaded] != 1) {
            return [label]
        } else {
            if (el != null) {
                return [el]
            }
        }
    },
    "]": function (label = 1, el = null) {
        if (loaded == "") throwError(5)
        if (vars[loaded] == 0) {
            return [label]
        } else {
            if (el != null) {
                return [el]
            }
        }
    },
    "}": function (g = 1, num = 1, label = 1, el = null) {
        if (loaded == "") throwError(5)
        if (g == 1) {
            if (vars[loaded] > num) {
                return [label]
            } else {
                if (el != null) {
                    return [el]
                }
            }
        } else if (g == 2) {
            if (vars[loaded] < num) {
                return [label]
            } else {
                if (el != null) {
                    return [el]
                }
            }
        } else if (g == 3) {
            if (vars[loaded] == num) {
                return [label]
            } else {
                if (el != null) {
                    return [el]
                }
            }
        } else if (g == 4) {
            if (vars[loaded] <= num) {
                return [label]
            } else {
                if (el != null) {
                    return [el]
                }
            }
        } else if (g == 5) {
            if (vars[loaded] >= num) {
                return [label]
            } else {
                if (el != null) {
                    return [el]
                }
            }
        } else if (g == 6) {
            if (vars[loaded] == undefined) {
                return [label]
            } else {
                if (el != null) {
                    return [el]
                }
            }
        } else if (g == 7) {
            if (vars[loaded] != num) {
                return [label]
            } else {
                if (el != null) {
                    return [el]
                }
            }
        } else if (g == 8) {
            if (vars[loaded] == null) {
                return [label]
            } else {
                if (el != null) {
                    return [el]
                }
            }
        }


    },
    "|": function (label = 1) {
        return [label]
    },
    "`": function (name) {
        if (name == undefined) throwError(2)
        //nothing, its just for labeling

    },
    "¢": function (min, max) {
        if (min == undefined) throwError(2)
        if (max == undefined) throwError(2)
        if (loaded == "") throwError(5)
        min = Math.ceil(parseFloat(min));
        max = Math.floor(parseFloat(max));
        vars[loaded] = Math.floor(Math.random() * (max - min + 1) + min);

    },
    "£": function (name) { //set list
        if (name == undefined) throwError(2)
        vars[name] = []
        loaded = name
    },
    "¤": function (index, item) { // set item in list
        //if(typeof vars[loaded] != "object")throwError(10)
        if (index == undefined) throwError(2);
        if (item == undefined) throwError(2);
        if (parseInt(index) < 0) throwError(9);
        if (loaded == "") throwError(5);
        vars[loaded][index] = item
    },
    "¥": function (index, listname) { //set loaded variable to item in list (listname needs to be string)
        if (listname == undefined) throwError(2);
        //if(typeof vars[listname] != "object")throwError(10)
        if (index == undefined) throwError(2);
        if (parseInt(index) < 0) throwError(9);
        if (loaded == "") throwError(5);
        vars[loaded] = vars[listname][index]
    },
    "§": function () { //pop loaded variable
        if (typeof vars[loaded] != "object") throwError(10)
        if (loaded == "") throwError(5);
        vars[loaded].pop();
    },
    "©": function (item) { //push to loaded variable
        if (typeof vars[loaded] != "object") throwError(10)
        if (loaded == "") throwError(5);
        if (item == undefined) throwError(2);
        vars[loaded].push(item);
    },
    "±": function (item) { //split string
        if (typeof vars[loaded] != "string") throwError(10)
        if (loaded == "") throwError(5);
        if (item == undefined) throwError(2);
        vars[loaded] = vars[loaded].split(item);
    },
    "®": function (len) { //get length of anything
        if (loaded == "") throwError(5);
        if (len == undefined) throwError(2);
        vars[loaded] = vars[len].length;
    },
    "»": function () { //int to char
        if (loaded == "") throwError(5);
        vars[loaded] = String.fromCharCode(vars[loaded])
    },
    "°": function () {
        if (loaded == "") throwError(5)
        vars[loaded] = undefined
    },
    "¿": function (h) {
        // nothing, its a comment
    },
    "™": function (listname, item) { //index of item in listname
        if (loaded == "") throwError(5);
        if (item == undefined) throwError(2);
        if (listname == undefined) throwError(2);
        // if(typeof vars[listname] != "object")throwError(10)
        vars[loaded] = vars[listname].indexOf(item);
    },
    "š": function () {
        if (loaded == "") throwError(5)
        if (isNaN(parseInt(vars[loaded]))) throwError(10)
        console.log(String.fromCharCode(vars[loaded]))
    },
    "›": function () {
        if (loaded == "") throwError(5)
        if (isNaN(parseInt(vars[loaded]))) throwError(10)
        process.stdout.write(String.fromCharCode(vars[loaded]))
    },
    "œ": function (compare) {
        if (loaded == "") throwError(5)
        if (isNaN(parseInt(vars[loaded]))) throwError(10)
        if (isNaN(parseInt(compare))) throwError(10)
        vars[loaded] = vars[loaded] & compare
    },
    "Ŕ": function (setting = 0, dat = null) {
        date = dat == null ? Date.now() : dat;
        switch (setting) {
            case 0:
                vars[loaded] = new Date(date);
                break;
            case 1:
                vars[loaded] = new Date(date).getDate();
                break;
            case 2:
                vars[loaded] = new Date(date).getFullYear();
                break;
            case 3:
                vars[loaded] = new Date(date).getMonth();
                break;
            case 4:
                vars[loaded] = new Date(date).getDay();
                break;
            case 5:
                vars[loaded] = new Date(date).getHours();
                break;
            case 6:
                vars[loaded] = new Date(date).getMinutes();
                break;
            case 7:
                vars[loaded] = new Date(date).getSeconds();
                break;
            case 8:
                vars[loaded] = new Date(date).getMilliseconds();
                break;
            case 9:
                vars[loaded] = new Date(date).getTime();
                break;
        }
    },
    "ſ": function (add) {
        vars[loaded] += add
    },
    "π": function () {
        if (loaded == "") throwError(5)
        vars[loaded] = Math.PI;
    },
    "≈": function (mo = 0, x) {
        if (isNaN(parseInt(mo))) throwError(10);
        if (mo < 0 || mo > 2) throwError(11);
        if (isNaN(parseInt(x))) throwError(10);
        if (loaded == "") throwError(5);
        vars[loaded] = [Math.sin, Math.cos, Math.tan][mo](x);
    },
    "←": function (text, num) {
        if (typeof vars[text] != "string") throwError(10);
        if (isNaN(parseInt(num))) throwError(10);
        if (num < 0) throwError(9);
        if (num > vars[text].length) throwError(11);
        vars[loaded] = vars[text].slice(0, num)
    },
    "↔": function (text, min, max) {
        if (typeof vars[text] != "string") throwError(10);
        if (isNaN(parseInt(min))) throwError(10);
        if (isNaN(parseInt(max))) throwError(10);
        if (min < 0 || max < 0) throwError(9);
        if (max > vars[text].length) throwError(11);
        if (min > max) throwError(11);

        vars[loaded] = vars[text].slice(min, max)
    },
    "„": function () {
        // nothing, for more accepting strings
    },
    "‽": function () {
        // comments.
    },
    "¶":function(v){
        if (v == undefined) throwError(1);
        if (firstvar == "") firstvar = v
        vars[v] = 0n
        loaded = v
    }
}



detect = /[^\w",\n\.\\\_\s]/g

function getargs(command, i) {
    tmp = command.split(detect).join().split("\n").join().split(",")
    // console.log(tmp)
    args = []
    for (arg of tmp) {
        if (arg.includes('"')) {
            if (arg.split('"').length != 3) {
                throwError(0);
            }
            args.push(arg.split('"').join(""))
        } else if (arg.match(/\d/g) != null) {

            // console.log("digit "+arg)
            args.push(parseFloat(arg))
        } else if (arg.match(/\w+/g) != null) {
            if (file[i] == "¶" || file[i] == "=" || file[i] == "!" || file[i] == "£") {
                args.push(arg)
            } else {

                if (vars[arg] == undefined) throwError(7)
                args.push(vars[arg])
            }
        }
    }
    return args
}

for (var i = 0; i < file.length; i++) {

    var text = file[i]
    if (text == "„" || text == "‽") {
        if (isAcceptingStr) {
            if (text == "„") vars[loaded] = acceptingStrBelt;
            acceptingStrBelt = "";
        }
        isAcceptingStr = !isAcceptingStr;
        continue;
    };
    if (text.match(detect) != null && !isAcceptingStr) {
        current_command = text;
        try {
            current_command = text + file.slice(i + 1).split(detect)[0]
            argz = getargs(file.slice(i + 1).split(detect)[0], i)

            jump = commands[text](...argz)
            if (jump != null) {
                if (typeof jump == "object") {
                    i = file.indexOf('`' + jump[0]) - 1
                    if (i == -2) {
                        throwError(6);
                    }
                } else {
                    i = jump - 2
                }
            }
        } catch (e) {
            console.log(e)
            throwError(3)
        }
    } else if (isAcceptingStr) {
        acceptingStrBelt += text;
    }
}
//console.log(vars)
