
module.exports = {
  name: "skip",
  run: async (client, interaction) => {
    client.distube.skip(interaction);
    interaction.reply("Skipped");
  }
};
