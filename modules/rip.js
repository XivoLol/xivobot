module.exports = {
    name: 'rip',
    type: 'fun',
    usage: 'rip <user-mention>',
    permission: 1,
    help: 'Returns a ripme.xyz link for the mentioned user.',
    main: function(bot, msg) {
        if (msg.mentions) {
            msg.channel.send('**RIP ' + msg.mentions.users.first().username + '**\nhttps://ripme.xyz/#' + msg.mentions.users.first().username);
        } else		{
            msg.channel.send('**RIP**\nhttps://ripme.xyz/');
        }
    },
};
