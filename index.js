const fs = require('fs');
const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
//const Speaker = require('speaker');
//const AudioMixer = require('audio-mixer')
const command = require('./commands');
const { globalCommandData, guildCommandData } = require('./utils')
const { botToken, roleID, device } = require('./config.json');

let silence, connection, guild, mixer, speaker;
let currentMembers = [];
connection = undefined;

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] });

client.once('ready', async () => {

	// Check global commands.
	const commandList = await client.api.applications(client.user.id).commands.get();
	if (commandList === undefined || commandList.length === 0)
		await client.application?.commands.set(globalCommandData)
	console.log('Global command check complete, DACBot is now online.');

	// Check and route commands.
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return;
		console.log('interaction')
		await interaction.defer();
		//const botID = await interaction.guild.members.fetch(client.user.id);
		//if (interaction.channel.permissionsFor(botID).has("MANAGE_MESSAGES")) {
		switch (interaction.commandName) {
			case 'ping':
				pingPong(interaction);
				break;
			case 'join':
				joinChannel(interaction);
				break;
			case 'volume':
				changeVolume(interaction);
				break;
			case 'leave':
				leaveChannel(interaction);
				break;
		}
		//}
		//else
		//	interaction.editReply({ content: 'You do not have permission to use this command.', ephemeral: true });
	});

	// Check bot ping.
	function pingPong(interaction) {
		interaction.editReply('`' + (Date.now() - interaction.createdTimestamp) + '` ms');
	}

	// Join voice channel.
	async function joinChannel(interaction) {
		const connection = joinVoiceChannel({
			channelId: interaction.channelId,
			guildId: interaction.guildId,
			// adapterCreator: channel.guild.voiceAdapterCreator,
		});
		await client.guilds.cache.get(interaction.guildID).commands.set(guildCommandData);
		interaction.editReply('Sucsess')
	}


	// 	command(client, 'help', roleID, (message) => {
	// 		const helpEmbed = new Discord.MessageEmbed()
	// 			.setTitle("DACBot Help")
	// 			.setURL("https://github.com/nicnacnic/DACBot")
	// 			.setDescription("Does someone need some help?")
	// 			.addField("Connecting to a Voice Channel", "<@" + client.user.id + "> connect\nThe bot will connect to the voice channel that the user is in and start capturing audio.")
	// 			.addField("Disconnecting from a Voice Channel", "<@" + client.user.id + "> disconnect\nThe bot will stop capturing audio and disconnect from the voice channel.")
	// 			.addField("Changing a User's Volume", "<@" + client.user.id + "> volume <user> <volumeLevel>\nThe bot will change the volume of the specified user. `volumeLevel` must be between 1 and 100.")
	// 			.setThumbnail(client.user.displayAvatarURL())
	// 			.setFooter("DACBot made by nicnacnic")
	// 			.setTimestamp()
	// 		message.channel.send(helpEmbed);
	// 	})

	// 	command(client, 'connect', roleID, (message) => {
	// 		if (connection !== undefined)
	// 			message.reply(`I\'m already in a voice channel! Please disconnect me first.`)
	// 		else if (message.member.voice.channel !== undefined && message.member.voice.channel !== null) {
	// 			guild = message.member.guild.id;
	// 			record(message.member.voice.channel.id);
	// 			message.channel.send('Connected to `' + message.member.voice.channel.name + '`.')
	// 		}
	// 		else
	// 			message.reply(`you're not in a voice channel!`)
	// 	})

	// 	command(client, 'volume', roleID, (user, volume, message) => {
	// 		if (connection !== undefined) {
	// 			for (let i = 0; i < currentMembers.length; i++) {
	// 				if (currentMembers[i].id === user) {
	// 					currentMembers[i].mixer.setVolume(volume)
	// 					break;
	// 				}
	// 			}
	// 			message.channel.send('`' + message.guild.members.cache.get(user).user.username + '`\'s volume changed to ' + volume + '.')
	// 		}
	// 		else
	// 			message.reply(`I'm not in a voice channel!`)
	// 	})

	// 	command(client, 'disconnect', roleID, (message) => {
	// 		if (connection !== undefined) {
	// 			message.channel.send('Disconnected from `' + connection.channel.name + '`.')
	// 			stopRecording(connection.channel.name);
	// 		}
	// 		else
	// 			message.reply(`I'm not in a voice channel!`)
	// 	});

	// 	client.on('voiceStateUpdate', (oldMember, newMember) => {
	// 		if (connection !== undefined && newMember.id !== client.user.id) {
	// 			if (oldMember.channelID !== connection.channel.id && newMember.channelID === connection.channel.id) {
	// 				let i = currentMembers.length;
	// 				currentMembers.push({ id: newMember.id, audio: '', mixer: '' })
	// 				currentMembers[i].audio = connection.receiver.createStream(currentMembers[i].id, { mode: 'pcm', end: 'manual' });
	// 				currentMembers[i].mixer = mixer.input({
	// 					volume: 100
	// 				});
	// 				currentMembers[i].audio.pipe(currentMembers[i].mixer);
	// 			}
	// 			else if (oldMember.channelID === connection.channel.id && newMember.channelID !== connection.channel.id) {
	// 				for (let i = 0; i < currentMembers.length; i++) {
	// 					if (currentMembers[i].id === newMember.id) {
	// 						currentMembers.splice(i, 1)
	// 						break;
	// 					}
	// 				}
	// 			}
	// 		}
	// 		else if (oldMember.id === client.user.id && oldMember.channelID !== null) {
	// 			if (newMember.channelID === null)
	// 				stopRecording(oldMember.channel.name);
	// 			else if (oldMember.channelID !== newMember.channelID && connection !== undefined) {
	// 				let channelID = newMember.channelID;
	// 				stopRecording(oldMember.channel.name);
	// 				setTimeout(function () { record(channelID); }, 500);
	// 			}
	// 		}
	// 	})
});
// async function record(channelID) {
// 	setTimeout(async function() {
// 		connection = await client.channels.cache.get(channelID).join();

