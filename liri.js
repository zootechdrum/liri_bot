require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var chalk = require('chalk');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);

console.log(keys.omdb.id)

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
        //conditional if response.data is equal to empty array
        if(response.data.length === 0){
            console.log(chalk.white.bgBlack.bold("Nothing matches your Criteria"))
        }else{
        console.log(chalk.white.bgBlack.bold("The Venue will be " + response.data[0].venue.name))
        console.log(chalk.red("--------------------------------------------"))
        console.log(chalk.white.bgBlack.bold("The concert will be held in  " + response.data[0].venue.city))
        console.log(chalk.red("--------------------------------------------"))
        console.log(chalk.white.bgBlack.bold("The date the event will held is " + moment(response.data[0].datetime).format('LLLL'))) 
        }
    });

}