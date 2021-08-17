//server so bot does not stop running when you leave the replit  
const keepAlive = require("./server.js")
//imageapi
const api = require("imageapi.js");
//discord.js for using the bot for discord
const Discord = require('discord.js');
//discord client
const client = new Discord.Client();
//fsLibrary
const fsLibrary  = require('fs'); 
//got
const got = require('got');
var repeater;

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
  console.log(`Logged in as ${client.user.tag}!`);
  //Tell the bot is ready
	console.log('Ready!');
  //How many servers is the bot in
  console.log('In ' + client.guilds.cache.size + ' servers')
  //DaBaby bot server shows that the bot restarted
  //new embed
  const restartlog = new Discord.MessageEmbed()
    restartlog.setTitle('DaBaby bot has been restarted')
    restartlog.setColor('#ffff00')
    restartlog.setTimestamp()
  client.channels.cache.get('838264759899652137').send(restartlog)
  //Set status and activity
  client.user.setPresence({
   status: "online"
  });
  //shows how many servers and uses he bot has the uses is not spot on to true amount
	client.user.setActivity('Servers: ' + client.guilds.cache.size + ' Uses: ' + fsLibrary.readFileSync('times_used.int','utf8') + '(Uses may be off (less) real amount)', { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
  //shows stats on my bot on my server
  let guild = client.guilds.cache.get('814940437751660595');
  let serversin = guild.channels.cache.get('849051882314924053')
  let usesabout = guild.channels.cache.get('849860265989242890')
  serversin.setName('Servers: ' + client.guilds.cache.size)
  usesabout.setName('Uses ↔: ' + fsLibrary.readFileSync('times_used.int','utf8'))
});


client.on('guildCreate', (guild) => {
  //change amount of servers everytime bot is added too a server
  client.user.setActivity('Servers: ' + client.guilds.cache.size + ' Uses: ' + fsLibrary.readFileSync('times_used.int','utf8') + ' (about)', { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });

});



client.on('message', async (message) => {

  used = false

  if ((message.channel.type) === 'dm') {
    //need help it's DaBaby help
    if ((message.content.toLowerCase()) == 'help') {
      const Help = new Discord.MessageEmbed()
      Help.setTitle('(Use "DaBaby help")')
      message.reply(Help);
      var used = true
    }
  }

  if ((message.content) == '!help') {
    //for help use DaBaby instead
    const Help = new Discord.MessageEmbed()
    Help.setTitle('(For help in using DaBaby use "DaBaby help")')
    message.reply(Help);
    var used = true
  }

  if (message.content.includes("gtg")) {
    //say bye too person leaving for the time being
		message.reply('bye');
    //set used to true so it adds one more to true
    var used = true
	}

  if (!message.content.toLowerCase().startsWith("dababy")) return
  //Makes times used not change every message

  used = false

  //Bot doesn't trigger it's self and other bots don't also
  if (message.author.bot) return
  //Help

  if ((message.content.slice(7)) == 'help') {
    //delete message of DaBaby help
    message.delete()
    const help = new Discord.MessageEmbed()
    //send list of things bot can do
    help.setTitle('Help List:')
    help.setColor('#5cf000')
    help.setDescription('Main commands:\n\n• DaBaby help = List of what the bot can do (u are looking at it rn)\n• DaBaby car = DaBaby car image\n• DaBaby lessgo = Video of lessgo\n• DaBaby reply = Reply with “k”\n• DaBaby game = Link to DaBaby game\n• DaBaby meme = Proved DaBaby meme from Reddit\n•  DaBaby suggestion (suggestion) = Suggest something to be added (join the bots discord server to see the status of the suggestion)\n•  DaBaby are you sus? = Is he? IDK why don’t u find out\n•  DaBaby how many times have you been used? = About how many times he has been used\n\nOther:\n\n• gtg = Bot says bye\n• !help = Tell user how to use DaBaby bot help if they want to\n• Some commands are easter eggs try to find them or cheat using the bot github\n\nLinks:\n\n• DaBaby server = This bots help and official server\n• DaBaby website = Link to the website for this bot\n• DaBaby invite = Invite link for this bot')
    message.channel.send(help)
    //set used to true so it adds one more to true
    var used = true
  }

  if ((message.content.slice(7)) == 'car') {
    //send image of DaBaby car
    const Car = new Discord.MessageEmbed()
    Car.setImage('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2F63fiic43g0o51.jpg&f=1&nofb=1')
    Car.setTitle('Lessgo')
    message.channel.send(Car);
    var used = true
  }

  if ((message.content.slice(7)) == 'website') {
    const website = new Discord.MessageEmbed()
    website.setDescription('Go to the DaBaby bot\'s website here: https://bobjoerules.github.io/DaBabyBot-website/')
    message.channel.send(website)
    var used = true
  }
    if ((message.content.slice(7)) == 'invite') {
    const link = new Discord.MessageEmbed()
    link.setDescription('Get DaBaby bot here: https://discord.com/api/oauth2/authorize?client_id=836069453389234206&permissions=259849058880&scope=bot%20applications.commands')
    link.setDescription('(because the bot is not verifed yet you can not add to your server rn😭)')
    message.channel.send(link)
    var used = true
  }

  if (message.content.slice(7).includes("lessgo")) {
    //Lessgo
    message.channel.send('https://cdn.discordapp.com/attachments/840962120518074388/842485771276517426/video0.mp4')
    var used = true
  }
  
  if (message.content.slice(7).includes("reply")) {
    //reply k
    message.reply('K I reply')
    var used = true
  }

  if (message.content.slice(7).includes("among us emoji")) {
    //ඞ
    message.channel.send('ඞ')
    var used = true
  }

  if ((message.content.slice(7)) == 'game') {
    //Link to game
    message.reply('Get DaBaby game here (for apple Ios only): https://apps.apple.com/us/app/dagame/id1562587737');
    var used = true
  }

  if ((message.content.slice(7)) == 'NSFW') {
    //This is the wrong bot bro
    message.reply('I\'m not a NSFW bot!!!!' );
    var used = true
  }

  if ((message.content.slice(7)) == 'meme') {
    //send meme using the function
    meme(message);
    var used = true
  }

  if ((message.content.slice(7)) == 'cheese server') {
    //cheese server link
    message.reply('https://discord.gg/dRW6fPjHpC')
    var used = true
  }
  
  //suggest command
  if (message.content.slice(7).startsWith('suggestion')) {
    const suggest = new Discord.MessageEmbed()
    suggest.setTitle('Suggestion made by: ' + message.author.username)
    suggest.setColor('#5cf000')
    suggest.setDescription(message.content.slice(17))
    suggest.setTimestamp()
    var used = true
    //send to bot suggestions channel
    client.channels.cache.get('846452836615061564').send(suggest)
  }

  if ((message.content.slice(7)) == 'how many times have you been used?'){
    const timesused = new Discord.MessageEmbed()
    timesused.setDescription('I have been used ' + fsLibrary.readFileSync('times_used.int','utf8') + ' times')
    message.reply(timesused)
   var used = true
  }

  if ((message.content.slice(7)) == 'are you sus?') {
    const sus = new Discord.MessageEmbed()
    sus.setTitle('Yes!!!')
    sus.setImage('https://i.ytimg.com/vi/Ns6y5otgkXY/maxresdefault.jpg')
    message.channel.send(sus)
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


client.login(process.env.TOKEN)