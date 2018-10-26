module.exports = {
    name: 'urban',
    type: 'fun',
    usage: 'urban <word>',
    permission: 1,
    help: 'Defines a word from the Urban Dictionary.',
    main: function(bot, msg) {
        bot.checkForUpvote(msg).then(res => {
            if (res) {
                var urban = require('urban'),
                    definition = urban(msg.content);
                try {
                    definition.first(def => {
                        if (def !== undefined) {
                            const Discord = require('discord.js');
                            const embed = new Discord.RichEmbed()
                                .setTitle(def.word)
                                .setColor(0x1675DB)
                                .setDescription('Urban Dictionary')
                                .setFooter('Triggered by ' + msg.author.username, msg.author.avatarURL)
                                .setThumbnail('https://lh5.googleusercontent.com/-rY97dP0iEo0/AAAAAAAAAAI/AAAAAAAAAGA/xm1HYqJXdMw/s0-c-k-no-ns/photo.jpg')
                                .setTimestamp()
                                .addField('Definition', def.definition, false)
                                .addField('Example', def.example, false)
                                .addField('Other Information', def.thumbs_up + ' :thumbsup: | ' + def.thumbs_down + ' :thumbsdown: \nAuthor: ' + def.author, false);
                            msg.channel.send({ embed: embed });
                        } else {
                            msg.channel.send('Could not find word.');
                        }
                    });
                } catch (err) {
                    msg.channel.send('An error occurred.');
                }
            } else {
                bot.promptForUpvote(msg, this.name);
            }
        });
    },
};
