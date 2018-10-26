var alex = require("alex");
var Discord = require("discord.js");

module.exports = {
  name: "alex",
  type: "fun",
  usage: "alex",
  permission: 1,
  help: "Analyzes your writing with the Alex API.",
  main: function(bot, msg) {
    bot.checkForUpvote(msg).then(res => {
      if (res) {
        var errors = alex(msg.content).messages;

        if (errors.length === 0) {
          msg.channel.send("The Alex API found no errors in your writing!");
        } else {
          var err = new Discord.RichEmbed()
            .setTitle("Alex API Writing Analysis")
            .setColor(msg.guild.me.displayColor)
            .setFooter(bot.user.username, bot.user.avatarURL);

          for (var i = 0; i < errors.length; i++) {
            err.addField(
              `Error in line ${errors[i].line} character ${
                errors[i].column
              } (Reason: ${errors[i].ruleId})`,
              errors[i].reason
            );
          }
          msg.channel.send({ embed: err });
        }
      } else {
        bot.promptForUpvote(msg, this.name);
      }
    });
  }
};
