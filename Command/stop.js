
module.exports = {
  name: "stop",
  run: async (client, interaction) => {
    client.distube.stop(interaction);
    interaction.reply("Stopped");
  }
};
