const yts = require("yt-search");

module.exports = {
  name: "search",
  run: async (client, interaction) => {

    await interaction.deferReply();

    const query = interaction.options.getString("song");

    try {
      const r = await yts(query);
      const videos = r.videos.slice(0, 5);

      if (!videos.length) {
        return interaction.editReply(client.lang.NO_RESULTS);
      }

      const embed = {
        color: 0xff3c00,
        title: "🔎 Results",
        description: videos.map((v, i) => `**${i + 1}.** ${v.title}`).join("\n")
      };

      interaction.editReply({ embeds: [embed] });

    } catch {
      interaction.editReply(client.lang.ERROR);
    }
  }
};
