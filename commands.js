module.exports = (client, alias, roleID, callback) => {
	client.on('message', (message) => {
		const content = message.content.split(' ');

		if (content.length > 1 && content[0] === `<@!${client.user.id}>` && content[1] === alias) {
			if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_CHANNELS') || message.member.roles.cache.has(roleID)) {
				if (content[1] === 'volume') {
					if (content.length === 4 && (content[3] > 0 && content[3] <= 100))
						callback(content[2].substring(content[2].indexOf('!') + 1, content[2].indexOf('>')), content[3], message);
					else
						message.reply('you provided invalid arguments! Syntax: `@' + client.user.username + ' volume <user> <volumeLevel>`')
				}
				else
					callback(message)
			}
			else
				message.reply(`you do not have permission to execute this command!`)
		}
	})
}