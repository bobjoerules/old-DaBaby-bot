const keepAlive = require("./server.js")
const Discord = require('discord.js');
const client = new Discord.Client();
var U_U = 0


keepAlive()
client.once('ready', () => {
	console.log('Ready!');
  client.channels.cache.get('838264759899652137').send('DaBaby bot has been restarted')
	client.user.setActivity('serving ' + client.guilds.cache.size + ' servers', { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
  
});

client.on('message', async (message) => {
	if (message.content.includes("gtg")) {
		message.channel.send('bye');
	}
});

client.on('message', async (message) => {
  if ((message.content) == 'DaBaby') {
    message.channel.send(String('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2F63fiic43g0o51.jpg&f=1&nofb=1'));
  }
  if ((message.content) == '!help') {
    message.channel.send(String('(For help use "DaBaby help")'));
  }
});



client.on('message', async (message) => {
  if ((message.content) == 'DaBaby help') {
    message.channel.send('**Help list (2 main things added)** \nDaBaby = Car Image \nDaBaby how many times have you been used? = How many times DaBaby bot has been used since last restart \nNeed more help? Join DaBaby discord serverhttps://discord.gg/m3w6suWFgf \n------------------------------------------------------')
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
    U_U = (typeof U_U == 'number' ? U_U : 0) + 1;
    console.log (U_U);
  }
  if ((message.content) == 'DaBaby how many times have you been used?') {
    message.channel.send(String(('DaBaby was used ' + ((U_U) + ' times since last restart of program'))));
  }
  

});


client.on('message', async (message) => {
  if (message.author.bot) {
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
  if (message.author.username == 'Bobjoerules' && message.author.discriminator == 6454) {
      if (message.channel.id == (837132099932651540)) {
        try {
          U_U +=Number(message.content);
        } catch  {
          console.log('not number')
        };
      console.log(U_U);
      };

  };
});

client.on('message', async (message) => {
  if (message.content.includes("ho broke Peggy's window?")) {
    message.channel.send('"I was the one that broke Peggy\'s window in 3rd grade asc" -Theo Butler, 2021')
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
    message.channel.send(String('(DaBaby is in Beta mode)'));
  }

});



client.login(process.env.TOKEN)