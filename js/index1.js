<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<div id="map"></div>

<script src="https://maps.googleapis.com/maps/api/js"></script>
<script type = "text/javascript">
// Define your locations: HTML content for the info window, latitude, longitude
  var locations = [
  ['<h4>Tj</h4>Lat:32.509604, Lon:-117.020600', 32.509604, -117.020600, "<div><img width='254' height='355' src='http://descubretijuana.com/sites/default/files/mainrotatorpanoramica.jpg'</div>"],
  ['<h4>Rm</h4>Lat:32.565038, Lon:-116.021757', 32.565038, -116.021757, "<div> <img width='254' height = '355' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/LaRumorosa.jpg/220px-LaRumorosa.jpg'</div>"], 
  ['<h4>Mxl</h4>Lat:32.624473, Lon: -115.452642', 32.624473, -115.452642, "<div> <img width='254' height='355' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/MexicaliMetroNight.jpg/275px-MexicaliMetroNight.jpg'</div>"]
  ];

  // Setup the different icons and shadows
  var iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';

  var icons = [
    iconURLPrefix + 'red-dot.png',
    iconURLPrefix + 'green-dot.png',
    iconURLPrefix + 'blue-dot.png',
    iconURLPrefix + 'orange-dot.png',

  ]
  var iconsLength = icons.length;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: new google.maps.LatLng(32.0076, -115.708),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
    panControl: false,
    //zoom: 14,                        // set the zoom level manually
    zoomControl: true,
    scaleControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    }
  });

  var infowindow = new google.maps.InfoWindow({
    maxWidth: 160
  });
  /*var infowindow = new google.maps.InfoWindow({
                                                        content: "<img width='254' height='355' src='http://www.sciencecourseware.com/virtualearthquake/Images/VQuakeMiscImages/SampleSeismogram.gif'"
                                                    });*/

  var markers = new Array();

  var iconCounter = 0;

  // Add the markers and infowindows to the map
  for (var i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      icon: icons[iconCounter]
    });

    markers.push(marker);

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]+locations[i][3]);
        infowindow.open(map, marker);
      }
    })(marker, i));

    iconCounter++;
    // We only have a limited number of possible icon colors, so we may have to restart the counter
    if (iconCounter >= iconsLength) {
      iconCounter = 0;
    }
  }

  function autoCenter() {
    //  Create a new viewpoint bound
    var bounds = new google.maps.LatLngBounds();
    //  Go through each...
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].position);
    }
    //  Fit these bounds to the map
    map.fitBounds(bounds);
  }
  autoCenter();