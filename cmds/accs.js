const Discord = require('discord.js');


module.exports.run = async (bot, msg, args, con) => {
    if (!msg.member.roles.has(con.roles.captains)) return;
}

module.exports.help = {
    name: "profile"
}