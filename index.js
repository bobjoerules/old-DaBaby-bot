//server so bot does not stop running when you leave the replit  
const keepAlive = require("./server.js")
//discord.js for using the bot for discord
const Discord = require('discord.js');
//discord client
const client = new Discord.Client();
//fsLibrary for reading file
const fsLibrary  = require('fs'); 
//got for reddit
const got = require('got');

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

client.once('ready', async () => {
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
    help.setDescription('Main commands:\n\n• DaBaby help = List of what the bot can do (u are looking at it rn)\n• DaBaby car = DaBaby car image\n• DaBaby lessgo = Video of lessgo\n• DaBaby reply = Reply with “k”\n• DaBaby game = Link to DaBaby game\n• DaBaby meme = Aproved DaBaby meme from Reddit\n•  DaBaby suggestion (suggestion) = Suggest something to be added (join the bots discord server to see the status of the suggestion)\n•  DaBaby are you sus? = Is he? IDK why don’t u find out\n•  DaBaby video = random DaBaby youtube music video\n•  DaBaby how many times have you been used? = About how many times he has been used\n\nOther:\n\n• gtg = Bot says bye\n• !help = Tell user how to use DaBaby bot help if they want to\n• Some commands are easter eggs try to find them or cheat using the bot github\n\nLinks:\n\n• DaBaby server = This bots help and official server\n• DaBaby website = Link to the website for this bot\n• DaBaby invite = Invite link for this bot\n\n(DaBaby bot is being changed and some commands not related to DaBaby have been taken away)\n\nIf you have had this bot since before August 17, 2021 and have bot adding prvilages pls re give dababy permishions here: https://discord.com/api/oauth2/authorize?client_id=836069453389234206&permissions=261392563904&scope=bot%20applications.commands')
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
    link.setDescription('Get DaBaby bot here: https://discord.com/api/oauth2/authorize?client_id=836069453389234206&permissions=261392563904&scope=bot%20applications.commands\n(because the bot is not verifed yet you can not add to your server rn😭)')
    message.channel.send(link)
    var used = true
  }

  if ((message.content.slice(7)) == 'server') {
    message.reply('Go to the help server here: https://discord.gg/RHNhkEbVa7')
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

  if ((message.content.toLowerCase().slice(7)) == 'nsfw') {
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
  
  if ((message.content.slice(7)) == 'video') {
    var videos = ["https://www.youtube.com/watch?v=zxYd__gqv2Q", "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://www.youtube.com/watch?v=sud8Uu1kUXY", "https://www.youtube.com/watch?v=0ExLTKxwo2I", "https://www.youtube.com/watch?v=_2xOlMxvZQo", "https://www.youtube.com/watch?v=G8iyLY6XDzU", "https://www.youtube.com/watch?v=3nczXHkM66A", "https://www.youtube.com/watch?v=JbCQr5KWdIo", "https://www.youtube.com/watch?v=XYA-nnQHoU4", "https://www.youtube.com/watch?v=aYf5qJZAsDw", "https://www.youtube.com/watch?v=jwq3kGjD2oU", "https://www.youtube.com/watch?v=JeHQLB7_Tec", "https://www.youtube.com/watch?v=lTL5MI3HP9o", "https://www.youtube.com/watch?v=vmJ28N5ZmBk", "https://www.youtube.com/watch?v=bAS5tPtG5Ls", "https://www.youtube.com/watch?v=rgJF67GCk30", "https://www.youtube.com/watch?v=WwJdvI30TaI", "https://www.youtube.com/watch?v=XqJa78l_fZQ", "https://www.youtube.com/watch?v=IqBf0v8cnEA", "https://www.youtube.com/watch?v=16zZ-EQt--s", "https://www.youtube.com/watch?v=S5yUke18KPU", "https://www.youtube.com/watch?v=8Ok5JbQObR4", "https://www.youtube.com/watch?v=du3jSqznkKI", "https://www.youtube.com/watch?v=ejkAAL3VCpo", "https://www.youtube.com/watch?v=CqdZ306YToo", "https://www.youtube.com/watch?v=LVRAmRljmR4", "https://www.youtube.com/watch?v=LI8FgqMg-Yg", "https://www.youtube.com/watch?v=XiMb8xtzX90", "https://www.youtube.com/watch?v=aRuEpSl_8UY", "https://www.youtube.com/watch?v=TJb_4-OPPe8", "https://www.youtube.com/watch?v=4uAtq4cGaUw", "https://www.youtube.com/watch?v=uDHIKmFfp4g", "https://www.youtube.com/watch?v=sT31vZV76GQ", "https://www.youtube.com/watch?v=noRRc2L_B6Y", "https://www.youtube.com/watch?v=3xqm1TKtkg4", "https://www.youtube.com/watch?v=u4iCNIdIVRU", "https://www.youtube.com/watch?v=zQa8FFYGN8E", "https://www.youtube.com/watch?v=nXld3i2B8Zk", "https://www.youtube.com/watch?v=qVxsJp5KeKs", "https://www.youtube.com/watch?v=P5tizC9WtBo", "https://www.youtube.com/watch?v=1w8dhOsbW1c", "https://www.youtube.com/watch?v=3zWNqOj8pdo", "https://www.youtube.com/watch?v=llvdjRGFszw", "https://www.youtube.com/watch?v=KvuQNNVrbtM", "https://www.youtube.com/watch?v=dDH0EukOeuY", "https://www.youtube.com/watch?v=T0seYxfaoG0", "https://www.youtube.com/watch?v=EqHYnsVHXUA", "https://www.youtube.com/watch?v=SEpmYLu-CCA", "https://www.youtube.com/watch?v=LPBVHrQ18yI", "https://www.youtube.com/watch?v=GoOb3ta2Vns", "https://www.youtube.com/watch?v=TUVcZfQe-Kw", "https://www.youtube.com/watch?v=R4ITBv0h-kc", "https://www.youtube.com/watch?v=ce1lTmRtIkM", "https://www.youtube.com/watch?v=DoTKH9Qq3ME", "https://www.youtube.com/watch?v=MKr_idr2EwQ", "https://www.youtube.com/watch?v=EIruPvj3D3Y", "https://www.youtube.com/watch?v=NvEaSmftaIQ", "https://www.youtube.com/watch?v=NBG3HF5l8jU", "https://www.youtube.com/watch?v=YV6yfKYAmq0", "https://www.youtube.com/watch?v=Qt1qdOE6rQU", "https://www.youtube.com/watch?v=Z2aFeoNsrL4", "https://www.youtube.com/watch?v=QAcYmi-3IPo", "https://www.youtube.com/watch?v=TB3AXnNWw9U", "https://www.youtube.com/watch?v=WTTF5c9Tk7k", "https://www.youtube.com/watch?v=P1T7P1_e-_8", "https://www.youtube.com/watch?v=U2JyeciEwSI", "https://www.youtube.com/watch?v=uf2-sRNVEPs", "https://www.youtube.com/watch?v=LTWpAsMJMX0", "https://www.youtube.com/watch?v=28hYUZMufDg", "https://www.youtube.com/watch?v=YffEyeWn_fA", "https://www.youtube.com/watch?v=pbGLwe53-LI", "https://www.youtube.com/watch?v=x7H8xF5k0ck", "https://www.youtube.com/watch?v=gmK_gaE5v9A", "https://www.youtube.com/watch?v=pEBES1ezTZY", "https://www.youtube.com/watch?v=Di6kLqJp-Us", "https://www.youtube.com/watch?v=aNEfeeH2IcQ", "https://www.youtube.com/watch?v=9oHXC6yEqP4", "https://www.youtube.com/watch?v=IsTuVSgvH4g", "https://www.youtube.com/watch?v=F4TA9lWbJGc", "https://www.youtube.com/watch?v=83xBPCw5hh4", "https://www.youtube.com/watch?v=Ojaa4mDf4-U", "https://www.youtube.com/watch?v=ZgU3UrZW1QE", "https://www.youtube.com/watch?v=MuUO7hbiBt4", "https://www.youtube.com/watch?v=frvSFPOEuxo", "https://www.youtube.com/watch?v=W12UCAgRES8", "https://www.youtube.com/watch?v=hgFV7v0jcDs", "https://www.youtube.com/watch?v=qWGYRqNmeQ0", "https://www.youtube.com/watch?v=xjmC4lSk-2U", "https://www.youtube.com/watch?v=3qoV_Ee9pOM", "https://www.youtube.com/watch?v=2m7il4N0l78", "https://www.youtube.com/watch?v=Yodmdil9yOY", "https://www.youtube.com/watch?v=UuwtLvnHZ8c", "https://www.youtube.com/watch?v=0Em5cZFocQ0", "https://www.youtube.com/watch?v=mxFstYSbBmc", "https://www.youtube.com/watch?v=4PDpVNKZgKg", "https://www.youtube.com/watch?v=DnMg6HykXzg", "https://www.youtube.com/watch?v=Uz3zBZQzO5Q", "https://www.youtube.com/watch?v=H3PVZg6HTMA", "https://www.youtube.com/watch?v=uDwhZIQg-fw", "https://www.youtube.com/watch?v=6Taz7ZzPYeI", "https://www.youtube.com/watch?v=bAJPaAEMc10", "https://www.youtube.com/watch?v=DVhyri3LcXA", "https://www.youtube.com/watch?v=40_cp4quzzE", "https://www.youtube.com/watch?v=m5HdUgo_VuU", "https://www.youtube.com/watch?v=cHcYPfIdL3M", "https://www.youtube.com/watch?v=62lsXiMR7Sk", "https://www.youtube.com/watch?v=1YzXZN37stw", "https://www.youtube.com/watch?v=JPZBiGdQs7o", "https://www.youtube.com/watch?v=agBsDTrsF94", "https://www.youtube.com/watch?v=LjYiSRI_HWw", "https://www.youtube.com/watch?v=Jtf0_vyqN5c", "https://www.youtube.com/watch?v=JjISrGx89aA", "https://www.youtube.com/watch?v=phHhgQdfiCQ", "https://www.youtube.com/watch?v=nZSpHIBxReY", "https://www.youtube.com/watch?v=vlQ1Ozc0Hqc", "https://www.youtube.com/watch?v=p6IIWuwdNIc", "https://www.youtube.com/watch?v=uKhy1Y69BT4", "https://www.youtube.com/watch?v=FSe1HFBMmHU", "https://www.youtube.com/watch?v=PlcaUKin8rM", "https://www.youtube.com/watch?v=pnMtmFzMLP4", "https://www.youtube.com/watch?v=Kumjs5z7IL4", "https://www.youtube.com/watch?v=bEe2ohaO8BA", "https://www.youtube.com/watch?v=_Rzm7cPzVUo", "https://www.youtube.com/watch?v=c2NpbUuRNkU", "https://www.youtube.com/watch?v=e3uqVDQtJiU", "https://www.youtube.com/watch?v=432kcoNiASo", "https://www.youtube.com/watch?v=HIwAI05Y1fU", "https://www.youtube.com/watch?v=LSNAJ1KxhT0", "https://www.youtube.com/watch?v=AqaQsL-8I_M"];
    var video = Math.floor(Math.random() * videos.length);
    message.channel.send(videos[video]);
  }
  if ((message.content.slice(7)) == 'fact') {
    var facts = ["DaBaby use too go by the name Baby Jesus", "DaBaby's youtube channel has 8.7M subscribers"];
    var video = Math.floor(Math.random() * facts.length);
    message.channel.send(facts[fact]);
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