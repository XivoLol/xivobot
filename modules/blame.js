module.exports = {
    name: 'blame',
    type: 'action',
    usage: 'blame <content>',
    permission: 1,
    help: 'Blame someone',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js');
        if (msg.mentions.users.first()) msg.content = msg.mentions.users.first().username;
        bot.IdioticAPI.blame(msg.content).then(img => {
            msg.channel.send(new Attachment(img, 'blame.png'));
        });
    },
};
