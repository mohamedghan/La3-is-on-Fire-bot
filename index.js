const Discord = require('discord.js');
const request = require('request');
const bot = new Discord.Client();
const prefix = "!";
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity("Fortnite", { type: 'PLAYING' });
});

bot.on('channelCreate', function(chan) {
    chan.delete();
})

bot.on('message', msg => {

    if (msg.author.equals(bot.user)) return;
    if (msg.channel.type !== 'text') return;
    if (msg.guild.name != 'Big Dango Family') return;


//commands

    var botCmds = msg.guild.channels.find('name', 'bot_commands');
    var adminbtcmd = msg.guild.channels.find('name', 'bot_commands-admins');
    if (botCmds.id != msg.channel.id && adminbtcmd.id != msg.channel.id && msg.content.startsWith(prefix)) { msg.delete(); return; }
    if (!msg.content.startsWith(prefix)) return;

    var cmd = msg.content.substr(prefix.length, msg.content.indexOf(' ') - 1);
    var arg = msg.content.substr(msg.content.indexOf(' ') + 1);
    switch (cmd) {
        case 'lol':

            var opt = {
                url: 'https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + arg,
                headers: {
                    "X-Riot-Token": "RGAPI-7c012fbe-908b-4ce4-8d13-3aaf600b172c",
                }
            };
            request(opt, function(error, res, body) {
                if (!error && res.statusCode == 200) {
                    var player = JSON.parse(body);
            var op = {
                url: 'https://euw1.api.riotgames.com/lol/league/v3/positions/by-summoner/' + player.id,
                headers: {
                    "X-Riot-Token": "RGAPI-7c012fbe-908b-4ce4-8d13-3aaf600b172c",
                }
            };
            request(op, function(err, resp, data) {

                if (!err && resp.statusCode == 200) {
                var rank = JSON.parse(data)[0];
                var ranks = { "I" : 1, "II": 2, "III": 3, "IV": 4, "V": 5 };
                var embed = new Discord.RichEmbed();

                embed
                .setTitle('stats of ' + player.name)
                .setThumbnail('http://opgg-static.akamaized.net/images/medals/' + rank.tier.toLowerCase() + '_' + ranks[rank.rank] + '.png')
                .addField('level', player.summonerLevel)
                .addField('rank', rank.tier + ' ' + rank.rank)
                .addField('wins', rank.wins)
                .addField('losses', "in private message :yum: ")
                .addField('win rate', Math.ceil((rank.wins / (rank.wins + rank.losses)) * 100) + '%')
                .setImage('http://opgg-static.akamaized.net/images/profile_icons/profileIcon' + player.profileIconId + '.jpg');

                msg.channel.send(embed);
                msg.author.send("you've lost " + rank.losses + " ranked game");
                }

            })

            }
            })

            break;
        case 'a':
        var announcer = msg.member.roles.find("name", "announcer");
        if (announcer) {
            var annch = msg.guild.channels.find('name', 'announcements');
            var em = new Discord.RichEmbed();
            var title = arg.split('/')[0];
            var des = arg.split('/')[1];
            em
            .setTitle(title + ' :alarm_clock: ')
            .setDescription(des)
            .setAuthor(msg.author.username)
            .setFooter('sent at ' + msg.createdAt);
            annch.send(em);
        }
        break;

    }

});

bot.login('NDI4OTQyOTcxMTU3ODcyNjYw.DaaEPw.I6ZZCcmdquR-gKttd3DxUkJCAtc');
