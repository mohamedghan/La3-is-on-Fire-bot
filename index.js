const Discord = require('discord.js');
const request = require('request');
const bot = new Discord.Client();
const prefix = "!";
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity("Fortnite", { type: 'PLAYING' });
});

bot.on('message', msg => {

    if (msg.author.equals(bot.user)) return;
    if (msg.channel.type !== 'text') return;
    if (msg.guild.id != 408723727967191053) return;
    if (!msg.content.startsWith(prefix)) return;

//commands


        if (!msg.content == "!fuck") {
            msg.reply('fuck you ' + msg.author.username + ' :D');
        }
    
    
});   

bot.login('NDI4OTQyOTcxMTU3ODcyNjYw.DaaEPw.I6ZZCcmdquR-gKttd3DxUkJCAtc');
