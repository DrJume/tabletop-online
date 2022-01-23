export const backendURL = `${location.protocol === 'http:' ? 'ws' : 'wss'}://${location.hostname}:${
  location.hostname === 'localhost' ? '8080' : location.port
}`
