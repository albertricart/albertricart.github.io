var username = document.querySelector("#username");
var dir = document.querySelector("#dir");
var userInput = document.querySelector("#userInput");
var consoleContainer = document.querySelector(".console-container");
var console_body = document.querySelector(".console-body");
var welcomeWrapper = document.querySelector(".console-body__welcome");
var welcomePrompt = document.querySelector("#welcomePrompt");
var commandList = ["cd", "ls", "cat", "username", "help", "man", "clear", "leave"];
var found = false;
var checkedDirectories = [];

const directories = {

    "/": {
        home: {},
        portfolio: {
            projects: {
                mnactec: {
                    github: {
                        link: "https://github.com/Marc-Ferrer-Castillo/QuizGame",
                    },
                    readme: {
                        text: ""
                    }
                },
                chrysallis: {
                    github: {
                        app: {
                            link: "https://github.com/JRiberaG/MeetChrysallis",
                        },

                        backend: {
                            link: "https://github.com/albertricart/Projecte-Chrysallis",
                        }
                    },
                    readme: {
                        text: ""
                    }
                },
                ev: {
                    app: {
                        link: "https://play.google.com/store/apps/details?id=com.marcferrer.evcomparator",
                    },
                    readme: {
                        text: "A project about displaying all electric vehicles and comparing them. App property of Marc Ferrer where I contributed to. (Summer 2020)"
                    }
                },
                recomercem: {
                    website: {
                        link: "http://recomercem.es/",
                    },
                    github: {
                        link: "https://github.com/albertricart/recomercem",
                    },
                    documentation: {
                        link: "http://recomercem.es/projecte.html",
                    },
                    play: {
                        link: "http://recomercem.es/games/catchit/index.html",
                    },
                    readme: {
                        text: "A project about impulsing and helping out local businesses due to COVID-19. (Oct to Dec 2020)"
                    }
                },
                cepsem: {
                    website: {
                        link: "#",
                    },
                    github: {
                        link: "https://github.com/albertricart/cepsem",
                    },
                    readme: {
                        text: "(Feb to Apr 2021)"
                    }
                },

                internships: {
                    artimedia: {
                        asmadual: {
                            website: { link: "https://www.asmadual.es/" },
                            readme: {
                                text: "(Jan to Feb 2021)"
                            }
                        },

                        gescobro: {
                            website: { link: "https://gescobro.com/en" },
                            readme: {
                                client: "Gescobro",
                                date: "(Feb to Apr 2021)",
                                desc: ""
                            }
                            // readme: {
                            //     text: "(Feb to Apr 2021)"
                            // }
                        },

                        nora: {
                            website: { link: "#" },
                            readme: {
                                text: "In dev"
                            }
                        }

                    }
                }
            },

            skills: {
                js_snippets: {
                    primitive_data: {
                        link: "https://jsfiddle.net/albertricart/uayw4mv0/",
                    },
                    complex_data: {
                        link: "https://jsfiddle.net/albertricart/or8q6egd/",
                    },
                    iterations: {
                        link: "https://jsfiddle.net/albertricart/5k6rwtg0/1/",
                    },
                    callbacks_and_conditionals: {
                        link: "https://jsfiddle.net/albertricart/s61m9o05",
                    },
                    objects: {
                        link: "https://jsfiddle.net/albertricart/pqhv51nf/",
                    },
                    accessing_dom: {
                        link: "https://jsfiddle.net/albertricart/grcw8y2n/",
                    },
                    selectors_advanced: {
                        link: "https://jsfiddle.net/albertricart/wx6n1pfo/",
                    },
                    atomic_design: {
                        link: "/demos/atomic-design/index.html",
                    },
                },

                diw: {},
            },

        },
        about: {},
        contact: {}
    }
};

console.log(directories);

function search(obj, routeResquested) {
    found = false;

    Object.keys(obj).forEach(key => {

        // console.log(`key: ${key}, value: ${obj[key]}`)

        if (key == routeResquested[0]) {
            found = true;
            console.warn('found');
        }

        if (typeof obj[key] === 'object') {
            if (found) {
                checkedDirectories.push(key);
                search(obj[key], routeResquested.slice(1));
            }
        }
    })
}

consoleContainer.onclick = function () { userInput.focus() };

userInput.onkeypress = manageInput;
welcomePrompt.oninput = manageWelcomeInput;
welcomePrompt.onkeypress = function (e) {
    var keynum = e.keyCode || e.which;
    if (keynum == 13) {
        if (welcomePrompt.value.trim() == "yes") {
            let displayHelpMessage = document.createElement("p");
            displayHelpMessage.innerHTML = "Good! Before letting you free, I encourage you to type 'help' so you get an idea of what your possibilities are here. Checking out 'ls' is a great starting point. Have fun!"
            welcomeWrapper.appendChild(displayHelpMessage);
            welcomePrompt.disabled = true;
            userInput.disabled = false;
            userInput.focus();
        }
        else if (welcomePrompt.value.trim() == "no") {
            window.location.href = "./home.html";
        }
    }
};


var currentDir = "/";
moveToDir(currentDir);


function moveToDir(dirName) {
    currentDir = dirName;
    dir.innerHTML = "C:" + dirName + '>';
}

