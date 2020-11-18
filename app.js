const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");
});
app.post("/",function(req,res){
    

        const query=req.body.cityName;
        const api_key="68e828884398fc642e5cb2751bd9852a";
        const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ api_key + "&units=metric";
        https.get(url,function(response){
            console.log(response.statusCode);
            response.on("data",function(data){
                const weather_data=JSON.parse(data);
                const temp=weather_data.main.temp;
                const icon=weather_data.weather[0].icon;
                const weather_description=weather_data.weather[0].description;
                const img_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";
                res.write("<p>the weather in "+query+" is "+weather_description+"</p>");
                res.write("<h1> the current temperature in "+query+" is "+temp+" degree celcius</h1>");
                res.write("<img src="+img_url+">");
                res.send();
    
            });
        });
    
    
});




app.listen(3000,function(){
    console.log("the server is running on port 3000");
});