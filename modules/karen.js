module.exports = {
    name: 'karen',
    type: 'image generation',
    usage: 'karen <mention>',
    permission: 1,
    help: 'Make Karen hold up a picture of someone!',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.karen(user.displayAvatarURL.replace('.gif', '.png'), user.username).then(img => {
            msg.channel.send(new Attachment(img, 'karen.png'));
        });
    },
};
