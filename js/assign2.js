
/* url of song api --- https versions hopefully a little later this semester */	
//const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

 

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/

artists = JSON.parse(content); 
genres = JSON.parse(genreContent); 
songs = JSON.parse(songContent);

function outputArtists(){
	document.write(`<input type="radio" name="form" value="artist_name" id="artistButton">`);
	document.write(`<label for="artist">Artist:</label>`);
	document.write(`<select name="artist">`);
	for (let a of artists){
		document.write(`<option value="${a.name}" id="artistInput">${a.name}</option>`);
	}
	document.write(`</select><br>`);
}

function outputGenres(){
	document.write(`<input type="radio" name="form" value="genre_name" id="genreButton">`);
	document.write(`<label for="genre">Genre:</label>`);
	document.write(`<select name="genre">`);
	for (let g of genres){
		document.write(`<option value="${g.name}" id="genreInput">${g.name}</option>`);
	}
	document.write(`</select><br>`);
	document.write(`<button onclick="outputResults()">Filter</button>`);
	document.write(`<button onclick="clear()">Clear</button>`);
}

function outputResults(){
	
//document.body.appendChild(form);	
let results = [];	

if (document.getElementById("titleButton").checked==true){
		results = songs.filter(s=>s.title==document.getElementById("titleInput").value);
	}
	else if (document.getElementById("artistButton").checked==true){
		results = songs.filter(s=>s.artist.name==document.getElementById("artistInput").value);
	}
	else if (document.getElementById("genreButton").checked==true){
		results = songs.filter(s=>s.genre.name==document.getElementById("genreInput").value);
	}
	
	const sortedResults = results.sort();
	
	document.write(`<section class="song-results">
        <h1>Search Results</h1>
        <table>
            <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Year</th>
                <th>Genre</th>
                <th>Popularity</th>
                <th></th>
                <th></th>
            </tr>`);
	for (let r of sortedResults) {
		document.write(`<tr>`);
        document.write(`<td>${r.title}</td>`);
		document.write(`<td>${r.artist.name}</td>`);
		document.write(`<td>${r.year}</td>`);
		document.write(`<td>${r.genre.name}</td>`);
		document.write(`<td>${r.details.popularity}</td>`);
		document.write(`</tr>`);
	}
		
}

function myFunction() {
	document.getElementById("demo").innerHTML = outputResults();
}

 function clear(){  
   	document.getElementById("form").reset();  
 }   

outputArtists();
outputGenres();