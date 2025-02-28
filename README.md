# SpotifyPlaylistProject

## Purpose

This is a small project I made to help out someone I know. 

For a band trying to decide on a set list (a list of songs, in order, that will be performed) it can be helpful to create a playlist, this way the performance can be listened to ahead of time and possibly clumsy transitions between songs can be corrected.

However, after making a good quality set list the list of songs to be performed would need to be transfered to a csv or word format so that it can be sent to event organizers, printed onto a poster, etc. That's where this little website comes in.

## CSV File Structure

The resulting file downloaded will have a specific structure. Here is what you will find in each column:
1. The titles of the tracks
2. The names of the artists credited with that track (separated by commas)
3. The length of the track, in format `minutes : seconds`

## How to use

### Log into your Spotify account

While I originally wanted to avoid this, Spotify's API does not allow for a website to acquire playlist information without a specific user's access token even if the playlist is public.

### Find the share link for the desired playlist

This should be found in the options for the playlist (3 dots). If the link is correct, it should look similar to this:

https://open.spotify.com/playlist/6Fgivh03skKL3oAbGWg9Yt?si=4qMr5wcfRr6fxg7oQqnHkQ

### Press "Get CSV"

Once you do this, a download link should appear with the name of your playlist. Click this, and the csv file should automatically download onto your device.
