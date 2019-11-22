require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var userInput = process.argv[2];

//Checks what the user inputted in terminal.

switch (userInput) {
    case "concert-this":
        console.log("concert")
        break;
}

