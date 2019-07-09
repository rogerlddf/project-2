$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var postId;
    var updating = false;
  
    // Getting jQuery references to the post body, title, form, and category select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var cmsForm = $("#cms");
    var starRating = $("#rating option:selected");
    // Giving the postCategorySelect a default value
    // Adding an event listener for when the form is submitted
    let movieId = $(".movieid").data("id");

    $(cmsForm).on("submit", function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      if (!titleInput.val().trim() || !bodyInput.val().trim()) {
        return;
      }

   
      console.log(movieId);
      // Constructing a newPost object to hand to the database
      var newReview = {
        title: titleInput.val().trim(),
        body: bodyInput.val().trim(),
        rating: starRating.val(),
        MovieID: movieId
        
      };
  
      console.log(newReview);

        submitPost(newReview);

       
  
    });
  
    // Submits a new post and brings user to blog page upon completion
    function submitPost(Review) {
      $.post("/api/reviews/", Review, function() {
        window.location.href = "/";
      });
    }
  
  });
  