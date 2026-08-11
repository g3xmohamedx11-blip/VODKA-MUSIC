module.exports = {
  name: "stop",
  run: async (client, interaction) => {

    try {
      client.distube.stop(interaction.guildId);
      interaction.reply(client.lang.STOP);
    } catch {
      interaction.reply(client.lang.ERROR);
    }

  }
};
