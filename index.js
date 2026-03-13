const http = require("http")
const fs = require("fs")

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
const readFile = (path) => {
    return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) reject(err)
                else resolve(data)

            })
        }
    )
}


const server = http.createServer(async (request, response) => {

    switch (request.url) {
        case '/':
        case '/home':
        case '/about': {
            try {
                await delay(3000)
                response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                const data = await readFile("pages/about.html")
                response.write(data)
                response.end()
            } catch (e) {
                response.write("something went wrong")
                response.end()
            }
            break
        }
        case '/api/tables':
        case '/api/users':
        case '/api/account':
        case '/api/comment':
        case '/api/feedback': {
            response.statusCode = 400
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({error: 'incorrect response'}))
            break
        }
        default: {
            response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
            response.write("Not Found")
            response.end()
        }
    }


})

server.listen(3003)