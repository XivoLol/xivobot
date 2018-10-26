module.exports = {
    name: 'beautiful',
    type: 'image generation',
    usage: 'beautiful <mention>',
    permission: 1,
    help: 'Say someone\'s beautiful with this command.',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.beautiful(user.displayAvatarURL.replace('.gif', '.png')).then(img => {
            msg.channel.send(new Attachment(img, 'beautiful.png'));
        });
    },
};
