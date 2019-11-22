require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var chalk = require('chalk');

var spotify = new Spotify(keys.spotify);

var execCommand = process.argv[2];
var searchQ = process.argv[3];

//Checks what the user inputted in terminal.

switch (execCommand) {
    case "concert-this":
        bandIntown(searchQ)
        break;
}



function bandIntown(artist){
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response){
        console.log(response.data[0].venue.name)
        console.log("The Venue will be " + response.data[0].venue.name)
        console.log("--------------------------------------------")
        console.log("The concert will be held in  " + response.data[0].venue.city)
        console.log("--------------------------------------------")
        console.log("The date the event will held is " + response.data[0].datetime) 
    });

}