var hugs = require('../data/hugs.json'),
    unirest = require('unirest');

module.exports = {
    name: 'hug',
    type: 'action',
    usage: 'hug <mention>',
    permission: 1,
    help: 'Hug someone :)',
    main: function(bot, msg) {
        var min = 0,
            max = hugs.length - 1,
            user = null;
        if (msg.mentions.users.array()[0]) user = msg.mentions.users.array()[0];
        else user = msg.author;
        unirest.get('https://api.weeb.sh/images/random?filetype=gif&type=hug')
            .headers({
                Authorization: 'Wolke ' + bot.config.weebsh,
            })
            .end(res => {
                msg.channel.send(user + ', ' + hugs[Math.floor(Math.random() * (max - min + 1)) + min], {
                    embed: {
                        image: {
                            url: res.body.url,
                        },
                        color: msg.guild.me.displayColor,
                        footer: {
                            text: 'Powered by weeb.sh',
                        },
                        timestamp: new Date(),
                    },
                });
            });
    },
};
