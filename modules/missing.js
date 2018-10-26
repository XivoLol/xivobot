module.exports = {
    name: 'missing',
    type: 'image generation',
    usage: 'missing <mention>',
    permission: 1,
    help: 'Make a missing poster of someone',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.missing(user.displayAvatarURL.replace('.gif', '.png'), user.username).then(img => {
            msg.channel.send(new Attachment(img, 'missing.png'));
        });
    },
};
