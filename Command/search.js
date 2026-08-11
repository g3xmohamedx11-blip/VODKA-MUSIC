
module.exports = {
  name: "search",
  run: async (client, interaction) => {
    const results = await client.distube.search(interaction.options.getString("song"), {limit:5});

    interaction.reply(results.map((r,i)=>`${i+1}. ${r.name}`).join("\n"));
  }
};
