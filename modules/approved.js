module.exports = {
  name: "approved",
  type: "image generation",
  usage: "approved <mention>",
  permission: 1,
  help: "Approve someone's avatar!",
  main: function(bot, msg) {
    var { Attachment } = require("discord.js"),
      user = msg.author;
    if (msg.mentions.users.first()) user = msg.mentions.users.first();
    bot.IdioticAPI.approved(
      user.displayAvatarURL.replace(".gif", ".png"),
      user.username
    ).then(img => {
      msg.channel.send(new Attachment(img, "approved.png"));
    });
  }
};
