const protocol = 'wss://';
// const port = ':9502';
const currentHostname = window && window.location && window.location.hostname;

let socketHostname;

if (currentHostname === 'localhost') {
  socketHostname = protocol + 'socket.track-agent.agency';
}
else if (currentHostname === 'app.track-agent.agency') {
  socketHostname = protocol + 'socket.track-agent.agency';
}
else {
  socketHostname = 'ws://127.0.0.1:8000';
}

export const SOCKET_ROOT = `${socketHostname}`;