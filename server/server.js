const io=require("socket.io")(3001,{cors:{origin:"http://localhost:3000",methods:[
    "GET","POST"]
},})


io.on("connection",(socket)=>{
    console.log("user is connected",socket.id)
    socket.on("message",(Chat,ChatId)=>{
        console.log(Chat,"msdnf")
        io.emit("message sent", Chat);
    })
})
console.log("hello")