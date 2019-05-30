const Discord = require('discord.js');


module.exports.run = async (bot, msg, args, con) => {
	if(!msg.member.voiceChannel) return;
	var ch = await msg.member.voiceChannel;
	ch.join().then(connection => {
		const dispatcher = connection.playFile('./b.mp3');
	});
}

module.exports.help = {
	name: "j"
}