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
                    https.get(`https://euw1.api.riotgames.com/lol/league/v3/positions/by-summoner/${base.id}?api_key=RGAPI-1bdbc014-4437-4746-a22d-d3dd31daef7d`, (respa) => {
                    let dataa = '';
                    respa.on('data', (chunka) => {
                        dataa += chunka;
                    });

                    respa.on('end', () => {
                    let base1 = JSON.parse(dataa);
                    if (base1.status != null) {
                        msg.react('😫');
                    } else {
                        let msg = `${base.name} is a level ${base.summonerLevel} and ${base1[0].tier} ${base1[0].rank}(${base1[0].leaguePoints}LP) boosted guy, report him and make your life much more easier!`;
                        msg.react('♥');
                        msg.reply(msg);
                        }
                    });

                    }).on("error", (err) => {
                        console.log("Error: " + err.message);
                        msg.react('😫');
                    });
                    }
                });

                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                    msg.react('😫');
                });
            
    }
    
});   

bot.login(process.env.BOT_TOKEN);
