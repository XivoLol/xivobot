var request = require("request");
var xml2js = require("xml2js");
var Discord = require("discord.js");

module.exports = {
  name: "fact",
  type: "fun",
  usage: "fact",
  permission: 1,
  help: "Returns a random fact.",
  main: function(bot, msg) {
    bot.checkForUpvote(msg).then(res => {
      if (res) {
        request("http://www.fayd.org/api/fact.xml", (error, response, body) => {
          if (response.statusCode === 200) {
            xml2js.parseString(body, (err, result) => {
              if (err) throw err;
              try {
                var embed = new Discord.RichEmbed()
                  .setFooter("Powered by fayd.org")
                  .setTimestamp()
                  .setColor(msg.guild.me.displayColor)
                  .setTitle("Random Fact")
                  .setDescription(result.facts.fact[0]);

                msg.channel.send({ embed: embed });
              } catch (e) {
                msg.channel.send(
                  "The API returned an unconventional response.\n" + e
                );
              }
            });
          }
        });
      } else {
        bot.promptForUpvote(msg, this.name);
      }
    });
  }
};
