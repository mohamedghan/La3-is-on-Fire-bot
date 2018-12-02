const Discord = require('discord.js');


module.exports.run = async (bot, msg, args, con) => {
	    data = args.join(' ');
	    let text = data.split(';')[0];
	    let link = data.split(';')[1];
        var hooka = new Discord.WebhookClient(con.webhooks.ninja.id, con.webhooks.ninja.token);

        hooka.send(text, {
            "file" : link
        })
}

module.exports.help = {
	name: "ninja"
}