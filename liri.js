require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var chalk = require('chalk');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);



var execCommand = process.argv[2];
//SearchQ is what the user wants to look up.
var searchQ = process.argv[3];


//Take into account more then one argument and append them to searchQ


for (var i = 4; i < process.argv.length; i++) {
    if (process.argv.length > 3) {
        searchQ = searchQ + "+" + process.argv[i];
    } else {
        searchQ = searchQ;
    }
}
console.log(searchQ)
console.log(execCommand)


//Checks what the user inputted in terminal.

switch (execCommand) {
    case "concert-this":
        bandIntown(searchQ)
        break;
    case "movie-this":
        omdbCall(searchQ)
        break;
}


function omdbCall(movie){
    axios.get("http://www.omdbapi.com/?t=" + searchQ + "&y=&plot=short&apikey=" + keys.omdb.id)
        .then(function (response){
            if(response.data.length === 0){
                console.log(chalk.white.bgBlack.bold("Nothing matches your Criteria"))
            }else{
                console.log(chalk.white.bgBlack.bold("The movie title is " + response.data.Title))
                console.log(chalk.red("--------------------------------------------"))
                console.log(chalk.white.bgBlack.bold("The year this movie came out on " + response.data.Year))
                console.log(chalk.red("--------------------------------------------"))
                console.log(chalk.white.bgBlack.bold("The " + response.data.Ratings[1].Source + " score " + response.data.Ratings[1].Value))
                console.log(chalk.red("--------------------------------------------")) 
                console.log(chalk.white.bgBlack.bold("The language is originally in " + response.data.Language))
                console.log(chalk.red("--------------------------------------------")) 
                console.log(chalk.white.bgBlack.bold("Plot :: " + response.data.Plot))
                console.log(chalk.red("--------------------------------------------")) 
                console.log(chalk.white.bgBlack.bold("The actors in the movie are " + response.data.Actors))

            }
        })
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