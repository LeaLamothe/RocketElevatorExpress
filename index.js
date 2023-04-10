const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());

const courses = [
{id:1, name:'course1'},
{id:1, name:'course2'},
{id:1, name:'course3'},
];

app.get('/', (req,res) => {
res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});



//api/courses/1
app.get('/api/courses/:id', (req, res) => {
 const course = courses.find(c => c.id === parseInt(req.params.id));
 if(!course) return res.status(404).send('The course with the given ID was not found.')
 res.send(course);
});
//pour un query string parameter add dans la searchbar de ton localhost ?sortBy=name

app.post('/api/courses', (req,res) => {
    const { error } = validateCourse(req.body);
if (error) return res.status(400).send(error.details[0].message);
//     const schema = {
//         name: Joi.string().min(3).required()
//     };

//     const result = Joi.validate(req.body, schema);


// if (result.error){
//     res.status(400).send(result.error.details[0].message);
//     return;


const course = {
    id: courses.length +1,
    name: req.body.name
};
courses.push(course);
res.send(course);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));




//PUT FUNCTION PLUS EXPLAINING//

app.put('/api/courses/:id', (req, res) => {
//look up course
const course = courses.find(c => c.id === parseInt(req.params.id));

//if not existing, return 404
if(!course) return res.status(404).send('The course with the given ID was not found.')

//validate


const { error } = validateCourse(req.body); //result error
//if invalid, return 400 -Bad Request
if (error) return res.status(400).send(error.details[0].message);


//update course
course.name = req.body.name
res.send(course);
//return update course
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    
    return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.')
    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

});