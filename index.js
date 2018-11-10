const Discord = require('discord.js');
const https = require('https');
const request = require('request');
const bot = new Discord.Client();
const prefix = "!";
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity("Fortnite", { type: 'PLAYING' });
});

bot.on('message', msg => {

    if (msg.author.equals(bot.user)) return;
    if (!msg.content.startsWith(prefix)) return;

//commands



            msg.react('♥');
           
            https.get('https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + msg.content.replace('!','') + '?api_key=RGAPI-1bdbc014-4437-4746-a22d-d3dd31daef7d', (resp) => {
                let data = '';

                 // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                 let base = JSON.parse(data);
                 msg.reply(base.name + ' is a level '+ base.summonerLevel + ' boosted guy, report him and makee your life so much !');
                 });

                 }).on("error", (err) => {
                    console.log("Error: " + err.message);
                 });
            
    
    
});   

bot.login('NDI4OTQyOTcxMTU3ODcyNjYw.DaaEPw.I6ZZCcmdquR-gKttd3DxUkJCAtc');
