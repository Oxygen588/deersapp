const http = require("http");
const host = 'localhost';
const port = 8000;
const cors = require('cors');


  
var geocoder = require('local-reverse-geocoder');

// With just one point



const nf = require("node-fetch");


async function a123(k){
    asd = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+instances[k][2]+','+instances[k][3]+'&key=AIzaSyDc51T5fESYAMxLwZqWljO6Q8AibXK8_qw';
    resss = ""
    var url = asd
    
    nf(url).then(u => u.json()).then(j => instances[k][4] = j["results"][0]["address_components"][1]["long_name"]);
    setTimeout(function() {
      
        return geta()
    }, 200);

   
    }


instances = {["asd"] : [deers = 0, info = "Latest data:\n"+dnone(deers), Lat = 51.40241887397332, Long=-1.2304687500000002, geo = "", lnk = ""],
["asda"] : [deers = 1, info = "Latest data:\n"+dnone(deers), Lat = 52.90241887397332, Long=-1.2304687500000002, geo = "", lnk = ""]



};

function dnone(d){
    if (d == 0){
        return "(none)"
    }else{
        return ""
    }
}

var aaaaa = "a";

function seta(a1){
    
    aaaaa = a1;
    
}
function geta(){
    console.log(aaaaa);
    return aaaaa;
    
}

function ret(L,LA,a){
    var geocoding = new require('reverse-geocoding');
    var config = {
        'latitude': L,
        'longitude': LA,
        'key' : "AIzaSyDc51T5fESYAMxLwZqWljO6Q8AibXK8_qw"
    };
    geocoding(config,a,instances, function (err, data){instances[k][4] = data.plus_code.compound_code;});
}
tor1 = ""
function toview(){
    tor = []
    for (var k in instances){
             a123(k)
             instances[k][5] = "http://92.42.47.18/deers1/index.html?lat="+instances[k][3]+"=&lng="+instances[k][3]
             tor.push(instances[k])
        
    }
    tor1 = tor
}

var clients = {};
var express = require('express');
var app = express();
app.use(cors({
    origin: '*'
}));

app.get('/get', function(req, res){
    toview()
    res.end(JSON.stringify(tor1));
});



app.listen(8000);






const requestListener = function (req, res) {
    res.writeHead(200);
    toview()
    res.end(JSON.stringify(tor1));

}




var WebSocketClient = require('websocket').client;
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 801 })


var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    client.connect('ws://192.168.1.106:81/');
    console.log("con failed")
});

client.on('disconnect', function() {
    console.log('client socketio disconnect!')
 });








client.on('connect', function(connection) {
    rrr = Math.random(0, 99999999999)
    instances[rrr] = {}
    instances[rrr].deers = 0
    instances[rrr].info = "Latest detected deers:\n"
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
        client.connect('ws://192.168.1.106:81/');
    });
    connection.on('close', function() {
        client.connect('ws://192.168.1.106:81/');
        console.log("con failed")
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            if (message.utf8Data.includes("Lat:")) {
                instances[rrr].Lat = parseFloat(message.utf8Data.replace('Lat:', ''));
            }
            if (message.utf8Data.includes("Long:")) {
                instances[rrr].Long = parseFloat(message.utf8Data.replace('Long:', ''));
            }
            if (message.utf8Data.includes("GOTIT")) {
                instances[rrr].deers = instances[rrr].deers + 1
                instances[rrr].info = instances[rrr].info + new Date() + "\n";
                msg = {}
                msg.type = "newdeer"
                msg.data = instances
                msg.newPLong = instances[rrr].Long
                msg.newPLat = instances[rrr].Lat

                clients.forEach(function(client) {
                    client.send(JSON.stringify(msg));
                });
            }
        }
        console.log(message);
    });
    

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }

});


client.connect('ws://192.168.1.106:81/');

toview()




wss.on('connection', ws => {
    toview()
    clients[ws] = ws;

    app.get('/lat/:lat/long/:long/time/:time', function(req, res){
        let date_ob = new Date();
    
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    
    // current year
    let year = date_ob.getFullYear();
    
    // current hours
    let hours = date_ob.getHours();
    
    // current minutes
    let minutes = date_ob.getMinutes();
    
    // current seconds
    let seconds = date_ob.getSeconds();
    
    // prints date in YYYY-MM-DD format
    
    
        rrr = req.params["lat"]
    
        instances[rrr] = [deers = 0, info = "Latest data:\n"+dnone(deers), Lat = 51.40241887397332, Long=-1.2304687500000002, geo = "", lnk = ""]
        instances[rrr][1] = "New deer detected at :"+ month + "-" + date + " " + hours + ":" + minutes + ":" + seconds+" (By transpasser) \n"
       
        instances[rrr][2] = req.params["lat"];
        instances[rrr][3] = req.params["long"];
        instances[rrr][0] = instances[rrr][0] + 1
        msg = {};
        msg.type = "newdeer";
        msg.data = instances;
        msg.newPLong = instances[rrr][3];
        msg.newPLat = instances[rrr][2];
        console.log(clients)
   
            ws.send(JSON.stringify(instances));
       
        
    
    
    
    
    
    
        res.send(instances[rrr])
        console.log(req.params)
    });


            ws.send(JSON.stringify(instances))
})


