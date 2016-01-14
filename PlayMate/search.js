$(document).ready(function(){
  $('form').submit(function(e){
    e.preventDefault();
    $(search());
  });
});

function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    console.log(responseString);
};

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
};

function onYouTubeApiLoad() {
  gapi.client.setApiKey('AIzaSyAw42x_-zvJ-3PhIEkIC6M1MXjeddXAkFg');
};

function search() {
    // Use the JavaScript client library to create a search.list() API call.
  var q = $("#search").val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    console.log(response);
    var str = JSON.stringify(response.result);
    // $('body').html('<pre>' + str + '</pre>');
    response.items.forEach(function(item) {
      var video_id = item.id.videoId;
      var channel_id = item.id.channel_id;
      var imgSrc = item.snippet.thumbnails.default.url;
      if (channel_id) {
      $('#response').append('<a href="https://www.youtube.com/' + channel_id + '"><img src="' + imgSrc + '"></a>');
      } else {
      }
      $('#response').append('<a href="https://www.youtube.com/watch?v=' + video_id + '"><img src="' + imgSrc + '"></a>');
    })
  });
};

function onSearchResponse(response) {

};

// function init() {
//   gapi.client.setApiKey('AIzaSyAw42x_-zvJ-3PhIEkIC6M1MXjeddXAkFg');
//   gapi.client.load("youtube", "v3", function(){
//     //YT API IS READY
//   });
// };
