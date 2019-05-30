const Discord = require('discord.js');


module.exports.run = async (bot, msg, args, con) => {
	if(!msg.member.voiceChannel) return;
	var ch = await msg.member.voiceChannel;
	ch.leave();
}

module.exports.help = {
	name: "le"
}