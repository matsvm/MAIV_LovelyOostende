var currentZintuig;
var venueArray= new Array();
var allVenues;
var myLatlng; 
var latLngArray = new Array();
var currentVenues = new Array();
var start = new Date().getTime();
var maxVerganeTijd = 86400;
var selectedVenue;
$(document).ready(init);
  function init(){
  setTimeout( window.scrollTo(0,1),1);
  console.log(start);

  console.log("Dom Loaded!");
  $('#container .zintuig').click(navigate);
  if(localStorage.getItem('favorites')){

  }else{
    localStorage.setItem('favorites',JSON.stringify(new Array()));
  }
  if(localStorage.getItem('lastTime')){
    if(((new Date().getTime()/1000)-localStorage.getItem('lastTime'))<maxVerganeTijd){
      console.log("Venues reeds ingeladen");
      console.log((new Date().getTime())/1000-localStorage.getItem('lastTime'));
      //localStorage.clear('Venues')
      allVenues = JSON.parse(localStorage.getItem('Venues'));
    }else{
      getNewVenues();
    }
   berekenDichtsteVenue();
  }else{
    getNewVenues();
    
          }
        };
    
  function getNewVenues(){
  localStorage.setItem('lastTime',(new Date().getTime())/1000)
    console.log("Venues nog in te laden");

    var url = 'api/venues';
    $.ajax(
      {
        type:'GET',
        url: url,
        dataType : 'json',
        success: function(data){
          console.log("[ajax Response] "+data);
          allVenues = data;
          localStorage.setItem('Venues',JSON.stringify(data));
          berekenDichtsteVenue();
           $.each(data, function(key,value){
            //console.log(value);
           })
          
        }
      })
  }


function berekenDichtsteVenue(){

  var current=navigator.geolocation.getCurrentPosition(getCoordinaten);
  
  function getCoordinaten(position) {
    myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    console.log(myLatlng);
    console.log(allVenues);
    
    for(var i =0;i<allVenues.length;i++){
      var element = allVenues[i];
      latLngArray.push(new google.maps.LatLng(element.lat,element.long));
    }
    console.log(latLngArray);
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [myLatlng],
      destinations: latLngArray,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidHighways: false,
      avoidTolls: false,
      unitSystem:google.maps.UnitSystem.METRIC
    }, callback);
  }
}

function callback(response, status) {
  //console.log(response);
 if (status == google.maps.DistanceMatrixStatus.OK) {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      //console.log(results);
      for (var j = 0; j < results.length; j++) {
        var elementje = results[j];
        var distance = elementje.distance.text;
        allVenues[j].distance = distance;
        allVenues[j].distanceVal = elementje.distance.value;
        var duration = elementje.duration.text;
        var from = origins[i];
        var to = destinations[j];
        
      }
    }
  }
  console.log(allVenues);
  allVenues.sort(function(a,b) { return parseFloat(a.distanceVal) - parseFloat(b.distanceVal) } );
  console.log(allVenues);
  for(var i=0;i<5;i++){
    currentVenues.push(allVenues[i]);
  }
  console.log(currentVenues);
  changeDisplay();

}

function changeDisplay(){
  $('#subContent').empty();
  for(var i =0;i<currentVenues.length;i++){
    var element = currentVenues[i];
    
      var item ="<span style='margin-left:500px' id='venue"+element.id+"' class='venue'><h3>"+element.name+"</h3> "+

        "</span>";
        $("#subContent").append(item);


        $("#venue"+element.id).click(clickVenuehandler);

        $("#venue"+element.id).animate({
        'margin-left': '0px'
        }, 300, function() {
        // Animation complete.
        });


        $("#likeKlik"+element.id).click(likeKlik);
    }
  }


function navigate(){
  if(currentZintuig==this.text){

    return false;
  }else{
    $("#infoContent").empty();
    currentZintuig=this.text
    if($("#infoContent").hasClass("verborgen")){
     
    }else{
      $("#infoContent").addClass("verborgen");
      venueArray= new Array();
      
    }
    var key =0;
    //console.log(this.text);

    switch(this.text){
      case "Proeven":
        key =1;
        break;
      case "Zien":
        key = 2;
      break;
      case "Ruiken":
        key = 3;
      break;
      case "Voelen":
        key = 4;
      break;
      case "Horen":
        key = 5;
      break;
      

      }
      currentVenues = new Array();
      for(var i =0;i<allVenues.length;i++){
        var element = allVenues[i];
        if(element.cat == key){
          console.log(element);
          currentVenues.push(element);
          
        }
    }
    changeDisplay();
  
    //"<a href='http://maps.apple.com/maps?ll="+value.lat+","+value.long'></a>";
      
        return false;
    
    }
  }

