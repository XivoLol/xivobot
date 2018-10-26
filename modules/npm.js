module.exports = {
    name: 'npm',
    type: 'informational',
    usage: 'npm <package-name>',
    permission: 1,
    help: 'Gives you information about an npm package',
    main: function(bot, msg) {
        var npmPackage = require('npm-package-info'), { RichEmbed } = require('discord.js');

        npmPackage(msg.content, (err, pkg) => {
            if (err) msg.channel.send('Package not found.');
            msg.channel.send({
                embed: new RichEmbed()
                    .setAuthor(pkg.name, 'https://authy.com/wp-content/uploads/npm-logo.png', `https://npmjs.com/package/${pkg.name}`)
                    .setDescription(pkg.description)
                    .setFooter('Powered by npm-package-info')
                    .setTimestamp()
                    .setColor(msg.guild.me.displayHexColor)
                    .addField('Author', pkg.author ? pkg.author.name : 'None', true)
                    .addField('Version', pkg['dist-tags'].latest, true)
                    .addField('License', pkg.license || 'None', true)
                    .addField('Keywords', pkg.keywords ? pkg.keywords.join(', ') : 'None', true),
            });
        });
    },
};
