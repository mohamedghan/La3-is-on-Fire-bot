const Discord = require('discord.js');


module.exports.run = async (bot, msg, args, con) => {
	    data = args.join(' ');
	    let text = data.split(';')[0];
	    let link = data.split(';')[1];
        var hooka = new Discord.WebhookClient(con.webhooks.support.id, con.webhooks.support.token);

        hooka.send(text, {
            "file" : link
        })
}

module.exports.help = {
	name: "sup"
}