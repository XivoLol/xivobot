var unirest = require('unirest');
var Discord = require('discord.js');

module.exports = {
    name: 'dogfact',
    type: 'informational',
    usage: 'dogfact',
    permission: 1,
    help: 'Gets a random dog fact.',
    main: function(bot, msg) {
        unirest.get('https://dog-api.kinduff.com/api/facts')
            .end(result => {
                var e = new Discord.RichEmbed()
                    .setFooter('Powered by kinduff.com')
                    .setTimestamp()
                    .setTitle('Dog Fact')
                    .setColor(msg.guild.me.displayColor)
                    .setDescription(result.body.facts[0]);

                msg.channel.send({ embed: e });
            });
    },
};
