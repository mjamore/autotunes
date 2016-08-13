var request = require('request'),
	cheerio = require('cheerio'),
	exec = require('child_process').exec;

require('dotenv').config();

// Helper functions
/*
*  Used to run commands at the command line - http://stackoverflow.com/questions/12941083/get-the-output-of-a-shell-command-in-node-js
*  To-Do: add this to JS fucions project
*/
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};


// request('http://www.billboard.com/charts/r-b-hip-hop-songs', function(err, resp, body) {
// 	if(!err && resp.statusCode == 200) {
// 		var $ = cheerio.load(body);

// 		var song_container = $('.chart-row__container');

// 		// Create array of objects for each song
// 		songs = [];
// 		song_container.each(function() {
// 			var song = {};
// 			song.name = $(this).find('.chart-row__song').text().trim();
// 			song.artist = $(this).find('.chart-row__song').text().trim();
// 			songs.push(song);
// 		});
// 		console.log(songs);

// 		console.log(process.env.SPOTIFY_CLIENT_SECRET);
// 		console.log(process.env.SPOTIFY_CLIENT_ID);
// 	}
// });

function getSpotifyToken() {
	var base64 = new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64');

	var getTokenCmd = 'curl -H "Authorization: Basic ' + base64 + '" -d grant_type=client_credentials https://accounts.spotify.com/api/token';

	var token = execute(getTokenCmd, function(json) {
		var token = JSON.parse(json).access_token;
		console.log('3: ' + token);
		return token;
	});
	console.log('2: ' + token);
	return token;
}

function getTrackSample(token, trackId) {
	var getPreviewUrlCmd = 'curl -H "Authorization: Bearer ' + token + '" https://api.spotify.com/v1/tracks/' + trackId;

	execute(getPreviewUrlCmd, function() {
		var previewUrl = JSON.parse(json).preview_url;
		console.log(previewUrl);
		return previewUrl;
	});
}


function init() {
	var token = getSpotifyToken();
	console.log('1: ' + token);
	// var sample getTrackSample(token, trackId);
}

init();