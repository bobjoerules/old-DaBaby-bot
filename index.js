//server so bot does not stop running when you leave the replit  
const keepAlive = require("./server.js")
//imageapi
const api = require("imageapi.js");
//discord.js for using the bot for discord
const Discord = require('discord.js'),
//Music player for discord distube
DaPLAY = require('distube'),
//discord client
client = new Discord.Client(),
//config for distube
config = {
  //prefix
  prefix: "DaBaby",
  //token
  token: process.env.TOKEN 
};
//daplay
const daplay = new DaPLAY(client, { searchSongs: false, emitNewSongOnly: true });
//discord buttons
const disbut = require('discord-buttons')(client);
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
//random number
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
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
  client.user.setActivity('Servers: ' + client.guilds.cache.size + ' Uses: ' + fsLibrary.readFileSync('times_used.int','utf8') + '(Uses may be off (less) real amount)', { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });

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
    const help = new Discord.MessageEmbed()
    //send list of things bot can do
    help.setTitle('Help List:')
    help.setColor('#5cf000')
    help.setDescription('Main commands:\n\n• DaBaby help = List of what the bot can do (u are looking at it rn)\n• DaBaby car = DaBaby car image\n• DaBaby lessgo = Video of lessgo\n• DaBaby reply = Reply with “k”\n• DaBaby game = Link to DaBaby game\n• DaBaby meme = Proved DaBaby meme from Reddit\n•  DaBaby suggestion (suggestion) = Suggest something to be added (join the bots discord server to see the status of the suggestion)\n•  DaBaby are you sus? = Is he? IDK why don’t u find out\n•  DaBaby how many times have you been used? = About how many times he has been used\n\nOther:\n\n• gtg = Bot says bye\n• !help = Tell user how to use DaBaby bot help if they want to\n• Some commands are easter eggs try to find them or cheat using the bot github\n• DaBaby random image = Random image\n\n♫Music (Beta only Youtube rn):\n\nYOU NEED TO BE IN A VOICE CHANNEL AND THE BOT NEEDS TO BE ABLE TO JOIN!!!\n\n• DaBaby play (Youtube song name or Youtube URL or Youtube playlist URL) = Play that song or playlist \n• DaBaby  stop = Stop the music playing\n• DaBaby shuffle = Shuffle the queue/playlist\n• DaBaby skip = Skips the playing song\n\nLinks:\n\n• DaBaby server = This bots help and official server\n• DaBaby website = Link to the website for this bot\n• DaBaby invite = Invite link for this bot')
    message.channel.send(help)
    //set used to true so it adds one more to true
    var used = true
  }
  if (message.content.includes("gtg")) {
    //say bye too person leaving for the time being
		message.reply('bye');
    //set used to true so it adds one more to true
    var used = true
	}

  if (message.content.includes("DaBaby I voted")) {
    const fetch = require("node-fetch"); // import node-fetch module

    const botId = client.user.id; // get the client (bot) id
    const uId = message.author.id; // get the author id

    const url = `https://top.gg/api/bots/${botId}/check?userId=${uId}`; // api endpoint

    fetch(url, { method: "GET", headers: { Authorization: "your top.gg bot token" }})
      .then((res) => res.text())
      .then((json) => {
         var isVoted = JSON.parse(json).voted;

        if (isVoted === 0) {
          return message.channel.send("you haven't voted yet");
        }

          message.channel.send("This command is not setup yet sry");
      });

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
  if (message.content.startsWith('DaBaby suggestion')) {
    const suggest = new Discord.MessageEmbed()
    suggest.setTitle('Suggestion made by: ' + message.author.username)
    suggest.setColor('#5cf000')
    suggest.setDescription(message.content.slice(17))
    suggest.setTimestamp()
    var used = true
    client.channels.cache.get('846452836615061564').send(suggest)
  }
  
  if (message.content.startsWith('!button')) {
    let btn = new disbut.MessageButton()
        btn.setLabel('Help!');
        btn.setStyle('blurple')
        btn.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        btn.setID('clickto');
    await message.channel.send("hello", btn);   
  }
  
  if (used) {
    //add used
    var usedtimes = 0
    usedtimes = Number(fsLibrary.readFileSync('times_used.int','utf8'))
    console.log(usedtimes)
    usedtimes +=1
    fsLibrary.writeFileSync('times_used.int',usedtimes)
    
  };
  if ((message.content) == 'DaBaby how many times have you been used?'){
    var used = true
    const timesused = new Discord.MessageEmbed()
    timesused.setDescription('I have been used ' + fsLibrary.readFileSync('times_used.int','utf8') + ' times')
    message.reply(timesused)
  }
  if ((message.content) == 'DaBaby are you sus?') {
    const sus = new Discord.MessageEmbed()
    sus.setTitle('Yes!!!')
    sus.setImage('https://i.ytimg.com/vi/Ns6y5otgkXY/maxresdefault.jpg')
    message.channel.send(sus)
  }
  if (message.content.startsWith('DaBaby avata')) {
    const user = message.mentions.users.first() || message.author;
    message.channel.send("https://cdn.discordapp.com/avatars/"+user.id+"/"+user.avatar+".jpeg");
    message.channel.send('Here is ' + user.username + '\'s avatar')
    var used = true
  }
  if ((message.content) == 'DaBaby random image') {
    const rndInt = randomIntFromInterval(0, 1000)
    message.channel.send('https://picsum.photos/id/' + rndInt + '/1080/720')
  }
});




