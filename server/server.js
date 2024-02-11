const io=require("socket.io")(3001,{cors:{origin:"http://localhost:3000",methods:[
    "GET","POST"]
},})


io.on("connection",(socket)=>{
    console.log("user is connected",socket.id)
    socket.on('joinRoom',(channelId)=>{
        console.log(channelId,"@#4",socket.id)
        socket.join(channelId)
    });
    socket.on("chat message",(ChannelId,message)=>{
        console.log("Received Message: ",message);
        socket.broadcast.to(ChannelId).emit("chat message", message);
    })
})
console.log("hello")