module.exports = {
    name: 'triggered',
    type: 'image generation',
    usage: 'triggered <mention>',
    permission: 1,
    help: 'REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.triggered(user.displayAvatarURL.replace('.gif', '.png')).then(img => {
            msg.channel.send(new Attachment(img, 'triggered.png'));
        });
    },
};
