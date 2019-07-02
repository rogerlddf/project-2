$(function() {
  // Getting references to the name input and playlist container, as well as the table body
  const nameInput = $("#playlist-name");
  const playList = $("tbody");
  const playlistContainer = $(".playlist-container");
  // let movieTr;
  // let newTr;

  // Adding event listeners to the form to create a new object, and the button to delete
  // an Playlist
  $(document).on("submit", "#playlist-form", handlePlaylistFormSubmit);
  $(document).on("click", ".delete-playlist", handleDeleteButtonPress);


  // Getting the initial list of Playlist
  getPlaylists();

  // A function to handle what happens when the form is submitted to create a new Playlist
  function handlePlaylistFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (
      !nameInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    // Calling the upsertPlaylist function and passing in the value of the name input
    upsertPlaylist({
      name: nameInput.val().trim()
    });
  }

  // A function for creating an plyalist. Calls getPlaylists upon completion
  function upsertPlaylist(playlistData) {
    $.post("/api/playlists", playlistData)
      .then(getPlaylists)
      .then(location.reload());
  }

  // Function for creating a new list row for playlists
  function createPlaylistRow(playlistData) {
    newTr = $("<tr class='triger'>");

    //creating a movie row
    movieTr = $("<tr class='content'>");

    newTr.data("playlist", playlistData);
    newTr.append("<td >" + playlistData.name + "</td>");
    if (playlistData.Movies) {
      newTr.append("<td> " + playlistData.Movies.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append(
      "<td><a href='./views/playlistMovies?playlist_id=" +
        playlistData.id +
        "'>Go to Movies</a></td>"
    );
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-playlist'>Delete Playlist</a></td>"
    );
    return newTr;
  }

  // Function for retrieving playlists and getting them ready to be rendered to the page
  function getPlaylists() {
    $.get("/api/playlists", data => {
      let rowsToAdd = [];
      for (let i = 0; i < data.length; i++) {
        rowsToAdd.push(createPlaylistRow(data[i]));
      }
      renderPlayList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of playlists to the page
  function renderPlayList(rows) {
    playList
      .children()
      .not(":last")
      .remove();
    playlistContainer.children(".alert").remove();
    if (rows.length) {
      // console.log(rows);
      playList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no playlists
  function renderEmpty() {
    let alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Playlist before you can search a Movie.");
    playlistContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    let listItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("playlist");
    let id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/playlists/" + id
    }).then(getPlaylists).then(location.reload());
  }
});
