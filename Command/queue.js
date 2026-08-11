
module.exports = {
  name: "queue",
  run: async (client, interaction) => {
    const queue = client.distube.getQueue(interaction);
    if (!queue) return interaction.reply("Empty queue");

    interaction.reply(queue.songs.map((s,i)=>`${i+1}. ${s.name}`).join("\n"));
  }
};
