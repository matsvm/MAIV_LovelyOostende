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
  console.log("Dom Loaded!");

  setTimeout( window.scrollTo(0,10),1);
  console.log(start);
  var homeScreen = '<div style="position:absolute;background-color:#2a2b3c;"><div id="Firstcontainer"><div id="hartje"></div>'+
      '<h1>Zin in wat romantiek?</h1>'+
      '<p>Lovely Oostende laat je erg snel een gezellige dagtrip plannen!</p>'+
        '<div id="removeHomeScreen" class="btn">Maak je eigen dagtrip</div>'+
       
        '<h1>Enige haast?</h1>'+
        '<p class="smallP">Laat ons jullie dag uitstippelen.</p>'+
        '<div id="ramdomTrip" class="btn small">ok, verras ons ! </div>'+
    '</div></div>';
  $("body").prepend(homeScreen);
  $("#removeHomeScreen").click(function(){
      $(this).parent().remove();

    createOwnScreen();
  })
  $("#ramdomTrip").click(function(){
     $(this).parent().remove();
     createOwnScreen();
     createRandomDagTrip();
     showDagTrip();
  })
  
};
function createOwnScreen(){
  $('#container .zintuig').click(navigate);
  $(".dagtripIcon").click(showDagTrip);
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
//createRandomDagTrip();
  updateDagTripCount();
}    
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

function createRandomDagTrip(){
  var randomDagTrip = new Array();
  var allProeven = new Array();
  var allDeRest = new Array();

  for(var j=0;j<allVenues.length;j++){
    var element = allVenues[j];
    if(element.cat !=1){
      allDeRest.push(element);
    }else{
      allProeven.push(element);
    }
  }
  //console.log(allProeven);
  //console.log(allDeRest);
 
  while(randomDagTrip.length < 5){
    if(randomDagTrip.length%2){
      console.log("OnEven: "+randomDagTrip.length)
      var randomnumber=Math.ceil(Math.random()*allDeRest.length);
      var found=false;
      for(var i=0;i<randomDagTrip.length;i++){
        if(randomDagTrip[i]==randomnumber){found=true;break}
      }
      if(!found&&allDeRest[randomnumber]!=undefined){
        //console.log(allDeRest[randomnumber]);
        randomDagTrip[randomDagTrip.length]=allDeRest[randomnumber];
        
      }
    }else{
      console.log("Even: "+randomDagTrip.length)
      var randomnumber=Math.ceil(Math.random()*allProeven.length);
      var found=false;
      for(var i=0;i<randomDagTrip.length;i++){
        if(randomDagTrip[i]==randomnumber){found=true;break}
      }
      if(!found&&allProeven[randomnumber]!=undefined){
        randomDagTrip[randomDagTrip.length]=allProeven[randomnumber];
        //console.log(allProeven[randomnumber]);

      }
    }
    
  }
  console.log(randomDagTrip);
  localStorage.setItem('favorites',JSON.stringify(randomDagTrip));

}
function berekenDichtsteVenue(){
  console.log("Get closest venues")
  currentVenues = new Array();
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
  
  var itemke = '<div class="infoBarI">Kies een attractie hieronder om deze toe te voegen.</div>'+
              '<div class="infoBarII">Je kan de attracties filteren per zintuig of per huidige locatie</div>';
  $('#infoContent').append(itemke);         
  for(var i =0;i<currentVenues.length;i++){
    var element = currentVenues[i];
    
      var item ="<span style='margin-left:500px' id='venue"+element.id+"' class='venue'><h3 style='display:none;'>"+element.name+"</h3><img style='max-width:100%; max-height:100%;' src='assets/images/attracties/proeven/"+element.name+".png'> "+

        "</span>";
        $("#subContent").append(item);


        $("#venue"+element.id).click(clickVenuehandler);

        $("#venue"+element.id).animate({
        'margin-left': '0px'
        }, 300, function() {
        // Animation complete.
        });


        
    }
    return false;
  }


