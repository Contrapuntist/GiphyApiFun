$(document).ready(function() { 

var gifapp = {

	topics: ['puppies', 'kitties', 'baby+goats'],

	btnsRender: function() {

        // Delete the content inside the movies-view div prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)

        $('#gifbtns').empty();  
        
        // Loop through the array of movies, then generate buttons for each movie in the array 

        for (var i = 0; i < this.topics.length; i++ ) { 
          var gifbtn = '<button>' + [i] + '</button>'; 
          $('#gifbtn').append(gifbtn);
          console.log(this.topics[i]);
        }

      }





}
	// ie. serach http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC   

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=puppies&api_key=dc6zaTOxFJmzC";  // public api key: dc6zaTOxFJmzC 
    var 

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
    	console.log(response); 
    	$('#jsonshow').text(JSON.stringify(response)); 

    	$('#gifscontainer').append()
    }); 


      // This function handles events where the add movie button is clicked
      $("#gifbtn").on("click", function(event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();

        // Write code to grab the text the user types into the input field
        var userInput = ($('#movie-input').val());
        // Write code to add the new movie into the movies array
        movies.push(userInput);
        // The renderButtons function is called, rendering the list of movie buttons
        renderButtons();
      });

      // Calling the renderButtons function to display the initial list of movies
      renderButtons();
    </script>



});  