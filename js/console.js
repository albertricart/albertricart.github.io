var dir = document.querySelector("#dir");
var userInput = document.querySelector("#userInput");
var username = document.querySelector("#username");
userInput.onkeypress = manageInput;



var currentDir = "C:/";

var directories = [
    ['/', ['home', 'portfolio', 'about', 'contact']],

];

moveToDir(currentDir);


function moveToDir(dirName) {
    dir.innerHTML += dirName + '>';
}

function manageInput(e) {
    var keynum = e.keyCode || e.which;

    if (keynum == 13) {
        recognizeInput(userInput.value.trim());
    }

}


function recognizeInput(input) {
    var command = "";
    var i = 0;

    if (!input.includes(" ")) {
        manageCommand(input);
    } else {
        while (i <= input.length && input[i].charCodeAt(0) != 32) {
            command += input[i];
            i++;
        }

        var argument = input.substring(command.trim().length).trim();

        if (argument == "") {
            alert(input + ' is not a command');
        } else {
            manageCommand(command, argument);
        }

    }
}

function manageCommand(command, argument) {
    switch (command.trim()) {
        case "help":
            mensaje = "List of available commands:<br>\t·cd<br>\t·ls"
            alert(mensaje);
            break;

        case "cd":
            if (argument) {
                alert('moving to...' + argument);
            } else {
                alert('specify directory...');
            }

            break;

        case "ls":
            if(argument){
                alert('listing ' + argument + ' directory');
            }else{
                alert('listing current directory');
            }
            
            break;

        case "cat":
            if (argument) {
                alert('showing ' + argument);
            } else {
                alert('specify file...');
            }

            break;

        case "username":
            alert('changing username ' + username.dataset.username + ' to...' + argument);
            username.dataset.username = argument;
            username.innerHTML = argument + "@portfolioAR";
            break;


        default:
            mensaje = "'" + command + "' is not a command";
            alert(mensaje);
            break;
    }
}