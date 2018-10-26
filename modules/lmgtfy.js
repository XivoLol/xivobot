const lmgtfy = require('lmgtfy');

module.exports = {
    name: 'lmgtfy',
    type: 'fun',
    usage: 'lmgtfy <query>',
    permission: 1,
    help: 'Posts a LMGTFY link in chat',
    main: function(bot, msg) {
        msg.channel.send(lmgtfy(msg.content));
    },
};
