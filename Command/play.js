module.exports = {
  name: "play",
  run: async (client, interaction) => {

    const vc = interaction.member.voice.channel;
    if (!vc) return interaction.reply(client.lang.JOIN_VOICE);

    await interaction.deferReply();

    try {
      await client.distube.play(
        vc,
        interaction.options.getString("song"),
        {
          member: interaction.member,
          textChannel: interaction.channel
        }
      );

      interaction.editReply(client.lang.PLAYING);
    } catch (e) {
      console.error(e);
      interaction.editReply(client.lang.ERROR);
    }
  }
};
