module.exports = {
    name: '8ball',
    type: 'fun',
    usage: '8ball',
    permission: 1,
    help: 'Simulates an 8ball.',
    main: function(bot, msg) {
        var predictions = [
            'It is certain',
            'It is decidedly so',
            'Without a doubt',
            'Yes definitely',
            'You may rely on it',
            'As I see it, yes',
            'Most likely',
            'Outlook good',
            'Yes',
            'Signs point to yes',
            'Reply hazy try again',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict now',
            'Concentrate and ask again',
            "Don't count on it",
            'My reply is no',
            'My sources say no',
            'Outlook not so good',
            'Very doubtful',
        ];
        msg.reply(predictions[Math.floor(Math.random() * (predictions.length - 0))]);
    },
};
