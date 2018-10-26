module.exports = {
    name: 'tattoo',
    type: 'image generation',
    usage: 'tattoo <mention>',
    permission: 1,
    help: 'Get your or someone else\'s avatar as a tattoo.',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.tattoo(user.displayAvatarURL.replace('.gif', '.png')).then(img => {
            msg.channel.send(new Attachment(img, 'tattoo.png'));
        });
    },
};
