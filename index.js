const express = require('express')
const path = require('path')
const http = require('http')
const { Server  } = require('socket.io')
const Message = require('./models/message')
const Product = require('./models/product')
const { engine } = require('express-handlebars')

const messageModel = new Message()
const productModel = new Product()
const productRouter = require('./routes/product');

const app = express()
const server = http.createServer(app)
const io = new Server(server)
app.use("/static", express.static(path.join(__dirname, 'public')))

app.use("/", productRouter)




app.engine('handlebars', engine({
    layoutsDir: path.join(__dirname, './views'),
    defaultLayout: 'index'
  }));
  
  // app.set('views', './views')
  app.set('view engine', 'handlebars')

  app.get("/", (req, res)=>{
    res.render(path.join(__dirname, './views/index.handlebars'))
})

const users = {}
const msg = []

io.on("connection", (socket) =>{
    socket.emit("newUser", null)
    socket.on("I am", (name) =>{
        users[socket.id] = name

        // NO PUEDO ITERAR UN OBJETO POR ESO USO Object.entries(users)
        // Object.entries : [ [] ] me devuelve un array de arrays
        for(const user of Object.entries(users)){
            // user = [key , value]
            socket.emit("users" , { id : user[0], name: user[1] })
        }
        //emito evento que un nuevo usuario está en linea
        //broadcast : envia el mensaje a todos los conectados menos a mi
        socket.broadcast.emit("users", { id: socket.id, name })
        for(const m of msg){
            socket.emit("message", m)
        }
    })

    socket.on("message", (data) =>{

        msg.push(data)
        socket.broadcast.emit("message", data)
    })

    // socket.on("product", (data) =>{
    //     productModel.save(data)
    //     socket.broadcast.emit("product", data)
    // })

    socket.emit("product", null)

    socket.on('reload', ()=> {
        io.sockets.emit('refresh', null)
      })


})
server.listen(8080, ()=>{ console.log("Listening")})