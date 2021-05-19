//server
const keepAlive = require("./server.js")
//api
const api = require("imageapi.js");
//discord.js
const Discord = require('discord.js');
//discord client
const client = new Discord.Client();
//fsLibrary
const fsLibrary  = require('fs') 
//got
const got = require('got');
var repeater;
//random colors
const list = [1, 2, 3, 4, 5]
function getRandomColor() {
  var color = '#' + Number(Math.floor(Math.random() * 16777215)).toString(16)
  console.log(color)
  return color;
}
//meme function
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
        embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
        message.reply(embed)
            .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        console.log('Bot responded with: ' + memeImage);
    }).catch(console.error);
}
//keep alive
keepAlive()

client.once('ready', () => {
  //Tell the bot is ready
	console.log('Ready!');
  //How many servers is the bot in
  console.log('In ' + client.guilds.cache.size + ' servers')
  //DaBaby bot server shows that the bot restarted
  client.channels.cache.get('838264759899652137').send('DaBaby bot has been restarted')
  //Set status and activity
  client.user.setPresence({
   status: "online"
  });
	client.user.setActivity('cleaning up bot and adding things go too the help server if anything is wrong', { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
});



client.on('message', async (message) => {
  //Makes times used not change every message
  used = false
  //Bot doesn't trigger it's self and other bots don't also
  if (message.author.bot) {
    return
  }
  //Help
  if ((message.content) == 'DaBaby help') {
    //delete message of DaBaby help
    message.delete()
    //send list
    message.channel.send('**Help list** \n-DaBaby car = Car Image \n-DaBaby how many times have you been used? = How many times DaBaby bot has been used since last restart \n-DaBaby meme = random meme \n-DaBaby game = link to good DaBaby game for apple phones \n-Need more help? Join DaBaby discord server https://discord.gg/ESPGkAkqts\n-want the bot? Go here: https://DaBaby-main-code.bobjoerules.repl.co \n------------------------------------------------------')
    //set used to true so it adds one more to true
    var used = true
  }
  if (message.content.includes("gtg")) {
    //say bye too person leaving
		message.reply('bye');
    var used = true
	}
  if ((message.content) == 'DaBaby car') {
    //send image of DaBaby car
    message.channel.send('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2F63fiic43g0o51.jpg&f=1&nofb=1');
    var used = true
  }
  if (message.content.includes("DaBaby lessgo")) {
    //Lessgo
    message.reply('https://cdn.discordapp.com/attachments/840962120518074388/842485771276517426/video0.mp4')
    var used = true
  }
  if ((message.content) == '!help') {
    //for help use DaBaby instead
    message.reply('(For help in using DaBaby use "DaBaby help")');
    var used = true
  }

  if (message.content.includes("DaBaby reply")) {
    //reply k
    message.reply('K')
    var used = true
  }
  if ((message.content) == 'DaBaby game') {
    //Link to game
    message.reply('Get DaBaby game here (for apple only): https://apps.apple.com/us/app/dagame/id1562587737');
    var used = true
  }
  if ((message.content) == 'DaBaby NSFW') {
    //This is the wrong bot bro
    message.reply('I\'m not a NSFW bot!!!!' );
    var used = true
  }
  if ((message.channel.type) === 'dm') {
    //need help it's DaBaby help
    if ((message.content) == 'Help') {
      message.reply('(Use "DaBaby help")');
      var used = true
    }
  }
  if ((message.content) == 'DaBaby meme') {
    //send meme using the function
    meme(message);
    var used = true
  }
  if ((message.content) == 'DaBaby cheese server') {
    //cheese server link
    message.reply('https://discord.gg/dRW6fPjHpC')
    var used = true
  }
  if (used) {
    //add used
    var usedtimes = 0
    usedtimes = Number(fsLibrary.readFileSync('times_used.int','utf8'))
    console.log(usedtimes)
    usedtimes +=1
    fsLibrary.writeFileSync('times_used.int',usedtimes)
    
  };
});




client.on('message', async (message) => {
  //makes times used not change every message
  used = false
  //Lessgo
  if (message.author.bot) {
    return
  }
  //don't send lessgo if commaned 
  if (message.content == "DaBaby help" || message.content == "DaBaby meme" || message.content == "DaBaby game" || message.content == "DaBaby cheese server" || message.content == "DaBaby NSFW" || message.content == "DaBaby car") {
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
//token
client.login(process.env.TOKEN)