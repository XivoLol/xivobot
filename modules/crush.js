module.exports = {
    name: 'crush',
    type: 'image generation',
    usage: 'crush <mention> <second-mention>',
    permission: 1,
    help: 'Someone has a crush on someone!',
    main: function(bot, msg) {
        var avatarURL, target, selfAvatarURL, selfName, { Attachment } = require('discord.js');
        if (!msg.mentions.users.first()) {
            avatarURL = msg.author.displayAvatarURL.replace('.gif', '.png');
            target = 'themselves';
            selfAvatarURL = msg.author.displayAvatarURL.replace('.gif', '.png');
            selfName = msg.member.displayName;
        } else if (msg.mentions.users.first() && !msg.mentions.users.array()[1]) {
            avatarURL = msg.mentions.users.first().displayAvatarURL.replace('.gif', '.png');
            target = msg.mentions.members.first().displayName;
            selfAvatarURL = msg.author.displayAvatarURL.replace('.gif', '.png');
            selfName = msg.member.displayName;
        } else if (msg.mentions.users.first() && msg.mentions.users.array()[1]) {
            selfAvatarURL = msg.mentions.users.first().displayAvatarURL.replace('.gif', '.png');
            selfName = msg.mentions.members.first().displayName;
            avatarURL = msg.mentions.users.array()[1].displayAvatarURL.replace('.gif', '.png');
            target = msg.mentions.members.array()[1].displayName;
        }

        bot.IdioticAPI.crush(avatarURL, selfAvatarURL).then(img => {
            msg.channel.send(`**${selfName}** has a crush on **${target}**!`, new Attachment(img, 'crush.png'));
        });
    },
};
