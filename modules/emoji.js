module.exports = {
    name: 'emoji',
    type: 'fun',
    usage: 'emoji',
    permission: 1,
    help: 'Returns a random emoji.',
    main: function(bot, msg) {
        msg.channel.send(require('emoji-random').random());
    },
};
