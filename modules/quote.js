var unirest = require('unirest');
var config = require('../config.json');
var Discord = require('discord.js');

module.exports = {
    name: 'quote',
    type: 'fun',
    usage: 'quote',
    permission: 1,
    help: 'Gets a random quote.',
    main: function(bot, msg) {
        unirest.post('https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1')
            .header('X-Mashape-Key', config.mashape)
            .header('Content-Type', 'application/x-www-form-urlencoded')
            .header('Accept', 'application/json')
            .end(result => {
                var res = result.body;
                console.log(res);
                var embed = new Discord.RichEmbed()
                    .setFooter('Powered by Random Famous Quotes')
                    .setTimestamp()
                    .setColor(msg.guild.me.displayColor)
                    .setTitle('Random Quote')
                    .setDescription(res.quote + '\n*- ' + res.author + '*');

                msg.channel.send({ embed: embed });
            });
    },
};
