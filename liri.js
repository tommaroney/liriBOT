require("dotenv").config();

let inquirer = require(`inquirer`);

let axios = require(`axios`);

var Spotify = require('node-spotify-api');

let keys = require("./keys.js");

let moment = require("moment");

let fs = require("fs");

let spotify = new Spotify(keys.spotify);

function handleOutput(command, output) {
    console.log(output);
    fs.appendFileSync("./log.txt", "\n\n" + command + "\n" + output);
}

function parseRandom() {
    let data = fs.readFileSync("./random.txt", "utf8");
    let itSaysArr = data.split(",");
    itSaysArr[1] = itSaysArr[1].slice(1, itSaysArr[1].length - 1);
    return itSaysArr;
}

function spotifyThisSong(command, songName) {
    if(songName === '') 
        songName = "The Sign";
    spotify.search({type: `track`, query: songName, limit: 1}, function(err, data) {
        if(err) {
            return console.log(err);
        }
        else {
            data.tracks.items.forEach((item) => {
                let artists = [];
                item.artists.forEach((artist) => artists.push(artist.name));
                handleOutput(command, "\nArtist(s): " + artists.join(", ") + "\nSong Title: " + item.name + "\nPreview Link: " + item.preview_url + "\nAlbum: " + item.album.name);
            });
        }
    });
}

function concertThis(command, artistName) {
    axios.get(`https://rest.bandsintown.com/artists/` + encodeURI(artistName.trim()) + `/events?app_id=codingbootcamp`).then((response) => {
        console.log("\n" + artistName + " is playing: ")

        for(i = 0; i < response.data.length; i++) {
            let region = '';
            if(response.data[i].venue.region)
                region = ", " + response.data[i].venue.region;

            let eventDate = moment(response.data[i].datetime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY");
            handleOutput(command, "\nVenue: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.city + region + ", " + response.data[i].venue.country + "\nDate: " + eventDate);
        }
    });
}

function movieThis(command, movieName) {
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + encodeURI(movieName)).then((response) => {

        handleOutput(command, "\nMovie Title: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nCountry of Production: " + response.data.Country + "\nLanguage: " + response.data.Language + "\n\nPlot: " + response.data.Plot + "\n\nActors: " + response.data.Actors);
    })
}

inquirer.prompt([
    {
        type: `list`,
        message: `What would you like to do?`,
        choices: [`concert-this`, `spotify-this-song`, `movie-this`, `do-what-it-says`],
        name: `action`,
    },
]).then((answers) => {
    let action = answers.action;
    let searchTerm;
    let defaultSearch;

    switch(action) {
        case 'concert-this':
            defaultSearch = "Red Hot Chili Peppers";
            break;
        case 'spotify-this-song':
            defaultSearch = "The Sign";
            break;
        case 'movie-this':
            defaultSearch = "The Notebook";
            break;
    }

    if(action === `do-what-it-says`) {
        let result = parseRandom();
        action = result[0];
        searchTerm = result[1];

        switch(action) {
            case `spotify-this-song`: 
                spotifyThisSong(action, searchTerm);
                break;
            case `concert-this`:
                concertThis(action, searchTerm);
                break;
            case `movie-this`:
                movieThis(action, searchTerm);
                break;
        }
    }
    else
        inquirer.prompt([
            {
                type: `input`,
                message: `Enter your search term`,
                name: `searchTerm`,
                default: defaultSearch
            }
        ]).then((answer) => {
            searchTerm = answer.searchTerm;

            switch(action) {
                case `spotify-this-song`: 
                    spotifyThisSong(action, searchTerm);
                    break;
                case `concert-this`:
                    concertThis(action, searchTerm);
                    break;
                case `movie-this`:
                    movieThis(action, searchTerm);
                    break;
            }
        })
});