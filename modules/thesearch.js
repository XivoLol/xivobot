module.exports = {
    name: 'thesearch',
    type: 'image generation',
    usage: 'thesearch <user-mention> <words-to-say>',
    permission: 1,
    help: 'Makes a "The Search Continues" meme',
    main: function(bot, msg) {
        if (!msg.mentions.users) { msg.channel.send('Please mention a user!'); } else {
            var reason = msg.content.split(' ').splice(1).join(' '),
                user = msg.mentions.users.first(),
                { Attachment } = require('discord.js');
            bot.IdioticAPI.theSearch(user.displayAvatarURL.replace('.gif', '.png'), reason).then(img => {
                msg.channel.send(new Attachment(img, 'thesearch.png'));
            });
        }
    },
};
