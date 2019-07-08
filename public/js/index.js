// movie gifs js
// const db = require("../../models");
$(function() {
  let form = $("#movie-search");
  let movieListAll = document.getElementById("allmovie-list");
  let playlistSelect = $("#playlist");
  let playlistId;
  // Getting the playlists, and their posts
  getPlaylists();

  // ALL MOVIES ON SUBMIT
  // ON SUBMIT BUTTON ALL MOVIES
  $("#submitAll").on("click", e => {
    let searchText = form.val().trim();
    e.preventDefault();
    $("#allmovie-list").css("height", "400px");
    $("#allmovie-list").css("overflow", "auto");
    $("#all-movies-row").css("display", "block");
    $(".jumbotron").hide(400);

    let getUrl =
      "https://www.omdbapi.com/?s=" +
      searchText +
      "&apikey=13a937dc&type=movie";
    $.ajax({
      url: getUrl,
      method: "GET"
    })
      .then(response => {
        var movies = response.Search;

        let output = "";
        $.each(movies, (index, movie) => {
          output += `
            <div class="collection well text-center col col-s6 col-m3">
              <img class='rounded' src="${movie.Poster}"  width="158">
              <h5 class="truncated">${movie.Title}</h5>
              <p class="truncated">${movie.Year}</p>
            <a class="#" href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-info">IMDB</a>
            <button data-title="${movie.Title}" type="button" class="btn btn-info addToPlayList mb-3"> Add To Playlist </button>
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
    let playlistId = $(".custom-select").val();
    // console.log(playlistId)
    let chosenMovie = {
      title: $(this)
        .prev()
        .prev()
        .prev()
        .text(),
      year: $(this)
        .prev()
        .prev()
        .text(),
      PlaylistId: playlistId,
      link: $(this)
        .prev()
        .attr("href"),
        image: $(this)
          .prev()
          .prev()
          .prev()
          .prev()
          .attr("src")
    };
    // console.log(chosenMovie);
    if (playlistId) {
      $.post(
        "/api/movies",
        chosenMovie,
        function(data) {
          console.log(data);
        },
        "json"
      )
      .then(location.reload())
      .then(location.reload());
    } else {
      alert("Please choose a Playlist");
    }
  });

  // A function to get Playlists and then render our list of Playlists
  function getPlaylists() {
    $.get("/api/playlists", renderPlayList);
  }
  // Function to either render a list of playlist, or if there are none, direct the user to the page
  // to create an playlist first
  function renderPlayList(data) {
    // $(".hidden").removeClass("hidden");
    let rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createPlaylistRow(data[i]));
    }
    playlistSelect.empty();
    playlistSelect.append(rowsToAdd);
    playlistSelect.val(playlistId);
  }

  // Creates the playlist options in the dropdown
  function createPlaylistRow(playlist) {
    let listOption = $("<option>");
    listOption.attr("value", playlist.id);
    listOption.text(playlist.name);
    return listOption;
  }

  // //working on toggling active class
  $(".trigger").on("click", function() {
    $(this).toggleClass("active");
    $(this).siblings().toggleClass("active");
  })


 
  //deleting movie from a playlist
  $(document).on("click", ".far", function() {
    let idmovie = $(this).data("id");

    let movie = $(this).parent().siblings()
    movie.remove();
    $(this).remove();
    
    $.ajax({
      type: "DELETE",
      url: "/api/movies/" + idmovie
    })
  })
});
