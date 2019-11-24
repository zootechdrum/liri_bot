require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var chalk = require('chalk');
var moment = require('moment');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);

var appendSent = ""


var execCommand = process.argv[2];
//SearchQ is what the user wants to look up.
var searchQ = process.argv[3];

//Instructions on how this command line application works


//Take into account more then one argument and append them to searchQ
for (var i = 4; i < process.argv.length; i++) {
    if (process.argv.length > 3) {
        searchQ = searchQ + "+" + process.argv[i];
    } else {
        searchQ = searchQ;
    }
}

//Checks what the user inputted in terminal.

switch (execCommand) {
    case "concert-this":
        bandIntown(searchQ)
        break;
    case "movie-this":
        omdbCall(searchQ)
        break;
    case "spotify-this-song":
        spotTheSong(searchQ)
        break;
    case "do-what-it-says":
        callRandom()
        break;
}


function omdbCall(movie){
    axios.get("http://www.omdbapi.com/?t=" + searchQ + "&y=&plot=short&apikey=" + keys.omdb.id)
        .then(function (response){
            if(response.data.length === 0){
                console.log(chalk.white.bgBlack.bold("Nothing matches your Criteria"))
            }else{
                console.log(chalk.red("--------------------------------------------"))
                console.log(chalk.white.bgBlack.bold("The movie title is " + response.data.Title))
                console.log(chalk.white.bgBlack.bold("The year this movie came out on " + response.data.Year))
                console.log(chalk.white.bgBlack.bold("The " + response.data.Ratings[1].Source + " score " + response.data.Ratings[1].Value)) 
                console.log(chalk.white.bgBlack.bold("The language is originally in " + response.data.Language)) 
                console.log(chalk.white.bgBlack.bold("Plot :: " + response.data.Plot)) 
                console.log(chalk.white.bgBlack.bold("The actors in the movie are " + response.data.Actors))

                appendSent = "You executed the command " + " < " + execCommand + " > " + "\r\n" +
                            " ------------------- " + "\r\n" +
                            "The movie title is " + response.data.Title + "\r\n" + " ------------------- " + "\r\n" +"The year this movie came out on is " + response.data.Year + "\r\n" +
                            " ------------------- " + "\r\n" +
                             "the " +  response.data.Ratings[1].Source + " score : " +  response.data.Ratings[1].Value + "\r\n" +
                             " ------------------- " + "\r\n" +
                             "The language is originally in " + response.data.Language + "\r\n" +
                             " ------------------- " + "\r\n" +
                             "Plot :: " + response.data.Plot + "\r\n" +
                             " ------------------- " + "\r\n" +
                             "The actors in the movie are " + response.data.Actors +
                             " ------------------------------------------------------------------------------------- " + "\r\n" +



                


                append('movie-this',appendSent)
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


function spotTheSong(song){
    spotify.search({ type: 'track', query: song })
    .then(function(response){
        for(var i = 0; i < response.tracks.items.length; i++){
            console.log(chalk.red("--------------------------------------------"))
        console.log(chalk.white.bgBlack.bold("This band/artist who created this is " + response.tracks.items[i].album.artists[0].name))
        console.log(chalk.white.bgBlack.bold("The song name is " + song))
        console.log(chalk.white.bgBlack.bold("The song can be heard at  " + response.tracks.items[1].external_urls.spotify))
        console.log(chalk.white.bgBlack.bold("The song is from the album  " + response.tracks.items[i].album.name))
        console.log(chalk.red("--------------------------------------------"))
        }
    })

}




function append(command,movieDet) {
    if(command === 'movie-this'){

    fs.appendFile('log.txt', movieDet, function (err) {
        if (err) throw err;
        console.log(command);
      });
    }
}


function callRandom(){
    fs.readFile('random.txt','utf-8',function(err,data){
        data = data.split(",")
        spotTheSong(data[1])
    })
}