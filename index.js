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
                var pubg = ch.guild.emojis.find(emoji => emoji.name == 'pubg');
                var rain = ch.guild.emojis.find(emoji => emoji.name == 'rainbow');

                webhook.send(`- react with the icon of the game you enjoy playing the most **TO ACCESS THE SERVER**:` , {
                    "code": true,
                    "username": member.user.username,
                    "avatarURL": member.user.avatarURL                    
                }).then((msg) => {
                    msg.react(lol);
                    msg.react(fortnite);
                    msg.react(pubg);
                    msg.react(rain);
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
        member.guild.roles.find(role => role.name == member.id).delete();
        member.setNickname(user.username + ' | LoL').then(()=>{
            react.message.channel.fetchWebhooks().then(hooks => {
                member.addRole('511539866136346664');
                hooks.find(hook => hook.channelID == react.message.channel.id).delete();
                react.message.channel.delete();
            }).catch(err => console.log(err));            
        });

    } else if (bot.emojis.find(emoji => emoji.name == 'Fortnite').equals(react.emoji)) {
        var member = bot.guilds.get('408723727967191053').members.find(member => member.id == user.id);
        member.guild.roles.find(role => role.name == member.id).delete();
        member.setNickname(user.username + ' | Fortnite').then(() => {
            react.message.channel.fetchWebhooks().then(hooks => {
                member.addRole('511539362387984414');
                hooks.find(hook => hook.channelID == react.message.channel.id).delete();
                react.message.channel.delete();
            }).catch(err => console.log(err));
        });

    } else if (bot.emojis.find(emoji => emoji.name == 'pubg').equals(react.emoji)) {
        var member = bot.guilds.get('408723727967191053').members.find(member => member.id == user.id);
        member.guild.roles.find(role => role.name == member.id).delete();
        member.setNickname(user.username + ' | Pubg').then(() => {
            react.message.channel.fetchWebhooks().then(hooks => {
                hooks.find(hook => hook.channelID == react.message.channel.id).delete();
                react.message.channel.delete();
                member.addRole('512879771948941332');
            }).catch(err => console.log(err));        
        });


    } else if (bot.emojis.find(emoji => emoji.name == 'rainbow').equals(react.emoji)) {
        var member = bot.guilds.get('408723727967191053').members.find(member => member.id == user.id);
        member.guild.roles.find(role => role.name == member.id).delete();
        member.setNickname(user.username + ' | R6').then(() => {
            react.message.channel.fetchWebhooks().then(hooks => {
                member.addRole('512886432457818113');
                hooks.find(hook => hook.channelID == react.message.channel.id).delete();
                react.message.channel.delete();
            }).catch(err => console.log(err));            
        });


    }
})

bot.on("message", (msg) => {
    if(msg.author.equals(bot.user) || msg.author.bot || msg.channel.type != "text") return;
    if(msg.member.roles.get('426034784024657930') == undefined) return;
    if(msg.content.startsWith("-meme ")) {
        var link = msg.content.replace('-meme ', '').split('|')[1];
        var title = msg.content.replace('-meme ', '').split('|')[0];
        var hook = new Discord.WebhookClient("512389205591326720", "HalRUU_U87oe2wqfZ3hF6M85Z6W4V5XCJ2-voCa5FNqQOpLX3VZXFAh_lpb_SsQdzMUT");
        hook.send(title, {
            "file" : link
        })

    } else if(msg.content.startsWith("-faker ")) {
        var link = msg.content.replace('-faker ', '').split('|')[1];
        var title = msg.content.replace('-faker ', '').split('|')[0];
        var hooka = new Discord.WebhookClient("512691567262171137", "FkoGsB9koO-VFzLFq6o2jED2VBV9wu9IwsSSQAoMMGFybgVMlfFXFrLJK4zq_y4bCRu7");

        hooka.send(title, {
            "file" : link
        })
    } else if(msg.content.startsWith("-ninja ")) {
        var link = msg.content.replace('-ninja ', '').split('|')[1];
        var title = msg.content.replace('-ninja ', '').split('|')[0];
        var hooka = new Discord.WebhookClient("512691796044677120", "pJQ7uxwh87YcZkCKN71a9_61i3v75LJU8jVa1DdH3zJqDh0n0nCOjRykU25xZ99wFsKq");

        hooka.send(title, {
            "file" : link
        })
    } else if(msg.content.startsWith("-sup ")) {
        var link = msg.content.replace('-sup ', '').split('|')[1];
        var title = msg.content.replace('-sup ', '').split('|')[0];
        var hooka = new Discord.WebhookClient("512683853337460778", "bQqmGMJUHFJTNs5u5NyObyRetJxkFT3xZr9hm2a0HInsC9Us72SeGhlHizX5puvUXDAf");

        hooka.send(title, {
            "file" : link
        })
    } else if(msg.content.startsWith("-memef ")) {
        var link = msg.content.replace('-memef ', '').split('|')[1];
        var title = msg.content.replace('-memef ', '').split('|')[0];
        var hooka = new Discord.WebhookClient("512708121404112897", "qKl_wXbSIfRcUlS4juaKl8OJ5WrN7tO1eqB9cNpWEqf6LtO5C7lO4g_2Z4uWESzg4TkI");

        hooka.send(title, {
            "file" : link
        })
    } else if(msg.content.startsWith("-r6 ")) {
        var link = msg.content.replace('-r6 ', '').split('|')[1];
        var title = msg.content.replace('-r6 ', '').split('|')[0];
        var hooka = new Discord.WebhookClient("513109241016352806", "Ijif4EqR16toju8Bof2d-rHNsDdScUGN4j2sk5H96m_Z4oUhYbI8whCwXr3Rt9zxPcVp");

        hooka.send(title, {
            "file" : link
        })
    } else if(msg.content.startsWith("-memer ")) {
        var link = msg.content.replace('-memer ', '').split('|')[1];
        var title = msg.content.replace('-memer ', '').split('|')[0];
        var hooka = new Discord.WebhookClient("513118730125967360", "7niAhsPQyCzYnKixXnKPUBxqEZIA_Vu99tuQR7CkCq75xoSfx6hLoWKe_c1gqvQor6Ep");

        hooka.send(title, {
            "file" : link
        })
    }
})

bot.login(process.env.BOT_TOKEN);
