const Discord = require('discord.js');
const https = require('https');
const bot = new Discord.Client();
const prefix = {
    lol:"!lol/"
};
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity(`${prefix.lol}summoner name|Euw Only`, { type: 'PLAYING' });
});

bot.on('message', msg => {

    if (msg.author.equals(bot.user)) return;
    if (msg.content.startsWith(prefix.lol)) {


            let sname = msg.content.replace(prefix.lol,'');
            if (sname == "") return;
            https.get(`https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${sname}?api_key=RGAPI-1bdbc014-4437-4746-a22d-d3dd31daef7d`, (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    let base = JSON.parse(data);
                    if (base.status != null) {
                        msg.react('😫');
                    } else {
                    msg.react('♥');
                    msg.reply(`${base.name} is a level ${base.summonerLevel} boosted guy, report him and make your life much more easier!`);
                    }
                });

                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                    msg.react('😫');
                });
            
    }
    
});   

bot.login('NDI4OTQyOTcxMTU3ODcyNjYw.DaaEPw.I6ZZCcmdquR-gKttd3DxUkJCAtc');
