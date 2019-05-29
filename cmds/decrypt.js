const Discord = require('discord.js');

Array.prototype.randome = function () {
    return this[Math.floor(Math.random() * this.length)]
}

function genCharArray(charA, charZ) {
    var a = [],
        i = charA.charCodeAt(0),
        j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

function makeCode() {
    var code = [];
    var alph = genCharArray('a', 'z');
    for (var i = 1; i <= 26; i++) {
        var n = alph.randome()
        alph = alph.filter(function (c) {
            return c != n
        });
        code[i] = n;
    }
    return code;
}

function dec(msg , code) {
    code = code + '';            
    var c = code.split('');
    var txt = '';
    for(var i=0;i<msg.length;i++) {
        if (!genCharArray('a', 'z').includes(msg[i])) { txt += msg[i]; continue; };
        txt += String.fromCharCode(c.indexOf(msg[i]) + 'a'.charCodeAt(0));
    }
    return txt;
}


module.exports.run = async (bot, msg, args, con) => {
    if (msg.channel.type !== 'dm') return;
    var dm = await msg.channel;
    var message = args.join(' '); 
    dm.fetchMessages().then(msgs => {
        var bot_msgs = msgs.filter(msg => msg.author.bot);
        var code = bot_msgs.first().content.split(' ').filter(code => code.length == 26)
        var nmsg = dec(message, code)
        dm.send(`${nmsg}`);
    })
}

module.exports.help = {
    name: "decrypt"
}