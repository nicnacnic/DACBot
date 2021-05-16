const fs = require('fs');
const Speaker = require('speaker');
const AudioMixer = require('audio-mixer')
const Discord = require('discord.js');
const command = require('./commands');
const { token, device } = require('./config.json');

let silence, connection;
let currentMembers = [];

let mixer = new AudioMixer.Mixer({
	channels: 2,
	bitDepth: 16,
	sampleRate: 48000,
});

const client = new Discord.Client();
client.once('ready', () => {
	console.log('Bot is now online. Ping the bot with the connect command to connect to a voice channel!')

	command(client, 'help', (message) => {
		const helpEmbed = new Discord.MessageEmbed()
			.setTitle("DACBot Help")
			.setURL("https://github.com/nicnacnic/DACBot")
			.setDescription("Does someone need some help?")
			.addField("Connecting to a Voice Channel", "<@" + client.user.id + "> connect\nThe bot will connect to the voice channel that the user is in and start capturing audio.")
			.addField("Disconnecting from a Voice Channel", "<@" + client.user.id + "> disconnect\nThe bot will stop capturing audio and disconnect from the voice channel.")
			.setThumbnail(client.user.displayAvatarURL())
			.setFooter("DACBot made by nicnacnic")
			.setTimestamp()
		message.channel.send(helpEmbed);
	})
	command(client, 'connect', (message) => {
		record(message);
	})
	command(client, 'disconnect', (message) => {
		if (connection !== undefined) {
			console.log('Audio capture stopped for channel ' + connection.channel.name + ' on ' + Date())
			message.channel.send('Disconnected from `' + connection.channel.name + '`.')
			audioStream = [];
			connection.channel.leave();
			connection = undefined
			clearInterval(silence)
		}
		else
			message.reply(`I'm not in a voice channel!`)
	});

	client.on('voiceStateUpdate', (oldMember, newMember) => {
		if (connection !== undefined && oldMember.channelID !== connection.channel.id && newMember.channelID === connection.channel.id && oldMember.id !== client.user.id) {
			let i = currentMembers.length;
			currentMembers.push({ id: newMember.id, audio: '', mixer: '' })
			currentMembers[i].audio = connection.receiver.createStream(currentMembers[i].id, { mode: 'pcm', end: 'manual' });
			currentMembers[i].mixer = mixer.input({
				volume: 100
			});
			currentMembers[i].audio.pipe(currentMembers[i].mixer);
		}
		else if (connection !== undefined && oldMember.channelID === connection.channel.id && newMember.channelID !== connection.channel.id && oldMember.id !== client.user.id) {
			for (let i = 0; i < currentMembers.length; i++) {
				if (currentMembers[i].id === oldMember.id)
					currentMembers.splice(i, 1)
					break
			}
		}
	})
});
async function record(message) {
	if (message.member.voice.channel !== undefined && message.member.voice.channel !== null) {
		connection = await message.member.voice.channel.join();
		message.guild.channels.cache.get(message.channel.id).members.forEach((member) => {
			if (member.user.id !== client.user.id)
				currentMembers.push({ id: member.user.id, audio: '', mixer: ''});
		})
		for (let i = 0; i < currentMembers.length; i++) {
			currentMembers[i].audio = connection.receiver.createStream(currentMembers[i].id, { mode: 'pcm', end: 'manual' });
			currentMembers[i].mixer = mixer.input({
				volume: 100
			});
			currentMembers[i].audio.pipe(currentMembers[i].mixer);
		}
		
		const speaker = new Speaker({
			channels: 2,
			bitDepth: 16,
			sampleRate: 48000,
			device: device
		});

		mixer.pipe(speaker);

		silence = setInterval(function() {
			connection.play(fs.createReadStream('silence.ogg'), { type: 'ogg/opus', volume: 0.1 });
		}, 270000)
		
		console.log('Audio capture started for channel ' + connection.channel.name + ' on ' + Date())
		message.channel.send('Connected to `' + message.member.voice.channel.name + '`.')
	}
	else
		message.reply(`you're not in a voice channel!`)
}
client.login(token);