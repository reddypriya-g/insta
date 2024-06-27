import socketIOClient from 'socket.io-client';

const socket = socketIOClient('https://insta-api-delta.vercel.app');

export default socket;
