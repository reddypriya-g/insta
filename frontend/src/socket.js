// import socketIOClient from 'socket.io-client';

// const socket = socketIOClient('https://insta-api-delta.vercel.app');

// export default socket;
import { io } from 'socket.io-client';

const socket = io('https://insta-api-delta.vercel.app', {
  transports: ['websocket', 'polling'],
  withCredentials: true
});
socket.on('connect', () => {
    console.log('connected');
});

socket.on('disconnect', () => {
    console.log('disconnected');
});
export default socket;
