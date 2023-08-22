require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const  Telegram =  require('node-telegram-bot-api')
const {Configuration,OpenAIApi} =  require('openai')
const  token = process.env.BOT_TOKEN
const  bot = new Telegram( process.env.BOT_TOKEN, {polling: true});

const axios = require('axios')     

const configuration = new Configuration({

    
    apiKey: process.env.OPENAI_API_KEY,
    

})




const openai = new OpenAIApi(configuration)


bot.on('message', async (msg) => {
    let chatId = msg.chat.id;
    let city = msg.text;


    try {
        bot.setMyCommands([
            {command: '/start', description: 'Start the bot'},
            {command: '/developer', description: 'Get developer info'},
            {command: '/help', description: 'Get help'},
            {command: '/weather', description: 'Get weather info of a city'},
        ])

        bot.onText(/\/developer/,()=>{
            bot.sendMessage(chatId,`This bot was created by  < @prasshh />\ 
            \n\n You can contact me on 👇 \n\n  👉 LinkedIn: https://www.linkedin.com/in/prakash-dashore \n\n 👉 Instagram: https://instagram.com/this.name_prashhh?igshid=MzNlNGNkZWQ4Mg== \n\n 👉 Email: prakashdashore999@gmail.com`)


        });

        bot.onText(/\/help/, function onPhotoText(msg) {
            // console.log(msg)
            bot.sendMessage(msg.chat.id,msg);
        })

        bot.onText(/\/start/,(msg)=> {
            // console.log(msg)
            
            bot.sendMessage(msg.chat.id,`Wellcome to weather bot 🤖 : ${msg.from.first_name} \ `);

        });

        const {data} = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=982ebea6958ea5111b18650dd7feabb6&units=metric`
    )




    let = weather = data.weather[0].description;
    let = temp = data.main.temp;
    let = feels_like = data.main.feels_like;
    let = humidity = data.main.humidity;
    let = wind_speed = data.wind.speed;
    let = country = data.sys.country;
    let = city_name = data.name;
    let = pressure = data.main.pressure;
    let = visibility = data.visibility;
    let = sunrise = data.sys.sunrise;
    let = sunset = data.sys.sunset;
    let = timezone = data.timezone;
    let = lon = data.coord.lon;
    let = lat = data.coord.lat;
    let = clouds = data.clouds.all;
    let = id = data.id;
    let = base = data.base;
    let = cod = data.cod;
    let = dt = data.dt;
    let = type = data.sys.type;
    let = message = data.message;

    
    bot.sendMessage(chatId, `Weather in ${city_name} is ${weather} and temperature is ${temp}°C`);




    } catch (error) {
        if(error.response.status === 404 || data.cod === 404){
            return bot.sendMessage(chatId, `Please enter a valid city name to know the weather  👻`);
        }

        console.log(error)
        
    }
    




})





app.listen(port, () => console.log(`Listening on port ${port}`))
app.get('/', (req, res) => res.send('Hello World!'))
