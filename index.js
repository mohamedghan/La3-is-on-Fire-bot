const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "3! ";
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("la casa de papel", { type: 'WATCHING' });
});

/*
bot.on('channelCreate', cha => {
	cha.sendMessage(cha.client + " zed " + cha.type + " fi " + cha.createdAt + " .So yfz");
});

*/








//commands
bot.on('message', msg => {
  if (msg.content === prefix + 'ping') {
    msg.reply('Pong!');
  }
  else   if (msg.content === prefix + 'wa9teh touledet') {
    msg.reply('touledet ' + bot.user.createdAt);
  }
  else   if (msg.content === prefix + 'chkoun bouk w omek') {
    msg.reply('baba TYZ w ommi na5a :D');
  }
});

bot.login(process.env.BOT_TOKEN);
