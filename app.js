const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const envName = process.env.ENV_NAME || 'local';
const {dataBase,costs,percentage} = require("./data.js");
const dataAgent = require("./data.js");
const { elevatorCostRes } = require('./cost.js');
// const { calculateRes, calculateTotalExcelium, calculateTotalPremium, calculateTotalStandard } = require('./cost.js');

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
  console.log(` server listening on port ${port} `)
})

//email
app.get('/api/email-list',(req,res) => {
  const emailData = dataAgent.dataBase.map(email => email.email);
  res.send(emailData);
});

//agentRegion
app.get('/api/region-avg/:region', (req, res) => {
  const agentsInRegions = dataAgent.dataBase.filter(agents => agents.region === (req.params.region));
  const region = req.params.region
  if (agentsInRegions.length==0) {
    return res.status(404).send('No agents available in this region at the moment please try again later.')
    
  }
  //average
  let averageFee = 0 ;
  let averageRating = 0;
  for (let i = 0; i < agentsInRegions.length; i++) {
    const agent = agentsInRegions[i];
    averageFee += parseInt(agent.fee);
    averageRating += parseInt(agent.rating);
  };
  averageFee = Math.round(averageFee / agentsInRegions.length);
  averageRating =Math.round(averageRating / agentsInRegions.length);
  
res.send({
  Region: region,
  AverageFee: averageFee,
  AverageRating: averageRating
});
});
//Get Calcul residentiel
app.get('/api/calc-residential', (req, res) => {
const { apartment, floors, tier } = req.query; //input fields
res.send(elevatorCostRes(apartment,floors,tier))
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//post
app.post('/api/contact-us', function(req, res) {
  const { first_name, message, last_name } = req.body;
  res.send(`Thank you for sharing your informations with us mr./mrs. ${last_name}`);
  console.log(`Clients informations: ${first_name} ${last_name},  Client's message :${message}`)
});
