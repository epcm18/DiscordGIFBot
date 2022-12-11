console.log("Beep Beep!");

require("dotenv").config();

const fetch = require('node-fetch');
const keepAlive = require("./server");
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        "GUILDS", "GUILD_MESSAGES" 
    ]
});
keepAlive();
client.login(process.env.BOTTOKEN);
//client.login(process.env.TENORTOKEN);

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('running...');
}

const replies = ["Ding! 🔔", "Hello there 👋", "Here I am. 😊"]
client.on('message', gotMessage);

async function gotMessage(msg) {

    if (msg.channel.id =='###YOURDISCORDCHANNELNUMBER###') {
        let tokens = msg.content.split(" ");
        const index = Math.floor(Math.random() * replies.length);
        if (tokens[0]=='!oggy') {
            msg.reply(replies[index]);
        }
        else if (tokens[0] == "!gif") {
            let keywords = "cat";
            if (tokens.length>1){
                keywords = tokens.slice(1, tokens.length).join(" ");
            }
            //msg.channel.send("gif!")
            let url = 'https://tenor.googleapis.com/v2/search?q='+keywords+'&key='+process.env.api+'&client_key=my_test_app';
            let response = await fetch(url);
            let json = await response.json();
            let pos = Math.floor(Math.random()*json.results.length);
            //console.log(json);
            msg.channel.send(json.results[index].url);
        }
        else if(tokens[0]== "!help"){
            msg.reply("\nHey there, welcome to the help page. \n"
            + "If you want to call oggy use '!oggy'. \n"
            + "If you want a gif try using '!gif' \n"
            + "If you want a gif on a specific field use '!gif + ___'");
        }
    }

    
}
