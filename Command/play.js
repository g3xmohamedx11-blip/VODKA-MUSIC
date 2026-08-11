module.exports = {
  name: "play",
  run: async (client, interaction) => {

    const vc = interaction.member.voice.channel;
    if (!vc) return interaction.reply({ content: "❌ ادخل فويس", ephemeral: true });

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

      interaction.editReply("🎶 جاري التشغيل...");
    } catch (e) {
      console.error(e);
      interaction.editReply("❌ حصل خطأ");
    }

  }
};
