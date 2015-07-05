var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var nid = require('nid');

app.listen(30000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


io.on('connection', function (socket) {
 // socket.emit('message', "hola");
  socket.on('message', function (data) {
    io.emit('message',data);
    console.log(data);
  });
});



/*
// TODO(gfestari): authenticate socket payload via 'authenticate' event
  io.on('connection', function handleClient (socket) {

    // assign and store a user-id:socket reference
    socket.on('register', function storeClient (data) {

     
      var uid = nid();


        io.to(socket.id).emit('authenticated', { uid: uid });


    });

    socket.on('message', function joinRoom (data) {





        io.to(sid).emit('message', { from: socket.id, payload: data.payload });

    });

    socket.on('disconnect', function removeSocket (data) {

    });

  });

  */