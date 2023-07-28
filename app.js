//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req , res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    
    const firstName = req.body.fName; 
    const lastName = req.body.lName;
    const emailid = req.body.email;
   
    const data = {
        members: [
            {
                email_address: emailid,
                status: "subscribed",
                merge_fields: {
                 FNAME: firstName,
                 LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    
    const url = "https://us21.api.mailchimp.com/3.0/lists/0fc1238e76";

   const options = {
    method: "POST",
    auth: "abhi1:ed96e5d82c17da88a0d108fd642493d5-us21"
   } 

    const request = https.request(url , options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/faliure.html");
        }
        
        response.on("data" , function(data){
            console.log(JSON.parse(data));
        }) 
    })
    
   request.write(jsonData);
   request.end();

   app.post("/faliure", function(req , res ){
    res.redirect("/")
   })

});
app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
});


// Api - key
// ed96e5d82c17da88a0d108fd642493d5-us21


//List id  (Audience-id) (Unique - id)
// 0fc1238e76.