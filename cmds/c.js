const Discord = require('discord.js');


module.exports.run = async (bot, msg, args, con) => {
    if (!msg.member.roles.has(con.roles.captains)) return;
    var channels = await msg.mentions.channels;
    var user = await msg.mentions.members.first().user;
    channels = channels.filter(ch => ch.type === 'text');
    channels.every(async ch => {
        var msgs = ch.fetchMessages({limit : 100}).then(ms => {
            ms.filter((m) => m.author.equals(user)).every(m => {
                m.delete();
            })
        });
    })
}

module.exports.help = {
    name: "c"
}