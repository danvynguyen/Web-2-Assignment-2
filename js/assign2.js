document.addEventListener("DOMContentLoaded", function() {

/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';
	
	let getFile = [];

	//if(localStorage.length != 0){
    //getFile = localStorage.getItem('store');

	//} else {


	file = fetch(api)
		.then((response => res/ponse.json()))
		.then((data) => {
      		const json = JSON.stringify(data);
      		localStorage.setItem('key', json);
      		getFile = json;
		});

	//}
/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
	
	artists = JSON.parse(content); 
	genres = JSON.parse(genreContent); 
	songs = JSON.parse(localStorage.getItem('key')); 
	playlist = JSON.parse(sessionStorage.getItem('key'));
	
const credits = document.querySelector("#credits");

credits.onmouseover = function() {mouseOver()};
credits.onmouseout = function() {setTimeout(mouseOut, 5000)};

function mouseOver() {
  credits.innerHTML='<p>Author: Danvy Nguyen</p><a href="https://github.com/danvynguyen/danvynguyen.github.io">Github Link</a>';
}

function mouseOut() {
  credits.innerHTML="Credits";
}

	const aSelect = document.querySelector("#artistInput");
	for (let a of artists){
		const aOption = document.createElement("option");
		aOption.setAttribute("value", a.name);	
		aOption.innerHTML = a.name;
		aSelect.appendChild(aOption);
	}
	
	const gSelect = document.querySelector("#genreInput");
	for (let g of genres){
		const gOption = document.createElement("option");
		gOption.setAttribute("value", g.name);	
		gOption.innerHTML = g.name;
		gSelect.appendChild(gOption);
	}

	const filter = document.querySelector("#filterButton");
	filter.addEventListener("click", outputResults);
	
	const clear = document.querySelector("#clearButton");
	clear.addEventListener("click", clearResults);

	function outputResults(){
	
	let results = [];	
	if (document.querySelector('#titleButton').checked==true){
		results = songs.filter(s=>s.title.includes(document.getElementById('titleInput').value));
		console.log(document.getElementById('titleInput').value);
	}
	else if (document.querySelector("#artistButton").checked==true){
		results = songs.filter(s=>s.artist.name==document.getElementById('artistInput').value);
		console.log(document.getElementById('artistInput').value);
	}
	else if (document.querySelector('#genreButton').checked==true){
		results = songs.filter(s=>s.genre.name==document.getElementById("genreInput").value);
		console.log(document.getElementById('genreInput').value);
	}
	
	const table = document.querySelector('#songResults');
	
	//table header
	//let tableHead = new Array();
	//tableHead = ['Title','Artist','Year','Genre','Popularity'];
	
	//let tr = document.createElement('tr');
	document.querySelector("#titleHeader").innerHTML="Title";
	//document.querySelector("#titleHeader").onclick = sortTable(0);
		
	document.querySelector("#artistHeader").innerHTML="Artist";
	//document.querySelector("#artistHeader").onclick = sortTable(1);
		
	document.querySelector("#yearHeader").innerHTML="Year";
	//document.querySelector("#yearHeader").onclick = sortTable(2);
		
	document.querySelector("#genreHeader").innerHTML="Genre";
	//document.querySelector("#genreHeader").onclick = sortTable(3);
		
	document.querySelector("#popularityHeader").innerHTML="Popularity";
	//document.querySelector("#popularityHeader").onclick = sortTable(4);
	
	/*for (let th of ths) {
		for (let head of tableHead) {
			//let th = document.createElement('th');
            th.innerHTML = head;
            tr.appendChild(th);
		}	
    }*/
	//table.appendChild(tr);
	
	//table values
	for (let r of results) {
	let tr2 = document.createElement('tr');
		const title = document.createElement("td");
		title.innerHTML = r.title;
		title.addEventListener("click", viewSingleSong(r.title,r.artist.name,r.genre.name,r.year,r.details.duration));
		
		tr2.appendChild(title);
		
		const artist = document.createElement("td");
		artist.innerHTML = r.artist.name;
		tr2.appendChild(artist);
		
		const year = document.createElement("td");
		year.innerHTML = r.year;
		tr2.appendChild(year);
		
		const genre = document.createElement("td");
		genre.innerHTML = r.genre.name;
		tr2.appendChild(genre);
		
		const popularity = document.createElement("td");
		popularity.innerHTML = r.details.popularity;
		tr2.appendChild(popularity);
		
		const addButton = document.createElement("button");
		addButton.innerHTML = "Add";
		//addButton.onclick = function() {playlist.push(r)};
		addButton.addEventListener('click', () => {
  			const json = JSON.stringify(r);
      		sessionStorage.setItem('key', json);
		})
		
		console.log("song added!");
		tr2.appendChild(addButton);
		
		table.appendChild(tr2);
	}
	
}

function clearResults(){  
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
	
	function viewSingleSong(title, artist, type, genre, year, duration) {
		//document.write("<h2>"+ title +", " +artist+", "+type+", "+genre+", "+year+", "+duration+"</h2>");
		//alert("suck a dick! dumb shit!");
	}
	
	document.querySelector('#playlistButton').onclick = function(){document.querySelector("main").innerHTML=outputPlaylist()};
	
	function outputPlaylist() {
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
	for (let p of playlist) {
		document.write(`<tr>`);
        document.write(`<td>${p.title}</td>`);
		document.write(`<td>${p.artist.name}</td>`);
		document.write(`<td>${p.year}</td>`);
		document.write(`<td>${p.genre.name}</td>`);
		document.write(`<td>${p.details.popularity}</td>`);
		document.write(`</tr>`);
	}
	document.write(`</table>`);
		
		
		/*const table = document.createElement('table');
	
		let tableHead = new Array();
		tableHead = ['Title','Artist','Year','Genre','Popularity'];
	
		let tr = document.createElement('tr');
		
		for (let head of tableHead) {
			let th = document.createElement('th');
            	th.innerHTML = head;
            	tr.appendChild(th);
		}	

	//table.appendChild(tr);
			
		for (let p of playlist) {
		let tr2 = document.createElement('tr');
			const title = document.createElement("td");
			title.innerHTML = p.title;
			title.addEventListener("click", viewSingleSong(p.title,p.artist.name,p.genre.name,p.year,p.details.duration));
		
			tr2.appendChild(title);
		
			const artist = document.createElement("td");
			artist.innerHTML = p.artist.name;
			tr2.appendChild(artist);
		
			const year = document.createElement("td");
			year.innerHTML = p.year;
			tr2.appendChild(year);
		
			const genre = document.createElement("td");
			genre.innerHTML = p.genre.name;
			tr2.appendChild(genre);
		
			const popularity = document.createElement("td");
			popularity.innerHTML = p.details.popularity;
			tr2.appendChild(popularity);
		
			table.appendChild(tr2);*/
		}				 

});