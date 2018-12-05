var topics = [
    "Baseball",
    "Football",
    "Basketball",
    "Hockey",
    "Golf",    
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

// click event to take user input and create button
$('#submit-btn').click(function () {
    var inputValue = $('#user-input').val().trim();
    topics.push(inputValue);
    createButtons(topics);
})

//click event to render GIFS when button is clicked. 
$(document).on('click', '.topic', function() {
// $('.topic').click(function () {
    $('.gifs').empty();    
    var topicName = $(this).attr("topic-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="
        + topicName
        + "&api_key=sHB7DvK03v29Q84Qkq5OYkOseQR7fxPI&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {            
            var imgURL = response.data[i].images.fixed_height_still.url;
            var gifURL = response.data[i].images.fixed_height.url;
            var rating = response.data[i].rating
            var imgRatingText = "Rating: " + rating.toUpperCase();
            var imageDiv = `<div>
                            <p>${imgRatingText}</p>
                            <img id=${i} class= "gif-img" src = ${imgURL}  />                       
                            </div>`                           
            $('.gifs').append(imageDiv);
                       
            
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
