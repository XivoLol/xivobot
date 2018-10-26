module.exports = {
    name: 'fanslap',
    type: 'image generation',
    usage: 'fanslap <mention>',
    permission: 1,
    help: 'Fanslap someone',
    main: function(bot, msg) {
        var avatarURL, target, { Attachment } = require('discord.js');
        if (!msg.mentions.users.first()) {
            avatarURL = msg.author.displayAvatarURL.replace('.gif', '.png');
            target = 'themselves';
        } else {
            avatarURL = msg.mentions.users.first().displayAvatarURL.replace('.gif', '.png');
            target = msg.mentions.members.first().displayName;
        }

        bot.IdioticAPI.fanSlap(msg.author.displayAvatarURL.replace('.gif', '.png'), avatarURL).then(img => {
            msg.channel.send(`**${msg.member.displayName}** slapped **${target}**!`, new Attachment(img, 'fanslap.png'));
        });
    },
};
