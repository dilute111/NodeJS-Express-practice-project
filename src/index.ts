import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

const db = {
    courses: [
        {id: 1, title: "front-end"},
        {id: 2, title: "back-end"},
        {id: 3, title: "automation-qa"},
        {id: 4, title: "devops"},

    ]
}

app.get('/', (req, res) => {
    res.json({message: "Hello world!!!"})
})

app.get('/users', (req, res) => {
    res.send("Hello users!")
})

app.get('/courses', (req, res) => {
    let filteredCourses = db.courses
        if (req.query.title) {
            filteredCourses = filteredCourses
                .filter(c => c.title.indexOf(req.query.title as string) > -1)
        }
    res.json(filteredCourses)
})

app.get('/courses/:id', (req, res) => {
    let courseQuery = db.courses.find(c => c.id === +req.params.id);
    if (!courseQuery) {
        res.sendStatus(404)
        return
    }
    res.json(courseQuery)
})

app.post('/courses', (req, res) => {
    let newCourse = {
        id: +(new Date()),
        title: req.body.title
    };
    db.courses.push(newCourse)
    res.status(201).json(newCourse)
})

app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);

    res.sendStatus(204)
})


app.put('/courses/:id', (req, res) => {
    let courseQuery = db.courses.find(c => c.id === +req.params.id);
    if (!courseQuery) {
        res.sendStatus(404)
        return
    }
    courseQuery.title = req.body.title
    res.sendStatus(204)
})

app.post('/users', (req, res) => {
    res.send("We've created new user!!!!!")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})