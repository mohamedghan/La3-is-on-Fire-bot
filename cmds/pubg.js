const Discord = require('discord.js');


module.exports.run = async (bot, msg, args, con) => {
		if(msg.channel.id !== con.adminsch) return;
	    data = args.join(' ');
	    let text = data.split(';')[0];
	    let link = data.split(';')[1];
        var hooka = new Discord.WebhookClient(con.webhooks.pubg.id, con.webhooks.pubg.token);

        hooka.send(text, {
            "file" : link
        })
}

module.exports.help = {
	name: "pubg"
}