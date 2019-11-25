# liri_bot
This is a command line application.

## Description

This is a command line application that used Node.js. The user has 3 options to after typing node liri.js in the command line 
The options are:

    1. Spotify-this-song 
    2. movie-this
    3. concert-this
    4. do-what-it-says


Depending on what the user inputs a get request will be made to that api and search up the song,movie or band and retrieve any relvant info. It will also 
append the info to a file called log.txt. If the file log.txt is not present it will go ahead and create one. The result should be formatted well for easy
reading. 



## Technologies Used (including NPM packages)

1. Node.js
2. axios
3. Javascript
4. Chalk
5. Spotify
5. Moment.js

## API's that were used

1. OMDB 
2. Bands in Town
3. Spotify


![project-demo](node.gif)

## Important code snippet

The code below is how much of the core application works. Gets an argument for processArgv variable and then inserts that into 1 of 3 functions. We then set a whole paragraph to appendSent so we can pass it into an append function later on. 

```Javascript
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

        appendSent =  "You executed the command " + " < " + execCommand + " > " + "\r\n" +
            " ------------------- " + "\r\n" +
            "The Venue will be " + response.data[0].venue.name + "\r\n" +
            " ------------------- " + "\r\n" +
            "The concert will be held in  " + response.data[0].venue.city + "\r\n" +
            " ------------------- " + "\r\n" +
            "The date the event will held is " + moment(response.data[0].datetime).format('LLLL') + "\r\n" +
            " ------------------------------------------------------------------------------------- " + "\r\n" 
            append(appendSent)

        }
    });
}
```
