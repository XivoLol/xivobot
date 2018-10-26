module.exports = {
    name: 'timeuntil',
    type: 'utility',
    usage: 'timeuntil <time>',
    permission: 1,
    help: 'Provides the time until a specified date.',
    main: function(bot, msg) {
        try {
            var d1 = new Date(msg.content);
            var d2 = new Date();
            var t1 = d1.getTime();
            var t2 = d2.getTime();
            var time = t1 - t2;
            var years = parseInt(time / 31536000000);
            var totalDays = parseInt(time / 86400000);
            var days = parseInt((time - (years * 31536000000)) / 86400000);
            var totalHours = parseInt(time / 3600000);
            var hours = parseInt((time - (totalDays * 86400000)) / 3600000);
            var totalMinutes = parseInt(time / 60000);
            var minutes = parseInt((time - (totalHours * 3600000)) / 60000);
            var seconds = parseInt((time - (totalMinutes * 60000)) / 1000);
            msg.channel.send('Time until ' + d1.toDateString() + ': \n**' + years + ' years, ' + days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds**');
        } catch (err) {
            msg.channel.send('Error processing date. Please put in MM/DD/YY format');
        }
    },
};