function manageInput(e) {
    let keynum = e.keyCode || e.which;

    //on enter keypress
    if (keynum == 13) {
        //disable current input
        userInput.disabled = true;

        //get all prompts
        let console_prompts = document.querySelectorAll(".console-body__prompt");

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
                message = navigateDirectory(argument, false);
            } else {
                message = 'specify directory...';
            }

            break;

        case "ls":
            message = ls(argument);
            break;

        case "cat":
            if (argument) {
                message = 'showing ' + argument;
            } else {
                message = 'specify file...';
            }

            break;

        case "username":
            if (argument) {
                message = 'changing username from ' + username.dataset.username + ' to...' + argument;
                username.dataset.username = argument;
                username.innerHTML = argument + "@portfolioAR";
            } else {
                message = 'specify username';
            }

            break;

        case "clear":

            if (document.querySelector(".console-body__welcome")) {
                document.querySelector(".console-body__welcome").style.display = "none";
            }

            document.querySelectorAll(".console-body__prompt").forEach(prompt => {
                prompt.remove();
            });
            break;


        case "man":
            if (argument) message = returnCommandDescription(argument, true);
            else message = "Specify the command you wish to know more about.";
            break;

        case "leave":
            window.location.href = "./home.html";
            message = "";
            break;

        case "":
            message = "";
            break;

        default:
            message = "'" + command + "' is not a command.";
            break;
    }

    return message;
}

function cleanDirRoute(route) {
    let cleandirs = route.split('/');
    if (cleandirs[0] == "") {
        cleandirs.shift();
        cleandirs.unshift("/");
        cleandirs = cleandirs.filter(function (el) {
            return el != "";
        });
    }

    return cleandirs;
}

function ls(route) {
    var message ="";
    var currentDirectories = cleanDirRoute(currentDir);
    
    if (!route || route == ".") {
        //list from current directory
        message = printDirectoryFiles(getFilesFromDir(currentDirectories));
    } else {
        
        debugger;
        if (route == ".." && currentDirectories.length > 1) {
            message = printDirectoryFiles(getFilesFromDir(currentDirectories.pop()));
        } else {
            var routeDirectories = cleanDirRoute(route);
            search(setStartingDir(currentDirectories), routeDirectories);

            console.log(checkedDirectories);
            if (arraysEqual(routeDirectories, checkedDirectories)) {
                message = printDirectoryFiles(getFilesFromDir(routeDirectories));
            }
            checkedDirectories = [];
        }
    }

    return message;
}


function navigateDirectory(route, ls) {
    var message = "";
    var currentDirectories = cleanDirRoute(currentDir);

    if (!route || route == ".") {
        //list from current directory
        message = printDirectoryFiles(getFilesFromDir(currentDirectories));
    } else {

        var routeDirectories = cleanDirRoute(route);
        search(setStartingDir(currentDirectories), routeDirectories);

        console.log(checkedDirectories);
        if (arraysEqual(routeDirectories, checkedDirectories)) {
            if (ls) {
                message = printDirectoryFiles(getFilesFromDir(routeDirectories));
            } else {
                moveToDir(route);
            }
        }
        checkedDirectories = [];
    }

    return message;
}



function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function getFilesFromDir(arr) {
    var obj = directories;

    arr.forEach(key => {
        obj = obj[key];
    });

    return Object.keys(obj);
}

function setStartingDir(arr) {
    var obj = directories;
    if (arr[0] != "/") {
        arr.forEach(key => {
            obj = obj[key];
        });
    }

    return obj;
}

function createNewPrompt() {
    //creation of new prompt
    let newPrompt = document.createElement("div");
    newPrompt.classList.add("console-body__prompt");
    console_body.appendChild(newPrompt);

    newPrompt.appendChild(username.cloneNode(true));
    newPrompt.appendChild(dir.cloneNode(true));

    let newUserInput = document.createElement("input");
    newUserInput.type = "text";
    newUserInput.id = "userInput";
    newUserInput.setAttribute("autocomplete", "off");
    newUserInput.setAttribute("autocorrect", "off");
    newUserInput.setAttribute("autocapitalize", "off");
    newUserInput.setAttribute("spellcheck", "false");
    newUserInput.classList.add('input-console');

    userInput = newUserInput;

    //append to last element
    newPrompt.appendChild(userInput);

    userInput.focus();
    userInput.onkeypress = manageInput;
}

function printDirectoryFiles(directories) {
    let printDirectories = document.createElement("div");
    printDirectories.classList.add("printDirectories");

    directories.forEach(directory => {
        let displayDirectory = document.createElement("span");
        displayDirectory.style.color = "#2962ff";
        displayDirectory.innerHTML = directory;
        printDirectories.appendChild(displayDirectory);
    });

    return printDirectories.outerHTML;
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
                message = "Command used to move around directories. Specify the desired directory to move to it.<br><br>SYNTAX_<br><b>cd [directory]</b>";
            } else {
                message = "Move around directories";
            }
            break;

        case "ls":
            if (long) {
                message = "<br>ls is short for 'list'. This command enables you to list the files and directories belonging to the specified directory.<br> <br> SYNTAX_<br> <b>ls [directory]</b>";
            } else {
                message = "List files and directories";
            }
            break;

        case "username":
            if (long) {
                message = "<br>Allows you to change the current user. <br><br>SYNTAX_<br><b class='blueText'>username [new_user]</b>"
            } else {
                message = "Allows you to change users";
            }
            break;

        case "cat":
            if (long) {
                message = "You can view the content of a file using the 'cat' command along the specified file. <br><br>SYNTAX_<br><b>cat [filename]</b>";
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

function openOnNewTab(tab) {
    window.open(tab, "_blank");
}