// Import stylesheets
//import './styles.css';

// Write Javascript code!

$('.moreless-button').click(function() {
  $('.moretext').slideToggle();
  if ($('.moreless-button').text() == "อ่านกติกา") {
    $(this).text("ย่อให้น้อยลง")
  } else {
    $(this).text("อ่านกติกา")
  }
});


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
          $('#customers').append('<tr><td>'+(i/2)+'</td><td>'+user+'</td><td>'+score+'</td></tr>');
        }
      }
    });
    }, 100);



  });