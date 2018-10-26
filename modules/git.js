module.exports = {
    name: 'git',
    type: 'core',
    usage: 'git',
    permission: 1,
    help: 'Returns the bot\'s GitHub repository.',
    main: function(bot, msg) {
        msg.reply('Check out my GitHub at https://github.com/mcao/RoBot');
    },
};
