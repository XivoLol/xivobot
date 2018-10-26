module.exports = {
    name: 'emojis',
    type: 'utility',
    usage: 'emojis',
    permission: 1,
    help: 'Gives you a list of the server\'s emojis.',
    main: function(bot, msg) {
        let emojis;
        if (msg.guild.emojis.size === 0) emojis = 'There are no emojis on this server.';
        else emojis = `**Server Emoji:**\n${msg.guild.emojis.map(e => e).join(' ')}`;
        msg.channel.send(emojis);
    },
};
