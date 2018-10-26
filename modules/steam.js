module.exports = {
    name: 'steam',
    type: 'fun',
    usage: 'steam <mention>',
    permission: 1,
    help: 'Make a Steam poster of someone',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.steam(user.displayAvatarURL.replace('.gif', '.png'), user.username).then(img => {
            msg.channel.send(new Attachment(img, 'steam.png'));
        });
    },
};
