var players = ["David Beckham", "Lionel Messi", "Cristiano Ronaldo", "Neymar", "Gianluigi Buffon", "Lukas Podolski", "Zinedine Zidane", "Ronaldinho", "Ibrahimovic", "Gerard Pique", "Mesut Ozil"];

var displayPlayer = function(){
  var player = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=dc6zaTOxFJmzC&limit=5";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){

    console.log(response);

    $("#gifs-appear-here").empty();

    var results = response.data;

    for (var i = 0; i < results.length ; i++) {
      var gifDiv = $("<div class='images'>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var playerImage = $("<img>");
      playerImage.attr("src", results[i].images.fixed_height_still.url);
      playerImage.attr("data-still", results[i].images.fixed_height_still.url);
      playerImage.attr("data-animate", results[i].images.fixed_height.url);
      playerImage.attr("data-state", "still");
      playerImage.attr("class", "gif");

      gifDiv.prepend(p);
      gifDiv.prepend(playerImage);

      $("#gifs-appear-here").append(gifDiv);

      // pauseImages();
    }

    // pauseImages();

  });

  //Function that listens to click and changes URL from fixed_height to fixed_height_url and viceversa needed

  //On Click
    //if gif active then pause
    //if paused activate
}

var renderButtons = function(){

 $("#buttons-view").empty();

  for (var i = 0; i < players.length; i++) {

    var a = $("<button>");
    
    a.addClass("player");
      
    a.attr("data-name", players[i]);
     
    a.text(players[i]);

    $("#buttons-view").append(a);
  }
}

$("#add-player").click(function(event) {
  event.preventDefault();
        
  var player = $("#player-input").val().trim();

  players.push(player);

  renderButtons();

  // pauseImages();
});

var pauseImages = function(){
  $(".gif").click(function() {
    event.preventDefault();

    var state = $(this).attr("data-state");

    console.log(state);

    if(state === 'still'){
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    }else if(state === 'animate'){
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }

    pauseImages();
  });
}


$(document).on("click", ".player", displayPlayer);

$(document).on("click", ".gif", pauseImages);

var audio = new Audio('assets/images/01 Bum Bum Tam Tam.m4p');
audio.play();

renderButtons();

pauseImages();
