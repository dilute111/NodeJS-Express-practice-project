import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const a = 4
    if (a > 5) res.send('OK')
    res.send('Hello World!!!!!')

})
app.get('/users', (req, res) => {
    res.send('Hello Users!!!!!!')
})

app.post('/users', (req, res) => {
    res.send("We've created new user!!!!!")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})