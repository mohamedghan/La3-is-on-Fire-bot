const con = require('./config');
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir('./cmds', (err, files) => {
	if(err) console.log(err);

	let jsfiles = files.filter(f => f.split('.').pop() === 'js');
	if(jsfiles.length <= 0) {
		console.log('no commands');
		return;
	}

	jsfiles.forEach((f, i) => {
	  let props = require(`./cmds/${f}`);
	  console.log(`${f} loaded`);
	  bot.commands.set(props.help.name, props);
	})
})


bot.on('ready', async () => {
	console.log(`${bot.user.tag} has logged in`);
    bot.user.setActivity(`have a nice day !`, { type: 'PLAYING' });
});


bot.on('guildMemberAdd', async member => {
    if(member.user.bot) return;
	member.setNickname('GUEST | ' + member.user.username);
	await member.guild.createRole({
        name: member.id,
        color: "#f86f6f"
    }).then( async role => {
    	member.addRole(role);
    	await member.guild.createChannel('START HERE:' + member.user.username, 'text', [{
            id: role.id,
            allowed: ['SEND_MESSAGES', 'READ_MESSAGES', 'READ_MESSAGE_HISTORY']
        }]).then( async ch => {
        	await ch.setTopic(member.id)
        	await ch.send(`hi ${member}, u have to complete these few steps to join our server !`);
        	//here
        	let lol = await ch.guild.emojis.find(emoji => emoji.name == 'LoL');
            let fortnite = await ch.guild.emojis.find(emoji => emoji.name == 'Fortnite');
        	let pubg = await ch.guild.emojis.find(emoji => emoji.name == 'pubg');
            let rainbow = await ch.guild.emojis.find(emoji => emoji.name == 'rainbow');

        	ch.startTyping();
        	setTimeout(() => {
        		ch.send(`Please react with the icon of the game you enjoy playing the most\n${fortnite} : Fortnite\n${lol} : League of Legends\n${pubg} : PUBG\n${rainbow} : rainbow six siege`).then(async msg => {
        			//here
        			await msg.react(lol);
        			await msg.react(fortnite);
        			await msg.react(pubg);
        			await msg.react(rainbow);
        		});
        		ch.stopTyping();
        	}, 3000)

        }).catch(err => console.log(err.stack));
    }).catch(err => console.log(err.stack));
})

bot.on('guildMemberRemove', async member => {
    if (member.guild.roles.find(role => role.name == member.id)) {
        await member.guild.roles.find(role => role.name == member.id).delete(); 
    }
    if (member.guild.channels.find(ch => ch.topic == member.id)) {
        await member.guild.channels.find(ch => ch.topic == member.id).delete();
    }
})

bot.on('messageReactionAdd', async (react, user) => {
	if (user.bot) return;
	let guild = await bot.guilds.get(con.guildId);
    if (!guild.members.has(react.message.channel.topic)) return;
    let cEmoji = react.emoji.name;
    let member = await guild.members.get(react.message.channel.topic);
    let dRole = await guild.roles.find(role => role.name == member.id);
    //here
    switch (cEmoji) {
    	case 'LoL':
    		await member.setNickname(user.username + ' | LoL');
    		await member.addRole(con.roles.lol);
    		await react.message.channel.delete();
    		dRole.delete();
    		break;
    	case 'Fortnite':
    		await member.setNickname(user.username + ' | Fortnite');
    		await member.addRole(con.roles.fortnite);
    		await react.message.channel.delete();
    		dRole.delete();
    		break;
    	case 'pubg':
    		await member.setNickname(user.username + ' | PUBG');
    		await member.addRole(con.roles.pubg);
    		await react.message.channel.delete();
    		dRole.delete();
    		break;
    	case 'rainbow':
    		await member.setNickname(user.username + ' | R6');
    		await member.addRole(con.roles.rain);
    		await react.message.channel.delete();
    		dRole.delete();
    		break;
    	default :
    		await react.message.channel.send(`This reaction can't be used here!`);
    }

});


bot.on('message', async (msg) => {
    if(msg.author.bot) return;

    let prefix = con.prefix;
    let msgarray = msg.content.split(' ');
    let cmd = msgarray[0];
    let args = msgarray.slice(1);

    let cmdfile = bot.commands.get(cmd.slice(prefix.length));

    if(cmdfile) cmdfile.run(bot, msg, args, con);
});

bot.on('voiceStateUpdate', (omem,nmem) => {
	if(nmem !== undefined) {
		if (nmem.displayName.includes('TEAM 1') && nmem.voiceChannel && nmem.voiceChannel.id !== '511547293842014210') {
			nmem.setVoiceChannel('511547293842014210')
		} else if (nmem.displayName.includes('TEAM 2') && nmem.voiceChannel && nmem.voiceChannel.id !== '511547326771494913') {
			nmem.setVoiceChannel('511547326771494913')
		}
	}
})


bot.login(process.env.BOT_TOKEN);
