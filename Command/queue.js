module.exports = {
  name: "queue",
  run: async (client, interaction) => {

    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) return interaction.reply(client.lang.QUEUE_EMPTY);

    const embed = {
      color: 0xff3c00,
      title: client.lang.QUEUE_TITLE,
      description: queue.songs.map((s, i) => `**${i + 1}.** ${s.name}`).join("\n")
    };

    interaction.reply({ embeds: [embed] });

  }
};
