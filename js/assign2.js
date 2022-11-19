
/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

 

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/

artists = JSON.parse(content); 
genres = JSON.parse(genreContent); 
songs = JSON.parse(songContent);

function outputArtists(){
	document.write(`<input type="radio" name="form" value="title" id="titleButton">
            <label for="title">Title:</label>
            <input type="text" name="title" class="title" id="titleInput"/><br>`);
	document.write(`<input type="radio" name="form" value="artist_name" id="artistButton">`);
	document.write(`<label for="artist">Artist:</label>`);
	document.write(`<select name="artist" id="artistInput">`);
	document.write(`<option></option>`);
	for (let a of artists){
		document.write(`<option value="${a.name}">${a.name}</option>`);
	}
	document.write(`</select><br>`);
}

function outputGenres(){
	document.write(`<input type="radio" name="form" value="genre_name" id="genreButton">`);
	document.write(`<label for="genre">Genre:</label>`);
	document.write(`<select name="genre" id="genreInput">`);
	document.write(`<option></option>`);
	for (let g of genres){
		document.write(`<option value="${g.name}">${g.name}</option>`);
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
		console.log(document.getElementById("titleInput").value);
	}
	else if (document.getElementById("artistButton").checked==true){
		results = songs.filter(s=>s.artist.name==document.getElementById("artistInput").value);
		console.log(document.getElementById("artistInput").value);
	}
	else if (document.getElementById("genreButton").checked==true){
		results = songs.filter(s=>s.genre.name==document.getElementById("genreInput").value);
		console.log(document.getElementById("genreInput").value);
	}
	
	document.write(`<section class="song-results">
        <h1>Search Results</h1>
        <table id="myTable2">
            <tr>
                <th onclick="sortTable(0)">Title</th>
                <th onclick="sortTable(1)">Artist</th>
                <th onclick="sortTable(2)">Year</th>
                <th onclick="sortTable(3)">Genre</th>
                <th onclick="sortTable(4)">Popularity</th>
                <th></th>
            </tr>`);
	for (let r of results) {
		document.write(`<tr>`);
        document.write(`<td>${r.title}</td>`);
		document.write(`<td>${r.artist.name}</td>`);
		document.write(`<td>${r.year}</td>`);
		document.write(`<td>${r.genre.name}</td>`);
		document.write(`<td>${r.details.popularity}</td>`);
		document.write(`<td><button>Add</button></td>`);
		document.write(`</tr>`);
	}
	document.write(`</table>`);
}

function myFunction() {
	document.getElementById("demo").innerHTML = outputResults();
}

function clear(){  
   	document.getElementById("form").reset();  
}   


// code imported from: https://www.w3schools.com/howto/howto_js_sort_table.asp 
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable2");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

outputArtists();
outputGenres();