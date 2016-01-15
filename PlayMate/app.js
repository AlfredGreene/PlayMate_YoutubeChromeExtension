function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

var songList= [];
var player, currentVideoId = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('.right-hand', {
        height: '350',
        width: '425',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.loadVideoById(videoIDs[currentVideoId]);
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        currentVideoId++;
        if (currentVideoId < videoIDs.length) {
            player.loadVideoById(videoIDs[currentVideoId]);
        }
    }
}

$(document).ready(function(){
  $('#results').on('click', 'button', function(e){
    e.preventDefault();
    var button = $(this)
    var rightPlace = $(this).parent();

    $(button).remove();
    $(rightPlace).remove();
    $(".right-hand").append(rightPlace)
    var individualId = $(this).attr('data-videoID');
    songList.push(individualId);
    console.log(songList);

  });

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 10,
            order: "viewCount",
       });
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
    });

    $(window).on("resize", resetVideoHeight);
});

});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
  gapi.client.setApiKey('AIzaSyAw42x_-zvJ-3PhIEkIC6M1MXjeddXAkFg');
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}
