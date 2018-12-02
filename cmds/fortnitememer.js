const Discord = require('discord.js');


module.exports.run = async (bot, msg, args, con) => {
		if(msg.channel.id !== con.adminsch) return;
	    data = args.join(' ');
	    let text = data.split(';')[0];
	    let link = data.split(';')[1];
        var hooka = new Discord.WebhookClient(con.webhooks.fmeme.id, con.webhooks.fmeme.token);

        hooka.send(text, {
            "file" : link
        })
}

module.exports.help = {
	name: "fmeme"
}