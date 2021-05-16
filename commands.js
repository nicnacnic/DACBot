const { roleID } = require('./config.json');

module.exports = (client, alias, callback) => {
	client.on('message', (message) => {
		const { content } = message;

		const command = `<@!${client.user.id}> ${alias}`;
		if (content === command) {
			if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_CHANNELS') || message.member.roles.cache.has(roleID)) {
				callback(message)
			}
			else {
				message.reply(`you do not have permission to execute this command!`)
			}
		}
	})
}