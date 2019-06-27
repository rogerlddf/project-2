// movie gifs js 
$(function () {

  let form = $("#movie-search");
  // let movieList = $("#movie-list");
  // let movieList = document.getElementById('movie-list');
  let movieListAll = document.getElementById('allmovie-list');
  let playlistSelect = $("#playlist");
  let playlistId;
  // Getting the playlists, and their posts
  getPlaylists();


  // ALL MOVIES ON SUBMIT
  // ON SUBMIT BUTTON ALL MOVIES
  $("#submitAll").on('click', e => {
    var searchText = form.val().trim();
    e.preventDefault();
    $("#allmovie-list").css('height', '400px');
    $("#allmovie-list").css('overflow', 'auto');
    $('#all-movies-row').css('display', 'block');
    $('.jumbotron').hide(400);

     var url = window.location.search;
      var movieId;
      var playlistId;

    var updating = false;

    // If we have this section in our url, we pull out the post id from the url
    // In '?post_id=1', postId is 1
    if (url.indexOf("?movie_id=") !== -1) {
      movieId = url.split("=")[1];
      getMovieData(movieId, "movie");
    }
    // Otherwise if we have an author_id in our url, preset the author select box to be our Playlist
    else if (url.indexOf("?playlist_id=") !== -1) {
      playlistId = url.split("=")[1];
    }

    if (updating) {
      newMovie.id = movieId;
      updateMovie(newMovie);
    }

    // Gets post data for the current post if we're editing, or if we're adding to an palylist's existing movies
    function getMovieData(id, type) {
      var queryUrl;
      switch (type) {
        case "movie":
          queryUrl = "/api/movies/" + id;
          break;
        case "playlist":
          queryUrl = "/api/playlists/" + id;
          break;
        default:
          return;
      }
      $.get(queryUrl, function (data) {
        if (data) {
          console.log(data.PlaylistId || data.id);
          // If this movie exists, prefill our cms forms with its data
          titleInput.val(data.title);
          bodyInput.val(data.year);
          authorId = data.PlaylistId || data.id;
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }


    var getUrl = "https://www.omdbapi.com/?s=" + searchText + "&apikey=13a937dc&type=movie"
    $.ajax({
      url: getUrl,
      method: "GET"
    }).then(response => {
      var movies = response.Search;
      
      var output = '';
      $.each(movies, (index, movie) => {
        
        output += `
            <div class="collection well align-center col col-s6 col-m3">
              <img class='responsive-img hoverable z-depth-1' src="${movie.Poster}">
              <h6 class="truncated">${movie.Title}</h6>
              <p class="truncated">${movie.Year}</p>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-info">IMDB</a>
            
            <button data-title="${movie.Title}" type="button" class="btn btn-info addToPlayList"> Add To Playlist </button>
            
            </div>
        `;
    

      });

      $(movieListAll).html(output);
    })
      .catch(err => {
        console.log(err);
      });
  });

  $(document).on("click", ".addToPlayList", function(event) {
    event.preventDefault();
    let chosenMovie = {
      title: $(this).prev().prev().prev().text(),
      year: $(this).prev().prev().text()
      // ,
      // link: $(this).prev().attr("href")
    }
    console.log(chosenMovie);
   
    $.post('/api/movies', chosenMovie, function (data) {
      console.log(data); // John
    }, "json");
  });

  // A function to get Playlists and then render our list of Authors
  function getPlaylists() {
    $.get("/api/playlists", renderPlayList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderPlayList(data) {
    
    // $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createPlaylistRow(data[i]));
    }
    playlistSelect.empty();
    console.log(rowsToAdd);
    console.log(playlistSelect);
    playlistSelect.append(rowsToAdd);
    playlistSelect.val(playlistId);
  }

  // Creates the playlist options in the dropdown
  function createPlaylistRow(playlist) {
    var listOption = $("<option>");
    listOption.attr("value", playlist.id);
    listOption.text(playlist.name);
    return listOption;
  }


 

});
