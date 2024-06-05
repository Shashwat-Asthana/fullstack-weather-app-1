const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));//not working 


app.listen(3000,function(){
    console.log("Server is running");
});

app.get("/",function(req,res){//to check..
    
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    // console.log("post request received."); // to check the post request
    // console.log(req.body.cityName);

    const query = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid=990c6357816e41403084776970d67b55";
    https.get(url,function(response){
        // console.log(response);
        console.log(response.statusCode);//check the status of response
        response.on("data",function(data){
            // console.log(data);//here in data we get buffer hexadecimal numbers.
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            // const object = {
            //     name: "Shashwat Asthana",
            //     favouriteFood:"Chilly Paneer"
            // }
            // console.log(JSON.stringify(object));//Opposite of parse it converts the JS object into a single string.

            //Now to choose the parsed data specifically
            const temp = weatherData.main.temp
            console.log(temp);
            const disp = weatherData.weather[0].description;
            console.log(disp);
            //to add the icon accordint to the weather
            const icon = weatherData.weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            // Now adding Image element using html
            

            //Now we are using response to show the client data we requested weather api.
            // res.send("<h1>The temperature in Delhi is " + temp + " degrees Celcius.</h1>");
            //To have more res.send we use res.write for both and at last call the
            res.write("<h1>The temperature in " + query+ " is " + temp + " degrees Celcius.</h1>");
            res.write("<p><b>The weather is currently "+ disp + "</b></p>");
            //to show image to the user.
            res.write("<img src="+ imgUrl + ">");
            res.send();

        });// res.send("Server is up and runnin.");//We can only send one requesg in one app.Basically after res the do not give any other response.
    });
});




