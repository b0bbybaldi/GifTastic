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

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='gif'>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var playerImage = $("<img>");
      playerImage.attr("src", results[i].images.fixed_height.url);

      gifDiv.prepend(p);
      gifDiv.prepend(playerImage);

      $("#gifs-appear-here").append(gifDiv);
    }
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
});


$(document).on("click", ".player", displayPlayer);

renderButtons();
