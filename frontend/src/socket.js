// import socketIOClient from 'socket.io-client';

// const socket = socketIOClient('https://insta-api-delta.vercel.app');

// export default socket;
import { io } from 'socket.io-client';

const socket = io('https://insta-api-delta.vercel.app', {
  withCredentials: true
});

export default socket;
