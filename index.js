const https = require('https')
const axios = require('axios');

const { Client, Intents } = require('discord.js');
const config = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const commandPrefix = '!';

async function getMeme() {
    const req = await axios.get('https://meme-api.herokuapp.com/gimme/1').then(res => {
        return res.data.memes[0];
    });

    return req;
}

client.on('messageCreate', async msg => {
    if(!msg.content.startsWith(commandPrefix)) return;

    if(msg.content === '!profile') {
        await msg.reply(`Hi ${msg.author} ! You're an asshole :)`);
    } else if(msg.content === '!meme') {
        const meme = await getMeme();
        msg.channel.send(meme.title);
        msg.channel.send(meme.url);
    }
});

client.login(config.BOT_TOKEN).then((log) => {
    console.log('is logged ! ')
});
