document.addEventListener("DOMContentLoaded", function() {

/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';
	
	let getFile = [];

	if(localStorage.length != 0){
    getFile = localStorage.getItem('key');

	} else {


	file = fetch(api)
		.then((response => response.json()))
		.then((data) => {
      		const json = JSON.stringify(data);
      		localStorage.setItem('key', json);
      		getFile = json;
		});

	}
/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
	
	artists = JSON.parse(content); 
	genres = JSON.parse(genreContent); 
	songs = JSON.parse(getFile); 
	playlist = JSON.parse(sessionStorage.getItem('key'));
	//playlist = [];
	
	const credits = document.querySelector("#credits");

	credits.onmouseover = function() {mouseOver()};
	credits.onmouseout = function() {setTimeout(mouseOut, 5000)};

	function mouseOver() {
  		credits.innerHTML='<p>Author: Danvy Nguyen</p><a href="https://github.com/danvynguyen/danvynguyen.github.io">Github Link</a>';
	}

	function mouseOut() {
  		credits.innerHTML="Credits";
	}

	document.querySelector('#playlistButton').onclick = function(){outputPlaylist()};
	document.querySelector('#closeViewButton').onclick = function(){outputSearch()};
	
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

	//document.querySelector('#playlistButton').onclick = function(){document.querySelector("main").innerHTML=outputPlaylist()};
	
	const filter = document.querySelector("#filterButton");
	filter.onclick = function(){outputResults()};
	
	const clear = document.querySelector("#clearButton");
	clear.addEventListener("click", clearResults);

	function outputSearch(){
		if (document.querySelector("#song-search").getAttribute('class')=='hidden'){
			document.querySelector("#song-search").classList.remove('hidden');
		}
		if (document.querySelector("#song-results").getAttribute('class')!='hidden'){
			document.querySelector("#song-results").classList.toggle('hidden');
		}
		if (document.querySelector("#playlist").getAttribute('class')!='hidden') {
			document.querySelector("#playlist").classList.toggle('hidden');
		}if (document.querySelector("#song-data").getAttribute('class')!='hidden'){
			document.querySelector("#song-data").classList.toggle('hidden');
		}
		
	}
	
	function outputResults(){
	
		if (document.querySelector("#song-results").getAttribute('class')=='hidden'){
			document.querySelector("#song-results").classList.remove('hidden');
		}
		
		let results = [];	
		if (document.querySelector('#titleButton').checked==true){
			results = songs.filter(s=>s.title.toLowerCase().includes(document.getElementById('titleInput').value.toLowerCase()));
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
	
		//document.querySelector("#titleHeader").innerHTML="Title";
		document.querySelector("#titleHeader").addEventListener('click',function(){sortTable(0)});
		
		//document.querySelector("#artistHeader").innerHTML="Artist";
		document.querySelector("#artistHeader").addEventListener('click',function(){sortTable(1)});
		
		//document.querySelector("#yearHeader").innerHTML="Year";
		document.querySelector("#yearHeader").addEventListener('click',function(){sortTable(2)});
		
		//document.querySelector("#genreHeader").innerHTML="Genre";
		document.querySelector("#genreHeader").addEventListener('click',function(){sortTable(3)});
		
		//document.querySelector("#popularityHeader").innerHTML="Popularity";
		document.querySelector("#popularityHeader").addEventListener('click',function(){sortTable(4)});
	
		const table = document.querySelector('#songResults');

		for (let r of results) {
			let tr2 = document.createElement('tr');
			const title = document.createElement("td");
			title.textContent = r.title;
			title.addEventListener("click", function() {viewSingleSong(r)});
			tr2.appendChild(title);
		
			const artist = document.createElement("td");
			artist.textContent = r.artist.name;
			tr2.appendChild(artist);
		
			const year = document.createElement("td");
			year.textContent = r.year;
			tr2.appendChild(year);
		
			const genre = document.createElement("td");
			genre.textContent = r.genre.name;
			tr2.appendChild(genre);
		
			const popularity = document.createElement("td");
			popularity.textContent = r.details.popularity;
			tr2.appendChild(popularity);
		
			const addButton = document.createElement("button");
			addButton.textContent = "Add";
			//addButton.onclick = function() {playlist.push(r)};
			addButton.addEventListener('click', () => {
  				const json = JSON.stringify(r);
      			sessionStorage.setItem('key', json);
				showSnackBar(`${r.title} was added to playlist`);
				//playlist.push(r);
			})
		
			//console.log("song added!");
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
  table = document.querySelector("#songResults");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
	
	function viewSingleSong(song) {
		//document.querySelector(".song-search").innerHTML="<h2>"+ title +", " +artist+", "+type+", "+genre+", "+year+", "+duration+"</h2>";
		if (document.querySelector("#song-search").getAttribute('class')!='hidden'){
			document.querySelector("#song-search").classList.toggle('hidden');
		}
		if (document.querySelector("#song-results").getAttribute('class')!='hidden'){
			document.querySelector("#song-results").classList.toggle('hidden');
		}
		if (document.querySelector("#playlist").getAttribute('class')!='hidden') {
			document.querySelector("#playlist").classList.toggle('hidden');
		}
		if (document.querySelector("#song-data").getAttribute('class')=='hidden'){
			document.querySelector("#song-data").classList.remove('hidden');
		}
		
		//find artist type
		let type = "";
		for (let artist of artists){
			if (song.artist.name==artist.name) {
				type = artist.type;
			}
		}
		
		const minutes = Math.floor(song.details.duration / 60);
		const seconds = song.details.duration % 60;
		let duration = "";
		
		if (seconds < 10) {
			duration=minutes+":0"+seconds;
		}
		else {
			duration=minutes+":"+seconds;
		}
		
		document.querySelector("#song-header").textContent=song.title +", " +song.artist.name+" ("+type+"), "+song.genre.name+", "+song.year+", "+duration+" minutes";
		
		document.querySelector("#bpm").textContent="BPM:  "+song.details.bpm;
		document.querySelector("#energy").textContent="Energy:  "+song.analytics.energy;
		document.querySelector("#danceability").textContent="Danceability:  "+song.analytics.danceability;
		document.querySelector("#liveness").textContent="Liveness:  "+song.analytics.liveness;
		document.querySelector("#valence").textContent="Valence:  "+song.analytics.valence;
		document.querySelector("#acoustics").textContent="Acoustics:  "+song.analytics.acousticness;
		document.querySelector("#speechiness").textContent="Speechiness:  "+song.analytics.speechiness;
		document.querySelector("#popularity").textContent="Popularity:  "+song.details.popularity;
		
		var infoCanvas = document.getElementById("infoChart");

		var songData = {
  			labels: ["Danceability", "Energy", "Speechiness", "Acousticness", "Liveness", "Valence"],
  			datasets: [{
    			label: song.title,
				color: "black",
    			backgroundColor: "rgba(200,0,0,0.2)",
    			data: [song.analytics.danceability, song.analytics.energy, song.analytics.speechiness, song.analytics.acousticness, song.analytics.liveness, song.analytics.valence]
  			}]
		};

		var radarChart = new Chart(infoCanvas, {
  			type: 'radar',
  			data: songData
		});
		
	}
	
	function outputPlaylist() {
		
		//document.querySelector("#song-data").style.display="none";
		document.querySelector("#playlist").classList.remove('hidden');
		
		if (document.querySelector("#song-search").getAttribute('class')!='hidden'){
			document.querySelector("#song-search").classList.toggle('hidden');
		}
		if (document.querySelector("#song-results").getAttribute('class')!='hidden'){
			document.querySelector("#song-results").classList.toggle('hidden');
		}
		if (document.querySelector("#playlist").getAttribute('class')=='hidden') {
			document.querySelector("#playlist").classList.remove('hidden');
		}
		if (document.querySelector("#song-data").getAttribute('class')!='hidden'){
			document.querySelector("#song-data").classList.toggle('hidden');
		}
		
		const table = document.querySelector('#playlistDetails');

		for (let r of playlist) {
			let tr2 = document.createElement('tr');
			const title = document.createElement("td");
			title.textContent = r.title;
			title.addEventListener("click", function() {viewSingleSong(r)});
			tr2.appendChild(title);
		
			const artist = document.createElement("td");
			artist.textContent = r.artist.name;
			tr2.appendChild(artist);
		
			const year = document.createElement("td");
			year.textContent = r.year;
			tr2.appendChild(year);
		
			const genre = document.createElement("td");
			genre.textContent = r.genre.name;
			tr2.appendChild(genre);
		
			const popularity = document.createElement("td");
			popularity.textContent = r.details.popularity;
			tr2.appendChild(popularity);
		
			const removeButton = document.createElement("button");
			removeButton.textContent = "Remove";
			//addButton.onclick = function() {playlist.push(r)};
			removeButton.addEventListener('click', () => {
      		//this = sessionStorage.getItem('key');
				
				playlist.removeItem(this);
			})
		
			//console.log("song added!");
			tr2.appendChild(removeButton);
			//tr2.addEventListener("click", function() {viewSingleSong(r)});
			table.appendChild(tr2);
		}		 
	}
	
	function showSnackBar(message) {
      const snack = document.querySelector("#snackbar");
      snack.textContent = message;
      snack.classList.add("show");
      setTimeout( () => {
         snack.classList.remove("show");
      }, 3000);
   }
	
});