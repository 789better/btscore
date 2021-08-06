// Import stylesheets


// Write Javascript code!

$( document ).ready(function() {

  setTimeout(function(){
    $.ajax({
      type: 'GET',
      url: "https://spreadsheets.google.com/feeds/cells/1BJ9WzOLi8J8DNXZo6Zb2ue1Wo2rUgarCRI3mQaZ5KfQ/1/public/full?alt=json",
      success: function (response) {
        var entries = response.feed.entry;
        for (var i = 2; i < 202; i = i + 2) {
          var user = entries[i].content.$t;
          var score = entries[i+1].content.$t;
          $('#customers').append('<tr><td>'+user+'</td><td>'+score+'</td></tr>');
        }
      }
    });
    }, 100);



  });