var googl = require('goo.gl');
var config = require('../config.json');

module.exports = {
    name: 'shorten',
    type: 'utility',
    usage: 'shorten <URL>',
    permission: 1,
    help: 'Shortens a URL.',
    main: function(bot, msg) {
        googl.setKey(config.googl);

        googl.shorten(msg.content)
            .then(shortURL => {
                msg.channel.send('URL shortened to ' + shortURL);
            })
            .catch(err => {
                msg.channel.send(err);
                console.error(err.message);
            });
        return null;
    },
};
