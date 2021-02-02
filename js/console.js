//TO-DO: document.title = "sectionA, recomercem, etc... | Albert Ricart" 


var username = document.querySelector("#username");
var dir = document.querySelector("#dir");
var userInput = document.querySelector("#userInput");
var console = document.querySelector(".console");
var console_body = document.querySelector(".console__body");
var welcomePrompt = document.querySelector("#welcomePrompt");
var commandList = ["cd", "ls", "cat", "username", "help", "man"];

console.onclick = function () { userInput.focus() };

userInput.onkeypress = manageInput;
welcomePrompt.oninput = manageWelcomeInput;
welcomePrompt.onkeypress = function (e) {
    var keynum = e.keyCode || e.which;
    if (keynum == 13) {
        if (welcomePrompt.value == "yes") {
            welcomePrompt.disabled = true;
            userInput.disabled = false;
            userInput.focus();
        }
        else if (welcomePrompt.value == "no") {
            window.location.href = "https://albertricart.github.io/home.html";
        }
    }
};

function manageWelcomeInput() {
    if (welcomePrompt.value == "yes") {
        welcomePrompt.style.color = "lime";
    } else if (welcomePrompt.value == "no") {
        welcomePrompt.style.color = "orange";
    } else {
        welcomePrompt.style.color = "lightgray";
    }
}


var currentDir = dir.dataset.dir;

var directories = [
    ['/', ['home', 'portfolio', 'about', 'contact']],

];

moveToDir(currentDir);


function moveToDir(dirName) {
    dir.innerHTML += "C:/" + dirName + '>';
}

function manageInput(e) {
    let keynum = e.keyCode || e.which;

    if (keynum == 13) {
        userInput.disabled = true;
        let console_prompts = document.querySelectorAll(".console__body__prompt");

        //message to display to previous prompt
        let displayMessage = document.createElement("p");
        displayMessage.innerHTML = recognizeInput(userInput.value.trim());
        console_prompts[console_prompts.length - 1].appendChild(displayMessage);

        createNewPrompt();
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

        case "clear":
            document.querySelectorAll(".console__body__prompt").forEach(prompt =>{
                prompt.remove();
            });
            break;


        case "man":
            switch (argument) {
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

function createNewPrompt() {
    //creation of new prompt
    let newPrompt = document.createElement("div");
    newPrompt.classList.add("console__body__prompt");
    console_body.appendChild(newPrompt);

    newPrompt.appendChild(username.cloneNode(true));
    newPrompt.appendChild(dir.cloneNode(true));

    let newUserInput = document.createElement("input");
    newUserInput.type = "text";
    newUserInput.id = "userInput";

    userInput = newUserInput;

    //append to last element
    newPrompt.appendChild(userInput);

    userInput.focus();
    userInput.onkeypress = manageInput;
}