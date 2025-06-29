import http from  'http'
import app from './app.js'
import {initializeSocket} from './socket.js'


const server = http.createServer(app) ;
initializeSocket(server) ;

server.listen(4000 , ()=>{
    console.log('server is running on port 4000')
})
