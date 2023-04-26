const express = require('express');

const server = express();

server.use(express.json());

const courses = ['Node JS', 'React', 'React Native'];

server.use((req, res, next) => {
    console.log(`Global middleware in the METHOD: ${req.method}`);
    return next();
});

function checkCourse(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ message: "Name is required." });
    }

    return next();
}

function checkIndexCourse(req, res, next) {
    const course = courses[req.params.index]

    if (!course) {
        return res.status(400).json({ message: "Course doesn't exit." });
    }

    req.course = course;

    return next();
}

server.get('/courses', (req, res) => {
    return res.json(courses);
});

server.get('/courses/:index', checkIndexCourse, (req, res) => {
    return res.json(req.course);
});

server.post('/courses', checkCourse, (req, res) => {
    const { name } = req.body;
    courses.push(name);
    return res.json(courses);
});

server.put('/courses/:index', checkCourse, checkIndexCourse, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    courses[index] = name;

    return res.json(courses);
});

server.delete('/courses/:index', checkIndexCourse, (req, res) => {
    const { index } = req.params;
    courses.splice(index, 1);

    return res.json({ message: 'Course deleted.' });
})

// server.get('/courses/:id', (req, res) => {
//     const name = req.query.name;
//     const id = req.params.id;
//     return res.json({ course: `${name} is learning Node JS | Course: ${id} ` });
// });

server.listen(3000);