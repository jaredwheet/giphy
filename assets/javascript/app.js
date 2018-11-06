var topics = [
    "Baseball",
    "Football",
    "Basketball",
    "Hockey",
    "Golf",
    "Running",
    "Soccer",
    "Luge",
    "Bobsled",
    "Rugby",
    "Tennis",
    "Water Polo",
    "Swimming",
    "Rowing",
    "Softball",
    "Cricket", 
    "Curling",
    "Horse Racing"
];

function createButtons(array){
    $('.buttons').empty();
    for (var i = 0; i < array.length; i++){
        var newButton = $("<button>" + array[i] + "</button>");
        newButton.addClass("topic");
        newButton.attr("topic-name", array[i]);
        $(".buttons").append(newButton);
    }
}

createButtons(topics);

$('.topic').click(function(){
    var topicName = $(this).attr("topic-name");
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" 
                    + topicName
                    + "&api_key=sHB7DvK03v29Q84Qkq5OYkOseQR7fxPI&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        // $(".gifs").text(JSON.stringify(response));
        var imgURL = response.data[0].images.fixed_height_still.url
        console.log(imgURL)
        $('.gifs').html("<img src=" + imgURL + "/>");
        });
})