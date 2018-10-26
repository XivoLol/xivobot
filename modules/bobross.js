module.exports = {
    name: 'bobross',
    type: 'image generation',
    usage: 'bobross <mention>',
    permission: 1,
    help: 'Bob Ross just finished a new painting! What is it?',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.bobRoss(user.displayAvatarURL.replace('.gif', '.png'), user.username).then(img => {
            msg.channel.send(new Attachment(img, 'bobross.png'));
        });
    },
};