// 		mixer = new AudioMixer.Mixer({
// 			channels: 2,
// 			bitDepth: 16,
// 			sampleRate: 48000,
// 		});

// 		speaker = new Speaker({
// 			channels: 2,
// 			bitDepth: 16,
// 			sampleRate: 48000,
// 			device: device
// 		});

// 		if (client.channels.cache.get(channelID).members.size > 1) {
// 			client.channels.cache.get(channelID).members.forEach((member) => {
// 				if (member.user.id !== client.user.id) {
// 					currentMembers.push({ id: member.user.id, audio: '', mixer: '' });
// 				}
// 			})
// 			for (let i = 0; i < currentMembers.length; i++) {
// 				currentMembers[i].audio = connection.receiver.createStream(currentMembers[i].id, { mode: 'pcm', end: 'manual' });
// 				currentMembers[i].mixer = mixer.input({
// 					volume: 100
// 				});
// 				currentMembers[i].audio.pipe(currentMembers[i].mixer);
// 			}
// 			mixer.pipe(speaker);
// 		}

// 		silence = setInterval(function () {
// 			connection.play(fs.createReadStream('./silence.wav'));
// 		}, 270000)

// 		console.log('Capture started for channel ' + connection.channel.name + ' on ' + Date());
// 		return;
// 	}, 500)
// }
// function stopRecording(channelName) {
// 	if (connection !== undefined) {
// 		console.log('Capture stopped for channel ' + channelName + ' on ' + Date())
// 		connection.channel.leave();
// 	}
// 	currentMembers = [];
// 	mixer = [];
// 	speaker = [];
// 	connection = undefined;
// 	clearInterval(silence)
// }
client.login(botToken);
