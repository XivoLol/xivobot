module.exports = {
    name: 'punch',
    type: 'image generation',
    usage: 'punch <mention>',
    permission: 1,
    help: 'Punch someone',
    main: function(bot, msg) {
        var avatarURL, target, { Attachment } = require('discord.js');
        if (!msg.mentions.users.first()) {
            avatarURL = msg.author.displayAvatarURL.replace('.gif', '.png');
            target = 'themselves';
        } else {
            avatarURL = msg.mentions.users.first().displayAvatarURL.replace('.gif', '.png');
            target = msg.mentions.members.first().displayName;
        }

        bot.IdioticAPI.superPunch(msg.author.displayAvatarURL.replace('.gif', '.png'), avatarURL).then(img => {
            msg.channel.send(`**${msg.member.displayName}** punched **${target}**!`, new Attachment(img, 'punch.png'));
        });
    },
};
