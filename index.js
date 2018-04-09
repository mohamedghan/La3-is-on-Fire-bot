const Discord = require('discord.js');
const Fortnite = require('fortnite');
const client = new Fortnite('165f3d18-9230-4a03-89fc-9a2743e22e50');
const bot = new Discord.Client();
const prefix = "!";
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("my skills", { type: 'TESTING' });
});





//commands
bot.on('message', msg => {
	if (msg.channel.type == 'text') {
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
                if (msg.content.startsWith(prefix + "fortnite-pc")) {
                	var con = msg.content.substr(0,msg.content.indexOf(' ')).split('-')[1];
                	var name = msg.content.substr(msg.content.indexOf(' ')+1);
                	client.getInfo(name, con).then(data => {
                		var res = new Discord.RichEmbed();
                		var stats = data.lifetimeStats;
                		var tPlayed = stats.find(s => s.stat == 'timePlayed');
                		var wins = stats.find(s => s.stat == 'wins');
                		var win = stats.find(s => s.stat == 'win');
                		var mPlayed = stats.find(s => s.stat == 'matchesPlayed');
                		var kills = stats.find(s => s.stat == 'kills');
                		var avgSurvivalTime = stats.find(s => s.stat == 'avgSurvivalTime');
                		res
                		.setTitle('Fortnite Stats: ' + data.username)
                		.setThumbnail(msg.author.avatarURL)
                		.addField("Time played", tPlayed.value)
                		.addField("kills", kills.value)
                		.addField("Wins", wins.value)
                		.addField("win rate", win.value + " of " + mPlayed.value + " matches")
                		.addField("survival time average", avgSurvivalTime.value);
                		msg.author.send(res);
                	}).catch(e => {
                		console.log(e);
                		msg.reply("fortnite bot don't know dat bitch!");
                	});
                }
            }


} else {

}
});

bot.login(process.env.BOT_TOKEN);
