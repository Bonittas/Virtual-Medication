import io from 'socket.io-client';
// const sockets = io('http://localhost:00', { autoConnect: true, forceNew: true });
const sockets = io('/video');
export default sockets;
