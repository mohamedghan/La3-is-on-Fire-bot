const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "3! ";
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("my skills", { type: 'TESTING' });
});






//commands
bot.on('message', msg => {
var cha = msg.guild.channels.find('name', 'bot_commands').id;
if (msg.content.startsWith('!p ') || msg.content.startsWith('!play ') || msg.content.startsWith('!s ') || msg.content.startsWith('!skip ') || msg.content.startsWith('!leave ') || msg.content.startsWith('!join ')) {
	if(cha != msg.channel.id) {
		msg.reply('bellehi sayeb sala7 wel commands ektebhom ken fel bot_commands. ani sama7tek el marra hethi ama el marra ejjeya wlh n9oul el hama yetfehem m3ak');
		msg.delete();
	}
}
else if(cha != msg.channel.id && msg.author.tag == "Rythm#3722") {
	msg.delete();
}
else if(cha != msg.channel.id && msg.author.tag == "La3 is on Fire#5723" ) {
	msg.delete(12000);
}





});

bot.login(process.env.BOT_TOKEN);