function navigate(){
  console.log($(this).text());
  if(currentZintuig==$(this).text()){

    return false;
  }else{
    
    $("#infoContent").empty();
    currentZintuig=$(this).text()
    if($("#infoContent").hasClass("verborgen")){
     
    }else{
      
      venueArray= new Array();
      
    }
    var key =0;
    //console.log(this.text);
    console.log($(this));
    switch($(this).text()){
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
      if($(this).text()=="Dichtbij"){
        berekenDichtsteVenue();
        }else{
        currentVenues = new Array();
        for(var i =0;i<allVenues.length;i++){
          var element = allVenues[i];
          if(element.cat == key){
            console.log(element);
            currentVenues.push(element);
            
          }
      }
      changeDisplay();
    }
  
        return false;
    
    }
  }

function clickVenuehandler(){
  $("#infoContent").empty();
  var currentVenue = $(this).find('h3').text();
  //console.log($(this).text());
  if(selectedVenue){
    $("#venue"+selectedVenue.id+" img").attr('src',"assets/images/attracties/proeven/"+selectedVenue.name+".png");
  };
  var element = null;
  for (var i = 0; i < currentVenues.length; i++) {
      element = currentVenues[i];
      console.log(currentVenue);
      if(element.name==currentVenue){
        console.log("Found it!");
        selectedVenue = element;
        $("#venue"+selectedVenue.id+" img").attr('src',"assets/images/attracties/proeven/"+element.name+"-touched.png");
        var item= "<div class='infoBarIII'>FOTO</div><div class='showDetail'><div class='infoBarIV'><h2>"+element.name+"</h2><p>"+element.adress+"</p></div><div class='infoBarArrow'><img src='assets/images/arrow.png' width='40'></div></div>";
//            <div class="infoBarV"><div class="Minibutten"> + toevoegen aan dagtrip</div></div><div class='infoBarItem'><h3 class='showDetail'>"+element.name+"</h3><p class='showDetail'>"+element.adress+"</p></div>";
        var favorites = JSON.parse(localStorage.getItem('favorites'));

        var inList=false;
        for(var j =0;j<favorites.length;j++){
          var elementje = favorites[j];
          if(selectedVenue.name == elementje.name){
            inList = true;
          }
        }
        if(inList==true){
          console.log("De plaats zit er reeds in");
          item += "<div class='infoBarV'><div id='likeKlik"+element.id+"' class='Minibutten'>-verwijderen uit dagtrip</div></div>";
          $("#infoContent").append(item);

          $("#likeKlik"+element.id).click(favorietVerwijderen);
        }else{
          if(favorites.length<5){
            console.log("De plaats zit er nog niet in");
            item += "<div class='infoBarV'><div id='likeKlik"+element.id+"' class='Minibutten'>+ toevoegen aan dagtrip</div></div>";
            $("#infoContent").append(item);
            $("#likeKlik"+element.id).click(likeKlik);
           }else{
            console.log("favorites vol");
            item += "<div class='infoBarV'><div style='background-color:#e28a81;'  class='Minibutten'>Dagtrip is volledig</div></div>";

            $("#infoContent").append(item);
           } 
        }
        $(".showDetail").click(showDetailPage);


      }else{
        //console.log("Wrong");
      }
      // Do something with element i.
    
  }

  }
function favorietVerwijderen(){
  var favorites = JSON.parse(localStorage.getItem('favorites'));
  console.log("[Fav Verwijderen]"+favorites)
  for(var j =0;j<favorites.length;j++){
    var elementje = favorites[j];
    console.log(elementje.name);
      if(selectedVenue.name == elementje.name){
        favorites.splice(j,1);
        console.log("[Foundit]"+favorites)
      }
    }
  localStorage.setItem('favorites',JSON.stringify(favorites));
  updateDagTripCount();

}
function showDetailPage(){
  console.log("Click on title");
  var item= "<div class='detailPage' style='background-color:#525263;position:absolute;z-index:5; margin-top:66px;'><div id='vorige' class='terugBtn'>Terug</div>"+
  "<div class='overzicht'>"+
            "<div class='infoBarIV' style='float:right;'>"+
                    "<h2>"+selectedVenue.name+"</h2>"+
                    "<p>"+selectedVenue.adress+"</p>"+
                    "<p>"+selectedVenue.description+"</p>"+
           "</div>"+
        "</div>"+

        "<div class='kaartBtn'>Kijk op kaart</div>"+
        "<div class='fotoBtn'>Foto's</div>"+

        
        "<a target='_blank' href='https://maps.google.be/maps?q="+selectedVenue.lat+","+selectedVenue.long+"'><img style='max-height:100%;max-width:100%;display:none;' src='assets/images/venues/"+selectedVenue.img+"'><div id='map_canvas"+selectedVenue.name+"' class='buildings' style='width:320px; height:200px'>"+
        "</div></a>";

        var favorites = JSON.parse(localStorage.getItem('favorites'));

        var inList=false;
        for(var j =0;j<favorites.length;j++){
          var elementje = favorites[j];
          if(selectedVenue.name == elementje.name){
            inList = true;
          }
        }
        if(inList==true){
          console.log("De plaats zit er reeds in");
          item += "<div class='infoBarV'><div id='likeDetailKlik"+selectedVenue.id+"' class='Minibutten'>-verwijderen uit dagtrip</div></div>";
          $("body").prepend(item);

          $("#likeDetailKlik"+selectedVenue.id).click(favorietVerwijderen);
        }else{
          if(favorites.length<5){
            console.log("De plaats zit er nog niet in");
            item += "<div class='infoBarV'><div id='likeDetailKlik"+selectedVenue.id+"' class='Minibutten'>+ toevoegen aan dagtrip</div></div>";
           $("body").prepend(item);
           $("#likeDetailKlik"+selectedVenue.id).click(function(){
            //$(this).parent().remove();
                console.log("removeDetailPage");

            likeKlik();
            return false;
          });
           }else{
            console.log("favorites vol");
            item += "<div class='infoBarV'><div style='background-color:#e28a81;' class='Minibutten'>Dagtrip is volledig</div></div>";

           $("body").prepend(item);
           } 
        }
        $(".kaartBtn").click(function(){
          $('a div').attr('style','display:inline-block;style=width:320px; height:200px;');
          $("a img").attr('style','max-height:100%;max-width:100%;display:none;')
          getNewMap();
        })
        $(".fotoBtn").click(function(){
          $('a div').attr('style','display:none;');

          $("a img").attr('style','max-height:100%;max-width:100%;display:auto;')

        })

  $("#vorige").click(function(){
    $(this).parent().remove();
  })
  getNewMap();
  function getNewMap(){
    var myLatlng = new google.maps.LatLng(selectedVenue.lat, selectedVenue.long);
    var myOptions = {
        zoom: 15,
        center: myLatlng,
        draggable:false,
        disableDefaultUI:true,
        zoomControl:false,
        scaleControl:false,
        scrollwheel: false,
        disableDoubleClickZoom: true,

        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

    var map = new google.maps.Map(document.getElementById("map_canvas"+selectedVenue.name),myOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: "assets/images/marker.png",
      title:"Hello World!"
    })
  }
  return false;
}

function likeKlik(){
  //console.log($(this).attr('href'));
  console.log(selectedVenue);
  $('html,body').animate({
            scrollTop: 1
            }, 500);
        
  
  var favorites = JSON.parse(localStorage.getItem('favorites'));
  console.log(favorites.length);
  
  favorites.push(selectedVenue);
  localStorage.setItem('favorites',JSON.stringify(favorites));
  var item="<div style='position:absolute; background-color:#2a2b3c; z-index:5;margin-top:66px;'><div id='popUp'>"+
  "<h1>Geslijm geslijm</h1> <p>Je hebt "+selectedVenue.name+" toegevoegd aan je dagtrip. Mooie keuze!</p>"+
  "<div class='roundedPopup roundedPopupMini'><p>AANRADER</p></div>"+
        "<div class='roundedPopup'><p>Als koppel moet je zeker eens het uitzicht bewonderen bij zonsondergang!</p></div>"+
  "<div class='miniBtn' id='keerTerug'> keer terug </div>"+
  "<div class='miniBtn'id='toDagtrip' >Naar dagtrip </div>"+
  "</div></div>";
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
  updateDagTripCount();
  console.log(JSON.parse(localStorage.getItem('favorites')));
  return false;
  }
function updateDagTripCount(){
  if(JSON.parse(localStorage.getItem('favorites'))){
  var favorites = JSON.parse(localStorage.getItem('favorites'));
  count = favorites.length;
  console.log(count);
  $(".dagtripIcon span").text(count);

  if(selectedVenue){
    console.log("change Button");
    var infoBarV = $(".infoBarV");
    console.log(infoBarV);

    infoBarV.empty();
        console.log(infoBarV);

    var newButton;
    var inList=false;
    for(var j =0;j<favorites.length;j++){
      var elementje = favorites[j];
      if(selectedVenue.name == elementje.name){
        inList = true;
        }
      }
    if(inList==true){
      console.log("[Change Button] De plaats zit er reeds in");
      newButton = "<div id='likeDetailKlik"+selectedVenue.id+"' class='Minibutten'>-verwijderen uit dagtrip</div>";
      infoBarV.append(newButton);

      $("#likeDetailKlik"+selectedVenue.id).click(favorietVerwijderen);
    }else{
        console.log("[Change Button] De plaats zit er nog niet in");

        newButton = "<div id='likeDetailKlik"+selectedVenue.id+"' class='Minibutten'>+ toevoegen aan dagtrip</div>";
        infoBarV.append(newButton);

       $("#likeDetailKlik"+selectedVenue.id).click(function(){
        //$(this).parent().remove();
            console.log("removeDetailPage");

        likeKlik();
        return false;
      });
    }

    
    }
 }
}
function showDagTrip(){
  console.log("Show dagtrip");
  var item = "<div id='dagTripDiv' style='position:absolute; margin-top:66px; background-color:#2a2b3c;width:100%;'>";
  var favorites = JSON.parse(localStorage.getItem('favorites'));

  

  item+="<div class='miniBtn' id='verrasMij'>Veras mij</div>";
  item+="<div class='miniBtn' id='maakLeeg'>Leegmaken</div>";
  
  item +=" </div>";

  $('body').prepend(item);

  for(var i=0;i<favorites.length;i++){
    var element = favorites[i];

    var itemke="<div class='dagtripItem' id='dagTripItemKe"+element.id+"'>"+
    "<div class='dagtripIcontje'>F2</div>"+
    "<div class='dagtripTitel'><h2>"+ element.name+"</h2><p>"+ element.adress+"</p></div><div class='infoBarArrowTrip'><img src='assets/images/arrow.png' width='40'></div>"+
    "<div class='dagtripColor'></div>"+
    "</div>";
    $("#dagTripDiv").prepend(itemke);
    $('#dagTripItemKe'+element.id).click(function(){
      console.log("Click on element uit lijst");
      selectedVenue = element;

      showDetailPage();
    })
  }
  item = "<div class='terugBtn' style='float:none;' id='keerTerug'>Terug</div>";
  $("#dagTripDiv").prepend(item);

  $("#maakLeeg").click(function(){
    $(this).parent().remove();
    localStorage.setItem('favorites',JSON.stringify(new Array()));
    
    updateDagTripCount();

  })
  $("#verrasMij").click(function(){
    $(this).parent().remove();
    createRandomDagTrip();
    showDagTrip();
  })
  $("#keerTerug").click(function(){
    $(this).parent().remove();
    return false;
  })
}
  