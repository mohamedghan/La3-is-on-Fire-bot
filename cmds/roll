const Discord = require('discord.js');


module.exports.run = async (bot, msg, args, con) => {
	if(msg.channel.type === 'dm') return;
	if (!msg.member.roles.has(con.roles.captains)) return;
	if (args.includes('reset')) {
		msg.mentions.members.every(mem => {
			mem.setNickname('');
		})
		msg.delete()
		return;
	}
	var mems = await msg.mentions.members;
	var team1= [],team2 = [];
	if(mems.size % 2 != 0) return;
	var channel = await msg.mentions.channels.first();
	while(mems.size > 0 && team1.length <= mems.size/2 && team2.length <= mems.size/2) {
		var chosen = mems.random();
		team1.push(chosen);
		mems = mems.filter(mem => mem.id != chosen.id);
		chosen = mems.random();
		team2.push(chosen);
		mems = mems.filter(mem => mem.id != chosen.id);
	}
	channel.send('TEAM 1:')
	team1.forEach(mem => {
		channel.send(`${mem} ${!mem.voiceChannel ? '(you have to connect to team 1 voice channel)':''}
`).then(s => {
	mem.setVoiceChannel('511547293842014210').catch(e => console.log(''))
	mem.setNickname(`${mem.user.username} - TEAM 1`).catch(e => console.log())
});
	})
	channel.send('TEAM 2:')
	team2.forEach((mem,i) => {
		channel.send(`${mem} ${!mem.voiceChannel ? '(you have to connect to team 2 voice channel)':''}
`).then(s => {
	mem.setVoiceChannel('511547326771494913').catch(e => console.log(''))
	mem.setNickname(`${mem.user.username} - TEAM 2`).catch(e => console.log())
});
	})
	msg.delete()
}

module.exports.help = {
	name: "r"
}