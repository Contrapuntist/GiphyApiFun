$(document).ready(function() { 

var gifapp = {

	topics: ['puppies', 'kitties', 'baby goats'],
	userInput: null,
	searchlimit: null, 

	btnsRender: function() {

        // Delete the content inside the movies-view div prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)

        $('#gifbtns').empty();  
        
        // Loop through the array of movies, then generate buttons for each movie in the array 

        for (var i = 0; i < this.topics.length; i++ ) { 
          var btn = '<button>' + [this.topics[i]] + '</button>'; 
          $('#gifbtns').append(btn).attr('btn-data', this.topics[i]);
          console.log(this.topics[i]);
        }
    },

    makeImg: function(n) {
    	
    	var newimg = $('<img>');
    	newimg.attr('src', response.data[0].images.downsized.url);
    	console.log(response.data[0].images.downsized.url);
    	$('#gifscontainer').append(newimg);
    }   
}
	// ie. serach http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC   

	gifapp.btnsRender();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=puppies&api_key=dc6zaTOxFJmzC";  // public api key: dc6zaTOxFJmzC 

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
    	console.log(response); 
    	// $('#jsonshow').text(JSON.stringify(response)); 

    	var newimg = $('<img>');
    	newimg.attr('src', response.data[0].images.downsized.url);
    	console.log(response.data[0].images.downsized.url);
    	
    	//$('.gifscontainer').html('<img src="' + response.data[0].images.downsized.url + '">' );
    	
    	$('.gifscontainer').append(newimg);

    }); 


      // This function handles events where the add movie button is clicked
      $("#gifbtn").on("click", function(event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();

        // Write code to grab the text the user types into the input field
        gifapp.userInput = ($('#movie-input').val());
        // Write code to add the new movie into the movies array
        gifapp.topics.push(userInput);
        // The renderButtons function is called, rendering the list of movie buttons
        gifapp.btnsRender();
      });

      // Calling the renderButtons function to display the initial list of movies
      
      $('button').on('click', function() {
      	gifapp.userInput = $(this).attr('btn-data');
      	console.log(gifapp.userInput);
      });

});  