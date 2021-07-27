const globalCommandData = [{
    name: 'join',
    description: 'Join a voice channel',
    options: [{
        name: 'channel',
        type: 'CHANNEL',
        description: 'A voice channel to join',
        required: false,
    }],
},
{
    name: 'ping',
    description: 'Test response time to the server',
}]

const guildCommandData = [{
    name: 'volume',
    description: 'Change a user\'s volume',
    options: [{
        name: 'user',
        type: 'USER',
        description: 'A user to change',
        required: true,
    },
    {
        name: 'volume',
        type: 'INTEGER',
        description: 'The new volume to set',
        required: true,
    }],
},
{
    name: 'leave',
    description: 'Leave the current voice channel',
}
]

module.exports = { globalCommandData, guildCommandData };