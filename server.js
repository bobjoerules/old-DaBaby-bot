const express = require('express');
const server = express();

server.all('/', (req, res)=>{
    res.send('<iframe src="https://discord.com/widget?id=814940437751660595&theme=dark" width="750" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>')
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("Website and on forever!")});
}
module.exports = keepAlive;

