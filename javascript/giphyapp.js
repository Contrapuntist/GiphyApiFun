$(document).ready(function() { 

var gifapp = {

	topics: ['puppies', 'kitties', 'baby goats'],
	userInput: null,
	searchlimit: 10, 

	btnsRender: function() {

        // Delete the content inside the movies-view div prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)

        $('#gifbtns').empty();  
        
        // Loop through the array of movies, then generate buttons for each movie in the array 

        for (var i = 0; i < this.topics.length; i++ ) { 
          var giftopic = this.topics[i];

          var btn = $('<button>' + giftopic + '</button>' );
          btn.addClass('gifbtn').attr('btn-value', giftopic); 
          $('#gifbtns').append(btn);
          console.log(giftopic);
        }
    },

    makeImg: function(response) {
    	for (var i = 0; i < gifapp.searchlimit; i++) {
	    	var newimg = $('<img>');
	    	newimg.attr('src', response.data[i].images.downsized.url);
	    	// console.log(response.data[i].images.downsized.url);
	    	$('#gifscontainer').append(newimg);
	    } 
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
    	gifapp.makeImg(response);

    	// $('#jsonshow').text(JSON.stringify(response)); 


    }); 


    $('#searchbtn').on('click', function() { 
    	event.preventDefault();
    	gifapp.userInput = $('#searchinput').val().trim();
    	console.log(gifapp.userInput);
        // condition to prevent undefined value from creating button
		if (gifapp.userInput != undefined) {
	       	gifapp.topics.push(gifapp.userInput);
	       	console.log(gifapp.topics);	
	    }

    	// call function to rerender buttons with new value
	    gifapp.btnsRender();
    
    });

    // This function handles events where the add movie button is clicked
    $('button').on("click", function(event) {
      	
      	// prevents event default action
        event.preventDefault();

        // retrieves btn-value from button on cliick 
        gifapp.userInput = $(this).val().trim();    

      });

});  