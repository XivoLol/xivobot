var unirest = require('unirest');

module.exports = {
    name: 'meme',
    type: 'fun',
    usage: 'meme',
    permission: 1,
    help: 'Get a meme',
    main: function(bot, msg) {
        unirest.get('https://api.weeb.sh/images/random?type=discord_memes')
            .headers({
                Authorization: 'Wolke ' + bot.config.weebsh,
            })
            .end(res => {
                console.log(res.body);
                msg.channel.send({
                    embed: {
                        image: {
                            url: res.body.url,
                        },
                        color: msg.guild.me.displayColor,
                        footer: {
                            text: 'Powered by weeb.sh',
                        },
                        title: 'Discord Meme',
                        timestamp: new Date(),
                    },
                });
            });
    },
};
