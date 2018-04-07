const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "!";
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("my skills", { type: 'TESTING' });
});





//commands
bot.on('message', msg => {
            var cha = msg.guild.channels.find('name', 'bot_commands').id;
            if (cha != msg.channel.id) {
                if (msg.content.startsWith('!')) {
                    msg.reply('bellehi sayeb sala7 wel commands ektebhom ken fel bot_commands. ani sama7tek el marra hethi ama el marra ejjeya wlh n9oul el hama yetfehem m3ak');
                    msg.delete();
                } else if (msg.author.tag == "Rythm#3722") {
                    msg.delete();
                } else if (msg.author.tag == "La3 is on Fire#5723") {
                    msg.delete(12000);
                }
            } else {
                if (msg.content.startsWith(prefix + "pubg")) {
                	
                }
            }



});

bot.login(process.env.BOT_TOKEN);
