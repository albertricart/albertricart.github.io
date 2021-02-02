//TO-DO: document.title = "sectionA, recomercem, etc... | Albert Ricart" 


var username = document.querySelector("#username");
var dir = document.querySelector("#dir");
var userInput = document.querySelector("#userInput");
var console = document.querySelector(".console");
var console_body = document.querySelector(".console__body");
var welcomeWrapper = document.querySelector(".console__body__welcome");
var welcomePrompt = document.querySelector("#welcomePrompt");
var commandList = ["cd", "ls", "cat", "username", "help", "man", "clear", "leave"];

console.onclick = function () { userInput.focus() };

userInput.onkeypress = manageInput;
welcomePrompt.oninput = manageWelcomeInput;
welcomePrompt.onkeypress = function (e) {
    var keynum = e.keyCode || e.which;
    if (keynum == 13) {
        if (welcomePrompt.value.trim() == "yes") {
            let displayHelpMessage = document.createElement("p");
            displayHelpMessage.innerHTML = "Good! Before letting you free, I encourage you to type 'help' so you get an idea of what are your possibilities here. Have fun!"
            welcomeWrapper.appendChild(displayHelpMessage);
            welcomePrompt.disabled = true;
            userInput.disabled = false;
            userInput.focus();
        }
        else if (welcomePrompt.value.trim() == "no") {
            window.location.href = "https://albertricart.github.io/home.html";
        }
    }
};




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
        //disable current input
        userInput.disabled = true;

        //get all prompts
        let console_prompts = document.querySelectorAll(".console__body__prompt");

        //message to display to previous prompt
        let displayMessage = document.createElement("p");
        //set response from command
        displayMessage.innerHTML = recognizeInput(userInput.value.trim());
        //display response from command
        console_prompts[console_prompts.length - 1].appendChild(displayMessage);

        createNewPrompt();
    }

}




function recognizeInput(input) {
    var command = "";
    var i = 0;
    let message;

    if (!input.includes(" ")) {
        //means there is no argument
        message = manageCommand(input);
    } else {
        //means there is argument
        while (i <= input.length && input[i].charCodeAt(0) != 32) {
            command += input[i];
            i++;
        }

        var argument = input.substring(command.trim().length).trim();

        if (argument == "") {
            message = input + ' is not a command.';
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
            message = "<br>Down below is the list of commands available on this console. To know a bit more about them and how to exactly use them, type 'man' followed by the command you want to learn about: <br><br>";
            message += returnCommandList();
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
            document.querySelectorAll(".console__body__prompt").forEach(prompt => {
                prompt.remove();
            });
            break;


        case "man":
            message = returnCommandDescription(argument, true);
            break;

        case "leave":
            window.location.href = "https://albertricart.github.io/home.html";
            message = "";
            break;


        default:
            message = "'" + command + "' is not a command.";
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
    newUserInput.setAttribute("autocomplete", "off");

    userInput = newUserInput;

    //append to last element
    newPrompt.appendChild(userInput);

    userInput.focus();
    userInput.onkeypress = manageInput;
}


function manageWelcomeInput() {
    if (welcomePrompt.value.trim() == "yes") {
        welcomePrompt.style.color = "lime";
    } else if (welcomePrompt.value.trim() == "no") {
        welcomePrompt.style.color = "orange";
    } else {
        welcomePrompt.style.color = "lightgray";
    }
}

function returnCommandList() {
    let message = "";

    commandList.forEach(command => {
        message += "- " + command + ": " + returnCommandDescription(command, false) + "<br>";
    });

    return message;
}

function returnCommandDescription(command, long) {
    let message = "";
    switch (command) {
        case "cd":
            if (long) {
                message = "Command used to move around directories. Specify the desired directory to move to it.<br><br>SYNTAX__<br><b>cd [directory]</b>";
            } else {
                message = "Move around directories";
            }
            break;

        case "ls":
            if (long) {
                message = "<br>ls is short for 'list'. This command enables you to list the files and directories belonging to the specified directory.<br> <br> SYNTAX__<br> <b>ls [directory]</b>";
            } else {
                message = "List files and directories";
            }
            break;

        case "username":
            if (long) {
                message = "<br>Allows you to change the current user. <br><br>SYNTAX__<br><b class='blueText'>username [new_user]</b>"
            } else {
                message = "Allows you to change users";
            }
            break;

        case "cat":
            if (long) {
                message = "You can view the content of a file using the 'cat' command along the specified file. <br><br>SYNTAX__<br><b>cat [filename]</b>";
            } else {
                message = "View file";
            }
            break;

        case "help":
            message = "Display all commands available with a short description";
            break;

        case "clear":
            message = "Clear all prompts";
            break;

        case "leave":
            message = "Get redirected to the alternative portfolio";
            break;

        case "man":
            message = "Show command usage and description";
            break;

        default:
            message = "'" + command + "' is not a command.";
            break;
    }

    return message;
}