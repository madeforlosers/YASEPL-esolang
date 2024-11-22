# YASEPL
*Yet Another Stupid Esoteric Programming Language*<br>
made by thesaturnangel

***this is a work in progress but it details most of what there is to offer***

# FAQ 
## what is this?
an esoteric programming language that uses symbols for its commands and has similar syntax to 2let and nbasc

## whats with the name?
I couldn't think of a name for it, so I named it that. it originally was AEPL (another esoteric programming language) but someone was already using that so i had to change it. the file extensions are still aepl though

## why?
just because. nothing special really

## can you even make cool stuff with it?
if you can make stuff with brainf, you can make stuff with this. lol


# Syntax and stuff



**Every command is one character long** and only uses symbols (not letters or numbers) for the command. that does limit the amount of commands that are typable on a US qwerty keyboard but you can copy and paste, can't you?

Syntax is as follows:
```
[Symbol][Arg 1],[Arg 2],...
```
here is an example:

```
;"abc",5
```
*this repeats "abc" argument 5 times and sets it to the loaded variable*

**Variables have to be loaded to use them for some commands** like nbasc. When you use a command that requires a loaded variable with none loaded, you get an error. you load a variable with `!` (see syntax soon)

**DO NOT USE SPACES TO SEPERATE ARGUMENTS!** that will not work. **you can for sure space out commands**, (even put them on new lines, if you're making a program) but you cant space out arguments or the command from its arguments

## arguments

use quotation marks (`"`) for strings, numbers for numbers, and letters without quotations for variables.
<summary>Here is what they look like:
<details>
String:
  
```
"this is a string"
```

Number:

```
45
```

Variable:

```
variablename
```
  
</details>
</summary>

### argument legend
In this readme, I have to show you the arguments for each command. **arguments will have the argument name, and type. (and maybe the default)** 

```
required: [argument name|argument type]
optional: [argument name|argument type|default option]
```

heres an example:
```
;[input|string],[repeatCount|number]
```
(the repeat command)

heres the key for argument types:

|Argument type|What it means|
|-|-|
|string|Argument is required to be a string or string variable|
|vstring|Argument is required to be a variable name, but as a string. (usually, vstring will have parenthesis next to it saying what type it needs to be. for example: `vstring(list)`)|
|number|Argument is required to be a number or number variable|
|vname|Argument is required to be a variable name|
|list|Argument is required to be a list/array variable|
|label|Argument is required to be a label number in the form of a number or a variable.|

an argument can support multiple types of arguments. if that is the case, all the types the arguments support will be listed, seperated by commas.

#### IMPORTANT INFO ABOUT STRINGS:
**STRINGS ARE LIMITED!** you **CAN NOT** use ANY symbols or commas in a string (except for periods, backslashes, underscores, or whitespace) in a string.

If you absolutely need to use a symbol for a string, you can use **symbol variables** (just string variables that contain symbols you cant use because they're commands.) heres the list of them:i

|name|symbol|
|-|-|
|nothing|(nothing)|
|space|(space)|
|comma|,|
|hashtag|#|
|greater|>|
|lesser|<|
|exclamation|!|
|divide|/|
|apostrophe|'|
|equals|=|
|plus|+|
|dollar|$|
|colon|:|
|semicolon|;|
|minus|-|
|period|.|
|openparenthesis|(|
|closedparenthesis|)|
|openbracket|[|
|closedbracket|]|
|backtick|`|

(Im still adding to this list so bare with me)


here's examples for what you just learned:

```
¥[index|number],[list|vstring(list)]
```
(this gets an item from a list and sets it to the loaded variable)

# learning and stuff
skip to commands if you dont wanna do this

## Basic outputting

to output to console, you have a bunch of options.
### newline (console.log())
to do a newline, you can use `>[output|string,number,variable,list]`
### inline (process.stdout.write())
to do an inline, you use `#[output|string,number,variable,list]`

you can use these to make your first program!

```
>"Hello World"
```
Run it. it works! It outputs "Hello World" to the console.
but what if you *really* want to make it sound enthusiastic. lets try adding an exclamation point!
```
>"Hello World!"
```
This results in `ERROR 0 string is messed up:(` because `!` is a command and the interpreter thinks that you're ending the output command and doing a new one. You can use **symbol variables** though. 

symbol variables are variables as strings that contain symbols that you cant type out otherwise. with this knowledge, we can fix this code to make it actually work:

```
#"Hello World">exclamation
```

IT WORKS! how cool is that?

## Simple variables
Variables are a little confusing, but bare with me

### declaring
**To declare a number or string**, use `=[name|vname]`. this automatically loads it too, so you don't have to do that after.<br>

**to declare a point**, use `` `[number|label]``. 

**to declare a list**, use `£[name|vname]`. this also loads it too

### loading variable

You need to load a variable for some commands. you can use `![name|vname]` to load it.

### setting variables to something

**for number variables**, use `$[input|number,string]`. this sets the current loaded variable to the float version of `input`. like this:

```
=x$6
>x
```
(outputs 6)

if a string is inputted, it will get converted to an float.

**for strings**, use `)[input|string]`. like this:
```
=x)"hello world"
>x
```

### Outputting with variables

How do we output with variables? we can always do this:
```
=x$6
>x
```
but theres a cooler way. watch:

```
=x$6
<
```
woah, whats `<`? <br>
**`<` outputs the current loaded variable as a newline**. if you want it inline, use `~`. 

### math
of course theres math!
there are **7** commands for math and equasions. those are `+`,`-`,`/`,`*`,`^`,`&`, and `%`


**for addition**, use `+[add|number|1]`. this adds `add` to the current loaded variable.

example:
```
=x+
<
```
*creates variable x, adds one, then outputs it (1)*

**for subtraction**, use `-[subtract|number|1]`. this subtracts `subtract` to the current loaded variable

example:
```
=x+5
-2
<
```
*creates variable x, adds five, subtracts three, then outputs it (3)*

**for division**, use `/[divide|number|1]`. this divides the current loaded variable by  `divide` and sets it to the current loaded variable

example:
```
=x+6
/
<
```
*creates variable x, adds six, divides it by 2, then outputs it (3)*

**for multiplication**, use `*[multiply|number|1]`. this multiplies `multiply` by the current loaded variable and sets it to the current loaded variable

example:
```
=x+3
*
<
```
*creates variable x, adds six, divides it by 2, then outputs it (3)*

**to exponentiate**, use `^[exponent|number|1]`. this exponentiates the current loaded variable by `exponent` and sets it to the current loaded variable

example:
```
=x+5
^
<
```
*creates variable x, adds five, exponentiates it, then outputs it (25)*

**to square-root**, use `&[root|number|1]`. this square-roots the current loaded variable by `root` and sets it to the current loaded variable

example:
```
=x+5
^
&
<
```
*creates variable x, adds five, exponentiates it square-roots it, then outputs it (5)*

**for modulus**, use `%[mod|number|1]`. this modulos the current loaded variable by `mod` and sets it to the current variable

 example:
 ```
 =x+5
 %
 <
 ```
*creates variable x, adds five, modulo 2, then outputs it (1)*

Heres something, now that you know math:

```
=a+10*-3^/2<
```
can you find out what this outputs? 

<summary>
heres what it outputs, if you're too lazy
  <details>
    8.5
  </details>
</summary>

### extra math stuff

`(` **is for setting the loaded variable to a parseInt version of itself.** 

example:
```
=5)"56"
(*<
```
(outputs 112)

**`¢[min|number],[max|number]` generates a random number between min and max and sets it to the current loaded variable.**


### labels and `?`

labels are simple. 

**you use `` `[number|label] `` (backtick) to declare a point.** points are ONLY numbers. nothing else. 

**to move to a point, use `|[number|label|1]`.**

**to move to a certain command at an index, use `?[number|number|1]`**


### if statements

 theres a bunch of if statements, such as `@`, `[`, `]`, and `}`.

 **in all of these, the else label is optional**)

 **`@[iftrue|label|1],[else|label|null]` is to see if the current loaded variable is equal to 1.** if it is true, it goes to the `iftrue` label. if false, it goes to the else label (if an else label is given).