client.on('message', async (message) => {
  //makes times used not change every message
  used = false
  //Lessgo
  if (message.author.bot) {
    return
  }
  //don't send lessgo if commaned 
  if (message.content == "DaBaby help" || message.content == "DaBaby meme" || message.content == "DaBaby game" || message.content == "DaBaby cheese server" || message.content == "DaBaby NSFW" || message.content == "DaBaby car" || message.content.startsWith('DaBaby avatar') || message.content.startsWith('DaBaby suggestion')) {
    return
  }
  
});


client.on('clickButton', async (button) => {
    if (button.id === 'clickto') {
        await button.think(true);

        setTimeout(() => {
            button.reply.edit("Chips hair is very pretty");
        }, 1000);
    };
});

client.on('message', message => {
	if (message.author.bot) return
	if (!message.content.startsWith(config.prefix)) return
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
	const command = args.shift()

	if (command === 'play') daplay.play(message, args.join(' '))

	if (['repeat', 'loop'].includes(command)) daplay.setRepeatMode(message, parseInt(args[0]))

	if (command === 'stop') {
    const queue = daplay.getQueue(message)
    if (queue) {
      daplay.stop(message)
      message.channel.send('Stopped the music!')
    } else if (!queue) {
     message.channel.send("No music to stop")
    } 
	}
  if (command === 'skip') {
    const queue = daplay.getQueue(message)
    if (queue) {
      daplay.skip(message)
      message.channel.send("Song skipped")
    } else if (!queue) {
     message.channel.send("No music to skip")
    } 
  }
	

	if (command === 'queue') {
		const queue = daplay.getQueue(message)
    if (queue) {
      message.channel.send(`Current queue:\n${queue.songs.map((song, id) =>
			`**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join('\n')}`)
    } else if (!queue) {
     message.channel.send("No queue")
    } 
    
	}

	if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
		const filter = daplay.setFilter(message, command)
		message.channel.send(`Current queue filter: ${filter || 'Off'}`)
	}
  if (command == "shuffle") {
    const queue = daplay.getQueue(message)
    if (queue) {
      daplay.shuffle(message)
    } else if (!queue) {
     message.channel.send("No music to shuffle")
    } 
  }
  
})


const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || 'Off'}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``


daplay
  
	.on('playSong', (message, queue, song) => {
    const music = new Discord.MessageEmbed()
    music.setTitle('DaBaby Music player:')
    music.setColor('#ffffff')
    music.setDescription(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
    message.channel.send(music)
  })
	.on('addSong', (message, queue, song) => {
    const music = new Discord.MessageEmbed()
    music.setTitle('DaBaby Music player:')
    music.setColor('#ffffff')
    music.setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
    message.channel.send(music)
  })
	.on('playList', (message, queue, playlist, song) => {
    const music = new Discord.MessageEmbed()
    music.setTitle('DaBaby Music player:')
    music.setColor('#ffffff')
    music.setDescription(`Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\``)
    message.channel.send(music)
  })
	.on('addList', (message, queue, playlist) => {
    const music = new Discord.MessageEmbed()
    music.setTitle('DaBaby Music player:')
    music.setColor('#ffffff')
    music.setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue`)
    message.channel.send(music)
  })

	.on('searchResult', (message, result) => {
		let i = 0
    music.setTitle('DaBaby Music player:')
    music.setColor('#ffffff')
    music.setDescription(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join('\n')}\n*Enter anything else or wait 60 seconds to cancel*`)
    message.channel.send(music)
	})

	.on('searchCancel', message => {
    music.setTitle('DaBaby Music player:')
    music.setColor('#ffffff')
    music.setDescription(`Searching canceled`)
    message.channel.send(music)
  })
	.on('error', (message, e) => {
    music.setTitle('DaBaby Music player:')
    music.setColor('#ffffff')
    music.setDescription(`bot cannot join that voice channel or you are not in a/the voice channel`)
    message.channel.send(music)
		console.error(e)
	})
  .on("empty", message => {
    music.setTitle('DaBaby Music player:')
    music.setColor('#ffffff')
    music.setDescription(`Channel is empty. Leaving the channel`)
    message.channel.send(music)
  })
  .on("finish", message => {
    music.setTitle('DaBaby Music player:')
    music.setColor('#ffffff')
    music.setDescription(`No more song in queue`)
    message.channel.send(music)
  });
  

client.login(process.env.TOKEN)