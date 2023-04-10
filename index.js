const express = require('express');
const app = express();

app.get('/', (req,res) => {
res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3, 4]);
});

//PORT
const port = process.env.PORT || 3000;

//api/courses/1
app.get('/api/courses/:id', (req,res) => {
  res.send(req.params.id);  
});
app.listen(port, () => console.log(`Listening on port ${port}...`));