// Import stylesheets
// import './styles.css';

// Write Javascript code!

var countDownDate = new Date("Sep 4, 2021 11:00:00").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("demo").innerHTML = days + " วัน " + hours + " ชั่วโมง "
  + minutes + " นาที " + seconds + " วินาที ";
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "สิ้นสุดกิจกรรมแล้ว ประกาศผล Line: @789BT";
  }
}, 1000);




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
      /*
      https://spreadsheets.google.com/feeds/cells/1BJ9WzOLi8J8DNXZo6Zb2ue1Wo2rUgarCRI3mQaZ5KfQ/1/public/full?alt=json
      */
      url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQz42O4ECpF64BSW5FkVWNQlg08wNwxn4HPbpnFhOTG-p21x97DAmA3vDGx5U5fxEqSLff5BiLkaSYv/pub?gid=0&single=true&output=csv",
      success: function (response) {
        const contents = response.replace(/\n/g,',');
        const rows = contents.split(",");

        var ranking =[];
        for (var i = 2; i < 202; i = i + 2) {
          var myUser = rows[i].split(" ");
          const user = myUser[0];
          var score = rows[i+1];
          $('#customers').append('<tr><td>'+(i/2)+'</td><td>'+user+'</td><td>'+score+'</td></tr>');
          var jso = {}
          jso.ranks = i/2;
          jso.user = user;
          ranking.push(jso)
        }
        $('.searchf').slideToggle();
        localStorage.setItem("lastname",JSON.stringify(ranking))
        $('.update').text('อัพเดทตารางคะแนนล่าสุด '+rows[0]);
        
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
      if (chk == 100) {alert('USER : '+surf+' ท่านจะร่วมกิจกรรมได้ทันทีเมื่อคะแนนยอดเล่นของท่านติด 100 อันดับแรก')}
    });
    $('#user').keypress(function(e){
      if(e.which == 13){//Enter key pressed
          $('.surf').click();//Trigger search button click event
      }
  });


  });




