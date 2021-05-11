import {Server, Socket} from 'socket.io';

class P2PServer {
  private io: Server;

  constructor(server) {
    this.io = new Server(server);
  }

  public listen() {
    this.io.on('connection', (socket: Socket) => {
      console.log('a user connected');
      this.messageHandler(socket);
    })
  }

  private messageHandler (socket: Socket) {

    socket.on('TRANSACTION.CREATED', () => {
      console.log('TRANSACTION.CREATED');
      socket.broadcast.emit('TRANSACTION.CREATED');
    });

    socket.on('BLOCK.CREATED', () => {
      console.log('BLOCK.CREATED');
      socket.broadcast.emit('BLOCK.CREATED');
    });
  }

}

export default P2PServer;
