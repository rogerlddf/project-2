// movie gifs js 
$(function () {

  let form = $("#movie-search");
  // let movieList = $("#movie-list");
  // let movieList = document.getElementById('movie-list');
  let movieListAll = document.getElementById('allmovie-list');


  // ALL MOVIES ON SUBMIT
  // ON SUBMIT BUTTON ALL MOVIES
  $("#submitAll").on('click', e => {
    var searchText = form.val().trim();
    e.preventDefault();
    $("#allmovie-list").css('height', '400px');
    $("#allmovie-list").css('overflow', 'auto');
    $('#all-movies-row').css('display', 'block');
    $('.jumbotron').hide(400);
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
  })
 

});
