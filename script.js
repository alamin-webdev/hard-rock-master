const lyric = document.getElementById("songLyrics");
        
const searchBtn =  document.getElementById("searchBtn");
searchBtn.addEventListener("click", function(){
    const inputValue = document.getElementById("songName").value;
    if(inputValue == ""){
        alert("please enter your song name...!")
    }
    else{
     const songResultContainer = document.getElementById('song-result-container');
     songResultContainer.innerHTML = '';
     lyric.innerHTML = '';
     fetch('https://api.lyrics.ovh/suggest/'+inputValue)
    .then(res => res.json())
    .then(data => { 

        for (let i = 0; i < 10; i++) {
            const searchResult = data.data[i];
            const title = searchResult.title;
            const artist = searchResult.artist.name;
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="search-result col-md-8 mx-auto py-4">
             <div class="single-result row align-items-center my-3 p-3">
             <div class="col-md-9">
                 <h3 class="lyrics-name">${searchResult.title}</h3>
                 <p class="author lead">Album by <span>${searchResult.artist.name}</span></p>
             </div>
             <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick ="getLyrics('${artist}', '${title}')" >Get Lyrics</button>
             </div>
         </div>
     </div>
     
            
            `;
            
            songResultContainer.appendChild(div);
               
        }
    })
   
    

    }

   
})
function getLyrics(artist,title){
         link = fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            const lyrics = data.lyrics;
            if(lyrics != undefined){
            
             
             
            lyric.innerHTML = `  

             <div class=" text-center single-lyrics" role="alert">
                 <h2  class="alert-heading text-success mb-4">${title}</h2>
                 <pre lyric text-white>${lyrics}</pre>
             </div>
                             `;

            }
            else{
                alert("lyrics not found");
            }
            
            

        })
        
    }