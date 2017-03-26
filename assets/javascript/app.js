// Giphy Query Example - http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC 


var topics = ["Superman", "Batman", "Aquaman", "Iron Man", "Wolverine", "Hulk", "Robin", "Green Arrow", "Captain America", "Spider-Man"];

var queryBaseURL = "http://api.giphy.com/v1/gifs/search";

var queryParams = "&limit=10";

var api_key = "&api_key=dc6zaTOxFJmzC";

var buttonsDiv, picturesDiv;


$( document ).ready(function(){

	buttonsDiv = $("#buttons-div");
	picturesDiv = $("#pictures-div");

	generateButtons();

	$("#submit-button").on("click", function(event){
		
		event.preventDefault();

		var topicName = $("#topic-input").val().trim();

		topics.push(topicName);

		generateButtons();

		$("#topic-input").val('');

	});


	buttonsDiv.on("click", function(event){
		var queryName = $(event.target).attr("data-name");

		console.log(event.target);

		console.log(queryName);

		$.ajax({
			url: queryBaseURL + "?q=" + queryName + queryParams + api_key,
			method: "GET"
		}).done(function(response){
			var data = response.data;
			console.log(data);
			popluateImages(data);
		});

	});

	picturesDiv.on("click", ".gif-tag", function(event){
		var gifImg = $(this);
		if(gifImg.attr("data-state") === "still"){
			gifImg.attr({
				"src": gifImg.attr("data-animated"),
				"data-state": "animated"
			});
		} else {
			gifImg.attr({
				"src": gifImg.attr("data-still"),
				"data-state": "still"
			});
		}
	});

});


function popluateImages(data){

	var newPicturesDiv = $("<div>");

	for(var i = 0; i < data.length; i++){
		var imageDiv = $("<div>");
		imageDiv.attr("id", "image-div-" + i);
		imageDiv.attr("class", "image-div");

		var rating = $("<p class='rating'>");
		rating.text("Rating: " + data[i].rating.toUpperCase());

		var imageTag = $("<img>");
		imageTag.attr({
			"id": "image-" + i,
			"class": "gif-tag",
			"src": data[i].images.fixed_height_still.url,
			"data-still": data[i].images.fixed_height_still.url,
			"data-animated": data[i].images.fixed_height.url,
			"data-state": "still"
		});

		imageDiv.append(rating);
		imageDiv.append(imageTag);
		newPicturesDiv.append(imageDiv);
	}

	picturesDiv.html(newPicturesDiv.html());

}


function generateButtons(){

	buttonsDiv.empty();

	var newButtonsDiv = $("<div>");

	for(var i = 0; i < topics.length; i++){

		var button = $("<button>");

		button.attr({
			"data-name": topics[i]
		});
		button.text(topics[i]);

		newButtonsDiv.append(button);

	}
	
	buttonsDiv.html(newButtonsDiv.html());

}