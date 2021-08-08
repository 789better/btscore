// Import stylesheets
//import './styles.css';

// Write Javascript code!




$( document ).ready(function() {

  $('.moreless-button').click(function() {
    $('.moretext').slideToggle();
    if ($('.moreless-button').text() == "อ่านกติกา") {
      $(this).text("ย่อให้น้อยลง")
    } else {
      $(this).text("อ่านกติกา")
    }
  });


  

  setTimeout(function(){
    $.ajax({
      type: 'GET',
      url: "https://spreadsheets.google.com/feeds/cells/1BJ9WzOLi8J8DNXZo6Zb2ue1Wo2rUgarCRI3mQaZ5KfQ/1/public/full?alt=json",
      success: function (response) {
        var ranking =[];
        var entries = response.feed.entry;
        for (var i = 2; i < 202; i = i + 2) {
          
          var myUser = entries[i].content.$t.split(" ");
          const user = myUser[0];
          var score = entries[i+1].content.$t;
          $('#customers').append('<tr><td>'+(i/2)+'</td><td>'+user+'</td><td>'+score+'</td></tr>');
          
          var jso = {}
          jso.ranks = i/2;
          jso.user = user;
          ranking.push(jso)

        }
        $('.searchf').slideToggle();
        localStorage.setItem("lastname",JSON.stringify(ranking))
        $('.update').text('อัพเดทตารางคะแนนล่าสุด '+entries[0].content.$t);
        
      }
    });
    }, 100);



    $('.surf').click(function() {
      let surf = $( "#user" ).val().toLowerCase();

      if (surf.substring(0, 2) != "bt"){alert('โปรดระบุ User ขึ้นต้นด้วย bt เท่านั้น');return;}

      var ranking = JSON.parse(localStorage.getItem("lastname"));
      console.log (ranking[0])
      var chk = 0;
      for (const order of ranking){
        if (surf == order.user){alert('ท่านอยู่ลำดับที่ '+order.ranks);break;}
        chk = chk+1;
      }
      if (chk == 100) {alert('USER : '+surf+' ไม่อยู่ใน 100 อันดับแรก')}


    });


  });




