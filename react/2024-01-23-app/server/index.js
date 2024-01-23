const express = require("express");
const cors = require('cors');
const uuid = require('uuid')
const app = express();

var sseClients = [];

app.use(cors());

app.get("/api/getResources", (req, res)=>{
    res.status(200).send(JSON.stringify(
        [
            { "Name":"var1", "Initial_Value":0, "COV":true },
            { "Name":"var2", "Initial_Value":0, "COV":true },
            { "Name":"var3", "Initial_Value":0, "COV":true },
            { "Name":"var4", "Initial_Value":0, "COV":false },
            { "Name":"var5", "Initial_Value":0, "COV":false },
            { "Name":"var6", "Initial_Value":0, "COV":true },
        ]));
});


setInterval(() => {
    let updates = {
        "var1":(Math.random() * 500).toFixed(2),
        "var2":(Math.random() * 500).toFixed(2),
        "var3":(Math.random() * 500).toFixed(2),
        "var6":(Math.random() * 500).toFixed(2),
    }
    console.log(updates);
    for(let connectionid in sseClients)
    {
        sseClients[connectionid](updates)
    }
}, 2500);

app.get("/api/getValue", (req, res)=>{
    res.status(200).send((Math.random() * 500).toFixed(2));
});

app.get("/sse", (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
  
    var connectionID = uuid.v4();

    const sendData = (data) => {
		res.write(`data: ${JSON.stringify(data)}\n\n`);
	};

    sseClients[connectionID] = sendData;

    req.on("close", () => {
        delete sseList[connectionID];
    });
})

app.listen(5000, ()=> {console.log("Server started into port 5000")});
