const keepAlive = require("./server.js")
const api = require("imageapi.js");
const Discord = require('discord.js');
const client = new Discord.Client();
const fsLibrary  = require('fs') 
const got = require('got');
var repeater;
const list = [1, 2, 3, 4, 5]
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function meme(message) {
    const embed = new Discord.MessageEmbed();
    got('https://www.reddit.com/r/GoodDaBabyMemes/random/.json').then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
        embed.setImage(memeImage);
        embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
        message.reply(embed)
            .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        console.log('Bot responded with: ' + memeImage);
    }).catch(console.error);
}
keepAlive()

client.once('ready', () => {
	console.log('Ready!');
  console.log(client.guilds.cache.size)
  client.channels.cache.get('838264759899652137').send('DaBaby bot has been restarted')
  client.user.setPresence({
   status: "online"
  });
	client.user.setActivity('DaBaby help', { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
});



client.on('message', async (message) => {
  if (message.content.includes("gtg")) {
		message.reply('bye');
	}
  if ((message.content) == 'DaBaby car') {
    message.channel.send('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2F63fiic43g0o51.jpg&f=1&nofb=1');
  }
  if (message.content.includes("DaBaby lessgo")) {
    message.reply('https://cdn.discordapp.com/attachments/840962120518074388/842485771276517426/video0.mp4')
  }
  if ((message.content) == '!help') {
    message.reply('(For help use "DaBaby help")');
  }

  if (message.content.includes("DaBaby reply")) {
    if ((message.author.id) === '836069453389234206') {
     console.log('yes')
      return
    }
    message.reply('K')
  }
  if (message.content=== "DaBaby leave this server right now") {
    if ((message.guild.id) === '814940437751660595') {
      return
    }
    console.log('leaving' + message.guild)
    message.guild.leave()
  }
});



client.on('message', async (message) => {
  if ((message.content) == 'DaBaby help') {
    message.delete()
    message.channel.send('**Help list** \n-DaBaby car = Car Image \n-DaBaby how many times have you been used? = How many times DaBaby bot has been used since last restart \n-DaBaby meme = random meme \n-DaBaby game = link to good DaBaby game for apple phones \n-Need more help? Join DaBaby discord server https://discord.gg/ESPGkAkqts\n-want the bot? Go here: https://DaBaby-main-code.bobjoerules.repl.co \n------------------------------------------------------')
  }

});


client.on('message', async (message) => {
  if (message.author.bot) {
    return
  }
  if ((message.content) == 'DaBaby help') {
    return
  }
  if (message.content.includes("DaBaby")) {
    message.channel.send(String('Lessgo'));
  
  }
  if (message.content.includes("Dababy")) {
    message.channel.send(String('Lessgo'));
  }
  if (message.content.includes("dababy")) {
    message.channel.send(String('Lessgo'));
  }
  if (message.content.includes("daBaby")) {
    message.channel.send(String('Lessgo'));
  }
  if (message.content.includes("DABABY")) {
    message.channel.send(String('Lessgo'));
  }
});

client.on('message', async (message) => {
  if (message.author.bot) {
    return
  }
  if (message.content.includes("DaBaby")) {
    if ((message.author.id) === '836069453389234206') {
     console.log('DaBaby')
      return
    }  
    U_U = (typeof U_U == 'number' ? U_U : 0) + 1;
    console.log (U_U);
    client.channels.cache.get('838264759899652137').send('DaBaby has been used ' + ((U_U)) + ' times since last restart')
  }
  if ((message.content) == 'DaBaby how many times have you been used?') {
    message.reply(String(('DaBaby was used ' + ((U_U) + ' times since last restart of program'))));
  }
  if ((message.content) == 'DaBaby game') {
    message.reply('Get DaBaby game here (for apple only): https://apps.apple.com/us/app/dagame/id1562587737')
  }

});


client.on('message', async (message) => {
  if (message.author.bot) {
    return
  }
  if ((message.channel.type) === 'dm') {
    console.log(message.author.username + '#' + message.author.discriminator + ':  '+ message.content)
    client.channels.cache.get('837843398667927562').send(message.author.username + '#' +  message.author.discriminator + ':  '+ message.content)
    client.channels.cache.get('837843398667927562').send('In private dms')
    console.log('In private dms')
    return
  }
  if (message.content.includes("DaBaby")) {
    console.log(message.author.username + '#' + message.author.discriminator + ':  '+ message.content)
    client.channels.cache.get('837843398667927562').send(message.author.username + '#' +  message.author.discriminator + ':  '+ message.content)
    console.log('On server: ' + message.guild.name)
    console.log('On channel: ' + message.channel.name)
    client.channels.cache.get('837843398667927562').send('On server: ' + message.guild.name)
    client.channels.cache.get('837843398667927562').send('On channel: ' + message.channel.name)
  }

});


client.on('message', async (message) => {
  if (message.content.includes("ho broke Peggy's window?")) {
    message.reply('"I was the one that broke Peggy\'s window in 3rd grade asc" -Theo Butler, 2021')
  }
});

client.on('message', async (message) => {
  if (message.author.bot) {
    return
  }
  if ((message.content) == 'DaBaby help') {
    return
  }


});


client.on('message', async (message) => {
  if (message.content.includes('DaBaby')) {
    fsLibrary.writeFile('tt.txt', 'no', (error) => { 
      if (error) throw err; 
    }) 
  }
  if ((message.content) == 'DaBaby NSFW') {
    message.reply('I\'m not a NSFW bot!!!!' );
  }
  if ((message.channel.type) === 'dm') {
    if ((message.content) == 'Help') {
      message.reply(String('(Use "DaBaby help")'));
    }
  }
  if (message.content.includes('DaBaby help embed test')) {
    message.reply('no working sry')
  }
});

client.on('message', async (message) => {
  if ((message.content) == 'DaBaby meme') {
    meme(message);
  }
  if ((message.content) == 'DaBaby cheese server') {
    message.reply('https://discord.gg/dRW6fPjHpC')
  }
});


client.login(process.env.TOKEN)