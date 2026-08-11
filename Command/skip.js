module.exports = {
  name: "skip",
  run: async (client, interaction) => {

    try {
      await client.distube.skip(interaction.guildId);
      interaction.reply(client.lang.SKIP);
    } catch {
      interaction.reply(client.lang.ERROR);
    }

  }
};
