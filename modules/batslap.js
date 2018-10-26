module.exports = {
    name: 'batslap',
    type: 'image generation',
    usage: 'batslap <mention>',
    permission: 1,
    help: 'Batslap someone',
    main: function(bot, msg) {
        var avatarURL, target, { Attachment } = require('discord.js');
        if (!msg.mentions.users.first()) {
            avatarURL = msg.author.displayAvatarURL.replace('.gif', '.png');
            target = 'themselves';
        } else {
            avatarURL = msg.mentions.users.first().displayAvatarURL.replace('.gif', '.png');
            target = msg.mentions.members.first().displayName;
        }

        bot.IdioticAPI.batSlap(msg.author.displayAvatarURL.replace('.gif', '.png'), avatarURL).then(img => {
            msg.channel.send(`**${msg.member.displayName}** slapped **${target}**!`, new Attachment(img, 'slap.png'));
        });
    },
};
