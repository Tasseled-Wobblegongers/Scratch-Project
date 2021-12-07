# Bored, Games? 

Bored, games? is a social app for crating and coordinating board game events with peers. Users can create board game events by entering the name of the game they would like to play and their event's details, and their post will be auto-populated with the game's image and some key info. Other users can then comment on the event. 

## Board Game Atlas API
This app finds game data through use of the Board Game Atlas API, a free API provided by one of the most complete sources for information about board games on the internet. Documentation can be found here (it's good)
https://www.boardgameatlas.com/api/docs


## Cached Results
All relevant info returned from calls to the BGA API is stored in a Postgres database, and when creating future events the app returns info from stored data for repeated games rather than repeating the same API call.

## Relaxed Searching
All searches for game names, whether through BGA or the database, are fuzzy-matched, so that users can mistype their queries and still get the results they are looking for. The results from Board Game Atlas are sorted by game popularity, so if a user searches for a game with the same title as another, the app will return the more popular of the two.

### Next Steps
This app has CRD functionality, but users cannot yet update their events or comments. In addition, the BGA API returns a wealth of data about each game searched, and only a tiny sliver of that info is currently used by the app. Opportunties for utilizing more of the returned data and expanding the user experience of the app are vast.