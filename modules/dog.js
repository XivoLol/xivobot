var Discord = require('discord.js');

module.exports = {
    name: 'dog',
    type: 'fun',
    usage: 'dog',
    permission: 1,
    help: 'Returns a random dog picture.',
    main: function(bot, msg) {
        const randomPuppy = require('random-puppy');
        randomPuppy().then(url => {
            var puppy = new Discord.RichEmbed()
                .setTitle('Random Dog')
                .setURL(url)
                .setImage(url)
                .setFooter('Powered by random-puppy')
                .setColor(msg.guild.me.displayColor)
                .setTimestamp();
            msg.channel.send({ embed: puppy });
        });
    },
};
