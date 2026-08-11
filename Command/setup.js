
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  name: "setup",
  run: async (client, interaction) => {
    const menu = new StringSelectMenuBuilder()
      .setCustomId('setup')
      .setPlaceholder('Choose option')
      .addOptions([
        { label: 'Create Channel', value: 'create' },
        { label: '24/7 Voice', value: 'join' }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    interaction.reply({
      content: "Setup Panel",
      components: [row]
    });
  }
};
