const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const feedr = require('feedr').create({/* optional configuration */});

const ServerConfig = require('../etc/config.json');

const app = express();
app.use(bodyParser.json());
app.use( cors({ origin: '*' }) );



app.post(`/${ServerConfig.getChannel}/`, function (req, res) {

    const { channelRss } = req.body;

    feedr.readFeed(channelRss, {/* optional configuration */}, function (err, data, headers) {
        // console.log(err, data.channel);
        if (err) throw err;

        console.log('\n');
        console.log('=============== [ LOAD CHANNEL ] ===============');
        console.log(`Channel rss: ${channelRss}`);

        try {
            const channel = (data.rss && data.rss.channel[0]) || data.channel[0];
            console.log('================== SUCCESSFULLY ===================');

            res.send(channel);
        }
        catch (err) {
            console.log('====================== ERROR ======================');
            res.send(err);
        }
    });
});



app.listen(ServerConfig.serverPort, function () {
    console.log(`app listening on port ${ServerConfig.serverPort}!`);
});