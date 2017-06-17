$(document).ready(function() { 

	var gifapp = {

		topics: ['baby turtles', 'baby pigs', 'puppies', 'kittens', 'baby goats', 'baby sloths', 'baby pandas', 'baby bunnies', 'bear cubs', 'owlets' ],
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
	        }
	    },

	    makeImg: function(response) {
	    	$('#gifscontainer').empty(); 
	    	for (var i = 0; i < gifapp.searchlimit; i++) {
		    	
		    	var newdiv = $('<div>');
		    	var newimg = $('<img>');
		    	var newh2 = $('<h2>');
		    	
		    	newimg.attr('src', response.data[i].images.original_still.url)
		    	.addClass('gif')
		    	.attr('gif-still', response.data[i].images.downsized_still.url)
		    	.attr('gif-animate', response.data[i].images.downsized.url)
		    	.attr('gif-state', 'still');
		    	
		    	newh2.html('Rating: ' + response.data[i].rating)
		    	.addClass('rating');

		    	newdiv.addClass('gifdiv').append(newimg).append(newh2);



		    	$('#gifscontainer').append(newdiv);
		    } 
	    }   
	}

	// ie. search http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC


	// initiate buttons to render on page load 
	gifapp.btnsRender();


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
      	
        // retrieves btn-value from button on cliick 
        gifapp.userInput = $(this).attr('btn-topic');    
        //console.log(gifapp.userInput);

   		gifapp.queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifapp.userInput + "&api_key=dc6zaTOxFJmzC";  
   		

        $.ajax({
		    url: gifapp.queryURL,
		    method: 'GET'
		    }).done(function(response) {
		    	//console.log(response); 
		    	gifapp.makeImg(response);
		   	   

		   	   // $('#jsonshow').text(JSON.stringify(response)); 
		    }); 
      }); 

    // event to click state of container   
    $('#gifscontainer').on('click', '.gif', function() {
    	
    	var pauseState = $(this).attr('gif-state');
    	

    	if (pauseState === 'still') { 
    		$(this).attr('src', $(this).attr('gif-animate'));
    		$(this).attr('gif-state', 'animate');
    	} else { 
    		
    		$(this).attr('src', $(this).attr('gif-still'));
    		$(this).attr('gif-state', 'still');
    	}
    });

});