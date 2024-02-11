const io=require("socket.io")(3001,{cors:{origin:"http://localhost:3000",methods:[
    "GET","POST"]
},})


io.on("connection",(socket)=>{
    console.log("user is connected",socket.id)
    socket.on('joinRoom',(channelId)=>{
        socket.join(channelId)
    });
    socket.on("chat message",(ChannelId,message,pic,user)=>{
        console.log("Received Message: ",message, pic, user);
        socket.broadcast.to(ChannelId).emit("chat message", message,pic,user);
    })
})
console.log("hello")