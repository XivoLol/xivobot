module.exports = {
    name: 'pls',
    type: 'action',
    usage: 'pls <content>',
    permission: 1,
    help: '"Pls" at someone',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js');
        if (msg.mentions.users.first()) msg.content = msg.mentions.users.first().username;
        bot.IdioticAPI.pls(msg.content).then(img => {
            msg.channel.send(new Attachment(img, 'pls.png'));
        });
    },
};
