module.exports = {
    name: 'shit',
    type: 'image generation',
    usage: 'shit <mention>',
    permission: 1,
    help: 'Ew, you stepped in some shit? Get it off.',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.stepped(user.displayAvatarURL.replace('.gif', '.png')).then(img => {
            msg.channel.send(new Attachment(img, 'stepped.png'));
        });
    },
};
