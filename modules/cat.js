var unirest = require('unirest'),
    Discord = require('discord.js');

module.exports = {
    name: 'cat',
    type: 'fun',
    usage: 'cat',
    permission: 1,
    help: 'Returns a random cat picture.',
    main: function(bot, msg) {
        unirest.get('http://aws.random.cat/meow')
            .end(result => {
                var cat = new Discord.RichEmbed()
                    .setTitle('Random Cat')
                    .setURL(result.body.file)
                    .setImage(result.body.file)
                    .setFooter('Powered by random.cat')
                    .setColor(msg.guild.me.displayColor)
                    .setTimestamp();
                msg.channel.send({ embed: cat });
            });
    },
};
