var jokes = require('../data/jokes.json');

module.exports = {
    name: 'joke',
    type: 'fun',
    usage: 'joke <optional-category>',
    permission: 1,
    help: 'Returns a joke.',
    main: function(bot, msg) {
        var min = 0,
            max = jokes.length - 1;
        msg.reply(jokes[Math.floor(Math.random() * (max - min + 1)) + min].body);
    },
};
