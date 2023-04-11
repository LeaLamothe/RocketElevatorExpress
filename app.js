const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const envName = process.env.ENV_NAME || 'local';
const dataAgent = require("./data.js")

//hello
app.get('/api/hello', (req, res) => {
  res.send('Hello World !!');
});

//error
app.get('/api/error', (req, res) => {
  res.status(404).send('404: Error, the path you tried to reach was not found.')
});

//port
app.get('/api/status', (req, res) => {
  const portAndName = ` server listening on port ${port} in ${envName} environement `;
  res.send(portAndName);
});

app.listen(port, () => {
  console.log(` server listening on port ${port} hello `)
})

//email
app.get('/api/email-list',(req,res) => {
  const emailData = dataAgent.dataBase.map(email => email.email);
  res.send(emailData);
});

app.get('/api/region-avg/:region', (req, res) => {
  const parse = dataAgent.dataBase.filter(agents => agents.region === (req.params.region));

res.send(parse)
});