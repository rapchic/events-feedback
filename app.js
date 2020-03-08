
require('dotenv').config();
var cloudant = require('@cloudant/cloudant');

var express = require("express");
var cfenv = require("cfenv");
var secureEnv = require('secure-env');

var bodyParser = require('body-parser');

var appEnv = cfenv.getAppEnv();
global.env = secureEnv({secret:'mySecretPassword'});
var app = express();

var username = global.env.cloudantusername || "nodejs";
var password = global.env.cloudantpassword;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// let mydb, cloudant;
var vendor = 'cloudant'; // Because the MongoDB and Cloudant use different API commands, we
            // have to check which command should be used based on the database
            // vendor.
var dbName = 'mydb';

var cloudant = cloudant({account:username, password:password});
mydb = cloudant.db.use(global.env.dbname);

app.post('/api/attendees', function(req,res){
    var doc={
        time: new Date().toISOString(),
        eventrating: req.body.event_rate,
        informationrating: req.body.info_rate,
        speakerrating: req.body.speaker_rate,
        futureevents: req.body.future_events,
        satisfaction: req.body.satisfaction,
        improvements: req.body.improvement
        };

mydb.insert(doc,function(err,body,header){
    if(err){
    res.send("<h3>Oops, an error has been encountered!</h3>");
        console.log('Error:'+err.message);
        return;
    }
    else{
        return res.sendFile(__dirname + "/views/success.html"); }
    });
});


// For creating a new doc for each new entry

// var insertOne = {};
// var getAll = {};
//
// insertOne.cloudant = function(doc, response) {
//   mydb.insert(doc, function(err, body, header) {
//     if (err) {
//       console.log('[mydb.insert] ', err.message);
//       response.send("Error");
//       return;
//     }
//     doc._id = body.id;
//     response.send('Thank you for the response');
//   });
// }
//
// getAll.cloudant = function(response) {
//   var names = [];
//   mydb.list({ include_docs: true }, function(err, body) {
//     if (!err) {
//       body.rows.forEach(function(row) {
//         if(row.doc.name)
//           names.push(row.doc.name);
//       });
//       response.json(names);
//     }
//   });
//
// }
//
// app.post("/api/attendees", function (request, response) {
//
//   var name = request.body.name;
//   var email =request.body.email;
//   var pass = request.body.password;
//   var phone =request.body.phone;
//
//   var doc = {
//       "name": name,
//       "email": email,
//       "password": pass,
//       "phone": phone
//     };
//   if(!mydb) {
//       console.log("No database.");
//       response.send(doc);
//       return;
//     }
//     insertOne[vendor](doc, response);
//   });
//
//
//
// app.get("/api/attendees", function (request, response) {
//   var names = [];
//   if(!mydb) {
//     response.json(names);
//     return;
//   }
//   getAll[vendor](response);
// });


// load local VCAP configuration  and service credentials
// var vcapLocal;
// try {
//   vcapLocal = require('./vcap-local.json');
//   console.log("Loaded local VCAP", vcapLocal);
// } catch (e) { }
//
// const appEnvOpts = vcapLocal ? {
//   vcap: vcapLocal} : {}
//
// const appEnv = cfenv.getAppEnv(appEnvOpts);
//
//
// if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/[Cc][Ll][Oo][Uu][Dd][Aa][Nn][Tt]/)) {
//   // Load the Cloudant library.
// var Cloudant = require('@cloudant/cloudant');
//
// dbName = 'mydb';


//   // Initialize database with credentials
//   if (appEnv.services['cloudantNoSQLDB']) {
//   // CF service named 'cloudantNoSQLDB'
//     cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
//   } else {
//      // user-provided service with 'cloudant' in its name
//      cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
//    }
// } else if (process.env.CLOUDANT_URL){
//   cloudant = Cloudant(process.env.CLOUDANT_URL);
// }
//    if(cloudant) {
//   //database name
//   dbName = 'mydb';
//
//Create a new "mydb" database.
  cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });
//
  // Specify the database we are going to use (mydb)...
  mydb = cloudant.db.use(dbName);

  vendor = 'cloudant';
//}

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));

// var port = process.env.PORT || 3000
// app.listen(port, function() {
//     console.log("To view your app, open this link in your browser: http://localhost:" + port);
// });

const port = 3001;
app.listen(port, function () {
    console.log("Server running on port: %d", port);
});
module.exports = app;
