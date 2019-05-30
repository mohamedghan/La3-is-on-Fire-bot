const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports.run = async (bot, msg, args, con) => {
	if(!msg.member.voiceChannel) return;
	var link = args[0];
	const streamOptions = { seek: 0, volume: 1 };
	msg.member.voiceChannel.join()
	  .then(connection => {
		const stream = ytdl(link, { filter : 'audioonly' });
		const dispatcher = connection.playStream(stream, streamOptions);
	  })
	  .catch(console.error);
}

module.exports.help = {
	name: "jj"
}