$(document).ready(function() { 

var gifapp = {

	topics: ['puppies', 'kitties', 'baby goats'],
	userInput: null,
	searchlimit: 10, 
	queryURL: 'null',

	btnsRender: function() {

        // Delete the content inside the movies-view div prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)

        $('#gifbtns').empty();  
        
        // Loop through the array of movies, then generate buttons for each movie in the array 

        for (var i = 0; i < this.topics.length; i++ ) { 
          var giftopic = this.topics[i];

          var btn = $('<button>' + giftopic + '</button>' );
          btn.addClass('gifbtn').attr('btn-topic', giftopic); 
          $('#gifbtns').append(btn);
          console.log(giftopic);
        }
    },

    makeImg: function(response) {
    	$('#gifscontainer').empty(); 
    	for (var i = 0; i < gifapp.searchlimit; i++) {
	    	var newimg = $('<img>');
	    	newimg.attr('src', response.data[i].images.original_still.url)
	    	.addClass('gif')
	    	.attr('gif-still', response.data[i].images.downsized_still.url)
	    	.attr('gif-animate', response.data[i].images.downsized.url)
	    	.attr('gif-state', 'still');
	    	// console.log(response.data[i].images.downsized.url);
	    	$('#gifscontainer').append(newimg);
	    } 
    }   
}
	// ie. serach http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC   

	gifapp.btnsRender();
    var queryURLtest = "http://api.giphy.com/v1/gifs/search?q=puppies&api_key=dc6zaTOxFJmzC";  // public api key: dc6zaTOxFJmzC 

    // used for getting object info in console only
    $.ajax({
      url: queryURLtest,
      method: 'GET'
    }).done(function(response) {
    	console.log(response); 

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
    $('#gifbtns').on("click", '.gifbtn' , function() {
      	console.log(this);
      	// prevents event default action
        //event.preventDefault();

        // retrieves btn-value from button on cliick 
        gifapp.userInput = $(this).attr('btn-topic');    
        //console.log(gifapp.userInput);

   		gifapp.queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifapp.userInput + "&api_key=dc6zaTOxFJmzC";  
   		console.log(gifapp.queryURL);

        $.ajax({
		    url: gifapp.queryURL,
		    method: 'GET'
		    }).done(function(response) {
		    	console.log(response); 
		    	gifapp.makeImg(response);
		   	// $('#jsonshow').text(JSON.stringify(response)); 
		    }); 
      }); 


    $('#gifscontainer').on('click', '.gif', function() {
    	console.log(this);
    	var pauseState = $(this).attr('gif-state');
    	console.log(pauseState); 

    	if (pauseState === 'still') { 
    		$(this).attr('src', $(this).attr('gif-animate'));
    		$(this).attr('gif-state', 'animate');
    	} else { 
    		console.log(pauseState);
    		$(this).attr('src', $(this).attr('gif-still'));
    		$(this).attr('gif-state', 'still');
    	}
    });

});  