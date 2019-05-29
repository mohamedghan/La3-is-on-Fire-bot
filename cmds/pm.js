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

function crypt(msg) {
    var code = makeCode();
    var fc = '';
    var txt = '';
    for (i = 0; i < msg.length; i++) {
        if (!genCharArray('a', 'z').includes(msg[i])) {
            txt += msg[i];
            continue;
        };
        txt += code[msg[i].charCodeAt(0) - 'a'.charCodeAt(0) + 1];
    }
    for (var i = 1; i <= 26; i++) {
        fc += code[i];
    }
    return [txt, fc];
}


module.exports.run = async (bot, msg, args, con) => {
    if (msg.channel.id !== con.adminsch) return;
    var message = args.slice(2).join(' ');
    var channel = await msg.mentions.channels.first();
    var dest = await msg.mentions.members.first();
    var sender = await msg.member;
    var result = crypt(message);
    channel.send(`${sender} to ${dest}: ${result[0]}`);
    dest.user.send(`crypting code: || ${result[1]} ||
this code will be deleted after 10 minutes!`).then(m => {
        m.delete(1000*60*10)
    })
}

module.exports.help = {
    name: "pm"
}