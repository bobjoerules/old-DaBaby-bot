const express = require('express');
const server = express();

server.all('/', (req, res)=>{
    res.send('<body style="background-color: #1f1f1f;"> <div style="text-align: center;"><br /></div><h1 style="text-align: center;"><span style="color: white;">Get the bot here:</span></h1><h1 style="text-align: center;"><a href="https://discord.com/api/oauth2/authorize?client_id=836069453389234206&amp;permissions=872938566&amp;scope=bot"><span style="color: white;">Click me to get bot...\n in 100 servers can not be added</span></a></h1><h2 style="text-align: center;"><span style="color: white;">Join the discord server for help if you need it...</span></h2><div style="text-align: center;"><br /></div><div style="text-align: center;"><iframe allowtransparency="true" frameborder="0" height="500" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" src="https://discord.com/widget?id=814940437751660595&amp;theme=dark" width="750"></iframe></div><div style="text-align: center;"><br /><div class="separator" style="text-align: center;"><a href="https://discordbotlist.com/bots/836069453389234206" style="margin-left: 1em; margin-right: 1em;"><img src="https://discordbotlist.com/api/v1/bots/836069453389234206/widget" /></a></div>')
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("Website and on forever!")});
}
module.exports = keepAlive;

