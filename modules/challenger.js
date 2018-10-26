module.exports = {
    name: 'challenger',
    type: 'image generation',
    usage: 'challenger <mention>',
    permission: 1,
    help: 'A new challenger approaches! Who could it be?',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.challenger(user.displayAvatarURL.replace('.gif', '.png'), user.username).then(img => {
            msg.channel.send(new Attachment(img, 'challenger.png'));
        });
    },
};
