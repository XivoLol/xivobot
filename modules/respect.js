module.exports = {
    name: 'respect',
    type: 'image generation',
    usage: 'respect <mention>',
    permission: 1,
    help: 'Pay your respects with this command.',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.respect(user.displayAvatarURL.replace('.gif', '.png')).then(img => {
            msg.channel.send(new Attachment(img, 'respect.png'));
        });
    },
};
