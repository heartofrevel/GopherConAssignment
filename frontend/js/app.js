$(document).ready(function(){

  function initialize() {                        
        var options = {
          types: ['(cities)']
        };
        var input1 = document.getElementById('city1');
        var input2 = document.getElementById('city2');
        var input3 = document.getElementById('city3');
        var input4 = document.getElementById('city4');
        var input5 = document.getElementById('city5');

        var autocomplete = new google.maps.places.Autocomplete(input1,options);
        var autocomplete = new google.maps.places.Autocomplete(input2,options);
        var autocomplete = new google.maps.places.Autocomplete(input3,options);
        var autocomplete = new google.maps.places.Autocomplete(input4,options);
        var autocomplete = new google.maps.places.Autocomplete(input5,options);

      }
      google.maps.event.addDomListener(window, 'load', initialize);

  $('#sendForm').submit(function(){
    // event.preventDefault();
    var city1 = $("#city1").val();
    var city2 = $("#city2").val();
    var city3 = $("#city3").val();
    var city4 = $("#city4").val();
    var city5 = $("#city5").val();
    var label = document.getElementById("errorLabel");      
    if(city1 == '' && city2 == '' && city3 == '' && city4 == '' && city5 == '')
    {      
      label.innerHTML = "Please enter atleast one city.";
      label.style.display = "block";      
    }
    else
    {
      label.style.display = "none";
      // AJAX Code To Submit Form.
      var cities = [];
      cities.push(city1);
      cities.push(city2);
      cities.push(city3);
      cities.push(city4);
      cities.push(city5);

      cities.forEach(function(city){
        if(city != ""){
          $.ajax({
          type: "POST",
          url: "/weather?city="+city,          
          cache: false,
          success: function(result){
            var jsonObj = jQuery.parseJSON(result);            
            var city = jsonObj.Query
            var date = jsonObj.Date
            var tempMaxC = jsonObj.TempMaxC
            var tempMinC = jsonObj.TempMinC
            var tempMaxF = jsonObj.TempMaxF
            var tempMinF = jsonObj.TempMinF
            $('#result #City').html(city)
            $('#result #Date').html(date);
            $('#result #TempMax').html(tempMaxC+"&deg;C / "+tempMaxF+"&deg;F");
            $('#result #TempMin').html(tempMinC+"&deg;C / "+tempMinF+"&deg;F");
            $('#results').prepend($('#result').html());
            }
          });
        }            
      });

      document.getElementById("sendForm").reset();
    }
    return false;
    
});
});