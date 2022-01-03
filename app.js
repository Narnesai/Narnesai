const express=require('express');
const app=express();
app.use(express.urlencoded({extended:false}));
const https=require('https');

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
    
})


app.post('/temperature',function(request,respon){
    const cityName=request.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=d958d33b0b85ef14cb4594b47850e172"
    if(cityName.length == 0){
        respon.send('please enter city name correctly')
    }
    else{
        https.get(url,function (response) {
            console.log(response.statusCode)
            if(response.statusCode != 200){
                respon.send('Incorrect city name')
            }
            else{

                response.on('data',function(data){
                    const weatherData=JSON.parse(data);
                    const temp=weatherData.main.temp;
                    const weatherDescrip=weatherData.weather[0].description
                    const icon=weatherData.weather[0].icon
                    const iconURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
                    respon.send(
                        '<style>*{margin:0px;pdding:0px}.main-cont{background-image: url("https://images.pexels.com/photos/450055/pexels-photo-450055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");height:100vh;width:100vw;background-size:cover;}.cont{background-color:rgba(0, 0, 0, 0.281);height:100%;width:100%;}.p1 , .p2{color:white;padding:40px 0px 0px 50px;font-size:40px;font-family: Inter,-apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif;font-weight:700}span , .p2{font-size:55px}span , p{color: #e0dfdc;letter-spacing: .1em;text-shadow: 0 -1px 0 #fff, 0 1px 0 #2e2e2e, 0 2px 0 #2c2c2c, 0 3px 0 #2a2a2a, 0 4px 0 #282828, 0 5px 0 #262626, 0 6px 0 #242424, 0 7px 0 #222, 0 8px 0 #202020, 0 9px 0 #1e1e1e, 0 10px 0 #1c1c1c, 0 11px 0 #1a1a1a, 0 12px 0 #181818, 0 13px 0 #161616, 0 14px 0 #141414, 0 15px 0 #121212, 0 22px 30px rgba(0,0,0,0.9);}button{  font-family: "Open Sans", sans-serif;font-size: 16px;letter-spacing: 2px;text-decoration: none;text-transform: uppercase;color: #000;cursor: pointer;border: 3px solid;padding: 0.25em 0.5em;box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;position: relative;user-select: none;-webkit-user-select: none;touch-action: manipulation;margin:50px 0px 0px 60px}</style><div class="main-cont"><div class"cont"><p class="p1"><span>'+cityName +'</span> is with <span>'+temp+'</span> Temperature </p><p class="p2">'+weatherDescrip+' weather</p><a href="/"><button>Go Back</button></a></div></div>'
                        )
                })
            }
            })
        }

})

app.listen(3000,function () {
    console.log('started....')
})