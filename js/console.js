var username = document.querySelector("#username");
var dir = document.querySelector("#dir");
var userInput = document.querySelector("#userInput");
var console = document.querySelector(".console");
var console_prompt = document.querySelectorAll(".console__prompt");
var commandList = ["cd", "ls", "cat", "username", "help", "man"];

console.onclick = function () { userInput.focus() };
userInput.onkeypress = manageInput;

var currentDir = dir.dataset.dir;

var directories = [
    ['/', ['home', 'portfolio', 'about', 'contact']],

];

moveToDir(currentDir);


function moveToDir(dirName) {
    dir.innerHTML += "C:/" + dirName + '>';
}

function manageInput(e) {
    var keynum = e.keyCode || e.which;

    if (keynum == 13) {
        userInput.disabled = true;


        //message to display
        var displayMessage = document.createElement("p");
        displayMessage.innerHTML = recognizeInput(userInput.value.trim());
        console_prompt[console_prompt.length - 1].appendChild(displayMessage);

        console_prompt[console_prompt.length - 1].appendChild(username.cloneNode(true));
        console_prompt[console_prompt.length - 1].appendChild(dir.cloneNode(true));



        var newUserInput = document.createElement("input");
        newUserInput.type = "text";
        newUserInput.id = "userInput";

        userInput = newUserInput;

        //append to last element
        console_prompt[console_prompt.length - 1].appendChild(userInput);

        userInput.focus();
        userInput.onkeypress = manageInput;
    }

}


function recognizeInput(input) {
    var command = "";
    var i = 0;
    let message;

    if (!input.includes(" ")) {
        message = manageCommand(input);
    } else {
        while (i <= input.length && input[i].charCodeAt(0) != 32) {
            command += input[i];
            i++;
        }

        var argument = input.substring(command.trim().length).trim();

        if (argument == "") {
            message = input + ' is not a command';
        } else {
            message = manageCommand(command, argument);
        }

    }

    return message;
}

function manageCommand(command, argument) {
    let message;
    switch (command.trim()) {
        case "help":
            message = "List of available commands: " + commandList;
            break;

        case "cd":
            if (argument) {
                message = 'moving to...' + argument;
            } else {
                message = 'specify directory...';
            }

            break;

        case "ls":
            if (argument) {
                message = 'listing ' + argument + ' directory';
            } else {
                message = "";
            }

            break;

        case "cat":
            if (argument) {
                message = 'showing ' + argument;
            } else {
                message = 'specify file...';
            }

            break;

        case "username":
            message = 'changing username from ' + username.dataset.username + ' to...' + argument;
            username.dataset.username = argument;
            username.innerHTML = argument + "@portfolioAR";
            break;

        case "man":
            switch(argument){
                case "cd":

                    break;
            }
            break;


        default:
            message = "'" + command + "' is not a command";
            break;
    }

    return message;
}