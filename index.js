
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { YouTubePlugin } = require('@distube/youtube');
const fs = require('fs');
const config = require('./config.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

client.commands = new Collection();

client.distube = new DisTube(client, {
  plugins: [new YouTubePlugin()]
});

// Load commands
fs.readdirSync('./commands').forEach(file => {
  const cmd = require(`./commands/${file}`);
  client.commands.set(cmd.name, cmd);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = client.commands.get(interaction.commandName);
  if (cmd) cmd.run(client, interaction);
});

client.login(config.token);
