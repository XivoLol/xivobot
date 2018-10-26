const unirest = require('unirest');
var Discord = require('discord.js');

module.exports = {
    name: 'actor',
    type: 'fun',
    usage: '<p>actor <actor-name>',
    permission: 1,
    help: 'Gets information about an actor.',
    main: function(bot, msg) {
        const query = encodeURIComponent(msg.content);
        unirest.get(`https://api.themoviedb.org/3/search/person?api_key=${bot.config.omdb}&language=en-US&query=${query}&page=1&include_adult=false`)
            .end(res => {
                console.log(res.body);
                if (!res.body.results || !res.body.results[0]) return msg.reply('there are no actors that match that query!');
                const r = res.body.results[0];
                const actor = new Discord.RichEmbed()
                    .setTitle(r.name)
                    .setImage(`https://image.tmdb.org/t/p/w600_and_h900_bestv2${r.profile_path}`)
                    .addField(`Known For`, `${r.known_for[0].title || r.known_for[0].name} (${r.known_for[0].media_type})`)
                    .setFooter(`Powered by OMDB`)
                    .setColor(msg.guild.me.displayColor)
                    .setTimestamp();
                return msg.channel.send({ embed: actor });
            });
    },
};
