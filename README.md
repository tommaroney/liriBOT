# liriBOT
## A CLI API Fetch Tool

From the command line enter:

![invocation](./read-me-images/invocation.png)

The tool will prompt the user to select their intended action.

![intialized](./read-me-images/initialized.png)

Selecting an action will trigger another prompt asking the user for their search input.  Each search prompt has a default entry included, excepting do-what-it-says.

![concert-this-input-prompt](./read-me-images/concert-this-input-prompt.png)
![spotify-this-song-input-prompt](./read-me-images/spotify-this-song-input-prompt.png)
![movie-this-input-prompt](./read-me-images/movie-this-input-prompt.png)

*concert-this will return information about a band's upcoming show dates and venues.

![concert-this-results](./read-me-images/concert-this-results.png)

*spotify-this-song will return information about the song given by the user: artists, song title, a preview link from Spotify, and the album.

![spotify-this-song-results](./read-me-images/spotify-this-song-results.png)

*movie-this will return information about the movie title entered by the user: movie title, year, IMDB Rating, country of production, language, plot, and actors.

![movie-this-results](./read-me-images/movie-this-results.png)

*do-what-it-says consumes an argument from a text file in the same directory as the application called "random.txt".  The argument must be formatted as liri-action,"search term".

Example: 
```
movie-this,"Blade"
```

![do-what-it-says](./read-me-images/do-what-it-says-results.png)

The command used and the results of the search will be added to a log file `log.txt`

