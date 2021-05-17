[![Release](https://img.shields.io/github/v/release/nicnacnic/DACBot?label=Release)](https://github.com/nicnacnic/speedcontrol-layouts/releases)
![License](https://img.shields.io/github/license/nicnacnic/DACBot?label=License)
[![Twitter](https://img.shields.io/twitter/follow/nicnacnic11?style=social)](https://twitter.com/nicnacnic11)
[![Discord](https://img.shields.io/badge/-Join%20the%20Discord!-brightgreen?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/A34Qpfe)

## Contents
- [What is DACBot?](https://github.com/nicnacnic/DACBot/blob/main/README.md#what-is-dacbot)
- [Requirements](https://github.com/nicnacnic/DACBot/blob/main/README.md#requirements)
- [Bot Setup](https://github.com/nicnacnic/DACBot/blob/main/README.md#bot-setup)
- [Usage](https://github.com/nicnacnic/DACBot/blob/main/README.md#usage)
   - [Using in Multiple Voice Channels](https://github.com/nicnacnic/DACBot/blob/main/README.md#using-in-multiple-voice-channels)
- [Troubleshooting](https://github.com/nicnacnic/DACBot/blob/main/README.md#troubleshooting)
- [Bugs](https://github.com/nicnacnic/DACBot/blob/main/README.md#bugs)
- [Contributing](https://github.com/nicnacnic/DACBot/blob/main/README.md#contributing)
- [Special Thanks](https://github.com/nicnacnic/DACBot/blob/main/README.md#special-thanks)
- [License](https://github.com/nicnacnic/DACBot/blob/main/README.md#license)

## What is DACBot?
Discord Audio Capture Bot (also known as DACBot) is a self-hosted Discord bot that can capture the audio of all users in a voice channel and stream it to an audio device of your choice! Perfect for those times you want to capture Discord audio but don't want to go through the hassle of capturing Discord directly through OBS.

## Requirements
- [Node.JS](https://nodejs.org/en/download/)

## Bot Setup
Go to the [Discord Developer Portal](https://discord.com/developers/applications), and create a new application.

![image](https://user-images.githubusercontent.com/39160563/118412839-352f1a00-b66a-11eb-9935-c440d9baec06.png)

You can name your application whatever you want, here it doesn't matter. Once your application is created, click on `Bot` in the menu on the left-side, and click on `Add Bot`.

![image](https://user-images.githubusercontent.com/39160563/118412924-aa9aea80-b66a-11eb-9cd7-71c02dc265c2.png)

Here you can customize the username and avatar of your bot. The username/avatar can be seen by all users, so choose wisely. A creative username is recommended! Once done, copy the token, it will be used later. **Do not share this token with anyone, otherwise they will be able to take full control of your bot.**

![image](https://user-images.githubusercontent.com/39160563/118413018-2dbc4080-b66b-11eb-8fd5-fd4ac103451b.png)

Download the latest [release](https://github.com/nicnacnic/DACBot/releases). Put all the files somewhere on your computer that you can easily navigate to. Make sure to run `npm install` in your Command Prompt to install the required dependencies. Then, open `config.json`.

Next to `token`, paste your bot token that you obtained earlier.  
Next to `roleID`, paste a role ID that a user must have to control the bot. If a user does not have the role specified, they won't be able to control the bot.  
Next to `device`, paste the name of the output device you want your bot to stream audio to. Leave blank for the default device. Included with the bot is a tool to list all available devices, you can run it by typing `node find_devices.js` in a command prompt window.

```json
{
        "token": "<paste_bot_token_here>",
	"roleID": "570634225125163029",
	"device": "Soundboard (Steam Streaming Microphone)"
}
```

Back in the [Discord Developer Portal](https://discord.com/developers/applications), go back to the `General Information` page. Then copy your application ID, this is how you'll invite your bot.

![image](https://user-images.githubusercontent.com/39160563/118413456-6a893700-b66d-11eb-9691-b6c791a8f72b.png)

To invite your bot, copy and paste the following URL in your browser. Replace `<application_id>` with your real application ID.
`https://discord.com/oauth2/authorize?scope=bot&permissions=0.&client_id=<application_id>`

On the page, select your server, then click `Authorize`. You might need to sign into Discord if you aren't already.

![image](https://user-images.githubusercontent.com/39160563/118413363-f3ec3980-b66c-11eb-9587-22c44311019c.png)

Finally navigate to your bot's folder in Command Prompt and type `node index.js` to start your bot. 

![image](https://user-images.githubusercontent.com/39160563/118413388-1da56080-b66d-11eb-9cc5-35a0ed6c5434.png)

You should see the bot become online on your server, and you're ready to type out some commands! It's a good idea to give the bot moderator permissions so it can see commands typed in hidden channels and connect to hidden voice channels.

![image](https://user-images.githubusercontent.com/39160563/118413508-af14d280-b66d-11eb-980a-67193bb2d0a3.png)

## Usage
Once the bot has started, enter a voice channel, then ping the bot with the `connect` command to have it join your VC and start capturing audio. To stop capturing audio, simply ping the bot again with the `disconnect` command and the bot will leave. Ping the bot with the `help` command for some help.

![image](https://user-images.githubusercontent.com/39160563/118412498-63abf580-b668-11eb-962b-9467ffc3a173.png)

### Using in Multiple Voice Channels
Currently, DACBot only supports audio capture in one voice channel at a time. But what if you want to capture audio from multiple voice channels? All you have to do is to setup multiple instances of DACBot, with different bots assigned for each instance. The command system ensures you're always pinging the right bot.

## Troubleshooting
**The audio is off-pitch!**

DACBot only supports 48 kHz, using any other frequency might distort the audio. Please choose an audio device that supports 48 kHz.

**The audio is super delayed!**

Under normal circumstances, the audio should only be delayed by ~0.25s. If it's delayed more, try restarting the bot.

**The commands don't work!**

Are you sure you're typing in the command correctly? Available commands are `connect`, `disconnect`, and `help`. Make sure you include a space between the ping and the command. Also, check your bot console for any potential errors.

**The bot crashes when speaking from my browser!**

See [Bugs](https://github.com/nicnacnic/DACBot/blob/main/README.md#bugs) below. Due to an issue with Discord.JS, only desktop/mobile is supported at the moment. Hopefully this gets fixed soon, but for the meantime make sure you're using deskop/mobile only.

## Bugs
- DACBot will **not** work if a user is connecting from the browser. It only works on desktop/mobile. It will crash the bot so don't attempt it. This appears to be a limitation with Discord.JS, the library used to write the bot.

## Contributing
If you have any suggestions or bugfixes, please submit a pull request! Before you do, please make sure you **test your code** to make sure the bot works correctly with your new changes.

## Special Thanks
Zoton2 and SovietPropaganda, for help and suggestions while coding the bot.

Patlabor and Titan63, for helping test the bot.

## License
MIT License

Copyright (c) 2021 nicnacnic

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
