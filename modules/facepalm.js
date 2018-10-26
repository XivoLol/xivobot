module.exports = {
    name: 'facepalm',
    type: 'image generation',
    usage: 'facepalm <mention>',
    permission: 1,
    help: 'Facepalm with this command.',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.facepalm(user.displayAvatarURL.replace('.gif', '.png')).then(img => {
            msg.channel.send(new Attachment(img, 'facepalm.png'));
        });
    },
};
