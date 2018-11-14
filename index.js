const Discord = require('discord.js');
const bot = new Discord.Client({ autofetch: [
    'MESSAGE_CREATE',
    'MESSAGE_UPDATE',
    'MESSAGE_REACTION_ADD',
    'MESSAGE_REACTION_REMOVE',
] });

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity(`have a nice day !`, { type: 'PLAYING' });
});

bot.on('guildMemberAdd', (member) => {
    if(member.user.bot) return;
    member.setNickname('GUEST | ' + member.user.username);
    member.guild.createRole({
        name: member.id,
        color: "#f86f6f"
    }).then((role) => {
        member.addRole(role.id);
        member.guild.createChannel('guide of ' + member.user.username, 'text', [{
            id: role.id,
            allowed: ['SEND_MESSAGES', 'READ_MESSAGES', 'READ_MESSAGE_HISTORY']
        }, {
                id: member.guild.defaultRole,
            denied: ['SEND_MESSAGES', 'READ_MESSAGES', 'READ_MESSAGE_HISTORY']
        }]).then((ch) => {
            ch.setTopic(member.id)
            ch.createWebhook(member.user.username, member.user.avatarURL).then(webhook => {
                webhook.send(`hi ${member.user.username}, u have to complete these little few steps to join our server !`, {
                    "code": true,
                    "username": member.user.username,
                    "avatarURL": member.user.avatarURL
                })

                var lol = ch.guild.emojis.find(emoji => emoji.name == 'LoL');
                var fortnite = ch.guild.emojis.find(emoji => emoji.name == 'Fortnite');

                webhook.send(`- react with the icon of the game you enjoy playing the most **TO ACCESS THE SERVER**:` , {
                    "code": true,
                    "username": member.user.username,
                    "avatarURL": member.user.avatarURL                    
                }).then((msg) => {
                    msg.react(lol);
                    msg.react(fortnite);
                })
            }); 

        });
    });
})

bot.on('guildMemberRemove', (member) => {
    if (member.guild.roles.find(role => role.name == member.id) != undefined) {
        member.guild.roles.find(role => role.name == member.id).delete(); 
    }
    if (member.guild.channels.find(ch => ch.topic == member.id) != undefined) {
        member.guild.channels.find(ch => ch.topic == member.id).delete();
    }
})

bot.on('messageReactionAdd', (react, user) => {
    if (user.bot) return;
    if (react.message.channel.topic != user.id) return;
    if (bot.emojis.find(emoji => emoji.name == 'LoL').equals(react.emoji)) {
        var member = bot.guilds.get('408723727967191053').members.find(member => member.id == user.id);
        member.setRoles(['511539866136346664'])
        member.guild.roles.find(role => role.name == member.id).delete();
        react.message.channel.fetchWebhooks().then(hooks => {
            hooks.find(hook => hook.channelID == react.message.channel.id).delete();
            react.message.channel.delete();
            member.setNickname(user.username + ' | LoL');
        }).catch(err => console.log(err));
    } else if (bot.emojis.find(emoji => emoji.name == 'Fortnite').equals(react.emoji)) {
        var member = bot.guilds.get('408723727967191053').members.find(member => member.id == user.id);
        member.setRoles(['511539362387984414'])
        member.guild.roles.find(role => role.name == member.id).delete();
        react.message.channel.fetchWebhooks().then(hooks => {
            hooks.find(hook => hook.channelID == react.message.channel.id).delete();
            react.message.channel.delete();
            member.setNickname(user.username + ' | Fortnite');
        }).catch(err => console.log(err));

    } 
})

bot.login(process.env.BOT_TOKEN);
