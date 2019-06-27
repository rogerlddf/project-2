// movie gifs js 
$(function () {

  let form = $("#movie-search");
  // let movieList = $("#movie-list");
  // let movieList = document.getElementById('movie-list');
  let movieListAll = document.getElementById('allmovie-list');


  // ALL MOVIES ON SUBMIT
  // ON SUBMIT BUTTON ALL MOVIES
  $("#submitAll").on('click', async e => {
    let searchText = form.val().trim();
    e.preventDefault();
    $("#allmovie-list").css('height', '400px');
    $("#allmovie-list").css('overflow', 'auto');
    $('#all-movies-row').css('display', 'block');
    $('.jumbotron').hide(400);
    let getUrl = "https://www.omdbapi.com/?s=" + searchText + "&apikey=13a937dc&type=movie"
    await $.ajax({
      url: getUrl,
      method: "GET"
    }).then(response => {
      let movies = response.Search;
      // let chosenMovie = {
      //   title: movie.Title,
      //   image: movie.Poster,
      //   year: movie.Year
      // }

      // console.log(movies);
      let output = '';
      $.each(movies, (index, movie) => {
        
        output += `
            <div class="collection well align-center col col-s6 col-m3">
              <img class='responsive-img hoverable z-depth-1' src="${movie.Poster}">
              <h6 class="truncated">${movie.Title}</h6>
              <p class="truncated">${movie.Year}</p>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn blue darken-3 z-depth-2">IMDB</a>
            <hr>
            <button data-title="${movie.Title}" type="button" class="btn btn-info addToPlayList"> Add To Playlist </button>
            <hr>
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
    console.log($(this).prevAll());
    // alert("clicked")
  })

});

// //ORIGINAL EXAMPLE FILES
// // Get references to page elements
// const $exampleText = $("#example-text");
// const $exampleDescription = $("#example-description");
// const $submitBtn = $("#submit");
// const $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