function clickVenuehandler(){
  $("#infoContent").empty();
  var currentVenue = $(this).find('h3').text();
  //console.log($(this).text());
  if($("#infoContent").hasClass("verborgen")){
    $("#infoContent").removeClass("verborgen");

    console.log("Show");
  }
  var element = null;
  for (var i = 0; i < currentVenues.length; i++) {
      element = currentVenues[i];
      console.log(currentVenue);
      if(element.name==currentVenue){
        console.log("Found it!");
        selectedVenue = element;

        /*var item ="<div class='gebouw'><h3>"+element.name+"</h3> <p>"+element.description+"</p> <p>"+element.adress+"</p> "+
        "<a href='https://maps.google.be/maps?q=+"+element.lat+"+"+element.long+"'></a>"+
      "<a id='likeKlik"+element.id+"' href='index.php?page=vote&value="+element.id+"'>like</a>"+

        "</div>";
        

        var myLatlng = new google.maps.LatLng(element.lat, element.long);
        var myOptions = {
            zoom: 15,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

        var map = new google.maps.Map(document.getElementById("map_canvas"+element.name),myOptions);
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          icon: "assets/images/marker.png",
          title:"Hello World!"
        })*/

        var item= "<span><h3 class='showDetail'>"+element.name+"</h3><p class='showDetail'>"+element.adress+"</p>"+
        "<a id='likeKlik"+element.id+"' href='#'>Add To List</a>"+

          "</span>";
          $("#infoContent").append(item);
        $("#likeKlik"+element.id).click(likeKlik);
        $(".showDetail").click(showDetailPage);


      }else{
        //console.log("Wrong");
      }
      // Do something with element i.
    
  }

  }

function showDetailPage(){
  console.log("Click on title");
  var item="<div class='detailPage' style='position:absolute; background-color:red;'><span id='vorige'>Terug</span> <h3>"+selectedVenue.name+" </h3> <p>"+selectedVenue.description+"</p>"+
  "<a id='likeDetailKlik"+selectedVenue.id+"' href=#>Add To List</a>"+
  "<div id='map_canvas"+selectedVenue.name+"' style='width:400px; height:400px;'></div> </div>";
  $("body").prepend(item);
  $("#likeDetailKlik"+selectedVenue.id).click(function(){
    //$(this).parent().remove();
        console.log("removeDetailPage");

    likeKlik();
    return false;
  });

  $("#vorige").click(function(){
    $(this).parent().remove();
  })
  var myLatlng = new google.maps.LatLng(selectedVenue.lat, selectedVenue.long);
  var myOptions = {
      zoom: 15,
      center: myLatlng,
      draggable:false,
      disableDefaultUI:true,
      zoomControl:false,
      scaleControl:false,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

  var map = new google.maps.Map(document.getElementById("map_canvas"+selectedVenue.name),myOptions);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: "assets/images/marker.png",
    title:"Hello World!"
  })
  return false;
}

function likeKlik(){
  //console.log($(this).attr('href'));
  console.log(selectedVenue);
  var favorites = JSON.parse(localStorage.getItem('favorites'));
  console.log(favorites.length);
  var inList=false;
  for(var i =0;i<favorites.length;i++){
    var element = favorites[i];
    if(selectedVenue.name == element.name){
      inList = true;
    }
  }
  if(inList==true){
    console.log("De plaats zit er reeds in");
  }else{
    if(favorites.length<5){
      console.log("het zit er nog niet in");
      favorites.push(selectedVenue);
      localStorage.setItem('favorites',JSON.stringify(favorites));
      var item="<div style='position:absolute; z-index:5;'><h2>Geslijm geslijm</h2> <p>bla bla bla bla bla</p> <a id='keerTerug' href=#> keer terug </a> <a id='toDagtrip' href=#>Naar dagtrip </a></div>";
      $('body').prepend(item);
      $("#toDagtrip").click(function(){
        $(this).parent().remove();
        showDagTrip();
        return false;
      });
      $("#keerTerug").click(function(){
        $(this).parent().remove();
        return false;
      })
      console.log(JSON.parse(localStorage.getItem('favorites')));
    }else{
      console.log("Het zit er nog niet in, maar het zit al vol");
    }
  }
  

  return false;
}
function showDagTrip(){
  console.log("Show dagtrip");
  var item = "<div style='position:absolute;'d><h2>Hier komt jouw dagtrip</h2> <p>bla bla bla bla bla</p>";
  var favorites = JSON.parse(localStorage.getItem('favorites'));

  for(var i=0;i<favorites.length;i++){
    var element = favorites[i];
    item +="<p>"+ element.name+" </p>";
  }
  item +=" </div>";
  $('body').prepend(item);

}
  