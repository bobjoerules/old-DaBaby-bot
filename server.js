const express = require('express');
const server = express();
server.all('/', (req, res)=>{
<<<<<<< HEAD
    res.send('nothing')
=======
    res.send('Bot website has been moved to: <a href="https://bobjoerules.github.io/DaBabyBot/">https://bobjoerules.github.io/DaBabyBot/</a>')
>>>>>>> origin/master
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("Website and on forever!")});
}
module.exports = keepAlive;

