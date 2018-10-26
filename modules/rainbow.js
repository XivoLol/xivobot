module.exports = {
    name: 'rainbow',
    type: 'image generation',
    usage: 'rainbow <mention>',
    permission: 1,
    help: 'Put a rainbow on someone\'s avatar!',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.rainbow(user.displayAvatarURL.replace('.gif', '.png'), user.username).then(img => {
            msg.channel.send(new Attachment(img, 'rainbow.png'));
        });
    },
};