**`[[iftrue|label|1],[else|label|null]` is to see if the current loaded variable is NOT equal to 1.** if it is true, it goes to the `iftrue` label. if false, it goes to the else label (if an else label is given). **The command is `[`, don't get confused**

**`][iftrue|label|1],[else|label|null]` is to see if the current loaded variable is equal to 0.** if it is true, it goes to the `iftrue` label. if false, it goes to the else label (if an else label is given). **The command is `]`, don't get confused**

### the `}[type|number|1],[compare|number|1],[iftrue|label|1],[else|label|null]` command

(holy crap that is long)

I had to make a whole section dedicated to the `}[type|number|1],[compare|number|1],[iftrue|label|1],[else|label|null]` command because it's a little complicated.

**`[type|number|1]` is the type of comparison you are doing.** theres multiple, so heres a table:
|number|comparison|
|-|-|
|1|x > compare|
|2|x < compare|
|3|x == compare|
|4|x <= compare|
|5|x >= compare|
|6|x == undefined|
|7|x != compare|
|8|x == null|

*for number 6 and 8, you can just put any number for [compare|number|1]*

**`[compare|number|1]` is the number you're comparing the loaded variable to**. self explanatory

the rest of the arguments are the same as the rest of the commands. 

here's an example for `}`:

```
=x$4
=y$5}1,x,1,2
`1
#"greater than ">x
|3
`2
#"less than ">x
`3
```
(this checks if x is greater than y, and says so if it is)

### lists

**`¤[index|number],[newitem|string,number,list,label]` edits the current loaded variable (if it is a list) at said index to be newitem**

**`¥[index|number],[list|vstring]` gets the item from said list at said index and sets it to the current loaded variable.**

**`§` removes the last item of the current loaded variable (if it is a list) and sets it to itself**

**`©[item|string,number,list,label]` pushes item to the current loaded variable (if it is a list)**

**`±[item|string,number]` splits the current loaded variable (if it is a string) by every occurence of `item`.**

**`™[listname|string],[item|string,number]` gets the index of `item` in `listname`. `listname` \*HAS\* TO BE A STRING**



### other stuff
**`»` sets the current loaded variable (if it is a number) to whatever it is in char code form**

**`°` sets the current loaded variable to undefined**

**`®[name|string]` gets the length of anything and sets it to the current loaded variable. the variable name HAS to be a string.**

**`ſ[object|string,number,list]` adds to the currently loaded variable without making it a float. (or for concatenating strings)**

theres more commands, but I gotta add them into here. bare with me this is still a W.I.P. -a
