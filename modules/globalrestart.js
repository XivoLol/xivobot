module.exports = {
    name: 'globalrestart',
    type: 'owner',
    usage: 'globalrestart',
    permission: 6,
    help: 'Restarts the bot.',
    main: function(bot, msg) {
        if (!bot.shard) return msg.channel.send(`This bot isn't sharded, idiot!`);
        msg.channel.send(':wave: All shards of ' + bot.user.username + ' are restarting...');

        setTimeout(() => {
            bot.shard.broadcastEval('process.exit(0)');
        }, 1000);
        return null;
    },
};
