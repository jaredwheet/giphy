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

function createButtons(array) {
    $('.buttons').empty();
    for (var i = 0; i < array.length; i++) {
        var newButton = $("<button>" + array[i] + "</button>");
        newButton.addClass("topic");
        newButton.attr("topic-name", array[i]);
        $(".buttons").append(newButton);
    }
}
createButtons(topics);

$('#submit-btn').click(function () {
    var inputValue = $('#user-input').val().trim();
    topics.push(inputValue);    
    createButtons(topics);
})


$('.topic').click(function () {
    $('.gifs').empty();
    console.log("hello")
    var topicName = $(this).attr("topic-name");
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="
    + topicName
    + "&api_key=sHB7DvK03v29Q84Qkq5OYkOseQR7fxPI&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var imgURL = response.data[i].images.fixed_height_still.url;
            var gifURL = response.data[i].images.fixed_height.url;
            var image = $('<img>');
            image.addClass("gif-img")
            image.attr("id", i);
            image.attr("src", imgURL);
            image.attr("image", imgURL)
            $('.gifs').append(image);
        }              
        
        $('.gif-img').click(function () {
            var id = parseInt(this.id);
            var gifURL = response.data[id].images.fixed_height.url;            
            if (this.src === response.data[id].images.fixed_height_still.url) {                
                $('#' + id).attr("src", gifURL)
            }
            else {                
                imgURL = response.data[id].images.fixed_height_still.url;
                $('#' + id).attr("src", imgURL)
                
            }
        })
    });
    
    
})
