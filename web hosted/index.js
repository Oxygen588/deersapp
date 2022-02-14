// [START maps_custom_markers]
let map;

let array = []


//ws://localhost:3210
// Create WebSocket connection.


socket = new WebSocket('ws://92.42.47.18:801');

socket.addEventListener('open', function(event) {

    socket.send('1STCON');

});



    // Listen for messages
var zoommmm = 4;
var latlng1 = [51.40241887397332, -1.2304687500000002];

socket.addEventListener('message', function(event) {
    dat = JSON.parse(event.data);
    console.log("bbbbbbbbbb")
    console
        todo = dat;
        array = todo
        initMap(zoommmm, latlng1);
    

});

function setzm(zom) {
    zoommmm = zom
}

function setlgtsm(zom) {
    //console.log(zom.lat())
    latlng1[0] = zom.lat()
    latlng1[1] = zom.lng()
}


function notifyMe() {
    // Let's check if the browser supports notifications



    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification

    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {

            }
        });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
}



function initMap(zmmm, latlng11) {
    if (latlng11 == null){
        latlng11 = [51.132431,-3.003810];
    }
    if (zmmm == null){
        zmmm = 5;
    }
    map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(latlng11[0], latlng11[1]),
        zoom: zmmm,
    });
    google.maps.event.addListener(map, 'zoom_changed', function() {
        var zoommmm = map.getZoom();
        //console.log(zoommmm);
        setzm(zoommmm)
    });
    google.maps.event.addListener(map, 'center_changed', function() {
        latLngObj = map.getCenter();
        console.log('lat long object ' + latLngObj);
        setlgtsm(latLngObj)
    });
    console.log(array+"aaaaa")
    for (var k in array) {
        
        console.log(array[k])
        if (array[k][0] > 0){
            var k = new google.maps.Marker({
                
                position: new google.maps.LatLng(array[k][2], array[k][3]),
                icon: "http://92.42.47.18/deers2/123.png",
                map: map,
                customInfo: array[k][1],
                scale: 5.01,

            });

            google.maps.event.addListener(k, 'click', function() {
                alert(this.customInfo);
            });
        
    }
}


}

function displayLocation(latitude, longitude) {
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode({
            'latLng': latlng
        },
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add = results[0].formatted_address;
                    var value = add.split(",");

                    count = value.length;
                    country = value[count - 1];
                    state = value[count - 2];
                    city = value[count - 3];
                    asd = state + ", " + country;
                } else {
                    return "address not found";
                }
            } else {
                return "Geocoder failed due to: " + status;
            }
        }
    );
    return asd;
}
// [END maps_custom_markers]

