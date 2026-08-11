const { Client, GatewayIntentBits, Collection, REST, Routes, SlashCommandBuilder } = require('discord.js');
const { DisTube } = require('distube');
const { YouTubePlugin } = require('@distube/youtube');
const fs = require('fs');
const config = require('./config.json');

const token = process.env.DISCORD_TOKEN || config.token;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.commands = new Collection();

// تحميل اللغة
client.lang = require(`./languages/${config.defaultLang}.json`);

client.distube = new DisTube(client, {
  plugins: [new YouTubePlugin()]
});

// تحميل الأوامر
fs.readdirSync('./commands').forEach(file => {
  const cmd = require(`./commands/${file}`);
  client.commands.set(cmd.name, cmd);
});

// أوامر slash
const commands = [
  new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play music')
    .addStringOption(o => o.setName('song').setDescription('Song').setRequired(true)),

  new SlashCommandBuilder()
    .setName('search')
    .setDescription('Search songs')
    .addStringOption(o => o.setName('song').setDescription('Search').setRequired(true)),

  new SlashCommandBuilder().setName('queue').setDescription('Queue'),
  new SlashCommandBuilder().setName('skip').setDescription('Skip'),
  new SlashCommandBuilder().setName('stop').setDescription('Stop'),
  new SlashCommandBuilder().setName('setup').setDescription('Setup')
].map(c => c.toJSON());

client.once('ready', async () => {
  console.log(`✅ ${client.user.tag}`);

  const rest = new REST({ version: '10' }).setToken(token);

  await rest.put(Routes.applicationCommands(client.user.id), {
    body: commands
  });

  console.log("✅ Commands loaded");
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const cmd = client.commands.get(interaction.commandName);
  if (!cmd) return;

  try {
    await cmd.run(client, interaction);
  } catch (err) {
    console.error(err);
  }
});

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

client.login(token);
