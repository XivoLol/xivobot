module.exports = {
    name: 'painting',
    type: 'image generation',
    usage: 'painting <mention>',
    permission: 1,
    help: 'Make a painting of someone',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.painting(user.displayAvatarURL.replace('.gif', '.png'), user.username).then(img => {
            msg.channel.send(new Attachment(img, 'painting.png'));
        });
    },
};
